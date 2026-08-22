import React, { useState, useEffect, useMemo } from 'react';

const IconMapHeader = () => (
  <svg style={{ width: '24px', height: '24px', color: '#ffb300' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

export default function ZoneDivisionPage({ user }) {
  // Master Zones Data with static fallback divisions map
  const defaultZoneDivisions = {
    'NR': [
      { division_code: 'DLI', division_name: 'Delhi Division (DLI)' },
      { division_code: 'UMB', division_name: 'Ambala Division (UMB)' },
      { division_code: 'FZR', division_name: 'Firozpur Division (FZR)' },
      { division_code: 'LKO', division_name: 'Lucknow Division (LKO NR)' },
      { division_code: 'MB', division_name: 'Moradabad Division (MB)' }
    ],
    'NCR': [
      { division_code: 'PRYJ', division_name: 'Prayagraj Division (PRYJ)' },
      { division_code: 'AGC', division_name: 'Agra Division (AGC)' },
      { division_code: 'JHS', division_name: 'Jhansi Division (JHS)' }
    ],
    'NER': [
      { division_code: 'IZN', division_name: 'Izzatnagar Division (IZN)' },
      { division_code: 'LJN', division_name: 'Lucknow Division (LJN NER)' },
      { division_code: 'BSB', division_name: 'Varanasi Division (BSB)' }
    ],
    'CR': [
      { division_code: 'BB', division_name: 'Mumbai CSMT Division (BB)' },
      { division_code: 'BSL', division_name: 'Bhusaval Division (BSL)' },
      { division_code: 'NGP', division_name: 'Nagpur Division (NGP CR)' },
      { division_code: 'PUNE', division_name: 'Pune Division (PUNE)' },
      { division_code: 'SUR', division_name: 'Solapur Division (SUR)' }
    ],
    'WR': [
      { division_code: 'MMCT', division_name: 'Mumbai Central Division (MMCT)' },
      { division_code: 'BRC', division_name: 'Vadodara Division (BRC)' },
      { division_code: 'ADI', division_name: 'Ahmedabad Division (ADI)' },
      { division_code: 'RTM', division_name: 'Ratlam Division (RTM)' },
      { division_code: 'RJT', division_name: 'Rajkot Division (RJT)' },
      { division_code: 'BVP', division_name: 'Bhavnagar Division (BVP)' }
    ],
    'ECR': [
      { division_code: 'DHN', division_name: 'Dhanbad Division (DHN)' },
      { division_code: 'DNR', division_name: 'Danapur Division (DNR)' },
      { division_code: 'DDU', division_name: 'Pt. Deen Dayal Upadhyaya (DDU)' },
      { division_code: 'SPJ', division_name: 'Samastipur Division (SPJ)' },
      { division_code: 'SEE', division_name: 'Sonpur Division (SEE)' }
    ],
    'ER': [
      { division_code: 'HWH', division_name: 'Howrah Division (HWH)' },
      { division_code: 'SDAH', division_name: 'Sealdah Division (SDAH)' },
      { division_code: 'ASN', division_name: 'Asansol Division (ASN)' },
      { division_code: 'MLDT', division_name: 'Malda Division (MLDT)' }
    ],
    'WCR': [
      { division_code: 'JBP', division_name: 'Jabalpur Division (JBP)' },
      { division_code: 'BPL', division_name: 'Bhopal Division (BPL)' },
      { division_code: 'KOTA', division_name: 'Kota Division (KOTA)' }
    ]
  };

  // State for Filters
  const [dateRange, setDateRange] = useState('30_days');
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedDivision, setSelectedDivision] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // State for API Data & Sorting
  const [loading, setLoading] = useState(true);
  const [summaryMetrics, setSummaryMetrics] = useState({});
  const [zoneOverview, setZoneOverview] = useState([]);
  const [zoneDivisionsMap, setZoneDivisionsMap] = useState(defaultZoneDivisions);
  const [sortBy, setSortBy] = useState('complaints_desc'); // complaints_desc, resolution_asc, critical_desc, time_desc

  // Hover states for interactive tooltips
  const [hoveredBar, setHoveredBar] = useState(null);
  const [hoveredPie, setHoveredPie] = useState(null);

  // Reset Division filter whenever Zone changes
  useEffect(() => {
    setSelectedDivision('all');
  }, [selectedZone]);

  // Fetch Zone & Division analytics from backend API
  const fetchAnalytics = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        zone_code: selectedZone,
        division_code: selectedDivision,
        category_code: categoryFilter,
        priority: priorityFilter,
        status: statusFilter,
        date_range: dateRange
      });

      const res = await fetch(`/api/v1/officer/zone-division-analytics?${params}`);
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setSummaryMetrics(data.summary_metrics || {});
        setZoneOverview(data.zone_overview || []);
        if (data.zone_divisions_map && Object.keys(data.zone_divisions_map).length > 0) {
          setZoneDivisionsMap(prev => ({ ...prev, ...data.zone_divisions_map }));
        }
      }
    } catch (err) {
      console.error('Error fetching zone analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnalytics();
  }, [selectedZone, selectedDivision, categoryFilter, priorityFilter, statusFilter, dateRange]);

  // Dynamic divisions options based on currently selected Zone
  const availableDivisions = useMemo(() => {
    if (selectedZone === 'all') {
      let allDivs = [];
      Object.values(zoneDivisionsMap).forEach(list => {
        if (Array.isArray(list)) allDivs = allDivs.concat(list);
      });
      return allDivs;
    }
    return zoneDivisionsMap[selectedZone] || [];
  }, [selectedZone, zoneDivisionsMap]);

  // Sorted Zone Overview list
  const sortedZoneOverview = useMemo(() => {
    const list = [...zoneOverview];
    switch (sortBy) {
      case 'complaints_desc':
        return list.sort((a, b) => b.complaints - a.complaints);
      case 'resolution_asc':
        return list.sort((a, b) => a.resolution_rate - b.resolution_rate);
      case 'critical_desc':
        return list.sort((a, b) => b.critical - a.critical);
      case 'time_desc':
        return list.sort((a, b) => parseInt(b.avg_resolution) - parseInt(a.avg_resolution));
      default:
        return list;
    }
  }, [zoneOverview, sortBy]);

  // Y-axis max value calculation for Vertical Bar Chart
  const barChartMax = useMemo(() => {
    if (sortedZoneOverview.length === 0) return 10000;
    const maxVal = Math.max(...sortedZoneOverview.map(z => z.complaints), 100);
    return Math.ceil(maxVal / 1000) * 1000 || 10000;
  }, [sortedZoneOverview]);

  // Pure Database Category Slices for Pie Chart strictly derived from database response
  const pieCategories = useMemo(() => {
    let sec = 0, ele = 0, cln = 0, oth = 0, pnc = 0, med = 0, cat = 0, bdr = 0, wtr = 0;
    zoneOverview.forEach(z => {
      sec += (z.security || 0);
      ele += (z.electrical || 0);
      cln += (z.cleanliness || 0);
      cat += (z.catering || 0);
      med += (z.medical || 0);
      bdr += (z.bedroll || 0);
      pnc += (z.punctuality || 0);
      oth += (z.other || 0);
    });

    const rawSlices = [
      { label: 'Security & RPF', value: sec, color: '#58081f' },
      { label: 'Cleanliness & Hygiene', value: cln, color: '#3b82f6' },
      { label: 'Electrical & AC', value: ele, color: '#b48228' },
      { label: 'Ticketing & Other', value: oth, color: '#10b981' },
      { label: 'Punctuality', value: pnc, color: '#f59e0b' },
      { label: 'Bed Roll & Linen', value: bdr, color: '#8b5cf6' },
      { label: 'Medical Assistance', value: med, color: '#06b6d4' },
      { label: 'Catering & Vending', value: cat, color: '#ec4899' }
    ].filter(s => s.value > 0);

    const total = rawSlices.reduce((acc, s) => acc + s.value, 0) || 1;
    let currentAngle = -Math.PI / 2;

    return rawSlices.map(s => {
      const angle = (s.value / total) * 2 * Math.PI;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;

      const r = 95;
      const cx = 130;
      const cy = 130;

      const x1 = cx + r * Math.cos(startAngle);
      const y1 = cy + r * Math.sin(startAngle);
      const x2 = cx + r * Math.cos(endAngle);
      const y2 = cy + r * Math.sin(endAngle);

      const largeArc = angle > Math.PI ? 1 : 0;
      const pathData = `M ${cx} ${cy} L ${x1.toFixed(1)} ${y1.toFixed(1)} A ${r} ${r} 0 ${largeArc} 1 ${x2.toFixed(1)} ${y2.toFixed(1)} Z`;

      return {
        ...s,
        percentage: ((s.value / total) * 100).toFixed(1),
        pathData
      };
    });
  }, [zoneOverview]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', maxWidth: '1280px', margin: '0 auto', paddingBottom: '48px', fontFamily: "'Outfit', 'Segoe UI', system-ui, sans-serif" }}>
      
      {/* Header Banner */}
      <div style={{
        backgroundColor: '#360412',
        borderRadius: '16px',
        padding: '28px 34px',
        color: '#ffffff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: '0 10px 28px rgba(54, 4, 18, 0.25)',
        background: 'linear-gradient(135deg, #360412 0%, #58081f 100%)'
      }}>
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#ffb300', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '4px' }}>
            Zonal & Divisional Intelligence Portal
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.3px', color: '#ffffff' }}>
            Zone & Division-wise Grievance Analytics
          </div>
          <div style={{ fontSize: '0.92rem', color: '#f0b8c4', marginTop: '4px', fontWeight: 500 }}>
            Pan-India zonal comparison, dynamic division tracking, problem taxonomies, and resolution SLA metrics.
          </div>
        </div>
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconMapHeader />
        </div>
      </div>

      {/* 1. DYNAMIC SUMMARY CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        
        <div style={{ backgroundColor: '#ffffff', padding: '18px 20px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Complaints</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#800020', marginTop: '4px' }}>{summaryMetrics.total_complaints || 0}</div>
          <div style={{ fontSize: '0.76rem', color: '#9ca3af', marginTop: '2px' }}>Filtered Volume</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '18px 20px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#b06000', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Pending Verification</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#b06000', marginTop: '4px' }}>{summaryMetrics.pending_verification || 0}</div>
          <div style={{ fontSize: '0.76rem', color: '#b45309', marginTop: '2px' }}>Awaiting Verification</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '18px 20px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Under Review / Assigned</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0369a1', marginTop: '4px' }}>{summaryMetrics.under_review_assigned || 0}</div>
          <div style={{ fontSize: '0.76rem', color: '#0284c7', marginTop: '2px' }}>Field Staff Dispatched</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '18px 20px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#137333', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Resolved Complaints</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#137333', marginTop: '4px' }}>{summaryMetrics.resolved_complaints || 0}</div>
          <div style={{ fontSize: '0.76rem', color: '#15803d', marginTop: '2px' }}>OTP Verified</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '18px 20px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#c5221f', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Critical / High Priority</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#c5221f', marginTop: '4px' }}>{summaryMetrics.critical_high_priority || 0}</div>
          <div style={{ fontSize: '0.76rem', color: '#b91c1c', marginTop: '2px' }}>Safety / Emergency</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '18px 20px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
          <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#700c28', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Resolution Rate</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#700c28', marginTop: '4px' }}>{summaryMetrics.resolution_rate || '0.0%'}</div>
          <div style={{ fontSize: '0.76rem', color: '#6b7280', marginTop: '2px' }}>Avg Time: {summaryMetrics.avg_resolution_time || '0 Mins'}</div>
        </div>

      </div>

      {/* 2. COMMON FILTER BAR */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '22px 24px', border: '1px solid #e5e7eb', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#800020' }}>
            Filter Pan-India Zonal & Divisional Dataset
          </div>

          <button
            type="button"
            onClick={() => {
              setDateRange('30_days');
              setSelectedZone('all');
              setSelectedDivision('all');
              setCategoryFilter('all');
              setPriorityFilter('all');
              setStatusFilter('all');
            }}
            style={{ padding: '6px 14px', backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db', borderRadius: '6px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
          >
            Reset Filters
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
          
          {/* Zone Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 800, color: '#800020', marginBottom: '4px', textTransform: 'uppercase' }}>Railway Zone</label>
            <select
              value={selectedZone}
              onChange={e => setSelectedZone(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '2px solid #800020', fontSize: '0.86rem', backgroundColor: '#fcf8f9', color: '#800020', fontWeight: 800 }}
            >
              <option value="all">All 18 Zones</option>
              <option value="NR">Northern Railway (NR)</option>
              <option value="WR">Western Railway (WR)</option>
              <option value="SR">Southern Railway (SR)</option>
              <option value="ER">Eastern Railway (ER)</option>
              <option value="CR">Central Railway (CR)</option>
              <option value="ECR">East Central Railway (ECR)</option>
              <option value="SCR">South Central Railway (SCR)</option>
              <option value="NWR">North Western Railway (NWR)</option>
              <option value="NCR">North Central Railway (NCR)</option>
              <option value="NER">North Eastern Railway (NER)</option>
              <option value="NFR">Northeast Frontier Railway (NFR)</option>
              <option value="ECoR">East Coast Railway (ECoR)</option>
              <option value="SWR">South Western Railway (SWR)</option>
              <option value="SECR">South East Central Railway (SECR)</option>
              <option value="SER">South Eastern Railway (SER)</option>
              <option value="WCR">West Central Railway (WCR)</option>
              <option value="Metro">Metro Railway Kolkata</option>
              <option value="KR">Konkan Railway (KR)</option>
            </select>
          </div>

          {/* Dynamic Division Selector */}
          <div>
            <label style={{ display: 'block', fontSize: '0.74rem', fontWeight: 800, color: '#e65c00', marginBottom: '4px', textTransform: 'uppercase' }}>
              Division {selectedZone !== 'all' ? `(${selectedZone})` : ''}
            </label>
            <select
              value={selectedDivision}
              onChange={e => setSelectedDivision(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '2px solid #e65c00', fontSize: '0.86rem', backgroundColor: '#fffdfa', color: '#1e293b', fontWeight: 700 }}
            >
              <option value="all">{selectedZone === 'all' ? 'All Divisions (Select Zone First)' : 'All Divisions in ' + selectedZone}</option>
              {availableDivisions.map(d => (
                <option key={d.division_code} value={d.division_code}>{d.division_name || d.division_code}</option>
              ))}
            </select>
          </div>

        </div>

      </div>

      {/* 3. ZONE & DIVISION OVERVIEW TABLE */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '26px 28px', border: '1px solid #e5e7eb', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
        
        <div style={{ marginBottom: '18px', borderBottom: '2.5px solid #f3d0d8', paddingBottom: '12px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#800020', margin: 0 }}>
            3. Zone & Division-wise Performance Breakdown
          </h2>
          <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '2px' }}>
            Database-driven breakdown of complaints, open cases, resolved cases, critical cases, and SLA metrics for every Division within each Zone.
          </div>
        </div>

        {/* Compact Scrollable Table Container */}
        <div style={{ overflowX: 'auto', maxHeight: '480px', overflowY: 'auto', borderRadius: '12px', border: '1px solid #cbd5e1', boxShadow: '0 4px 14px rgba(0,0,0,0.04)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', textAlign: 'left' }}>
            <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
              <tr style={{ backgroundColor: '#4a0e17', color: '#ffffff' }}>
                <th style={{ padding: '12px 14px', fontWeight: 800, textAlign: 'center', width: '55px', borderRight: '1px solid rgba(255,255,255,0.15)' }}>S.No.</th>
                <th style={{ padding: '12px 16px', fontWeight: 800, minWidth: '210px', borderRight: '1px solid rgba(255,255,255,0.15)' }}>Zone Name</th>
                <th style={{ padding: '12px 16px', fontWeight: 800, minWidth: '220px', borderRight: '1px solid rgba(255,255,255,0.15)' }}>Division Name</th>
                <th style={{ padding: '12px 16px', fontWeight: 800 }}>Complaints</th>
                <th style={{ padding: '12px 16px', fontWeight: 800 }}>Open</th>
                <th style={{ padding: '12px 16px', fontWeight: 800 }}>Resolved</th>
                <th style={{ padding: '12px 16px', fontWeight: 800 }}>Critical</th>
                <th style={{ padding: '12px 16px', fontWeight: 800 }}>Resolution Rate</th>
                <th style={{ padding: '12px 16px', fontWeight: 800 }}>Avg. Resolution</th>
              </tr>
            </thead>
            <tbody>
              {sortedZoneOverview.map((zoneRow, zoneIdx) => {
                const divs = (zoneRow.divisions_list && zoneRow.divisions_list.length > 0)
                  ? zoneRow.divisions_list
                  : (zoneDivisionsMap[zoneRow.zone_code] || []);

                const rowSpan = Math.max(divs.length, 1);

                const formatDivisionDisplay = (divObj) => {
                  let name = divObj.division_name || divObj.division_code;
                  let code = divObj.division_code;
                  const match = name.match(/^(.*?)\s*\((.*?)\)$/);
                  if (match) {
                    name = match[1];
                    code = match[2];
                  }
                  return { name, code };
                };

                if (divs.length === 0) {
                  return (
                    <tr key={zoneRow.zone_code} style={{ borderBottom: '2px solid #e2e8f0' }}>
                      <td style={{ textAlign: 'center', fontWeight: 800, color: '#58081f', padding: '14px 10px', verticalAlign: 'middle', borderRight: '1px solid #e2e8f0', backgroundColor: '#fafafa' }}>
                        {zoneIdx + 1}
                      </td>
                      <td style={{ padding: '14px 16px', verticalAlign: 'middle', borderRight: '1px solid #e2e8f0', backgroundColor: '#fafafa' }}>
                        <div style={{ fontWeight: 800, color: '#58081f', fontSize: '0.94rem' }}>
                          {zoneRow.zone_name}
                        </div>
                        <div style={{ color: '#6b7280', fontSize: '0.8rem', fontWeight: 700 }}>
                          ({zoneRow.zone_code})
                        </div>
                        <div style={{ fontSize: '0.74rem', color: '#0369a1', fontWeight: 600, marginTop: '3px' }}>
                          HQ: {zoneRow.headquarters || 'New Delhi'}
                        </div>
                      </td>
                      <td colSpan={7} style={{ padding: '14px 16px', color: '#9ca3af', fontStyle: 'italic', fontSize: '0.82rem' }}>
                        No division records found in database for this zone.
                      </td>
                    </tr>
                  );
                }

                return divs.map((divItem, dIdx) => {
                  const { name: divName, code: divCode } = formatDivisionDisplay(divItem);
                  const isFirstDiv = (dIdx === 0);
                  const isLastDiv = (dIdx === divs.length - 1);

                  return (
                    <tr
                      key={`${zoneRow.zone_code}_${divCode}`}
                      style={{
                        backgroundColor: dIdx % 2 === 0 ? '#ffffff' : '#fdfafb',
                        borderBottom: isLastDiv ? '2.5px solid #cbd5e1' : '1px solid #f1f5f9'
                      }}
                    >
                      {isFirstDiv && (
                        <>
                          <td
                            rowSpan={rowSpan}
                            style={{
                              textAlign: 'center',
                              fontWeight: 800,
                              color: '#58081f',
                              fontSize: '0.96rem',
                              padding: '14px 10px',
                              verticalAlign: 'middle',
                              borderRight: '1px solid #e2e8f0',
                              backgroundColor: '#ffffff'
                            }}
                          >
                            {zoneIdx + 1}
                          </td>

                          <td
                            rowSpan={rowSpan}
                            style={{
                              padding: '16px',
                              verticalAlign: 'middle',
                              borderRight: '1px solid #e2e8f0',
                              backgroundColor: '#ffffff'
                            }}
                          >
                            <div style={{ fontWeight: 800, color: '#58081f', fontSize: '0.95rem' }}>
                              {zoneRow.zone_name}
                            </div>
                            <div style={{ color: '#6b7280', fontSize: '0.82rem', fontWeight: 700, marginTop: '1px' }}>
                              ({zoneRow.zone_code})
                            </div>
                            <div style={{ fontSize: '0.74rem', color: '#0369a1', fontWeight: 700, marginTop: '4px', backgroundColor: '#e0f2fe', display: 'inline-block', padding: '2px 8px', borderRadius: '4px' }}>
                              HQ: {zoneRow.headquarters || 'New Delhi'}
                            </div>
                          </td>
                        </>
                      )}

                      {/* Division Name Column */}
                      <td style={{ padding: '12px 16px', borderRight: '1px solid #f1f5f9', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{ fontWeight: 800, color: '#111827', fontSize: '0.88rem' }}>{divName}</span>{' '}
                        <span style={{ color: '#6b7280', fontSize: '0.8rem', fontWeight: 700 }}>({divCode})</span>
                      </td>

                      {/* Metrics Columns */}
                      <td style={{ padding: '12px 16px', fontWeight: 800, color: '#111827', borderBottom: '1px solid #e5e7eb' }}>
                        {divItem.complaints || 0}
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: 800, color: '#b06000', borderBottom: '1px solid #e5e7eb' }}>
                        {divItem.open || 0}
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: 800, color: '#137333', borderBottom: '1px solid #e5e7eb' }}>
                        {divItem.resolved || 0}
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: 800, color: '#c5221f', borderBottom: '1px solid #e5e7eb' }}>
                        {divItem.critical || 0}
                      </td>
                      <td style={{ padding: '12px 16px', borderBottom: '1px solid #e5e7eb' }}>
                        <span style={{
                          backgroundColor: (divItem.resolution_rate || 0) >= 95 ? '#e6f4ea' : ((divItem.resolution_rate || 0) >= 90 ? '#fef3d6' : '#fce8e6'),
                          color: (divItem.resolution_rate || 0) >= 95 ? '#137333' : ((divItem.resolution_rate || 0) >= 90 ? '#b06000' : '#c5221f'),
                          padding: '3px 8px',
                          borderRadius: '10px',
                          fontWeight: 800,
                          fontSize: '0.78rem'
                        }}>
                          {divItem.resolution_rate !== undefined ? `${divItem.resolution_rate}%` : '95%'}
                        </span>
                      </td>
                      <td style={{ padding: '12px 16px', fontWeight: 700, color: '#374151', fontSize: '0.82rem', borderBottom: '1px solid #e5e7eb' }}>
                        {divItem.avg_resolution || '35 mins'}
                      </td>
                    </tr>
                  );
                });
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* 4. ASYMMETRICAL SIDE-BY-SIDE CHARTS: WIDER SINGLE-BAR COMPLAINTS CHART & PIE CHART */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '24px' }}>
        
        {/* CARD 1: WIDER ZONE-WISE COMPLAINTS BAR CHART (Solid Maroon Bars Only) */}
        <div style={{ gridColumn: 'span 2', backgroundColor: '#ffffff', borderRadius: '14px', padding: '24px 26px', border: '1px solid #e5e7eb', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ borderBottom: '1px dashed #e2e8f0', paddingBottom: '10px', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '1.18rem', fontWeight: 800, color: '#58081f', margin: 0 }}>
              Zone-wise Complaint Distribution
            </h3>
          </div>

          {/* Single Legend Pill for Total Complaints */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '18px' }}>
            <div style={{ width: '18px', height: '12px', backgroundColor: '#58081f', borderRadius: '2px' }} />
            <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#374151' }}>Complaints</span>
          </div>

          {/* Vertical Bar Chart Container */}
          <div style={{ position: 'relative', width: '100%', height: '280px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', paddingBottom: '28px', paddingLeft: '55px' }}>
            
            {/* Dynamic Y-Axis Gridlines & Labels */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: '28px', pointerEvents: 'none' }}>
              {[1, 0.8, 0.6, 0.4, 0.2, 0].map((ratio, idx) => {
                const val = Math.round(barChartMax * ratio);
                const topPct = (1 - ratio) * 100;
                return (
                  <div key={idx} style={{ position: 'absolute', top: `${topPct}%`, left: 0, right: 0, display: 'flex', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.74rem', color: '#6b7280', fontWeight: 800, width: '45px', textAlign: 'right', paddingRight: '8px' }}>
                      {val}
                    </span>
                    <div style={{ flex: 1, borderTop: '1px dashed #cbd5e1' }} />
                  </div>
                );
              })}
            </div>

            {/* Solid Maroon Vertical Bars Container */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', width: '100%', height: '100%', zIndex: 10, paddingRight: '6px' }}>
              {sortedZoneOverview.map((z) => {
                const barHeightPct = Math.max((z.complaints / barChartMax) * 100, 4);
                const isHovered = hoveredBar === z.zone_code;

                return (
                  <div
                    key={z.zone_code}
                    onMouseEnter={() => setHoveredBar(z.zone_code)}
                    onMouseLeave={() => setHoveredBar(null)}
                    style={{
                      position: 'relative',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      alignItems: 'center',
                      flex: 1,
                      maxWidth: '26px',
                      cursor: 'pointer'
                    }}
                  >
                    {/* Tooltip on Hover */}
                    {isHovered && (
                      <div style={{
                        position: 'absolute',
                        bottom: '105%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        backgroundColor: '#0f172a',
                        color: '#ffffff',
                        padding: '8px 12px',
                        borderRadius: '8px',
                        fontSize: '0.78rem',
                        fontWeight: 700,
                        whiteSpace: 'nowrap',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.35)',
                        zIndex: 100,
                        textAlign: 'center'
                      }}>
                        <div style={{ fontWeight: 800, color: '#ffb300', fontSize: '0.84rem' }}>
                          {z.zone_name} ({z.zone_code})
                        </div>
                        <div style={{ fontSize: '0.8rem', marginTop: '2px' }}>
                          Complaints: <span style={{ color: '#38bdf8', fontWeight: 800 }}>{z.complaints}</span>
                        </div>
                      </div>
                    )}

                    {/* Solid Maroon Bar Column */}
                    <div
                      style={{
                        width: '100%',
                        height: `${barHeightPct}%`,
                        backgroundColor: isHovered ? '#800020' : '#58081f',
                        borderRadius: '4px 4px 0 0',
                        transition: 'all 0.2s ease',
                        boxShadow: isHovered ? '0 0 12px rgba(88, 8, 31, 0.6)' : '0 2px 6px rgba(0,0,0,0.08)'
                      }}
                    />

                    {/* X-Axis Zone Label */}
                    <div style={{ position: 'absolute', top: '100%', marginTop: '6px', fontSize: '0.72rem', fontWeight: 800, color: isHovered ? '#800020' : '#334155' }}>
                      {z.zone_code}
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </div>

        {/* CARD 2: PIE CHART — Department-wise Complaint Distribution (Database Sourced Only) */}
        <div style={{ gridColumn: 'span 1', backgroundColor: '#ffffff', borderRadius: '14px', padding: '24px 22px', border: '1px solid #e5e7eb', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ borderBottom: '1px dashed #e2e8f0', paddingBottom: '10px', marginBottom: '14px' }}>
            <h3 style={{ fontSize: '1.14rem', fontWeight: 800, color: '#58081f', margin: 0 }}>
              Department-wise Complaint Distribution
            </h3>
          </div>

          {/* Database-sourced Category Legend */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 10px', justifyContent: 'center', marginBottom: '14px', padding: '0 4px' }}>
            {pieCategories.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <div style={{ width: '12px', height: '10px', backgroundColor: item.color, borderRadius: '2px' }} />
                <span style={{ fontSize: '0.73rem', fontWeight: 700, color: '#374151' }}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          {/* Centered SVG Pie Chart */}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '230px', flex: 1 }}>
            <svg width="260" height="260" viewBox="0 0 260 260">
              {pieCategories.map((slice, idx) => {
                const isHovered = hoveredPie === slice.label;
                return (
                  <path
                    key={idx}
                    d={slice.pathData}
                    fill={slice.color}
                    stroke="#ffffff"
                    strokeWidth="2"
                    onMouseEnter={() => setHoveredPie(slice.label)}
                    onMouseLeave={() => setHoveredPie(null)}
                    style={{
                      cursor: 'pointer',
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                      transformOrigin: '130px 130px',
                      transition: 'transform 0.2s ease, opacity 0.2s ease',
                      opacity: hoveredPie && !isHovered ? 0.75 : 1
                    }}
                  />
                );
              })}
            </svg>

            {/* Hover Tooltip Overlay for Pie Chart */}
            {hoveredPie && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: '#ffffff',
                border: '2px solid #58081f',
                padding: '8px 12px',
                borderRadius: '8px',
                boxShadow: '0 6px 18px rgba(0,0,0,0.18)',
                textAlign: 'center',
                pointerEvents: 'none',
                zIndex: 50
              }}>
                <div style={{ fontSize: '0.76rem', fontWeight: 800, color: '#58081f' }}>
                  {hoveredPie}
                </div>
                {(() => {
                  const found = pieCategories.find(p => p.label === hoveredPie);
                  if (!found) return null;
                  return (
                    <div style={{ fontSize: '0.84rem', fontWeight: 800, color: '#111827', marginTop: '2px' }}>
                      {found.value} complaints ({found.percentage}%)
                    </div>
                  );
                })()}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
