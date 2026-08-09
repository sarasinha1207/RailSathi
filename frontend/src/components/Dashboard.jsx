import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/v1/dashboard/complaints');
        if (res.ok) {
          const data = await res.json();
          setComplaints(data);
          setError(false);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Failed to fetch dashboard data:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  const total = complaints.length;
  const openCount = complaints.filter(c => c.complaint_status === 'Open' || c.complaint_status === 'Pending').length;
  const resolvedCount = complaints.filter(c => c.complaint_status === 'Resolved' || c.complaint_status === 'Closed').length;

  return (
    <div style={{ width: '100%', maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', boxSizing: 'border-box' }}>
      <div style={{ marginBottom: '30px' }}>
        <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-color)', margin: '0 0 8px 0' }}>
          Official Grievance Monitoring Dashboard
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', margin: 0 }}>
          Real-time passenger complaint registry & status overview
        </p>
      </div>

      {/* Basic Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '35px' }}>
        <div style={{ background: '#ffffff', padding: '20px 24px', borderRadius: '10px', border: '1px solid var(--border-color)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Total Complaints</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-color)' }}>{total.toLocaleString()}</div>
        </div>

        <div style={{ background: '#ffffff', padding: '20px 24px', borderRadius: '10px', border: '1px solid var(--border-color)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Open / Pending</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#d97706' }}>{openCount.toLocaleString()}</div>
        </div>

        <div style={{ background: '#ffffff', padding: '20px 24px', borderRadius: '10px', border: '1px solid var(--border-color)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>Resolved</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#16a34a' }}>{resolvedCount.toLocaleString()}</div>
        </div>
      </div>

      {/* Complaints Data Table */}
      <div style={{ background: '#ffffff', borderRadius: '12px', border: '1px solid var(--border-color)', boxShadow: '0 2px 10px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1e293b', margin: 0 }}>Recent Complaints Registry</h3>
          <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>Showing latest records</span>
        </div>

        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#64748b' }}>Loading database complaints...</div>
        ) : error ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#dc2626' }}>Failed to load complaints. Please verify authentication.</div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ background: '#f8fafc', borderBottom: '2px solid var(--border-color)', color: '#475569', textAlign: 'left' }}>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>Complaint ID</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>Type</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>Category</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>Zone / Division</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>Priority</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>Status</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700 }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {complaints.slice(0, 20).map((c, i) => (
                  <tr key={c.complaint_id} style={{ borderBottom: '1px solid #f1f5f9', background: i % 2 === 0 ? '#ffffff' : '#fafafa' }}>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: 'var(--primary-color)' }}>{c.complaint_id}</td>
                    <td style={{ padding: '12px 16px', color: '#1e293b' }}>{c.complaint_type}</td>
                    <td style={{ padding: '12px 16px', color: '#1e293b' }}>{c.main_class}</td>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>{c.zone_code} {c.division_name ? `/ ${c.division_name}` : ''}</td>
                    <td style={{ padding: '12px 16px', fontWeight: 700, color: c.priority === 'Critical' ? '#dc2626' : '#1e293b' }}>{c.priority}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        padding: '4px 10px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 700,
                        background: c.complaint_status === 'Resolved' || c.complaint_status === 'Closed' ? '#ecfdf5' : '#fffbeb',
                        color: c.complaint_status === 'Resolved' || c.complaint_status === 'Closed' ? '#047857' : '#b45309'
                      }}>
                        {c.complaint_status}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', color: '#64748b' }}>{c.incident_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
