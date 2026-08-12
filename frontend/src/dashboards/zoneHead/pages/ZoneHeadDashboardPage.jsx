import React from 'react';
import KPICard from '../../../components/dashboard/KPICard';

export default function ZoneHeadDashboardPage({ user }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <h2 style={{ margin: 0, color: '#800020', fontWeight: 800 }}>Zone Head Supervision Desk</h2>
        <p style={{ margin: '4px 0 0 0', color: '#666' }}>Zonal grievance oversight, division performance, and escalation tracking.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <KPICard title="Zonal Complaints" value="3,420" subtitle="Current Month Total" accentColor="#800020" />
        <KPICard title="Divisions Monitored" value="5" subtitle="Assigned Operating Divisions" accentColor="#1a73e8" />
        <KPICard title="On-Duty Staff" value="480" subtitle="Active Zonal Personnel" accentColor="#137333" />
      </div>
    </div>
  );
}
