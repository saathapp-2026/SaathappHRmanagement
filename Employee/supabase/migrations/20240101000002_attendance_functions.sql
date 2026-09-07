-- Distance calculation function
CREATE OR REPLACE FUNCTION calculate_distance_meters(
    lat1 DOUBLE PRECISION,
    lon1 DOUBLE PRECISION,
    lat2 DOUBLE PRECISION,
    lon2 DOUBLE PRECISION
) RETURNS DOUBLE PRECISION AS $$
DECLARE
    r DOUBLE PRECISION := 6371000; -- Earth radius in meters
    phi1 DOUBLE PRECISION := radians(lat1);
    phi2 DOUBLE PRECISION := radians(lat2);
    delta_phi DOUBLE PRECISION := radians(lat2 - lat1);
    delta_lambda DOUBLE PRECISION := radians(lon2 - lon1);
    a DOUBLE PRECISION;
    c DOUBLE PRECISION;
BEGIN
    a := sin(delta_phi / 2) * sin(delta_phi / 2) +
         cos(phi1) * cos(phi2) *
         sin(delta_lambda / 2) * sin(delta_lambda / 2);
    c := 2 * atan2(sqrt(a), sqrt(1 - a));
    RETURN r * c;
END;
$$ LANGUAGE plpgsql IMMUTABLE;

-- Check In RPC
CREATE OR REPLACE FUNCTION check_in(
    p_latitude DOUBLE PRECISION DEFAULT NULL,
    p_longitude DOUBLE PRECISION DEFAULT NULL,
    p_session_info JSONB DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID := auth.uid();
    v_employee_id UUID;
    v_account_status TEXT;
    v_work_location_id UUID;
    v_policy RECORD;
    v_location RECORD;
    v_today DATE;
    v_now TIMESTAMPTZ := NOW();
    v_distance DOUBLE PRECISION;
    v_status TEXT;
    v_day_of_week INTEGER;
    v_attendance_record_id UUID;
BEGIN
    -- 1. Verify authenticated employee
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'NOT_AUTHENTICATED';
    END IF;

    SELECT id, account_status, work_location_id 
    INTO v_employee_id, v_account_status, v_work_location_id
    FROM employee_profiles 
    WHERE user_id = v_user_id;

    IF v_employee_id IS NULL THEN
        RAISE EXCEPTION 'EMPLOYEE_NOT_FOUND';
    END IF;

    -- 2. Verify account status
    IF v_account_status != 'active' THEN
        RAISE EXCEPTION 'ACCOUNT_RESTRICTED';
    END IF;

    -- 3. Load active attendance policy
    SELECT * INTO v_policy FROM attendance_policies WHERE active = true LIMIT 1;
    IF v_policy IS NULL THEN
        RAISE EXCEPTION 'POLICY_NOT_FOUND';
    END IF;

    -- 4. Determine company-local attendance date
    v_today := (v_now AT TIME ZONE v_policy.timezone)::DATE;

    -- 5. Prevent duplicate check-in
    -- We must lock the row or use pg_advisory_xact_lock to prevent race conditions
    -- Using advisory lock on employee_id hash
    PERFORM pg_advisory_xact_lock(hashtext(v_employee_id::text));

    IF EXISTS (
        SELECT 1 FROM attendance_records 
        WHERE employee_id = v_employee_id AND attendance_date = v_today AND check_in_at IS NOT NULL
    ) THEN
        RAISE EXCEPTION 'ALREADY_CHECKED_IN';
    END IF;

    -- 6. Location validation
    IF v_policy.location_required THEN
        IF p_latitude IS NULL OR p_longitude IS NULL THEN
            RAISE EXCEPTION 'LOCATION_REQUIRED';
        END IF;

        IF v_work_location_id IS NULL THEN
            RAISE EXCEPTION 'WORK_LOCATION_NOT_ASSIGNED';
        END IF;

        SELECT latitude, longitude, attendance_radius_meters INTO v_location 
        FROM work_locations WHERE id = v_work_location_id;

        IF v_location.latitude IS NULL OR v_location.longitude IS NULL THEN
             RAISE EXCEPTION 'WORK_LOCATION_COORDINATES_MISSING';
        END IF;

        v_distance := calculate_distance_meters(p_latitude, p_longitude, v_location.latitude, v_location.longitude);
        
        IF v_distance > COALESCE(v_location.attendance_radius_meters, v_policy.allowed_radius_meters, 100) THEN
            RAISE EXCEPTION 'OUTSIDE_ALLOWED_LOCATION';
        END IF;
    END IF;

    -- 7. Calculate initial status
    v_day_of_week := EXTRACT(DOW FROM v_today);
    
    IF v_day_of_week = ANY(v_policy.weekly_off_days) THEN
        v_status := 'weekly_off';
    ELSE
        IF (v_now AT TIME ZONE v_policy.timezone)::TIME > (v_policy.office_start_time + make_interval(mins => v_policy.grace_period_minutes)) THEN
            v_status := 'late';
        ELSE
            v_status := 'present';
        END IF;
    END IF;

    -- 8. Create/update attendance record
    INSERT INTO attendance_records (
        employee_id, attendance_date, check_in_at, status, 
        check_in_location, check_in_session_info, source
    ) VALUES (
        v_employee_id, v_today, v_now, v_status,
        CASE WHEN p_latitude IS NOT NULL THEN jsonb_build_object('lat', p_latitude, 'lng', p_longitude) ELSE NULL END, 
        p_session_info, 'system'
    )
    ON CONFLICT (employee_id, attendance_date) 
    DO UPDATE SET 
        check_in_at = EXCLUDED.check_in_at,
        status = CASE 
            WHEN attendance_records.status IN ('on_leave', 'holiday', 'work_from_home') THEN attendance_records.status
            ELSE EXCLUDED.status
        END,
        check_in_location = EXCLUDED.check_in_location,
        check_in_session_info = EXCLUDED.check_in_session_info,
        updated_at = NOW()
    RETURNING id INTO v_attendance_record_id;

    -- 9. Return normalized response
    RETURN jsonb_build_object(
        'success', true,
        'attendance_id', v_attendance_record_id,
        'check_in_at', v_now,
        'status', v_status
    );
END;
$$;

-- Check Out RPC
CREATE OR REPLACE FUNCTION check_out(
    p_latitude DOUBLE PRECISION DEFAULT NULL,
    p_longitude DOUBLE PRECISION DEFAULT NULL,
    p_session_info JSONB DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    v_user_id UUID := auth.uid();
    v_employee_id UUID;
    v_policy RECORD;
    v_today DATE;
    v_now TIMESTAMPTZ := NOW();
    v_record attendance_records%ROWTYPE;
    v_work_minutes INTEGER;
    v_final_status TEXT;
    v_day_of_week INTEGER;
BEGIN
    -- 1. Verify authenticated employee
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'NOT_AUTHENTICATED';
    END IF;

    SELECT id INTO v_employee_id FROM employee_profiles WHERE user_id = v_user_id;

    IF v_employee_id IS NULL THEN
        RAISE EXCEPTION 'EMPLOYEE_NOT_FOUND';
    END IF;

    -- 2. Load active attendance policy
    SELECT * INTO v_policy FROM attendance_policies WHERE active = true LIMIT 1;
    IF v_policy IS NULL THEN
        RAISE EXCEPTION 'POLICY_NOT_FOUND';
    END IF;

    v_today := (v_now AT TIME ZONE v_policy.timezone)::DATE;

    -- concurrency control
    PERFORM pg_advisory_xact_lock(hashtext(v_employee_id::text));

    -- 3. Require existing check-in and prevent duplicate checkout
    SELECT * INTO v_record FROM attendance_records 
    WHERE employee_id = v_employee_id AND attendance_date = v_today;

    IF v_record.id IS NULL OR v_record.check_in_at IS NULL THEN
        RAISE EXCEPTION 'NOT_CHECKED_IN';
    END IF;

    IF v_record.check_out_at IS NOT NULL THEN
        RAISE EXCEPTION 'ALREADY_CHECKED_OUT';
    END IF;

    -- 4. Calculate working duration
    v_work_minutes := EXTRACT(EPOCH FROM (v_now - v_record.check_in_at)) / 60;

    -- 5. Calculate final status
    v_day_of_week := EXTRACT(DOW FROM v_today);
    
    IF v_record.status IN ('on_leave', 'holiday', 'work_from_home') THEN
        v_final_status := v_record.status;
    ELSIF v_day_of_week = ANY(v_policy.weekly_off_days) THEN
        v_final_status := 'weekly_off';
    ELSE
        IF v_work_minutes >= v_policy.minimum_full_day_minutes THEN
            IF v_record.status = 'late' THEN
                v_final_status := 'late';
            ELSE
                v_final_status := 'present';
            END IF;
        ELSIF v_work_minutes >= v_policy.minimum_half_day_minutes THEN
            v_final_status := 'half_day';
        ELSE
            v_final_status := 'absent';
        END IF;
    END IF;

    -- 6. Save record
    UPDATE attendance_records
    SET 
        check_out_at = v_now,
        total_work_minutes = v_work_minutes,
        status = v_final_status,
        check_out_location = CASE WHEN p_latitude IS NOT NULL THEN jsonb_build_object('lat', p_latitude, 'lng', p_longitude) ELSE NULL END,
        check_out_session_info = p_session_info,
        updated_at = NOW()
    WHERE id = v_record.id;

    -- 7. Return result
    RETURN jsonb_build_object(
        'success', true,
        'attendance_id', v_record.id,
        'check_out_at', v_now,
        'total_work_minutes', v_work_minutes,
        'status', v_final_status
    );
END;
$$;
