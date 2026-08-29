import React, { useState, useEffect, useMemo } from 'react';
import KPICard from '../../components/dashboard/KPICard';

export default function AdminStaffManagementView() {
  const [staffList, setStaffList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [deptFilter, setDeptFilter] = useState('all');

  const fetchStaffData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/v1/officer/staff-availability');
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setStaffList(data.data || []);
      } else {
        setError(data.detail || 'Failed to fetch staff directory from database.');
      }
    } catch (err) {
      setError('Network error fetching staff roster from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaffData();
  }, []);

  // Exclude System Administrator / Admin entries as Admin is system supervisor, not field staff
  const actualFieldStaff = useMemo(() => {
    return staffList.filter(s => {
      const desig = (s.designation || s.role || '').toLowerCase();
      const stfId = (s.staff_id || '').toLowerCase();
      const stfName = (s.name || '').toLowerCase();
      if (desig.includes('admin') || desig.includes('administrator') || stfId.includes('admin') || stfName.includes('system admin')) {
        return false;
      }
      return true;
    });
  }, [staffList]);

  const filteredStaff = useMemo(() => {
    return actualFieldStaff.filter((s) => {
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchName = (s.name || s.staff_name || '').toLowerCase().includes(term);
        const matchId = (s.staff_id || '').toLowerCase().includes(term);
        const matchPhone = (s.phone || s.phone_number || '').toLowerCase().includes(term);
        if (!matchName && !matchId && !matchPhone) return false;
      }

      if (roleFilter !== 'all') {
        const desig = (s.designation || '').toLowerCase();
        if (!desig.includes(roleFilter.toLowerCase())) return false;
      }

      if (deptFilter !== 'all') {
        const dept = (s.department_name || s.department_code || '').toLowerCase();
        if (!dept.includes(deptFilter.toLowerCase())) return false;
      }

      return true;
    });
  }, [actualFieldStaff, searchTerm, roleFilter, deptFilter]);

  // Compute live summary statistics strictly from database field staff data
  const totalStaffCount = actualFieldStaff.length;
  const availableCount = actualFieldStaff.filter(s => s.availability_status === 'Available' || s.availability_status === ' Available').length;
  const offDutyCount = totalStaffCount - availableCount;
  const activeDutyCount = actualFieldStaff.filter(s => s.active_train_number || s.duty_status === 'ON_DUTY').length || availableCount;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '20px 24px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#800020' }}>
            Network Staff Supervision Directory
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', color: '#6b7280' }}>
            Official database directory of field personnel, TTEs, pantry managers, electrical technicians, and RPF officers.
          </p>
        </div>

        <button
          onClick={fetchStaffData}
          style={{ padding: '8px 16px', backgroundColor: '#800020', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
        >
          Refresh Roster
        </button>
      </div>

      {/* STAFF MANAGEMENT SUMMARY CARDS (FROM DATABASE) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(135px, 1fr))', gap: '12px' }}>
        <KPICard
          title="Total Registered Staff"
          value={totalStaffCount}
          subtitle="Network Personnel"
          accentColor="#800020"
          textColor="#111827"
        />

        <KPICard
          title="Available On Duty"
          value={availableCount}
          subtitle="Active Field Staff"
          accentColor="#388E3C"
          textColor="#388E3C"
        />

        <KPICard
          title="Off Duty / Rest"
          value={offDutyCount}
          subtitle="Shift Resting"
          accentColor="#F57C00"
          textColor="#F57C00"
        />

        <KPICard
          title="Active Deployments"
          value={activeDutyCount}
          subtitle="Onboard & Station"
          accentColor="#2563eb"
          textColor="#2563eb"
        />
      </div>

      {/* STAFF MANAGEMENT FILTER BAR (SEARCH, ROLE, DEPARTMENT) */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '14px 20px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: '12px',
        alignItems: 'center',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <input
          type="text"
          placeholder="Search Staff Name / ID / Phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ flex: 2, minWidth: '220px', padding: '9px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.88rem', boxSizing: 'border-box' }}
        />

        <select
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
          style={{ flex: 1, minWidth: '160px', padding: '9px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.86rem', fontWeight: 600, color: '#374151', boxSizing: 'border-box' }}
        >
          <option value="all">All Roles / Designations</option>
          <option value="pantry">Pantry Manager / Catering</option>
          <option value="tte">Ticket Inspector (TTE)</option>
          <option value="ac">AC Maintenance Technician</option>
          <option value="rpf">RPF Security Officer</option>
          <option value="clean">OBHS Cleaning Staff</option>
          <option value="pilot">Loco Pilot / Train Ops</option>
        </select>

        <select
          value={deptFilter}
          onChange={(e) => setDeptFilter(e.target.value)}
          style={{ flex: 1, minWidth: '160px', padding: '9px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.86rem', fontWeight: 600, color: '#374151', boxSizing: 'border-box' }}
        >
          <option value="all">All Departments</option>
          <option value="catering">Commercial Catering</option>
          <option value="electrical">Electrical Department</option>
          <option value="security">Security (RPF)</option>
          <option value="cleanliness">Mechanical (Cleanliness)</option>
          <option value="operating">Operating & Train Operations</option>
        </select>
      </div>

      {/* STAFF CARDS GRID FROM DATABASE */}
      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>Loading staff directory from database...</div>
      ) : error ? (
        <div style={{ padding: '20px', backgroundColor: '#fef2f2', color: '#991b1b', borderRadius: '8px' }}>{error}</div>
      ) : filteredStaff.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '12px', color: '#6b7280', border: '1px solid #e5e7eb' }}>
          No staff members found matching selected search criteria.
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
          {filteredStaff.map((s) => {
            const isAvail = s.availability_status === 'Available' || s.availability_status === ' Available';
            return (
              <div key={s.staff_id} style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <div>
                      <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, color: '#111827' }}>{s.name || s.staff_name}</h3>
                      <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#800020' }}>ID: {s.staff_id}</span>
                    </div>
                    <span style={{ padding: '4px 10px', borderRadius: '12px', fontSize: '0.72rem', fontWeight: 800, backgroundColor: isAvail ? '#d1fae5' : '#fee2e2', color: isAvail ? '#065f46' : '#991b1b' }}>
                      {isAvail ? 'Available' : 'Off Duty'}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#4b5563', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <div><strong>Dept:</strong> {s.department_name || s.department_code}</div>
                    <div><strong>Role:</strong> {s.designation}</div>
                    <div><strong>Train Assignment:</strong> {s.active_train_number ? `Train ${s.active_train_number}` : 'Station Post'}</div>
                  </div>
                </div>

                <div style={{ paddingTop: '12px', borderTop: '1px solid #f3f4f6' }}>
                  <a
                    href={`tel:${s.phone || s.phone_number}`}
                    style={{
                      display: 'block',
                      width: '100%',
                      textAlign: 'center',
                      padding: '8px',
                      backgroundColor: '#f3f4f6',
                      color: '#1f2937',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      boxSizing: 'border-box'
                    }}
                  >
                    Contact: {s.phone || s.phone_number || 'Official Line'}
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
