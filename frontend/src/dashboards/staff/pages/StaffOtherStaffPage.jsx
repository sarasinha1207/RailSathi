import React, { useState, useEffect, useMemo } from 'react';

export default function StaffOtherStaffPage({ user }) {
  const [crew, setCrew] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [trainNumber, setTrainNumber] = useState('22477');

  const [deptFilter, setDeptFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const fetchOnboardCrew = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/v1/staff/me/onboard-crew');
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setCrew(data.data || []);
        setTrainNumber(data.train_number || '22477');
      } else {
        setError(data.detail || 'Failed to fetch onboard crew roster.');
      }
    } catch (err) {
      setError('Network error fetching fellow onboard staff.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOnboardCrew();
  }, []);

  const filteredCrew = useMemo(() => {
    return crew.filter((member) => {
      // Search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchName = member.name.toLowerCase().includes(term);
        const matchId = member.staff_id.toLowerCase().includes(term);
        const matchDesig = (member.designation || '').toLowerCase().includes(term);
        if (!matchName && !matchId && !matchDesig) return false;
      }

      // Department filter
      if (deptFilter !== 'all') {
        if (member.department_code !== deptFilter && !member.department_name.toLowerCase().includes(deptFilter.toLowerCase())) {
          return false;
        }
      }

      // Status filter
      if (statusFilter !== 'all') {
        if (member.availability_status !== statusFilter) return false;
      }

      return true;
    });
  }, [crew, deptFilter, statusFilter, searchTerm]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Banner */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '20px 24px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#4a071a' }}>
            Fellow Onboard Staff Roster (Train {trainNumber})
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', color: '#6b7280' }}>
            Official directory of railway personnel currently deployed onboard your active train journey.
          </p>
        </div>

        <button
          onClick={fetchOnboardCrew}
          style={{
            padding: '8px 16px',
            backgroundColor: '#f3f4f6',
            color: '#374151',
            border: '1px solid #d1d5db',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.85rem',
            cursor: 'pointer'
          }}
        >
          🔄 Refresh Crew
        </button>
      </div>

      {/* Filter Controls */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '16px 20px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '14px',
        alignItems: 'center'
      }}>
        <input
          type="text"
          placeholder="🔍 Search Staff Name / ID..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '9px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.88rem', minWidth: '220px' }}
        />

        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          style={{ padding: '9px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.88rem' }}
        >
          <option value="all">All Departments</option>
          <option value="COMMERCIAL">Commercial (TTE / Ticket Checking)</option>
          <option value="RPF">Security (RPF)</option>
          <option value="ELEC">Electrical Department</option>
          <option value="COMM_CATER">Commercial Catering</option>
          <option value="MECH_CLEAN">Mechanical (Cleanliness & OBHS)</option>
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          style={{ padding: '9px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.88rem' }}
        >
          <option value="all">All Duty Statuses</option>
          <option value="Available">Available On Duty</option>
          <option value="Unavailable">Unavailable / Off Duty</option>
        </select>
      </div>

      {/* Crew Grid / Cards */}
      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>Loading onboard crew roster...</div>
      ) : error ? (
        <div style={{ padding: '20px', backgroundColor: '#fef2f2', color: '#991b1b', borderRadius: '8px' }}>{error}</div>
      ) : filteredCrew.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '12px', color: '#6b7280', border: '1px solid #e5e7eb' }}>
          No fellow onboard staff found matching selected filters.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
          {filteredCrew.map((c) => (
            <div
              key={c.staff_id}
              style={{
                backgroundColor: '#ffffff',
                borderRadius: '12px',
                padding: '20px',
                border: '1px solid #e5e7eb',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '12px'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#111827' }}>
                      {c.name}
                    </h3>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#800020' }}>
                      ID: {c.staff_id}
                    </span>
                  </div>
                  <span style={{
                    padding: '4px 10px',
                    borderRadius: '12px',
                    fontSize: '0.72rem',
                    fontWeight: 800,
                    backgroundColor: c.availability_status === 'Available' ? '#d1fae5' : '#fee2e2',
                    color: c.availability_status === 'Available' ? '#065f46' : '#991b1b'
                  }}>
                    {c.availability_status === 'Available' ? '🟢 Available' : '🔴 Off Duty'}
                  </span>
                </div>

                <div style={{ fontSize: '0.85rem', color: '#4b5563', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <div>🏢 <strong>Department:</strong> {c.department_name}</div>
                  <div>📋 <strong>Designation:</strong> {c.designation}</div>
                  <div>🚃 <strong>Coach Duty:</strong> {c.coach}</div>
                </div>
              </div>

              {/* Official Contact Buttons */}
              <div style={{ paddingTop: '12px', borderTop: '1px solid #f3f4f6', display: 'flex', gap: '8px' }}>
                <a
                  href={`tel:${c.phone}`}
                  style={{
                    flex: 1,
                    textAlign: 'center',
                    padding: '8px',
                    backgroundColor: '#f3f4f6',
                    color: '#1f2937',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontWeight: 700,
                    fontSize: '0.82rem'
                  }}
                >
                  📞 {c.phone}
                </a>
                <button
                  onClick={() => alert(`Official Railway Email:\n${c.email}`)}
                  style={{
                    padding: '8px 12px',
                    backgroundColor: '#4a071a',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: 700,
                    fontSize: '0.82rem',
                    cursor: 'pointer'
                  }}
                >
                  ✉️ Official Email
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
