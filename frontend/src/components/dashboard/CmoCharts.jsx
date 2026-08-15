import React, { useState } from 'react';
import KPICard from './KPICard';

/* ==========================================
   SECTION A — CMO KPI SECTION (5 KPI CARDS)
   ========================================== */
export function CMOKPISection({ kpis = {} }) {
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

      {/* 5. Critical Complaints */}
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

/* ==========================================
   SECTION B — ZONE & DIVISION OVERVIEW TABLE
   ========================================== */
export function ComplaintOverviewTable({ overviewData = [] }) {
  const [filterZone, setFilterZone] = useState('all');

  if (!overviewData || overviewData.length === 0) {
    return (
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', textAlign: 'center', color: '#666' }}>
        No zone & division overview data available.
      </div>
    );
  }

  // Extract unique zones for filter dropdown
  const uniqueZones = Array.from(
    new Map(overviewData.map(item => [item.zone_code, item.zone_name])).entries()
  ).map(([code, name]) => ({ code, name }));

  // Apply zone filter
  const filteredData = filterZone === 'all'
    ? overviewData
    : overviewData.filter(d => d.zone_code === filterZone);

  // Group by zone_code for rowSpan calculation
  const zoneGroupsMap = new Map();
  filteredData.forEach(row => {
    if (!zoneGroupsMap.has(row.zone_code)) {
      zoneGroupsMap.set(row.zone_code, {
        zone_code: row.zone_code,
        zone_name: row.zone_name,
        divisions: []
      });
    }
    zoneGroupsMap.get(row.zone_code).divisions.push(row);
  });

  const groupedZones = Array.from(zoneGroupsMap.values()).map((z, idx) => ({
    ...z,
    sNo: idx + 1
  }));

  const zoneBgColors = ['#ffffff', '#f9fafb'];

  return (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px 24px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
      {/* Table Header & Controls */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', gap: '12px' }}>
        <div>
          <h4 style={{ margin: 0, color: '#800020', fontSize: '1.1rem', fontWeight: 800 }}>
            Section B — Zone & Division Complaint Overview ({groupedZones.length} Zones)
          </h4>
          
          {/* Priority Color Legend */}
          <div style={{ display: 'flex', gap: '16px', marginTop: '6px', fontSize: '0.78rem', fontWeight: 700 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#ea4335', display: 'inline-block' }} />
              High Priority
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#fbbc04', display: 'inline-block' }} />
              Medium Priority
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ width: '12px', height: '12px', borderRadius: '3px', backgroundColor: '#34a853', display: 'inline-block' }} />
              Low Priority
            </span>
          </div>
        </div>

        {/* Filter Control */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#4b5563' }}>Filter by Zone:</label>
          <select
            value={filterZone}
            onChange={(e) => setFilterZone(e.target.value)}
            style={{ padding: '6px 12px', borderRadius: '6px', border: '1px solid #ccc', fontSize: '0.85rem', fontWeight: 700, backgroundColor: '#fff' }}
          >
            <option value="all">All Zones ({uniqueZones.length})</option>
            {uniqueZones.map(z => (
              <option key={z.code} value={z.code}>{z.name} ({z.code})</option>
            ))}
          </select>
        </div>
      </div>

      {/* Scroll Container with Decreased Column Widths */}
      <div style={{ overflowX: 'auto', maxHeight: '650px', overflowY: 'auto', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
          <thead style={{ position: 'sticky', top: 0, zIndex: 5 }}>
            <tr style={{ backgroundColor: '#4a071a', color: '#ffffff', fontSize: '0.85rem', fontWeight: 800 }}>
              <th style={{ padding: '12px 10px', width: '5%', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.15)' }}>S.No.</th>
              <th style={{ padding: '12px 14px', width: '20%', borderRight: '1px solid rgba(255,255,255,0.15)' }}>Zone Name</th>
              <th style={{ padding: '12px 10px', width: '13%', borderRight: '1px solid rgba(255,255,255,0.15)' }}>Division Name</th>
              <th style={{ padding: '12px 10px', width: '9%', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.15)' }}>Total Received</th>
              <th style={{ padding: '12px 10px', width: '10%', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.15)' }}>Total Open</th>
              <th style={{ padding: '12px 14px', width: '43%', textAlign: 'center' }}>Priority Graph (High | Med | Low)</th>
            </tr>
          </thead>
          <tbody>
            {groupedZones.map((zoneGroup, zoneIdx) => {
              const bg = zoneBgColors[zoneIdx % zoneBgColors.length];
              const totalDivs = zoneGroup.divisions.length;

              return zoneGroup.divisions.map((row, divIdx) => {
                const isFirstRow = divIdx === 0;
                const p = row.priority_distribution || { high: 0, medium: 0, low: 0 };
                const rowTotal = p.high + p.medium + p.low || row.total_received || 1;
                const highWidth = (p.high / rowTotal) * 100;
                const medWidth = (p.medium / rowTotal) * 100;
                const lowWidth = (p.low / rowTotal) * 100;
                const borderBottomStyle = divIdx === totalDivs - 1 ? '2px solid #d1d5db' : '1px solid #eeeeee';

                return (
                  <tr key={`${row.zone_code}_${row.division_code}`} style={{ backgroundColor: bg, borderBottom: borderBottomStyle }}>
                    
                    {/* S.No. Column */}
                    {isFirstRow && (
                      <td
                        rowSpan={totalDivs}
                        style={{
                          padding: '12px 8px',
                          fontWeight: 800,
                          color: '#800020',
                          textAlign: 'center',
                          verticalAlign: 'top',
                          borderRight: '1px solid #e5e7eb',
                          backgroundColor: bg,
                          fontSize: '0.9rem'
                        }}
                      >
                        {zoneGroup.sNo}
                      </td>
                    )}

                    {/* Zone Name Column */}
                    {isFirstRow && (
                      <td
                        rowSpan={totalDivs}
                        style={{
                          padding: '12px 14px',
                          fontWeight: 800,
                          color: '#800020',
                          verticalAlign: 'top',
                          borderRight: '1px solid #e5e7eb',
                          backgroundColor: bg,
                          lineHeight: 1.3
                        }}
                      >
                        {zoneGroup.zone_name}
                        <span style={{ display: 'block', fontSize: '0.73rem', color: '#6b7280', fontWeight: 600 }}>
                          ({zoneGroup.zone_code})
                        </span>
                      </td>
                    )}

                    {/* Division Name Column */}
                    <td style={{ padding: '10px 10px', fontWeight: 700, color: '#1f2937', borderRight: '1px solid #f0f0f0' }}>
                      {row.division_name} <span style={{ fontSize: '0.72rem', color: '#6b7280', fontWeight: 600 }}>({row.division_code})</span>
                    </td>

                    {/* Total Complaints Received Column */}
                    <td style={{ padding: '10px 8px', fontWeight: 800, color: '#111827', textAlign: 'center', borderRight: '1px solid #f0f0f0' }}>
                      {row.total_received}
                    </td>

                    {/* Total Open Complaints Column */}
                    <td style={{ padding: '10px 8px', fontWeight: 800, color: row.total_open > 0 ? '#c5221f' : '#137333', textAlign: 'center', borderRight: '1px solid #f0f0f0' }}>
                      {row.total_open || 0}
                    </td>

                    {/* Priority Distribution Column */}
                    <td style={{ padding: '10px 16px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{
                          height: '18px',
                          width: '100%',
                          maxWidth: '340px',
                          backgroundColor: '#e5e7eb',
                          borderRadius: '6px',
                          display: 'flex',
                          overflow: 'hidden',
                          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
                        }}>
                          <div style={{ width: `${highWidth}%`, backgroundColor: '#ea4335', transition: 'width 0.3s' }} title={`High: ${p.high} (${highWidth.toFixed(0)}%)`} />
                          <div style={{ width: `${medWidth}%`, backgroundColor: '#fbbc04', transition: 'width 0.3s' }} title={`Medium: ${p.medium} (${medWidth.toFixed(0)}%)`} />
                          <div style={{ width: `${lowWidth}%`, backgroundColor: '#34a853', transition: 'width 0.3s' }} title={`Low: ${p.low} (${lowWidth.toFixed(0)}%)`} />
                        </div>
                      </div>
                    </td>

                  </tr>
                );
              });
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
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
                width: '240px',
                minWidth: '240px',
                textAlign: 'right',
                fontSize: '0.78rem',
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
