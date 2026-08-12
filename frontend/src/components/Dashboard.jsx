import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import DashboardRoutes from '../routes/DashboardRoutes';

export default function Dashboard({ user, onLogout }) {
  return (
    <DashboardLayout user={user} onLogout={onLogout}>
      <DashboardRoutes user={user} />
    </DashboardLayout>
  );
}
