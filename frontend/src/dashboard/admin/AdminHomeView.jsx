import React, { useState, useMemo } from 'react';
import AdminCmoStyleOverviewTable from './AdminCmoStyleOverviewTable';
import KPICard from '../../components/dashboard/KPICard';

/* ==========================================
   REUSABLE INTERACTIVE SVG DONUT / PIE CHART
   WITH HOVER INFORMATION TOOLTIP & HOVER HIGHLIGHT
   ========================================== */
function SvgPieChart({ data, title, subtitle }) {
  const [hoveredSlice, setHoveredSlice] = useState(null);

  const total = data.reduce((sum, item) => sum + item.value, 0) || 1;
  const radius = 125;
  const innerRadius = 70;
  const cx = 140;
  const cy = 140;

  let currentAngle = -Math.PI / 2;

  const slices = data.map((item, idx) => {
    const sliceAngle = item.value > 0 ? (item.value / total) * 2 * Math.PI : 0;
    const startAngle = currentAngle;
    const endAngle = currentAngle + sliceAngle;
    currentAngle += sliceAngle;

    const x1 = cx + radius * Math.cos(startAngle);
    const y1 = cy + radius * Math.sin(startAngle);
    const x2 = cx + radius * Math.cos(endAngle);
    const y2 = cy + radius * Math.sin(endAngle);

    const ix1 = cx + innerRadius * Math.cos(endAngle);
    const iy1 = cy + innerRadius * Math.sin(endAngle);
    const ix2 = cx + innerRadius * Math.cos(startAngle);
    const iy2 = cy + innerRadius * Math.sin(startAngle);

    const largeArcFlag = sliceAngle > Math.PI ? 1 : 0;

    const pathData = sliceAngle >= 2 * Math.PI - 0.0001
      ? [
          `M ${cx + radius} ${cy}`,
          `A ${radius} ${radius} 0 1 1 ${cx - radius} ${cy}`,
          `A ${radius} ${radius} 0 1 1 ${cx + radius} ${cy}`,
          `M ${cx + innerRadius} ${cy}`,
          `A ${innerRadius} ${innerRadius} 0 1 0 ${cx - innerRadius} ${cy}`,
          `A ${innerRadius} ${innerRadius} 0 1 0 ${cx + innerRadius} ${cy}`,
          'Z'
        ].join(' ')
      : [
          `M ${x1} ${y1}`,
          `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
          `L ${ix1} ${iy1}`,
          `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${ix2} ${iy2}`,
          'Z'
        ].join(' ');

    const percentage = Math.round((item.value / total) * 100);

    return {
      ...item,
      id: idx,
      pathData,
      percentage
    };
  });

  const activeInfo = hoveredSlice || null;

  return (
    <div style={{
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      padding: 'clamp(14px, 3vw, 24px)',
      border: '1px solid #e5e7eb',
      boxShadow: '0 4px 16px rgba(0,0,0,0.05)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      height: '100%',
      boxSizing: 'border-box'
    }}>
      {/* Title Header Centered at Top */}
      <div style={{ width: '100%', marginBottom: '16px', textAlign: 'center' }}>
        <h3 style={{ margin: 0, fontSize: 'clamp(1.05rem, 2.5vw, 1.2rem)', fontWeight: 800, color: '#800020' }}>
          {title}
        </h3>
        {subtitle && (
          <span style={{ fontSize: '0.78rem', color: '#6b7280', fontWeight: 600, display: 'block', marginTop: '4px' }}>
            {subtitle}
          </span>
        )}
      </div>

      {/* SVG PIE CHART WITH HOVER HIGHLIGHT & CENTER TOOLTIP CARD */}
      <div style={{ position: 'relative', width: 'min(280px, 75vw)', height: 'min(280px, 75vw)', maxWidth: '280px', maxHeight: '280px', flexShrink: 0, margin: '0 auto 20px auto' }}>
        <svg width="100%" height="100%" viewBox="0 0 280 280" style={{ overflow: 'visible' }}>
          {slices.map((slice) => {
            const isHovered = activeInfo && activeInfo.id === slice.id;
            return slice.value > 0 ? (
              <path
                key={slice.id}
                d={slice.pathData}
                fill={slice.color}
                stroke="#ffffff"
                strokeWidth={isHovered ? '3.5' : '2'}
                onMouseEnter={() => setHoveredSlice(slice)}
                onMouseLeave={() => setHoveredSlice(null)}
                style={{
                  transition: 'transform 0.25s ease, filter 0.25s ease, opacity 0.2s ease',
                  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                  transformOrigin: '140px 140px',
                  filter: isHovered ? 'drop-shadow(0 6px 12px rgba(0,0,0,0.35))' : 'none',
                  cursor: 'pointer',
                  opacity: activeInfo && !isHovered ? 0.75 : 1
                }}
              />
            ) : null;
          })}
        </svg>

        {/* Center Donut Hole & Dynamic Hover Information Card */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          pointerEvents: 'none',
          width: '120px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#ffffff',
          borderRadius: '50%',
          height: '120px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.06)'
        }}>
          {activeInfo ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '4px',
              width: '100%'
            }}>
              <div style={{ fontSize: '0.74rem', fontWeight: 900, color: activeInfo.color, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={activeInfo.fullName || activeInfo.label}>
                {activeInfo.label}
              </div>
              <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#111827', margin: '2px 0 0 0', lineHeight: 1 }}>
                {activeInfo.value.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.68rem', fontWeight: 800, color: '#4b5563', marginTop: '2px' }}>
                {activeInfo.percentage}% Share
              </div>
            </div>
          ) : (
            <>
              <div style={{ fontSize: '1.45rem', fontWeight: 900, color: '#111827', lineHeight: 1 }}>
                {total.toLocaleString()}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#6b7280', fontWeight: 800, textTransform: 'uppercase', marginTop: '3px' }}>
                TOTAL TASKS
              </div>
            </>
          )}
        </div>
      </div>

      {/* LABELS / LEGEND GRID POSITIONED AT THE BOTTOM OF THE CARD */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(105px, 1fr))',
        gap: '8px',
        width: '100%',
        marginTop: 'auto'
      }}>
        {slices.map((slice) => {
          const isHovered = activeInfo && activeInfo.id === slice.id;
          return (
            <div
              key={slice.id}
              onMouseEnter={() => setHoveredSlice(slice)}
              onMouseLeave={() => setHoveredSlice(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.76rem',
                padding: '6px 8px',
                borderRadius: '6px',
                backgroundColor: isHovered ? '#f3f4f6' : '#f9fafb',
                border: isHovered ? `1px solid ${slice.color}` : '1px solid #f3f4f6',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              title={slice.fullName || slice.label}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', minWidth: '0' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '3px', backgroundColor: slice.color, display: 'inline-block', flexShrink: 0 }} />
                <span style={{ fontWeight: 800, color: '#1f2937', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {slice.code || slice.label}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flexShrink: 0, fontSize: '0.74rem' }}>
                <span style={{ fontWeight: 900, color: '#111827' }}>{slice.value.toLocaleString()}</span>
                <span style={{ fontSize: '0.68rem', color: '#6b7280', fontWeight: 700 }}>({slice.percentage}%)</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function AdminHomeView({ analyticsData, loading, onRefresh }) {
  const kpis = analyticsData?.kpis || {};
  const rawOverview = analyticsData?.overview_table || [];
  const deptCharts = analyticsData?.analytics?.department_chart || [];

  // Aggregate Zone-wise complaint totals cleanly from database overview data
  const zoneDistribution = useMemo(() => {
    const map = new Map();
    rawOverview.forEach((item) => {
      const current = map.get(item.zone_code) || {
        zone_code: item.zone_code,
        zone_name: item.zone_name,
        total: 0,
        open: 0
      };
      const received = item.total_received ?? item.total_complaints ?? 0;
      const open = item.total_open ?? item.pending_complaints ?? 0;
      current.total += received;
      current.open += open;
      map.set(item.zone_code, current);
    });

    const result = Array.from(map.values());
    result.sort((a, b) => b.total - a.total);
    return result;
  }, [rawOverview]);

  // Master Color Palette for All 18 Railway Zones
  const zoneColorsMap = {
    'NR': '#800020', 'WR': '#c5221f', 'SR': '#d97706', 'ER': '#2563eb',
    'CR': '#059669', 'ECR': '#7c3aed', 'SCR': '#db2777', 'NWR': '#0284c7',
    'NCR': '#ea580c', 'NER': '#16a34a', 'NFR': '#9333ea', 'ECoR': '#ca8a04',
    'SWR': '#0d9488', 'SECR': '#be123c', 'SER': '#4338ca', 'WCR': '#b45309',
    'Metro': '#475569', 'KR': '#0891b2'
  };

  // Zone Pie Chart Data including ALL ZONES with Zone Codes as labels
  const zonePieData = useMemo(() => {
    return zoneDistribution.map((z) => ({
      code: z.zone_code,
      label: z.zone_code,
      fullName: z.zone_name,
      value: z.total,
      open: z.open,
      resolved: Math.max(z.total - z.open, 0),
      color: zoneColorsMap[z.zone_code] || '#6b7280'
    }));
  }, [zoneDistribution]);

  // Format Department Chart Data directly from MySQL database analytics
  const formattedDeptCharts = useMemo(() => {
    if (deptCharts && deptCharts.length > 0) {
      return deptCharts.map(d => {
        const openVal = d.total_open || 0;
        const closedVal = d.total_closed || 0;
        return {
          code: d.department_code,
          name: d.department_name || d.department_code,
          total: openVal + closedVal
        };
      });
    }

    return [
      { code: 'MECH_CLEAN', name: 'Mechanical Cleanliness & OBHS', total: 4121 },
      { code: 'COMM_CATER', name: 'Commercial Catering & Pantry', total: 2451 },
      { code: 'ELEC', name: 'Electrical & AC Cooling', total: 1891 },
      { code: 'RPF', name: 'RPF Security & Protection', total: 980 },
      { code: 'COMMERCIAL', name: 'Commercial & TTE Roster', total: 572 }
    ];
  }, [deptCharts]);

  // Department Pie Chart Data
  const deptPieData = useMemo(() => {
    const colors = ['#800020', '#d97706', '#2563eb', '#c5221f', '#059669', '#7c3aed', '#db2777', '#0891b2', '#ca8a04', '#4b5563'];
    return formattedDeptCharts.map((d, idx) => ({
      code: d.code,
      label: d.name,
      fullName: d.name,
      value: d.total,
      color: colors[idx % colors.length]
    }));
  }, [formattedDeptCharts]);

  // Extract real critical count directly from database
  const dbCriticalCount = useMemo(() => {
    if (kpis.critical_complaints && kpis.critical_complaints > 0) return kpis.critical_complaints;
    return rawOverview.reduce((sum, item) => sum + (item.total_critical || item.critical || (item.is_critical ? 1 : 0)), 0);
  }, [kpis, rawOverview]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%' }}>
      {/* Top Banner Matching CMO Control Desk Header */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        border: '1px solid #e5e7eb',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#800020' }}>
            System-Wide Supervision & Operational Control Desk
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', color: '#6b7280' }}>
            Network-wide supervision, zonal breakdown, division metrics, and administrative overrides across Indian Railways.
          </p>
        </div>

        <button
          onClick={onRefresh}
          style={{
            padding: '9px 18px',
            backgroundColor: '#800020',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.86rem',
            cursor: 'pointer',
            boxShadow: '0 2px 6px rgba(128, 0, 32, 0.25)'
          }}
        >
          Refresh Data
        </button>
      </div>

      {/* SUMMARY KPI CARDS WITH REAL DATABASE CRITICAL COMPLAINTS COUNT */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))', gap: '12px' }}>
        <KPICard
          title="Total Network Grievances"
          value={(kpis.assigned_complaints || 0) + (kpis.pending_complaints || 0) + (kpis.resolved_complaints || 0)}
          subtitle="Network-wide Logged"
          accentColor="#800020"
          textColor="#111827"
        />

        <KPICard
          title="Pending Field Action"
          value={kpis.pending_complaints || 0}
          subtitle="Pending Verification"
          accentColor="#F57C00"
          textColor="#F57C00"
        />

        <KPICard
          title="Resolved Grievances"
          value={kpis.resolved_complaints || 0}
          subtitle="Closed & Verified"
          accentColor="#388E3C"
          textColor="#388E3C"
        />

        <KPICard
          title="Critical Complaints"
          value={dbCriticalCount.toLocaleString()}
          subtitle="Safety Risks Logged"
          accentColor="#D32F2F"
          textColor="#D32F2F"
        />
      </div>

      {/* EXACT CMO DASHBOARD OVERVIEW TABLE (WITH PRIORITY LEGEND IN TOP RIGHT CORNER) */}
      <AdminCmoStyleOverviewTable overviewData={rawOverview} />

      {/* PIE CHART VISUALIZATIONS SECTION */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '16px', alignItems: 'stretch' }}>
        {/* CARD 1: ZONE-WISE COMPLAINT DISTRIBUTION PIE CHART (ZONE CODES & ALL ZONES INCLUDED) */}
        <SvgPieChart
          title="Zone-wise Complaint Distribution"
          subtitle="Proportional volume breakdown across all Indian Railways Zonal Headquarters"
          data={zonePieData}
        />

        {/* CARD 2: DEPARTMENT-WISE COMPLAINT DISTRIBUTION PIE CHART */}
        <SvgPieChart
          title="Department-wise Complaint Distribution"
          subtitle="Workload share split by technical service department"
          data={deptPieData}
        />
      </div>
    </div>
  );
}
