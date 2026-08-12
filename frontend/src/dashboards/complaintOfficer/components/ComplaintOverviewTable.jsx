import React, { useState, useMemo } from 'react';

export default function ComplaintOverviewTable({ overviewData = [] }) {
  const [filterZone, setFilterZone] = useState('all');

  // Extract unique zones for filter dropdown
  const uniqueZones = useMemo(() => {
    const map = new Map();
    overviewData.forEach(r => {
      if (!map.has(r.zone_code)) {
        map.set(r.zone_code, r.zone_name);
      }
    });
    return Array.from(map.entries()).map(([code, name]) => ({ code, name }));
  }, [overviewData]);

  // Group data by Zone
  const groupedZones = useMemo(() => {
    const filtered = filterZone === 'all'
      ? overviewData
      : overviewData.filter(row => row.zone_code === filterZone);

    const map = new Map();
    filtered.forEach(row => {
      if (!map.has(row.zone_code)) {
        map.set(row.zone_code, {
          zone_code: row.zone_code,
          zone_name: row.zone_name,
          divisions: []
        });
      }
      map.get(row.zone_code).divisions.push(row);
    });

    return Array.from(map.values()).map((zGroup, index) => ({
      sNo: index + 1,
      ...zGroup
    }));
  }, [overviewData, filterZone]);

  if (!overviewData || overviewData.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '30px', color: '#777', backgroundColor: '#fff', borderRadius: '10px', maxWidth: '1000px', margin: '0 auto' }}>
        No division complaint overview data available.
      </div>
    );
  }

  // Zone alternate background colors
  const zoneBgColors = ['#ffffff', '#fcf8f9'];

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '20px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      maxWidth: '1020px',
      margin: '0 auto',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      {/* Header Bar with Zone Filter & Priority Color Legend */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h4 style={{ margin: 0, color: '#800020', fontSize: '1.1rem', fontWeight: 800 }}>
            Zone & Division Complaint Breakdown ({groupedZones.length} Zones)
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

      {/* Height-Increased Scroll Container (maxHeight: 650px) */}
      <div style={{ overflowX: 'auto', maxHeight: '650px', overflowY: 'auto', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
          <thead style={{ position: 'sticky', top: 0, zIndex: 5 }}>
            <tr style={{ backgroundColor: '#4a071a', color: '#ffffff', fontSize: '0.85rem', fontWeight: 800 }}>
              <th style={{ padding: '10px 12px', width: '7%', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.15)' }}>S.No.</th>
              <th style={{ padding: '10px 12px', width: '22%', borderRight: '1px solid rgba(255,255,255,0.15)' }}>Zone Name</th>
              <th style={{ padding: '10px 12px', width: '22%', borderRight: '1px solid rgba(255,255,255,0.15)' }}>Division Name</th>
              <th style={{ padding: '10px 12px', width: '14%', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.15)' }}>Total Received</th>
              <th style={{ padding: '10px 12px', width: '16%', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.15)' }}>Total Open Complaints</th>
              <th style={{ padding: '10px 12px', width: '19%', textAlign: 'center' }}>Priority Graph</th>
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
                    
                    {/* S.No. Column - Rendered ONLY ONCE per Zone with rowSpan */}
                    {isFirstRow && (
                      <td
                        rowSpan={totalDivs}
                        style={{
                          padding: '10px',
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

                    {/* Zone Name Column - Rendered ONLY ONCE per Zone with rowSpan */}
                    {isFirstRow && (
                      <td
                        rowSpan={totalDivs}
                        style={{
                          padding: '10px 12px',
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
                    <td style={{ padding: '9px 12px', fontWeight: 700, color: '#1f2937', borderRight: '1px solid #f0f0f0' }}>
                      {row.division_name} <span style={{ fontSize: '0.73rem', color: '#6b7280', fontWeight: 600 }}>({row.division_code})</span>
                    </td>

                    {/* Total Complaints Received Column */}
                    <td style={{ padding: '9px 12px', fontWeight: 800, color: '#111827', textAlign: 'center', borderRight: '1px solid #f0f0f0' }}>
                      {row.total_received}
                    </td>

                    {/* NEW Column: Total Open Complaints */}
                    <td style={{ padding: '9px 12px', fontWeight: 800, color: row.total_open > 0 ? '#c5221f' : '#137333', textAlign: 'center', borderRight: '1px solid #f0f0f0' }}>
                      {row.total_open || 0}
                    </td>

                    {/* Priority Distribution Column — Horizontal Grouped Stacked Bar Graph (WITHOUT H: M: L: text labels) */}
                    <td style={{ padding: '9px 12px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                        <div style={{
                          height: '16px',
                          width: '100%',
                          maxWidth: '140px',
                          backgroundColor: '#e5e7eb',
                          borderRadius: '6px',
                          display: 'flex',
                          overflow: 'hidden'
                        }}>
                          <div style={{ width: `${highWidth}%`, backgroundColor: '#ea4335' }} title={`High: ${p.high}`} />
                          <div style={{ width: `${medWidth}%`, backgroundColor: '#fbbc04' }} title={`Medium: ${p.medium}`} />
                          <div style={{ width: `${lowWidth}%`, backgroundColor: '#34a853' }} title={`Low: ${p.low}`} />
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
