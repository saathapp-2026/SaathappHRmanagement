export const mockAttendance = [
  {
    id: "att-1",
    date: new Date().toISOString(),
    status: "Present",
    checkIn: "09:00",
    checkOut: "17:15",
    workingHours: "8h 15m"
  }
];

export const mockCorrectionRequest = {
  id: "corr-1",
  date: "2023-10-25",
  reason: "Forgot to check out",
  status: "Pending"
};
