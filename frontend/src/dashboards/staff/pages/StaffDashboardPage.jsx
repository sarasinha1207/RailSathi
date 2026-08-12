import React from 'react';
import KPICard from '../../../components/dashboard/KPICard';

export default function StaffDashboardPage({ user }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <h2 style={{ margin: 0, color: '#800020', fontWeight: 800 }}>Field Staff Workspace</h2>
        <p style={{ margin: '4px 0 0 0', color: '#666' }}>Manage assigned grievances, update work progress, and request reassignments.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <KPICard title="Assigned Tasks" value="2" subtitle="Active Tasks (Max 5)" accentColor="#1a73e8" />
        <KPICard title="Resolved Complaints" value="48" subtitle="Completed Lifetime Tasks" accentColor="#137333" />
      </div>
    </div>
  );
}
