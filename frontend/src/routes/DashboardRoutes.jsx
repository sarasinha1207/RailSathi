import React from 'react';
import { ROLES } from '../utils/roles';
import RoleRoute from './RoleRoute';
import AdminDashboardPage from '../dashboard/admin/AdminDashboardPage';
import CmoHome from '../dashboard/cmo/CmoHome';
import ComplaintsPage from '../dashboard/cmo/ComplaintsPage';
import StaffAvailabilityPage from '../dashboard/cmo/StaffAvailabilityPage';
import ZoneDivisionPage from '../dashboard/cmo/ZoneDivisionPage';
import StaffDashboardPage from '../dashboard/staff/StaffDashboardPage';
import StaffComplaintsPage from '../dashboard/staff/StaffComplaintsPage';
import StaffOtherStaffPage from '../dashboard/staff/StaffOtherStaffPage';
import StaffTrainJourneyPage from '../dashboard/staff/StaffTrainJourneyPage';
import StaffInventoryPage from '../dashboard/staff/StaffInventoryPage';
import ZoneHeadDashboardPage from '../dashboard/zone-head/ZoneHeadDashboardPage';
import DivisionHeadDashboardPage from '../dashboard/division-head/DivisionHeadDashboardPage';
import HelpPage from '../components/dashboard/HelpPage';
import SettingsPage from '../components/dashboard/SettingsPage';

export default function DashboardRoutes({ user, activeTab = 'home', onNavigate }) {
  if (!user) return null;

  // Help page is common for every dashboard view
  if (activeTab === 'help' || activeTab === 'info') {
    return <HelpPage user={user} />;
  }

  // Settings page is common for every dashboard view
  if (activeTab === 'settings') {
    return <SettingsPage user={user} />;
  }

  // ADMIN ROUTE: Always render AdminDashboardPage for Admin users
  if (user.role === ROLES.ADMIN) {
    return (
      <RoleRoute user={user} allowedRoles={[ROLES.ADMIN]}>
        <AdminDashboardPage user={user} activeTab={activeTab} onNavigate={onNavigate} />
      </RoleRoute>
    );
  }

  // Staff & Availability Page for Officers
  if (activeTab === 'staff_availability' || activeTab === 'staff') {
    return <StaffAvailabilityPage user={user} />;
  }

  switch (user.role) {
    case ROLES.COMPLAINT_OFFICER:
      return (
        <RoleRoute user={user} allowedRoles={[ROLES.COMPLAINT_OFFICER, ROLES.ADMIN]}>
          {activeTab === 'complaints' ? (
            <ComplaintsPage user={user} initialSubTab="pending" />
          ) : activeTab === 'reassignment_requests' ? (
            <ComplaintsPage user={user} initialSubTab="reassignment" />
          ) : (
            <CmoHome user={user} />
          )}
        </RoleRoute>
      );

    case ROLES.ZONE_HEAD:
      return (
        <RoleRoute user={user} allowedRoles={[ROLES.ZONE_HEAD, ROLES.ADMIN]}>
          <ZoneHeadDashboardPage user={user} />
        </RoleRoute>
      );

    case ROLES.DIVISION_HEAD:
      return (
        <RoleRoute user={user} allowedRoles={[ROLES.DIVISION_HEAD, ROLES.ADMIN]}>
          <DivisionHeadDashboardPage user={user} />
        </RoleRoute>
      );

    case ROLES.DEPARTMENT_HEAD:
      return (
        <RoleRoute user={user} allowedRoles={[ROLES.DEPARTMENT_HEAD, ROLES.ADMIN]}>
          <DivisionHeadDashboardPage user={user} />
        </RoleRoute>
      );

    case ROLES.STAFF:
      return (
        <RoleRoute user={user} allowedRoles={[ROLES.STAFF, ROLES.ADMIN]}>
          {activeTab === 'complaints' || activeTab === 'my_complaints' ? (
            <StaffComplaintsPage user={user} />
          ) : activeTab === 'other_staff' ? (
            <StaffOtherStaffPage user={user} />
          ) : activeTab === 'train_journey' ? (
            <StaffTrainJourneyPage user={user} />
          ) : activeTab === 'inventory' ? (
            <StaffInventoryPage user={user} />
          ) : (
            <StaffDashboardPage user={user} onNavigate={onNavigate} />
          )}
        </RoleRoute>
      );

    default:
      return (
        <RoleRoute user={user} allowedRoles={[ROLES.COMPLAINT_OFFICER, ROLES.ADMIN]}>
          <CmoHome user={user} />
        </RoleRoute>
      );
  }
}


