import React from 'react';
import KPICard from '../../../components/dashboard/KPICard';

export default function DivisionHeadDashboardPage({ user }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <h2 style={{ margin: 0, color: '#800020', fontWeight: 800 }}>Division Head Supervision Desk</h2>
        <p style={{ margin: '4px 0 0 0', color: '#666' }}>Divisional grievance tracking, station/train assignments, and staff monitoring.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <KPICard title="Divisional Complaints" value="840" subtitle="Delhi Division Active Tasks" accentColor="#800020" />
        <KPICard title="Active On-Duty Staff" value="112" subtitle="Field Technicians & Cleaners" accentColor="#137333" />
      </div>
    </div>
  );
}
