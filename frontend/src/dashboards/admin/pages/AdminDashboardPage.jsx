import React from 'react';
import KPICard from '../../../components/dashboard/KPICard';

export default function AdminDashboardPage({ user }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <h2 style={{ margin: 0, color: '#800020', fontWeight: 800 }}>Admin Supervision Dashboard</h2>
        <p style={{ margin: '4px 0 0 0', color: '#666' }}>System-wide monitoring, user management, and zone analytics.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <KPICard title="Total Zones" value="18" subtitle="Indian Railways Zones" accentColor="#800020" />
        <KPICard title="Total Divisions" value="71" subtitle="Active Operating Divisions" accentColor="#1a73e8" />
        <KPICard title="Registered Staff" value="1,240" subtitle="Field & Control Room Personnel" accentColor="#137333" />
        <KPICard title="Active Escalations" value="14" subtitle="Overdue Grievance Escalations" accentColor="#ea4335" />
      </div>
    </div>
  );
}
