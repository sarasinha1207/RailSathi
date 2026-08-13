import React, { useState, useEffect, useMemo } from 'react';

const IconUsersHeader = () => (
  <svg style={{ width: '24px', height: '24px', color: '#ffb300' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const IconSearch = () => (
  <svg style={{ width: '18px', height: '18px', color: '#9ca3af' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const IconClose = () => (
  <svg style={{ width: '20px', height: '20px', color: '#6b7280' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

export default function StaffAvailabilityPage({ user }) {
  const [metrics, setMetrics] = useState({
    total_staff: 0,
    currently_onboard: 0,
    available: 0,
    currently_assigned: 0,
    unavailable: 0
  });

  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('all');
  const [trainFilter, setTrainFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [zoneFilter, setZoneFilter] = useState('all');

  // Modal / Side Panel state for selected staff details
  const [selectedStaff, setSelectedStaff] = useState(null);

  // Fetch staff availability overview from REST API
  const fetchStaffData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/v1/officer/staff-availability');
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setMetrics(data.metrics || {});
        setStaffList(data.data || []);
      } else {
        setError(data.detail || 'Failed to fetch staff availability dataset.');
      }
    } catch (err) {
      setError('Network error fetching staff availability records.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, []);

  // Filter staff list based on search term & dropdowns
  const filteredStaff = useMemo(() => {
    return staffList.filter(s => {
      // Search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchesName = s.name.toLowerCase().includes(term);
        const matchesId = s.staff_id.toLowerCase().includes(term);
        const matchesTrain = s.train_number.toLowerCase().includes(term) || s.train_name.toLowerCase().includes(term);
        if (!matchesName && !matchesId && !matchesTrain) return false;
      }

      // Department filter
      if (deptFilter !== 'all') {
        if (s.department_code !== deptFilter && !s.department_name.toLowerCase().includes(deptFilter.toLowerCase())) {
          return false;
        }
      }

      // Train filter
      if (trainFilter !== 'all') {
        if (s.train_number !== trainFilter) return false;
      }

      // Availability Status filter
      if (statusFilter !== 'all') {
        if (s.availability_status !== statusFilter) return false;
      }

      // Zone / Division filter
      if (zoneFilter !== 'all') {
        const fullLoc = (s.station_name + ' ' + s.train_name).toLowerCase();
        if (!fullLoc.includes(zoneFilter.toLowerCase())) return false;
      }

      return true;
    });
  }, [staffList, searchTerm, deptFilter, trainFilter, statusFilter, zoneFilter]);

  // Unique Train Numbers for filter dropdown
  const uniqueTrains = useMemo(() => {
    const set = new Set();
    staffList.forEach(s => {
      if (s.train_number) set.add(s.train_number);
    });
    return Array.from(set).sort();
  }, [staffList]);

  // Unique Departments for filter dropdown
  const uniqueDepts = [
    { code: 'RPF', name: 'RPF / Security' },
    { code: 'COMMERCIAL', name: 'Commercial Department' },
    { code: 'MECH_CLEAN', name: 'Mechanical (Cleanliness & OBHS)' },
    { code: 'ELEC', name: 'Electrical Department' },
    { code: 'OPERATING', name: 'Operating Department' },
    { code: 'CATERING', name: 'Commercial Catering' },
    { code: 'S&T', name: 'Signal & Telecommunication' }
  ];

  // Helper for Status Badge styling (Only Available, Assigned, Unavailable)
  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Available':
        return (
          <span style={{ backgroundColor: '#e6f4ea', color: '#137333', border: '1px solid #ceead6', padding: '5px 12px', borderRadius: '16px', fontSize: '0.82rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span>🟢</span> Available
          </span>
        );
      case 'Assigned':
        return (
          <span style={{ backgroundColor: '#fef3d6', color: '#b06000', border: '1px solid #fde293', padding: '5px 12px', borderRadius: '16px', fontSize: '0.82rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span>🟡</span> Assigned
          </span>
        );
      default:
        return (
          <span style={{ backgroundColor: '#fce8e6', color: '#c5221f', border: '1px solid #fad2cf', padding: '5px 12px', borderRadius: '16px', fontSize: '0.82rem', fontWeight: 800, display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
            <span>🔴</span> Unavailable
          </span>
        );
    }
  };


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
        boxShadow: '0 10px 28px rgba(54, 4, 18, 0.25)',
        borderLeft: '6px solid #e65c00',
        background: 'linear-gradient(135deg, #360412 0%, #58081f 100%)'
      }}>
        <div>
          <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#ffb300', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: '4px' }}>
            Indian Railways Field Roster
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, letterSpacing: '-0.3px', color: '#ffffff' }}>
            Eligible Onboard & On-Duty Field Staff Management
          </div>
          <div style={{ fontSize: '0.92rem', color: '#f0b8c4', marginTop: '4px', fontWeight: 500 }}>
            Real-time database monitoring of onboard train staff, station personnel, department duty rosters, and live dispatch eligibility.
          </div>
        </div>
        <div style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '14px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <IconUsersHeader />
        </div>
      </div>

      {/* 1. SUMMARY CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '18px' }}>
        
        <div style={{ backgroundColor: '#ffffff', padding: '20px 22px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', borderTop: '4px solid #800020' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Total Staff</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#800020', marginTop: '6px' }}>{metrics.total_staff || 0}</div>
          <div style={{ fontSize: '0.78rem', color: '#9ca3af', marginTop: '4px' }}>Database Master Records</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '20px 22px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', borderTop: '4px solid #0284c7' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0284c7', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Currently Onboard</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0369a1', marginTop: '6px' }}>{metrics.currently_onboard || 0}</div>
          <div style={{ fontSize: '0.78rem', color: '#9ca3af', marginTop: '4px' }}>On Active Train Duty</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '20px 22px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', borderTop: '4px solid #137333' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#137333', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Available</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#137333', marginTop: '6px' }}>{metrics.available || 0}</div>
          <div style={{ fontSize: '0.78rem', color: '#15803d', marginTop: '4px', fontWeight: 700 }}>🟢 Ready for Dispatch</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '20px 22px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', borderTop: '4px solid #b06000' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#b06000', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Currently Assigned</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#b06000', marginTop: '6px' }}>{metrics.currently_assigned || 0}</div>

          <div style={{ fontSize: '0.78rem', color: '#b45309', marginTop: '4px', fontWeight: 700 }}>🟡 Handling Grievance</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '20px 22px', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0,0,0,0.03)', borderTop: '4px solid #c5221f' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#c5221f', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Unavailable / Offline</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#c5221f', marginTop: '6px' }}>{metrics.unavailable || 0}</div>
          <div style={{ fontSize: '0.78rem', color: '#b91c1c', marginTop: '4px', fontWeight: 700 }}>🔴 On Break / Off Duty</div>
        </div>

      </div>

      {/* 2. SEARCH & FILTERS BAR */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '22px 24px', border: '1px solid #e5e7eb', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#800020' }}>
            Filter Onboard Field Staff Records ({filteredStaff.length} Result{filteredStaff.length !== 1 ? 's' : ''})
          </div>

          <button
            type="button"
            onClick={() => {
              setSearchTerm('');
              setDeptFilter('all');
              setTrainFilter('all');
              setStatusFilter('all');
              setZoneFilter('all');
            }}
            style={{
              padding: '6px 14px',
              backgroundColor: '#f3f4f6',
              color: '#374151',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontWeight: 700,
              fontSize: '0.8rem',
              cursor: 'pointer'
            }}
          >
            Reset All Filters
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '14px' }}>
          
          {/* Search Input */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <span style={{ position: 'absolute', left: '12px', pointerEvents: 'none' }}><IconSearch /></span>
            <input
              type="text"
              placeholder="Search Staff Name / Staff ID / Train..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 38px',
                borderRadius: '8px',
                border: '1px solid #cbd5e1',
                fontSize: '0.86rem',
                backgroundColor: '#ffffff'
              }}
            />
          </div>

          {/* Department Filter */}
          <select
            value={deptFilter}
            onChange={e => setDeptFilter(e.target.value)}
            style={{ padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.86rem', backgroundColor: '#ffffff', color: '#1e293b', fontWeight: 600 }}
          >
            <option value="all">All Departments</option>
            {uniqueDepts.map(d => (
              <option key={d.code} value={d.code}>{d.name}</option>
            ))}
          </select>

          {/* Train Number Filter */}
          <select
            value={trainFilter}
            onChange={e => setTrainFilter(e.target.value)}
            style={{ padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.86rem', backgroundColor: '#ffffff', color: '#1e293b', fontWeight: 600 }}
          >
            <option value="all">All Active Trains</option>
            {uniqueTrains.map(t => (
              <option key={t} value={t}>Train {t}</option>
            ))}
          </select>

          {/* Availability Status Filter */}
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            style={{ padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.86rem', backgroundColor: '#ffffff', color: '#1e293b', fontWeight: 600 }}
          >
            <option value="all">All Availability Statuses</option>
            <option value="Available">🟢 Available</option>
            <option value="Assigned">🟡 Assigned</option>
            <option value="Unavailable">🔴 Unavailable</option>
            <option value="Offline/Not Onboard">⚪ Offline / Not Onboard</option>
          </select>

          {/* Zone / Division Filter */}
          <select
            value={zoneFilter}
            onChange={e => setZoneFilter(e.target.value)}
            style={{ padding: '9px 12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.86rem', backgroundColor: '#ffffff', color: '#1e293b', fontWeight: 600 }}
          >
            <option value="all">All Zones & Divisions</option>
            <option value="NR">Northern Railway (NR - Delhi)</option>
            <option value="ECR">East Central Railway (ECR - Dhanbad)</option>
            <option value="ER">Eastern Railway (ER - Howrah)</option>
            <option value="WCR">West Central Railway (WCR - Jabalpur)</option>
            <option value="WR">Western Railway (WR - Mumbai)</option>
          </select>

        </div>

      </div>

      {/* 3. STAFF TABLE */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', padding: '24px 28px', border: '1px solid #e5e7eb', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280', fontWeight: 700 }}>
            Loading onboard staff database records...
          </div>
        ) : error ? (
          <div style={{ padding: '30px', textAlign: 'center', color: '#c5221f', fontWeight: 700, backgroundColor: '#fce8e6', borderRadius: '10px' }}>
            {error}
          </div>
        ) : filteredStaff.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#6b7280', backgroundColor: '#f8fafc', borderRadius: '10px' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>No On-Duty Staff Found</div>
            <div style={{ fontSize: '0.86rem', marginTop: '4px' }}>No staff record matches your search query and filter criteria.</div>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid #cbd5e1' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.86rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#700c28', color: '#ffffff' }}>
                  <th style={{ padding: '14px 16px', fontWeight: 800 }}>Staff Name</th>
                  <th style={{ padding: '14px 16px', fontWeight: 800 }}>Staff ID</th>
                  <th style={{ padding: '14px 16px', fontWeight: 800 }}>Designation</th>
                  <th style={{ padding: '14px 16px', fontWeight: 800 }}>Department</th>
                  <th style={{ padding: '14px 16px', fontWeight: 800 }}>Train Number & Name</th>
                  <th style={{ padding: '14px 16px', fontWeight: 800 }}>Availability Status</th>
                  <th style={{ padding: '14px 16px', fontWeight: 800, textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredStaff.map((staff, idx) => (
                  <tr
                    key={staff.staff_id}
                    style={{
                      backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc',
                      borderBottom: '1px solid #e2e8f0',
                      transition: 'background-color 0.15s ease'
                    }}
                  >

                    {/* Staff Avatar + Name */}
                    <td style={{ padding: '14px 16px', fontWeight: 800, color: '#111827' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '34px',
                          height: '34px',
                          borderRadius: '50%',
                          backgroundColor: '#700c28',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 800,
                          fontSize: '0.85rem'
                        }}>
                          {staff.name.charAt(0)}
                        </div>
                        <div>
                          <div>{staff.name}</div>
                          <div style={{ fontSize: '0.74rem', color: '#6b7280', fontWeight: 600 }}>{staff.phone}</div>
                        </div>
                      </div>
                    </td>

                    {/* Staff ID */}
                    <td style={{ padding: '14px 16px', fontWeight: 800, color: '#800020' }}>
                      <span style={{ backgroundColor: '#fde8ed', padding: '4px 8px', borderRadius: '6px', fontSize: '0.8rem' }}>
                        {staff.staff_id}
                      </span>
                    </td>

                    {/* Designation */}
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#374151' }}>
                      {staff.designation}
                    </td>

                    {/* Department */}
                    <td style={{ padding: '14px 16px', color: '#4b5563' }}>
                      {staff.department_name}
                    </td>

                    {/* Train Number & Name / Station Duty */}
                    <td style={{ padding: '14px 16px', fontWeight: 700, color: '#1f2937' }}>
                      {staff.train_number ? (
                        <div>
                          <div>Train {staff.train_number}</div>
                          <div style={{ fontSize: '0.76rem', color: '#6b7280', fontWeight: 500 }}>{staff.train_name}</div>
                        </div>
                      ) : (
                        <div>
                          <div style={{ color: '#800020', fontWeight: 800 }}>Station Duty ({staff.station_code || 'NDLS'})</div>
                          <div style={{ fontSize: '0.75rem', color: '#4b5563', fontWeight: 600 }}>
                            Zone: {staff.station_zone_code || 'NR'} | Div: {staff.station_division_name || 'Delhi (DLI)'}
                          </div>
                        </div>
                      )}
                    </td>


                    {/* Availability Status */}
                    <td style={{ padding: '14px 16px' }}>
                      {renderStatusBadge(staff.availability_status)}
                    </td>

                    {/* Action */}
                    <td style={{ padding: '14px 16px', textAlign: 'center' }}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedStaff(staff);
                        }}
                        style={{
                          padding: '6px 14px',
                          backgroundColor: '#800020',
                          color: '#ffffff',
                          border: 'none',
                          borderRadius: '6px',
                          fontWeight: 700,
                          fontSize: '0.78rem',
                          cursor: 'pointer',
                          boxShadow: '0 2px 6px rgba(128, 0, 32, 0.2)'
                        }}
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

      {/* 4. STAFF DETAILS MODAL / SIDE PANEL */}
      {selectedStaff && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.55)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          padding: '20px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            maxWidth: '620px',
            width: '100%',
            maxHeight: '90vh',
            overflowY: 'auto',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            border: '1px solid #e5e7eb',
            display: 'flex',
            flexDirection: 'column'
          }}>
            
            {/* Modal Header */}
            <div style={{
              backgroundColor: '#360412',
              color: '#ffffff',
              padding: '20px 26px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTopLeftRadius: '16px',
              borderTopRightRadius: '16px'
            }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#ffb300', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Official Railway Staff Profile
                </div>
                <div style={{ fontSize: '1.35rem', fontWeight: 800, marginTop: '2px' }}>
                  {selectedStaff.name}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedStaff(null)}
                style={{
                  backgroundColor: 'rgba(255,255,255,0.15)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: '#ffffff'
                }}
              >
                <IconClose />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: '22px' }}>
              
              {/* Personal / Official Details Section */}
              <div style={{ backgroundColor: '#fcf8f9', padding: '18px 20px', borderRadius: '12px', border: '1px solid #f3d0d8' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#800020', marginBottom: '12px', borderBottom: '1.5px solid #f3d0d8', paddingBottom: '6px' }}>
                  Personal & Official Details
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', fontSize: '0.86rem' }}>
                  <div>
                    <div style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>Full Name</div>
                    <div style={{ fontWeight: 800, color: '#111827', marginTop: '2px' }}>{selectedStaff.name}</div>
                  </div>
                  <div>
                    <div style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>Staff ID</div>
                    <div style={{ fontWeight: 800, color: '#800020', marginTop: '2px' }}>{selectedStaff.staff_id}</div>
                  </div>
                  <div>
                    <div style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>Designation</div>
                    <div style={{ fontWeight: 700, color: '#1f2937', marginTop: '2px' }}>{selectedStaff.designation}</div>
                  </div>
                  <div>
                    <div style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>Department</div>
                    <div style={{ fontWeight: 700, color: '#1f2937', marginTop: '2px' }}>{selectedStaff.department_name}</div>
                  </div>
                  <div>
                    <div style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>Contact Number</div>
                    <div style={{ fontWeight: 800, color: '#0369a1', marginTop: '2px' }}>{selectedStaff.phone}</div>
                  </div>
                  <div>
                    <div style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>Official Email</div>
                    <div style={{ fontWeight: 700, color: '#374151', marginTop: '2px' }}>{selectedStaff.email}</div>
                  </div>
                </div>
              </div>

              {/* Current Deployment Section */}
              <div style={{ backgroundColor: '#fafafa', padding: '18px 20px', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#111827', marginBottom: '12px', borderBottom: '1.5px solid #e5e7eb', paddingBottom: '6px' }}>
                  Current Deployment & Onboard Status
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px', fontSize: '0.86rem' }}>
                  <div>
                    <div style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>Assigned Train</div>
                    <div style={{ fontWeight: 800, color: '#111827', marginTop: '2px' }}>
                      {selectedStaff.train_number ? `Train ${selectedStaff.train_number} (${selectedStaff.train_name})` : `Station Duty (${selectedStaff.station_code || 'NDLS'})`}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>Coach / Location</div>
                    <div style={{ fontWeight: 800, color: '#111827', marginTop: '2px' }}>Coach {selectedStaff.coach_number}</div>
                  </div>
                  <div>
                    <div style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>Current Location</div>
                    <div style={{ fontWeight: 700, color: '#374151', marginTop: '2px' }}>{selectedStaff.current_location}</div>
                  </div>
                  <div>
                    <div style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>Onboard Duty Status</div>
                    <div style={{ fontWeight: 800, color: '#0284c7', marginTop: '2px' }}>{selectedStaff.onboard_status}</div>
                  </div>
                  <div>
                    <div style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>Availability Status</div>
                    <div style={{ marginTop: '4px' }}>
                      {renderStatusBadge(selectedStaff.availability_status)}
                    </div>
                  </div>
                  <div>
                    <div style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>Active Handling Complaints</div>
                    <div style={{ fontWeight: 800, color: '#b06000', marginTop: '2px' }}>{selectedStaff.active_complaint_count} Active Complaint(s)</div>
                  </div>
                  <div style={{ gridColumn: '1 / -1' }}>
                    <div style={{ color: '#6b7280', fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase' }}>Last Updated Timestamp</div>
                    <div style={{ fontWeight: 700, color: '#4b5563', marginTop: '2px' }}>{selectedStaff.last_updated}</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Footer */}
            <div style={{
              padding: '16px 26px',
              backgroundColor: '#f8fafc',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              justifyContent: 'flex-end',
              borderBottomLeftRadius: '16px',
              borderBottomRightRadius: '16px'
            }}>
              <button
                type="button"
                onClick={() => setSelectedStaff(null)}
                style={{
                  padding: '9px 24px',
                  backgroundColor: '#800020',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  cursor: 'pointer'
                }}
              >
                Close Profile
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
