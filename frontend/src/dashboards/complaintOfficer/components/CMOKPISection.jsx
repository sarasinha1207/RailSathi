import React from 'react';
import KPICard from '../../../components/dashboard/KPICard';

export default function CMOKPISection({ kpis = {} }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
      gap: '16px'
    }}>
      {/* 1. Pending Complaints */}
      <KPICard
        title="Pending Complaints"
        value={kpis.pending_complaints || 0}
        subtitle="Complaints waiting for CMO review"
        accentColor="#ea4335"
        textColor="#ea4335"
      />

      {/* 2. Assigned Complaints */}
      <KPICard
        title="Assigned Complaints"
        value={kpis.assigned_complaints || 0}
        subtitle="Currently assigned to staff"
        accentColor="#1a73e8"
        textColor="#1a73e8"
      />

      {/* 3. Reassignment Requests */}
      <KPICard
        title="Reassignment Requests"
        value={kpis.reassignment_requests || 0}
        subtitle="Staff requested reassignment"
        accentColor="#a142f4"
        textColor="#8430ce"
      />

      {/* 4. Resolved Complaints */}
      <KPICard
        title="Resolved Complaints"
        value={kpis.resolved_complaints || 0}
        subtitle="Successfully resolved grievances"
        accentColor="#34a853"
        textColor="#137333"
      />

      {/* 5. Critical Complaints (Open/In-Progress only) */}
      <KPICard
        title="Critical Complaints"
        value={kpis.critical_complaints || 0}
        subtitle="Open / In-Progress safety risks"
        accentColor="#c5221f"
        textColor="#c5221f"
      />
    </div>
  );
}
