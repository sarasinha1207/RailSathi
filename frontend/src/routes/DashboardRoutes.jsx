import React, { lazy, Suspense } from 'react';
import { ROLES } from '../utils/roles';
import RoleRoute from './RoleRoute';

const AdminDashboardPage = lazy(() => import('../dashboard/admin/AdminDashboardPage'));
const CmoHome = lazy(() => import('../dashboard/cmo/CmoHome'));
const ComplaintsPage = lazy(() => import('../dashboard/cmo/ComplaintsPage'));
const StaffAvailabilityPage = lazy(() => import('../dashboard/cmo/StaffAvailabilityPage'));
const ZoneDivisionPage = lazy(() => import('../dashboard/cmo/ZoneDivisionPage'));
const ReassignmentPage = lazy(() => import('../dashboard/cmo/ReassignmentPage'));
const StaffDashboardPage = lazy(() => import('../dashboard/staff/StaffDashboardPage'));
const StaffComplaintsPage = lazy(() => import('../dashboard/staff/StaffComplaintsPage'));
const StaffOtherStaffPage = lazy(() => import('../dashboard/staff/StaffOtherStaffPage'));
const StaffTrainJourneyPage = lazy(() => import('../dashboard/staff/StaffTrainJourneyPage'));
const StaffInventoryPage = lazy(() => import('../dashboard/staff/StaffInventoryPage'));
const ZoneHeadDashboardPage = ZoneDivisionPage;
const DivisionHeadDashboardPage = ZoneDivisionPage;
const HelpPage = lazy(() => import('../components/dashboard/HelpPage'));
const SettingsPage = lazy(() => import('../components/dashboard/SettingsPage'));

const ViewLoader = () => (
  <div style={{ padding: '60px 20px', textAlign: 'center', color: '#800020', fontWeight: 800, fontSize: '0.95rem' }}>
    Loading View...
  </div>
);

export default function DashboardRoutes({ user, activeTab = 'home', onNavigate }) {
  if (!user) return null;

  const renderContent = () => {
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
            ) : activeTab === 'reassignment_requests' || activeTab === 'reassignment' ? (
              <ReassignmentPage user={user} />
            ) : activeTab === 'zone_division_complaints' || activeTab === 'zone_division' ? (
              <ZoneDivisionPage user={user} />
            ) : activeTab === 'staff_availability' ? (
              <StaffAvailabilityPage user={user} />
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
  };

  return (
    <Suspense fallback={<ViewLoader />}>
      {renderContent()}
    </Suspense>
  );
}


