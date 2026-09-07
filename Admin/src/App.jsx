import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HRProvider } from './context/HRContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { AdminLayout } from './components/layout/AdminLayout';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { UnauthorizedPage } from './pages/auth/UnauthorizedPage';

// Portal Modules Pages
import { DashboardPage } from './pages/dashboard/DashboardPage';
import { EmployeesPage } from './pages/employees/EmployeesPage';
import { EmployeeDetailPage } from './pages/employees/EmployeeDetailPage';
import { AttendancePage } from './pages/attendance/AttendancePage';
import { LeavePage } from './pages/leave/LeavePage';
import { ApprovalsPage } from './pages/approvals/ApprovalsPage';
import { ConcernsPage } from './pages/concerns/ConcernsPage';
import { DepartmentsPage } from './pages/departments/DepartmentsPage';
import { CalendarPage } from './pages/calendar/CalendarPage';
import { AnnouncementsPage } from './pages/announcements/AnnouncementsPage';
import { ReportsPage } from './pages/reports/ReportsPage';
import { DocumentsPage } from './pages/documents/DocumentsPage';
import { AuditLogsPage } from './pages/audit/AuditLogsPage';
import { SettingsPage } from './pages/settings/SettingsPage';

export default function App() {
  return (
    <HRProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Login Route */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Protected Admin Shell */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<ProtectedRoute moduleName="dashboard"><DashboardPage /></ProtectedRoute>} />
            <Route path="employees" element={<ProtectedRoute moduleName="employees"><EmployeesPage /></ProtectedRoute>} />
            <Route path="employees/:id" element={<ProtectedRoute moduleName="employees"><EmployeeDetailPage /></ProtectedRoute>} />
            <Route path="attendance" element={<ProtectedRoute moduleName="attendance"><AttendancePage /></ProtectedRoute>} />
            <Route path="leave" element={<ProtectedRoute moduleName="leave"><LeavePage /></ProtectedRoute>} />
            <Route path="approvals" element={<ProtectedRoute moduleName="approvals"><ApprovalsPage /></ProtectedRoute>} />
            <Route path="concerns" element={<ProtectedRoute moduleName="concerns"><ConcernsPage /></ProtectedRoute>} />
            <Route path="departments" element={<ProtectedRoute moduleName="employees"><DepartmentsPage /></ProtectedRoute>} />
            <Route path="calendar" element={<ProtectedRoute moduleName="calendar"><CalendarPage /></ProtectedRoute>} />
            <Route path="announcements" element={<ProtectedRoute moduleName="announcements"><AnnouncementsPage /></ProtectedRoute>} />
            <Route path="reports" element={<ProtectedRoute moduleName="reports"><ReportsPage /></ProtectedRoute>} />
            <Route path="documents" element={<ProtectedRoute moduleName="documents"><DocumentsPage /></ProtectedRoute>} />
            <Route path="audit-logs" element={<ProtectedRoute moduleName="dashboard"><AuditLogsPage /></ProtectedRoute>} />
            <Route path="settings" element={<ProtectedRoute moduleName="dashboard"><SettingsPage /></ProtectedRoute>} />
          </Route>

          {/* Fallback redirect */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </HRProvider>
  );
}
