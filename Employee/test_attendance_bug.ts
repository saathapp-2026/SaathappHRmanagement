import { supabase } from './src/lib/supabase/client';
import { AttendanceService } from './src/services/attendanceService';

async function test() {
  try {
    const data = await AttendanceService.getTodayAttendance();
    console.log("Returned data:", data);
  } catch (e) {
    console.error("Error:", e);
  }
}
test();
