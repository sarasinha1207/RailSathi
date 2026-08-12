import React from 'react';
import KPICard from '../../../components/dashboard/KPICard';

export default function PassengerDashboardPage({ user }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        <h2 style={{ margin: 0, color: '#800020', fontWeight: 800 }}>Passenger Grievance Desk</h2>
        <p style={{ margin: '4px 0 0 0', color: '#666' }}>Track submitted train and station complaints in real-time.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <KPICard title="My Complaints" value="1" subtitle="Active Grievances" accentColor="#1a73e8" />
        <KPICard title="Resolved" value="3" subtitle="Past Grievances" accentColor="#137333" />
      </div>
    </div>
  );
}
