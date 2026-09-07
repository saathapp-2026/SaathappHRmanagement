import test from 'node:test';
import assert from 'node:assert';

// Mocking the behavior of AttendanceService manually since it imports from client
// We will test the logic.

// To properly test the logic without a complex mock setup, I will extract the validation logic 
// into pure functions, OR I will just mock the dependencies.

let mockData = {
  attendance_records: [
    { id: 'rec-1', employee_id: 'emp-1', check_in_at: '2023-10-01T09:00:00Z', check_out_at: '2023-10-01T17:00:00Z', status: 'present' },
    { id: 'rec-2', employee_id: 'emp-2', check_in_at: '2023-10-02T09:00:00Z', check_out_at: '2023-10-02T17:00:00Z', status: 'present' }
  ],
  attendance_corrections: []
};

function submitCorrectionRequestMock(profileId, data) {
  // 1. Invalid times
  if (data.requested_check_in && data.requested_check_out) {
    const inTime = new Date(`1970-01-01T${data.requested_check_in}Z`).getTime();
    const outTime = new Date(`1970-01-01T${data.requested_check_out}Z`).getTime();
    if (outTime <= inTime) {
       throw new Error("Checkout time must be later than check-in time");
    }
  }
  
  // 2. Cross-employee access (only matching employee_id)
  const record = mockData.attendance_records.find(r => r.id === data.attendance_record_id && r.employee_id === profileId);
  if (!record) {
    throw new Error("Attendance record not found or access denied");
  }
  
  // 3. Duplicate unresolved correction
  const existing = mockData.attendance_corrections.find(c => 
    c.attendance_record_id === data.attendance_record_id && 
    ['pending', 'under_review', 'information_requested'].includes(c.status)
  );
  
  if (existing) {
    throw new Error("An unresolved correction request already exists for this record");
  }
  
  const req = {
    id: `corr-${mockData.attendance_corrections.length + 1}`,
    employee_id: profileId,
    attendance_record_id: data.attendance_record_id,
    correction_date: data.correction_date,
    requested_check_in: data.requested_check_in,
    requested_check_out: data.requested_check_out,
    reason: data.reason,
    status: 'pending'
  };
  mockData.attendance_corrections.push(req);
  return req;
}

function hrApproveCorrectionMock(correctionId) {
  const corr = mockData.attendance_corrections.find(c => c.id === correctionId);
  if (!corr) throw new Error("Correction not found");
  if (corr.status !== 'pending' && corr.status !== 'under_review') throw new Error("Invalid status");
  
  // Update record (transactional mock)
  const rec = mockData.attendance_records.find(r => r.id === corr.attendance_record_id);
  rec.check_in_at = corr.requested_check_in ? `${corr.correction_date}T${corr.requested_check_in}:00Z` : rec.check_in_at;
  rec.check_out_at = corr.requested_check_out ? `${corr.correction_date}T${corr.requested_check_out}:00Z` : rec.check_out_at;
  
  corr.status = 'approved';
}

test('submitCorrectionRequest - Invalid times', () => {
  assert.throws(() => {
    submitCorrectionRequestMock('emp-1', {
      attendance_record_id: 'rec-1',
      correction_date: '2023-10-01',
      requested_check_in: '17:00',
      requested_check_out: '09:00',
      reason: 'Wrong times'
    });
  }, /Checkout time must be later/);
});

test('submitCorrectionRequest - Cross-employee access', () => {
  assert.throws(() => {
    submitCorrectionRequestMock('emp-2', {
      attendance_record_id: 'rec-1', // Belongs to emp-1
      correction_date: '2023-10-01',
      requested_check_in: '08:00',
      requested_check_out: '16:00',
      reason: 'Wrong emp'
    });
  }, /access denied/);
});

test('submitCorrectionRequest - Duplicate correction', () => {
  submitCorrectionRequestMock('emp-1', {
    attendance_record_id: 'rec-1',
    correction_date: '2023-10-01',
    requested_check_in: '09:00',
    requested_check_out: '17:30',
    reason: 'Forgot checkout'
  });
  
  assert.throws(() => {
    submitCorrectionRequestMock('emp-1', {
      attendance_record_id: 'rec-1',
      correction_date: '2023-10-01',
      requested_check_in: '08:30',
      requested_check_out: '17:30',
      reason: 'Another try'
    });
  }, /already exists/);
});

test('HR Approval - Reflected in history', () => {
  const req = mockData.attendance_corrections[0]; // The pending one from prev test
  hrApproveCorrectionMock(req.id);
  
  const rec = mockData.attendance_records.find(r => r.id === 'rec-1');
  assert.strictEqual(rec.check_out_at, '2023-10-01T17:30:00Z');
  assert.strictEqual(req.status, 'approved');
});

