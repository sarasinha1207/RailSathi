import React, { useState, useEffect } from 'react';
import KPICard from '../../components/dashboard/KPICard';
import PriorityBadge from '../../components/dashboard/PriorityBadge';
import StatusBadge from '../../components/dashboard/StatusBadge';
import SLABadge from '../../components/dashboard/SLABadge';




export default function StaffDashboardPage({ user, onNavigate }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [staffData, setStaffData] = useState(null);

  const fetchOverview = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/v1/staff/me/overview');
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setStaffData(data);
      } else {
        setError(data.detail || 'Failed to fetch staff operational overview.');
      }
    } catch (err) {
      setError('Network error loading onboard staff dashboard data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>
        <div style={{ display: 'inline-block', width: '32px', height: '32px', border: '3px solid #800020', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
        <p style={{ marginTop: '12px', fontWeight: 600 }}>Loading Onboard Operational Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '20px', backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', color: '#991b1b', margin: '20px' }}>
        <strong>Operational Alert:</strong> {error}
        <button onClick={fetchOverview} style={{ marginLeft: '16px', padding: '6px 14px', backgroundColor: '#991b1b', color: '#fff', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>Retry</button>
      </div>
    );
  }

  const { staff, train_info, metrics, recent_complaints } = staffData || {};

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header Banner */}
      <div style={{
        backgroundColor: '#4a071a',
        borderRadius: '14px',
        padding: '20px 24px',
        color: '#ffffff',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
        background: 'linear-gradient(135deg, #4a071a 0%, #700c28 100%)'
      }}>
        <div style={{ flex: '1 1 280px' }}>
          <div style={{ fontSize: '0.78rem', color: '#ffb300', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: '4px' }}>
            ONBOARD STAFF OPERATIONAL CONTROL
          </div>
          <h1 style={{ margin: 0, fontSize: 'clamp(1.3rem, 2.5vw, 1.6rem)', fontWeight: 800 }}>
            Welcome, {staff?.name || user?.username}!
          </h1>
          <p style={{ margin: '6px 0 0 0', fontSize: '0.88rem', color: '#f0b8c4' }}>
            {staff?.designation || 'Railway Official'} • Department: <strong>{staff?.department_code || 'General'}</strong>
          </p>
        </div>

        <button
          type="button"
          onClick={fetchOverview}
          style={{
            padding: '10px 18px',
            backgroundColor: '#800020',
            color: '#fff',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.88rem',
            cursor: 'pointer',
            boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
            whiteSpace: 'nowrap'
          }}
        >
          Refresh Roster Data
        </button>
      </div>

      {/* 6 Real-Time Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '14px' }}>
        <KPICard title="Pending Complaints" value={metrics?.pending_complaints || 0} subtitle="Queued for Staff Review" accentColor="#1a73e8" />
        <KPICard title="Assigned Complaints" value={metrics?.assigned_complaints || 0} subtitle="Active Duty Tasks" accentColor="#137333" />
        <KPICard title="Reassignment Requests" value={metrics?.reassignment_requests || 0} subtitle="Pending Officer Approval" accentColor="#8430ce" />
        <KPICard title="SLA-2 Warning Tasks" value={metrics?.sla_warning_complaints || 0} subtitle="Nearing SLA Deadline" accentColor="#b45309" />
        <KPICard title="SLA-3 Breached Tasks" value={metrics?.sla_breached_complaints || 0} subtitle="Critical Target Exceeded" accentColor="#b91c1c" />
        <KPICard title="Resolved Complaints" value={metrics?.resolved_complaints || 0} subtitle="Completed Grievances" accentColor="#0f9d58" />
      </div>

      {/* Compact Train Information Card */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '20px 24px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '10px',
            backgroundColor: '#800020',
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 6px rgba(128,0,32,0.25)'
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2c-4 0-8 1-8 4v10c0 1.5 1 2.5 2.5 2.5L5 20v1h2l1.5-2h7l1.5 2h2v-1l-1.5-1.5c1.5 0 2.5-1 2.5-2.5V6c0-3-4-4-8-4zm-5 13c-.83 0-1.5-.67-1.5-1.5S6.17 12 7 12s1.5.67 1.5 1.5S7.83 15 7 15zm10 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm1.5-5h-13V6h13v4z"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: '0.78rem', color: '#800020', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              CURRENT ASSIGNED TRAIN JOURNEY
            </div>
            <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827' }}>
              22477 - Shri Mata Vaishno Devi Katra Vande Bharat Express
            </div>
            <div style={{ fontSize: '0.88rem', color: '#6b7280', marginTop: '2px' }}>
              Route: New Delhi (NDLS) - Shri Mata Vaishno Devi Katra (SVDK)
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600 }}>JOURNEY DATE</div>
            <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#111827' }}>{train_info?.journey_date}</div>
          </div>
          <span style={{
            padding: '6px 14px',
            borderRadius: '20px',
            fontSize: '0.82rem',
            fontWeight: 800,
            backgroundColor: '#d1fae5',
            color: '#065f46',
            border: '1px solid #a7f3d0'
          }}>
            {train_info?.onboard_status || 'Onboard Active Duty'}
          </span>
          {onNavigate && (
            <button
              type="button"
              onClick={() => onNavigate('train_journey')}
              style={{
                padding: '8px 16px',
                backgroundColor: '#800020',
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                boxShadow: '0 2px 6px rgba(128,0,32,0.2)',
                whiteSpace: 'nowrap'
              }}
            >
              Inspect Coaches & Timetable →
            </button>
          )}
        </div>
      </div>

      {/* Recent Assigned Complaints List */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '24px',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 800, color: '#111827' }}>
              Recent Assigned Tasks ({recent_complaints?.length || 0})
            </h3>
            <p style={{ margin: '2px 0 0 0', fontSize: '0.85rem', color: '#6b7280' }}>
              Grievances assigned to you on active train duty
            </p>
          </div>

          {onNavigate && (
            <button
              onClick={() => onNavigate('complaints')}
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
              View All Complaints
            </button>
          )}
        </div>

        {(!recent_complaints || recent_complaints.length === 0) ? (
          <div style={{ padding: '30px', textAlign: 'center', backgroundColor: '#f9fafb', borderRadius: '8px', color: '#6b7280' }}>
             No active assigned complaints found for your roster duty.
          </div>
        ) : (
          <>
            {/* Desktop / Tablet Table View */}
            <div className="hidden-on-mobile" style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb', textAlign: 'left' }}>
                    <th style={{ padding: '12px 14px', color: '#374151', fontWeight: 700 }}>Complaint ID</th>
                    <th style={{ padding: '12px 14px', color: '#374151', fontWeight: 700 }}>Category</th>
                    <th style={{ padding: '12px 14px', color: '#374151', fontWeight: 700 }}>Coach & Seat</th>
                    <th style={{ padding: '12px 14px', color: '#374151', fontWeight: 700 }}>Priority & Target SLA</th>
                    <th style={{ padding: '12px 14px', color: '#374151', fontWeight: 700 }}>Status</th>
                    <th style={{ padding: '12px 14px', color: '#374151', fontWeight: 700 }}>SLA Status</th>
                    <th style={{ padding: '12px 14px', color: '#374151', fontWeight: 700 }}>Assigned Time</th>
                    <th style={{ padding: '12px 14px', color: '#374151', fontWeight: 700, textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recent_complaints.map((c) => (
                    <tr key={c.complaint_id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 800, color: '#800020' }}>{c.complaint_id}</td>
                      <td style={{ padding: '12px 14px' }}>
                        <div style={{ fontWeight: 700, color: '#111827' }}>{c.main_class || c.category_name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#6b7280' }}>{c.sub_class || c.subcategory_name}</div>
                      </td>
                      <td style={{ padding: '12px 14px', fontWeight: 700, color: '#1f2937' }}>
                        Coach {c.coach_number || 'N/A'} {c.seat_number ? `• Seat ${c.seat_number}` : ''}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <PriorityBadge priority={c.priority} />
                        {c.sla_target_formatted && (
                          <div style={{ fontSize: '0.73rem', color: '#6b7280', fontWeight: 600, marginTop: '2px' }}>
                            Target: {c.sla_target_formatted}
                          </div>
                        )}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <StatusBadge status={c.internal_status} />
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <SLABadge
                          slaStatus={c.sla_status}
                          slaTier={c.sla_tier}
                          slaTimeDetails={c.sla_time_details}
                          slaBreached={c.sla_breached}
                          slaWarning={c.sla_warning}
                          targetFormatted={c.sla1_target_formatted || c.sla_target_formatted}
                        />
                      </td>
                      <td style={{ padding: '12px 14px', color: '#6b7280', fontSize: '0.82rem' }}>
                        {c.created_at || 'Just now'}
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'right' }}>
                        {onNavigate && (
                          <button
                            type="button"
                            onClick={() => onNavigate('complaints')}
                            style={{
                              padding: '6px 12px',
                              backgroundColor: '#800020',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: '6px',
                              fontWeight: 700,
                              fontSize: '0.78rem',
                              cursor: 'pointer'
                            }}
                          >
                            View Task
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Card List View */}
            <div className="visible-on-mobile" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {recent_complaints.map((c) => (
                <div
                  key={c.complaint_id}
                  style={{
                    backgroundColor: '#fafbfc',
                    border: '1px solid #e5e7eb',
                    borderRadius: '10px',
                    padding: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, color: '#800020', fontSize: '0.95rem' }}>
                      {c.complaint_id}
                    </span>
                    <StatusBadge status={c.internal_status} />
                  </div>

                  <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#111827' }}>
                    {c.main_class || c.category_name}
                    <span style={{ fontWeight: 500, color: '#6b7280', fontSize: '0.8rem', marginLeft: '6px' }}>
                      ({c.sub_class || c.subcategory_name})
                    </span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.82rem', color: '#4b5563' }}>
                    <div>
                      <strong>Coach:</strong> {c.coach_number || 'N/A'} {c.seat_number ? `• Seat ${c.seat_number}` : ''}
                    </div>
                    <PriorityBadge priority={c.priority} />
                  </div>

                  <div style={{ backgroundColor: '#ffffff', padding: '8px 10px', borderRadius: '6px', border: '1px solid #f0f0f0' }}>
                    <SLABadge
                      slaStatus={c.sla_status}
                      slaTier={c.sla_tier}
                      slaTimeDetails={c.sla_time_details}
                      slaBreached={c.sla_breached}
                      slaWarning={c.sla_warning}
                      targetFormatted={c.sla1_target_formatted || c.sla_target_formatted}
                    />
                  </div>

                  {onNavigate && (
                    <button
                      type="button"
                      onClick={() => onNavigate('complaints')}
                      style={{
                        width: '100%',
                        padding: '8px',
                        backgroundColor: '#800020',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        cursor: 'pointer',
                        textAlign: 'center',
                        marginTop: '2px'
                      }}
                    >
                      View & Attend Task
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
