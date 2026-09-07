import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { HRProvider } from './context/HRContext';
import { ProtectedRoute } from './components/common/ProtectedRoute';
import { ManagerLayout } from './components/layout/ManagerLayout';

// Auth Pages
import { LoginPage } from './pages/auth/LoginPage';
import { UnauthorizedPage } from './pages/auth/UnauthorizedPage';

// Manager Portal Modules
import { ManagerDashboardPage } from './pages/dashboard/ManagerDashboardPage';

// My Team Section
import { TeamMembersPage } from './pages/team/TeamMembersPage';
import { TeamMemberDetailPage } from './pages/team/TeamMemberDetailPage';
import { TeamCalendarPage } from './pages/team/TeamCalendarPage';
import { TeamInsightsPage } from './pages/team/TeamInsightsPage';

// Time & Attendance Section
import { TeamAttendancePage } from './pages/attendance/TeamAttendancePage';
import { TeamCorrectionsPage } from './pages/attendance/TeamCorrectionsPage';
import { TeamLeavePage } from './pages/leave/TeamLeavePage';
import { RemoteWorkPage } from './pages/remote/RemoteWorkPage';

// Performance Section
import { GoalsPage } from './pages/performance/GoalsPage';
import { PerformanceReviewsPage } from './pages/performance/PerformanceReviewsPage';
import { FeedbackPage } from './pages/performance/FeedbackPage';
import { ProbationReviewsPage } from './pages/performance/ProbationReviewsPage';

// Team Operations Section
import { RecruitmentRequestsPage } from './pages/operations/RecruitmentRequestsPage';
import { HRRequestsPage } from './pages/operations/HRRequestsPage';
import { OffboardingPage } from './pages/operations/OffboardingPage';

// Communication Section
import { AnnouncementsPage } from './pages/communication/AnnouncementsPage';
import { NotificationsPage } from './pages/communication/NotificationsPage';

// Reports Section
import { TeamReportsPage } from './pages/reports/TeamReportsPage';

// Profile & Settings
import { ProfilePage } from './pages/profile/ProfilePage';
import { SettingsPage } from './pages/settings/SettingsPage';

export default function App() {
  return (
    <HRProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Login */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/unauthorized" element={<UnauthorizedPage />} />

          {/* Protected Manager Portal */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <ManagerLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<ManagerDashboardPage />} />

            {/* MY TEAM */}
            <Route path="team" element={<TeamMembersPage />} />
            <Route path="team/:id" element={<TeamMemberDetailPage />} />
            <Route path="team-calendar" element={<TeamCalendarPage />} />
            <Route path="team-insights" element={<TeamInsightsPage />} />

            {/* TIME & ATTENDANCE */}
            <Route path="attendance" element={<TeamAttendancePage />} />
            <Route path="corrections" element={<TeamCorrectionsPage />} />
            <Route path="leave" element={<TeamLeavePage />} />
            <Route path="remote-work" element={<RemoteWorkPage />} />

            {/* PERFORMANCE */}
            <Route path="goals" element={<GoalsPage />} />
            <Route path="reviews" element={<PerformanceReviewsPage />} />
            <Route path="feedback" element={<FeedbackPage />} />
            <Route path="probation" element={<ProbationReviewsPage />} />

            {/* TEAM OPERATIONS */}
            <Route path="recruitment-requests" element={<RecruitmentRequestsPage />} />
            <Route path="hr-requests" element={<HRRequestsPage />} />
            <Route path="offboarding" element={<OffboardingPage />} />

            {/* COMMUNICATION */}
            <Route path="announcements" element={<AnnouncementsPage />} />
            <Route path="notifications" element={<NotificationsPage />} />

            {/* REPORTS */}
            <Route path="reports" element={<TeamReportsPage />} />

            {/* PROFILE & SETTINGS */}
            <Route path="profile" element={<ProfilePage />} />
            <Route path="settings" element={<SettingsPage />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </HRProvider>
  );
}
