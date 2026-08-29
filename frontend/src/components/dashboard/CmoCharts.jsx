import React, { useState } from 'react';
import KPICard from './KPICard';
import AdminCmoStyleOverviewTable from '../../dashboard/admin/AdminCmoStyleOverviewTable';

/* ==========================================
   SECTION A — CMO KPI SECTION (5 KPI CARDS)
   ========================================== */
export function CMOKPISection({ kpis = {} }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))',
      gap: '12px'
    }}>
      {/* 1. Pending Complaints */}
      <KPICard
        title="Pending Complaints"
        value={kpis.pending_complaints || 0}
        subtitle="Waiting for CMO review"
        accentColor="#F57C00"
        textColor="#F57C00"
      />

      {/* 2. Assigned Complaints */}
      <KPICard
        title="Assigned Complaints"
        value={kpis.assigned_complaints || 0}
        subtitle="Assigned to staff"
        accentColor="#2563eb"
        textColor="#2563eb"
      />

      {/* 3. Reassignment Requests */}
      <KPICard
        title="Reassignment Requests"
        value={kpis.reassignment_requests || 0}
        subtitle="Staff requested reassignment"
        accentColor="#800020"
        textColor="#800020"
      />

      {/* 4. Resolved Complaints */}
      <KPICard
        title="Resolved Complaints"
        value={kpis.resolved_complaints || 0}
        subtitle="Resolved grievances"
        accentColor="#388E3C"
        textColor="#388E3C"
      />

      {/* 5. Critical Complaints */}
      <KPICard
        title="Critical Complaints"
        value={kpis.critical_complaints || 0}
        subtitle="Open safety risks"
        accentColor="#D32F2F"
        textColor="#D32F2F"
      />
    </div>
  );
}

/* ==========================================
   SECTION B — ZONE & DIVISION OVERVIEW TABLE
   ========================================== */
export function ComplaintOverviewTable({ overviewData = [] }) {
  return <AdminCmoStyleOverviewTable overviewData={overviewData} />;
}

/* =========================================================================
   SECTION C — SINGLE-COLUMN COMPACT HORIZONTAL BAR CHART (FULL DEPT NAMES)
   ========================================================================= */
export function DepartmentComplaintChart({ data = [], selectedZone = 'all', onZoneChange, zonesList = [] }) {
  const [tooltip, setTooltip] = useState(null);

  if (!data || data.length === 0) {
    return (
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '16px', textAlign: 'center', color: '#666', border: '1px solid #e5e7eb' }}>
        No department complaint data found.
      </div>
    );
  }

  // Maximum value for bar scaling
  const maxRaw = Math.max(...data.map(item => Math.max(item.total_open || 0, item.total_closed || 0)), 10);
  const xMax = Math.ceil(maxRaw * 1.05) || 100;

  const handleMouseEnter = (e, text) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      text,
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  const handleMouseLeave = () => {
    setTooltip(null);
  };

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '16px 20px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
      border: '1px solid #e5e7eb',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      
      {/* Header Row: Title, Subtitle, Zone Dropdown & Legend */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <h3 style={{ margin: 0, color: '#800020', fontSize: '1.05rem', fontWeight: 800 }}>
            Department-wise Overall Complaint Analytics
          </h3>
          <span style={{ fontSize: '0.76rem', color: '#6b7280', fontWeight: 600 }}>
            {selectedZone && selectedZone !== 'all' ? `(Zone: ${selectedZone})` : '(All Zones)'}
          </span>
        </div>

        {/* Integrated Filter Control & Legend */}
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '12px' }}>
          {onZoneChange && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>Zone:</label>
              <select
                value={selectedZone}
                onChange={(e) => onZoneChange(e.target.value)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '5px',
                  border: '1.5px solid #800020',
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#800020',
                  backgroundColor: '#ffffff',
                  cursor: 'pointer'
                }}
              >
                <option value="all">All Zones</option>
                {zonesList.map((z) => (
                  <option key={z.zone_code} value={z.zone_code}>
                    {z.zone_name} ({z.zone_code})
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Color Legend */}
          <div style={{ display: 'flex', gap: '12px', backgroundColor: '#f9fafb', padding: '3px 8px', borderRadius: '5px', border: '1px solid #e5e7eb' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 800, color: '#374151' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: '#800020', display: 'inline-block' }} />
              Open Complaints
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 800, color: '#34a853' }}>
              <span style={{ width: '8px', height: '8px', borderRadius: '2px', backgroundColor: '#34a853', display: 'inline-block' }} />
              Resolved / Closed
            </span>
          </div>
        </div>
      </div>

      {/* SINGLE COLUMN HORIZONTAL BAR CHART WITH SLEEK COMPACT ROWS */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        width: '100%'
      }}>

        {data.map((item) => {
          const openVal = item.total_open || 0;
          const closedVal = item.total_closed || 0;
          const openWidthPct = (openVal / xMax) * 100;
          const closedWidthPct = (closedVal / xMax) * 100;

          return (
            <div
              key={item.department_code}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                width: '100%',
                padding: '3px 0',
                borderBottom: '1px solid #f9fafb'
              }}
            >
              {/* Left Y-Axis Label: FULL DEPARTMENT NAME directly from database */}
              <div style={{
                width: 'clamp(90px, 20vw, 220px)',
                minWidth: 'clamp(90px, 20vw, 220px)',
                textAlign: 'right',
                fontSize: 'clamp(0.68rem, 1.4vw, 0.78rem)',
                fontWeight: 700,
                color: '#1f2937',
                lineHeight: 1.1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }} title={item.department_name}>
                {item.department_name}
              </div>

              {/* Right Horizontal Dual Bar Track Area */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px', borderLeft: '2px solid #374151', paddingLeft: '8px', position: 'relative' }}>
                  
                  {/* Top Bar: Open Complaints (Maroon #800020) */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                    <div
                      onMouseEnter={(e) => handleMouseEnter(e, `${item.department_name} | Open: ${openVal}`)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        height: '16px',
                        width: `${Math.max(openWidthPct, openVal > 0 ? 0.5 : 0)}%`,
                        backgroundColor: '#800020',
                        borderRadius: '0 4px 4px 0',
                        transition: 'width 0.3s ease',
                        cursor: 'pointer',
                        minWidth: openVal > 0 ? '4px' : '0',
                        boxShadow: '0 1px 3px rgba(128,0,32,0.2)'
                      }}
                    />
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: openVal > 0 ? '#800020' : '#9ca3af', lineHeight: 1 }}>
                      {openVal}
                    </span>
                  </div>

                  {/* Bottom Bar: Resolved / Closed Complaints (Green #34a853) */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                    <div
                      onMouseEnter={(e) => handleMouseEnter(e, `${item.department_name} | Resolved: ${closedVal.toLocaleString()}`)}
                      onMouseLeave={handleMouseLeave}
                      style={{
                        height: '16px',
                        width: `${Math.max(closedWidthPct, closedVal > 0 ? 0.5 : 0)}%`,
                        backgroundColor: '#34a853',
                        borderRadius: '0 4px 4px 0',
                        transition: 'width 0.3s ease',
                        cursor: 'pointer',
                        minWidth: closedVal > 0 ? '4px' : '0',
                        boxShadow: '0 1px 3px rgba(52,168,83,0.2)'
                      }}
                    />
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: closedVal > 0 ? '#137333' : '#9ca3af', lineHeight: 1 }}>
                      {closedVal.toLocaleString()}
                    </span>
                  </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* Hover Tooltip */}
      {tooltip && (
        <div style={{
          position: 'fixed',
          left: `${tooltip.x}px`,
          top: `${tooltip.y}px`,
          transform: 'translate(-50%, -100%)',
          backgroundColor: '#1f2937',
          color: '#ffffff',
          padding: '5px 10px',
          borderRadius: '5px',
          fontSize: '0.75rem',
          fontWeight: 700,
          pointerEvents: 'none',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 1000,
          whiteSpace: 'nowrap',
          transition: 'all 0.15s ease'
        }}>
          {tooltip.text}
        </div>
      )}

    </div>
  );
}

// Legacy export fallbacks
export function ZoneComplaintChart({ data = [] }) { return null; }
export function DivisionComplaintChart({ data = [] }) { return null; }
