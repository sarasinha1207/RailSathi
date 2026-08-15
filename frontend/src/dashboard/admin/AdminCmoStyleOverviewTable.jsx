import React, { useState, useMemo } from 'react';

export default function AdminCmoStyleOverviewTable({ overviewData = [] }) {
  const [filterZone, setFilterZone] = useState('all');
  const [filterDiv, setFilterDiv] = useState('all');

  const safeData = overviewData || [];

  // Extract all unique zones from database overviewData + complete 18 Zone List
  const allZonesMap = new Map();
  const default18Zones = [
    { code: 'NR', name: 'Northern Railway' },
    { code: 'WR', name: 'Western Railway' },
    { code: 'SR', name: 'Southern Railway' },
    { code: 'ER', name: 'Eastern Railway' },
    { code: 'CR', name: 'Central Railway' },
    { code: 'ECR', name: 'East Central Railway' },
    { code: 'SCR', name: 'South Central Railway' },
    { code: 'NWR', name: 'North Western Railway' },
    { code: 'NCR', name: 'North Central Railway' },
    { code: 'NER', name: 'North Eastern Railway' },
    { code: 'NFR', name: 'Northeast Frontier Railway' },
    { code: 'ECoR', name: 'East Coast Railway' },
    { code: 'SWR', name: 'South Western Railway' },
    { code: 'SECR', name: 'South East Central Railway' },
    { code: 'SER', name: 'South Eastern Railway' },
    { code: 'WCR', name: 'West Central Railway' },
    { code: 'Metro', name: 'Metro Railway Kolkata' },
    { code: 'KR', name: 'Konkan Railway' }
  ];
  default18Zones.forEach(z => allZonesMap.set(z.code, z.name));
  safeData.forEach(item => {
    if (item && item.zone_code && item.zone_name) {
      allZonesMap.set(item.zone_code, item.zone_name);
    }
  });

  const uniqueZones = Array.from(allZonesMap.entries()).map(([code, name]) => ({ code, name }));

  // Extract all unique divisions from database overviewData
  const uniqueDivisions = useMemo(() => {
    const map = new Map();
    safeData.forEach(row => {
      if (row && row.division_code && row.division_name) {
        map.set(row.division_code, row.division_name);
      }
    });
    return Array.from(map.entries()).map(([code, name]) => ({ code, name }));
  }, [safeData]);

  // Filter dataset by selected Zone and Division
  const filteredData = useMemo(() => {
    return safeData.filter(d => {
      if (!d) return false;
      if (filterZone !== 'all' && d.zone_code !== filterZone) return false;
      if (filterDiv !== 'all' && d.division_code !== filterDiv) return false;
      return true;
    });
  }, [safeData, filterZone, filterDiv]);

  // Group by zone_code for rowSpan calculation
  const zoneGroupsMap = new Map();
  filteredData.forEach(row => {
    if (row && row.zone_code) {
      if (!zoneGroupsMap.has(row.zone_code)) {
        zoneGroupsMap.set(row.zone_code, {
          zone_code: row.zone_code,
          zone_name: row.zone_name || row.zone_code,
          divisions: []
        });
      }
      zoneGroupsMap.get(row.zone_code).divisions.push(row);
    }
  });

  const groupedZones = Array.from(zoneGroupsMap.values()).map((z, idx) => ({
    ...z,
    sNo: idx + 1
  }));

  const zoneBgColors = ['#ffffff', '#f9fafb'];

  const isFilterActive = filterZone !== 'all' || filterDiv !== 'all';
  const handleResetFilter = () => {
    setFilterZone('all');
    setFilterDiv('all');
  };

  return (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px 24px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb' }}>
      {/* Table Header & Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '18px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <div>
            <h4 style={{ margin: 0, color: '#800020', fontSize: '1.15rem', fontWeight: 800 }}>
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
        </div>

        {/* EMBEDDED ZONE & DIVISION FILTER BAR INSIDE TABLE CARD */}
        <div style={{
          backgroundColor: '#f9fafb',
          borderRadius: '10px',
          padding: '12px 16px',
          border: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          {/* All Railway Zones Dropdown */}
          <select
            value={filterZone}
            onChange={(e) => setFilterZone(e.target.value)}
            style={{ flex: 1, minWidth: '180px', padding: '9px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.86rem', fontWeight: 600, color: '#374151', backgroundColor: '#ffffff', boxSizing: 'border-box' }}
          >
            <option value="all">All Railway Zones ({uniqueZones.length})</option>
            {uniqueZones.map(z => (
              <option key={z.code} value={z.code}>{z.name} ({z.code})</option>
            ))}
          </select>

          {/* All Divisions Dropdown */}
          <select
            value={filterDiv}
            onChange={(e) => setFilterDiv(e.target.value)}
            style={{ flex: 1, minWidth: '180px', padding: '9px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.86rem', fontWeight: 600, color: '#374151', backgroundColor: '#ffffff', boxSizing: 'border-box' }}
          >
            <option value="all">All Divisions ({uniqueDivisions.length})</option>
            {uniqueDivisions.map(d => (
              <option key={d.code} value={d.code}>{d.name} ({d.code})</option>
            ))}
          </select>

          {isFilterActive && (
            <button
              type="button"
              onClick={handleResetFilter}
              style={{
                padding: '8px 16px',
                backgroundColor: '#ffffff',
                color: '#c5221f',
                border: '1px solid #c5221f',
                borderRadius: '8px',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              Clear Filters
            </button>
          )}
        </div>
      </div>

      {/* INCREASED HEIGHT SCROLL CONTAINER (800PX) */}
      <div style={{ overflowX: 'auto', maxHeight: '800px', overflowY: 'auto', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
          <thead style={{ position: 'sticky', top: 0, zIndex: 5 }}>
            <tr style={{ backgroundColor: '#4a071a', color: '#ffffff', fontSize: '0.85rem', fontWeight: 800 }}>
              <th style={{ padding: '12px 10px', width: '5%', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.15)' }}>S.No.</th>
              <th style={{ padding: '12px 14px', width: '20%', borderRight: '1px solid rgba(255,255,255,0.15)' }}>Zone Name</th>
              <th style={{ padding: '12px 10px', width: '13%', borderRight: '1px solid rgba(255,255,255,0.15)' }}>Division Name</th>
              <th style={{ padding: '12px 10px', width: '9%', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.15)' }}>Total Received</th>
              <th style={{ padding: '12px 10px', width: '10%', textAlign: 'center', borderRight: '1px solid rgba(255,255,255,0.15)' }}>Total Open Complaints</th>
              <th style={{ padding: '12px 14px', width: '43%', textAlign: 'center' }}>Priority Graph</th>
            </tr>
          </thead>
          <tbody>
            {groupedZones.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ padding: '24px', textAlign: 'center', color: '#6b7280' }}>
                  No zone & division records found matching active filter selections.
                </td>
              </tr>
            ) : (
              groupedZones.map((zoneGroup, zoneIdx) => {
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
                        {row.total_received ?? row.total_complaints ?? 0}
                      </td>

                      {/* Total Open Complaints Column */}
                      <td style={{ padding: '10px 8px', fontWeight: 800, color: (row.total_open ?? row.pending_complaints ?? 0) > 0 ? '#c5221f' : '#137333', textAlign: 'center', borderRight: '1px solid #f0f0f0' }}>
                        {row.total_open ?? row.pending_complaints ?? 0}
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
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
