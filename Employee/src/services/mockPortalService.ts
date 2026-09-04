import { mockEmployee } from '../data/mockEmployee';
import { mockAttendance, mockCorrectionRequest } from '../data/mockAttendance';
import { mockLeaveBalances, mockLeaveHistory } from '../data/mockLeave';
import { mockNotifications, mockAnnouncements, mockEvents } from '../data/mockNotifications';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const MockPortalService = {
  async getEmployeeProfile() {
    await delay(300);
    return mockEmployee;
  },
  async getAttendanceToday() {
    await delay(300);
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mockAttendance_today');
      if (stored) return JSON.parse(stored);
    }
    return mockAttendance[0];
  },
  async checkIn() {
    await delay(500);
    if (typeof window !== 'undefined') {
      const current = { status: 'Present', checkIn: new Date().toLocaleTimeString(), checkOut: null };
      localStorage.setItem('mockAttendance_today', JSON.stringify(current));
      return current;
    }
    return { status: 'Present', checkIn: '09:00', checkOut: null };
  },
  async checkOut() {
    await delay(500);
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('mockAttendance_today');
      let current = stored ? JSON.parse(stored) : { status: 'Present', checkIn: '09:00' };
      current.checkOut = new Date().toLocaleTimeString();
      current.workingHours = '8h 30m';
      localStorage.setItem('mockAttendance_today', JSON.stringify(current));
      return current;
    }
    return { status: 'Present', checkIn: '09:00', checkOut: '17:30', workingHours: '8h 30m' };
  },
  async getAttendanceHistory() {
    await delay(300);
    return mockAttendance;
  },
  async getCorrectionRequests() {
    await delay(300);
    return [mockCorrectionRequest];
  },
  async submitAttendanceCorrection(data: any) {
    await delay(500);
    return { success: true, request: { ...data, id: 'new-corr-1', status: 'Pending' } };
  },
  async getLeaveBalances() {
    await delay(300);
    return mockLeaveBalances;
  },
  async getLeaveHistory() {
    await delay(300);
    return mockLeaveHistory;
  },
  async applyLeave(data: any) {
    await delay(500);
    return { success: true, leave: { ...data, id: 'new-leave-1', status: 'Pending' } };
  },
  async getNotifications() {
    await delay(300);
    return mockNotifications;
  },
  async getAnnouncements() {
    await delay(300);
    return mockAnnouncements;
  },
  async getEvents() {
    await delay(300);
    return mockEvents;
  },
  async getConcerns() {
    await delay(300);
    return [{ id: 'conc-1', ticketId: 'TCK-001', subject: 'Laptop Issue', status: 'Resolved', createdAt: new Date().toISOString(), isAnonymous: false }];
  },
  async submitConcern(data: any) {
    await delay(500);
    return { success: true, data };
  },
  async getHelpTickets() {
    await delay(300);
    return [{ id: 'help-1', ticketId: 'IT-1234', subject: 'Salary slip query', category: 'Admin & Facilities', status: 'Closed', createdAt: new Date().toISOString() }];
  },
  async submitHelpTicket(data: any) {
    await delay(500);
    return { success: true, data };
  },
  async login(data: any) {
    await delay(500);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mock_token', 'fake-jwt-token');
    }
    return { success: true, employee: mockEmployee };
  },
  async logout() {
    await delay(500);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mock_token');
    }
    return { success: true };
  },
  async forgotPassword(data: any) {
    await delay(500);
    return { success: true };
  },
  async resetPassword(data: any) {
    await delay(500);
    return { success: true };
  },
  async verifyInvite(token: string) {
    await delay(300);
    return { success: true, employee: mockEmployee };
  },
  async acceptInvite(data: any) {
    await delay(500);
    return { success: true };
  },
  async completeProfile(data: any) {
    await delay(500);
    return { success: true };
  }
};
