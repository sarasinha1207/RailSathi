import React from 'react';
import { ROLES } from '../utils/roles';
import RoleRoute from './RoleRoute';
import AdminDashboardPage from '../dashboards/admin/pages/AdminDashboardPage';
import Home from '../dashboards/complaintOfficer/pages/Home';
import ComplaintsPage from '../dashboards/complaintOfficer/pages/ComplaintsPage';
import OfficerDashboardPage from '../dashboards/complaintOfficer/pages/OfficerDashboardPage';
import ZoneHeadDashboardPage from '../dashboards/zoneHead/pages/ZoneHeadDashboardPage';
import DivisionHeadDashboardPage from '../dashboards/divisionHead/pages/DivisionHeadDashboardPage';
import StaffDashboardPage from '../dashboards/staff/pages/StaffDashboardPage';
import PassengerDashboardPage from '../dashboards/passenger/pages/PassengerDashboardPage';

export default function DashboardRoutes({ user, activeTab = 'home' }) {
  if (!user) return null;

  switch (user.role) {
    case ROLES.ADMIN:
      return (
        <RoleRoute user={user} allowedRoles={[ROLES.ADMIN]}>
          <AdminDashboardPage user={user} />
        </RoleRoute>
      );

    case ROLES.COMPLAINT_OFFICER:
      return (
        <RoleRoute user={user} allowedRoles={[ROLES.COMPLAINT_OFFICER, ROLES.ADMIN]}>
          {activeTab === 'home' ? (
            <Home user={user} />
          ) : activeTab === 'complaints' ? (
            <ComplaintsPage user={user} />
          ) : (
            <OfficerDashboardPage user={user} initialTab={activeTab} />
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
          <StaffDashboardPage user={user} />
        </RoleRoute>
      );

    default:
      return (
        <RoleRoute user={user} allowedRoles={Object.values(ROLES)}>
          <PassengerDashboardPage user={user} />
        </RoleRoute>
      );
  }
}
