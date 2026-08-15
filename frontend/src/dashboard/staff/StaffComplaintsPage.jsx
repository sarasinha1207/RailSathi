import React, { useState, useEffect, useMemo } from 'react';
import PriorityBadge from '../../components/dashboard/PriorityBadge';
import StatusBadge from '../../components/dashboard/StatusBadge';

export default function StaffComplaintsPage({ user }) {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('active'); // 'all', 'active', 'reassignment', 'resolved'
  const [searchTerm, setSearchTerm] = useState('');

  // Main Complaint Detail & Action Modal State
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [staffRemark, setStaffRemark] = useState('');
  const [reassignReason, setReassignReason] = useState('Outside Assigned Coach Range');
  const [showReassignForm, setShowReassignForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const fetchComplaints = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/v1/staff/me/complaints');
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setComplaints(data.data || []);
      } else {
        setError(data.detail || 'Failed to fetch assigned complaints.');
      }
    } catch (err) {
      setError('Network error loading assigned complaints list.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchId = c.complaint_id.toLowerCase().includes(term);
        const matchCat = (c.main_class || c.category_name || '').toLowerCase().includes(term);
        const matchDesc = (c.complaint_description || '').toLowerCase().includes(term);
        const matchCoach = (c.coach_number || '').toLowerCase().includes(term);
        if (!matchId && !matchCat && !matchDesc && !matchCoach) return false;
      }

      if (activeTab === 'active') {
        return ['Assigned', 'Accepted', 'In Progress', 'Pending Review', 'Under Review'].includes(c.internal_status);
      }
      if (activeTab === 'reassignment') {
        return c.internal_status === 'Reassignment Requested';
      }
      if (activeTab === 'resolved') {
        return ['Resolved', 'Closed'].includes(c.internal_status);
      }
      return true;
    });
  }, [complaints, activeTab, searchTerm]);

  // Handle Accept Task
  const handleAcceptTask = async (complaintId) => {
    setSubmitting(true);
    try {
      const res = await fetch(`/api/v1/staff/complaints/${complaintId}/accept`, { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        fetchComplaints();
        if (selectedComplaint && selectedComplaint.complaint_id === complaintId) {
          setSelectedComplaint({ ...selectedComplaint, internal_status: 'Accepted' });
        }
      } else {
        alert(data.detail || 'Failed to accept task.');
      }
    } catch (err) {
      alert('Network error accepting task.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Request Reassign
  const handleRequestReassign = async (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/v1/staff/complaints/${selectedComplaint.complaint_id}/reassign-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: reassignReason, remarks: staffRemark.trim() })
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setSelectedComplaint(null);
        setStaffRemark('');
        setShowReassignForm(false);
        fetchComplaints();
      } else {
        alert(data.detail || 'Failed to submit reassignment request.');
      }
    } catch (err) {
      alert('Network error submitting reassignment request.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Close / Resolve Complaint with Remark
  const handleCloseComplaint = async (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;
    if (!staffRemark || staffRemark.trim().length < 5) {
      alert('Please enter action taken remarks before closing the complaint (minimum 5 characters).');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/v1/staff/complaints/${selectedComplaint.complaint_id}/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resolution_remarks: staffRemark.trim() })
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setSelectedComplaint(null);
        setStaffRemark('');
        setShowReassignForm(false);
        fetchComplaints();
      } else {
        alert(data.detail || 'Failed to close complaint.');
      }
    } catch (err) {
      alert('Network error marking complaint as closed.');
    } finally {
      setSubmitting(false);
    }
  };

  const openComplaintModal = (cmp) => {
    setSelectedComplaint(cmp);
    setStaffRemark(cmp.resolution_remarks || '');
    setShowReassignForm(false);
  };

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
            Assigned Complaints Workspace
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', color: '#6b7280' }}>
            Click any complaint to view full overview, passenger description, add remarks, and mark as closed.
          </p>
        </div>

        <input
          type="text"
          placeholder="🔍 Search Complaint ID, Coach, Category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '10px 16px',
            borderRadius: '8px',
            border: '1px solid #d1d5db',
            fontSize: '0.88rem',
            width: '280px'
          }}
        />
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', borderBottom: '2px solid #e5e7eb', paddingBottom: '2px' }}>
        {[
          { id: 'active', label: '🔥 Active Tasks', count: complaints.filter(c => ['Assigned', 'Accepted', 'In Progress', 'Pending Review', 'Under Review'].includes(c.internal_status)).length },
          { id: 'reassignment', label: '🔄 Reassignment Requested', count: complaints.filter(c => c.internal_status === 'Reassignment Requested').length },
          { id: 'resolved', label: '✅ Resolved / Closed', count: complaints.filter(c => ['Resolved', 'Closed'].includes(c.internal_status)).length },
          { id: 'all', label: '📋 All Complaints', count: complaints.length }
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: '10px 18px',
                border: 'none',
                background: 'none',
                fontSize: '0.92rem',
                fontWeight: isActive ? 800 : 600,
                color: isActive ? '#4a071a' : '#6b7280',
                borderBottom: isActive ? '3px solid #800020' : '3px solid transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease'
              }}
            >
              {tab.label} ({tab.count})
            </button>
          );
        })}
      </div>

      {/* Complaints Table */}
      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center', color: '#666' }}>Loading assigned tasks...</div>
      ) : error ? (
        <div style={{ padding: '20px', backgroundColor: '#fef2f2', color: '#991b1b', borderRadius: '8px' }}>{error}</div>
      ) : filteredComplaints.length === 0 ? (
        <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#ffffff', borderRadius: '12px', color: '#6b7280', border: '1px solid #e5e7eb' }}>
          No complaints found matching selected view.
        </div>
      ) : (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #e5e7eb', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem' }}>
              <thead>
                <tr style={{ backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb', textAlign: 'left' }}>
                  <th style={{ padding: '14px 16px', color: '#374151', fontWeight: 700 }}>Complaint ID</th>
                  <th style={{ padding: '14px 16px', color: '#374151', fontWeight: 700 }}>Category & Subcategory</th>
                  <th style={{ padding: '14px 16px', color: '#374151', fontWeight: 700 }}>Coach & Seat</th>
                  <th style={{ padding: '14px 16px', color: '#374151', fontWeight: 700 }}>Priority</th>
                  <th style={{ padding: '14px 16px', color: '#374151', fontWeight: 700 }}>Status</th>
                  <th style={{ padding: '14px 16px', color: '#374151', fontWeight: 700 }}>Registered Date</th>
                  <th style={{ padding: '14px 16px', color: '#374151', fontWeight: 700, textAlign: 'right' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((c) => {
                  return (
                    <tr
                      key={c.complaint_id}
                      onClick={() => openComplaintModal(c)}
                      style={{ borderBottom: '1px solid #f3f4f6', cursor: 'pointer', transition: 'background-color 0.15s ease' }}
                      onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8fafc'}
                      onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#ffffff'}
                    >
                      <td style={{ padding: '14px 16px', fontWeight: 800, color: '#800020' }}>
                        {c.complaint_id}
                        {c.pnr_number && <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 500 }}>PNR: {c.pnr_number}</div>}
                      </td>
                      <td style={{ padding: '14px 16px', maxWidth: '240px' }}>
                        <div style={{ fontWeight: 700, color: '#111827' }}>{c.main_class || c.category_name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#4b5563' }}>{c.sub_class || c.subcategory_name}</div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ fontWeight: 800, color: '#1f2937' }}>
                          Coach {c.coach_number || 'N/A'}
                        </span>
                        {c.seat_number && <div style={{ fontSize: '0.8rem', color: '#4b5563', fontWeight: 600 }}>Seat {c.seat_number}</div>}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <PriorityBadge priority={c.priority} />
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <StatusBadge status={c.internal_status} />
                      </td>
                      <td style={{ padding: '14px 16px', color: '#6b7280', fontSize: '0.82rem' }}>
                        {c.created_at || 'Just now'}
                      </td>
                      <td style={{ padding: '14px 16px', textAlign: 'right' }}>
                        <button
                          onClick={(e) => { e.stopPropagation(); openComplaintModal(c); }}
                          style={{ padding: '6px 14px', backgroundColor: '#800020', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}
                        >
                          🔍 View & Resolve
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* COMPLAINT OVERVIEW & ACTION MODAL */}
      {selectedComplaint && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '16px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            width: '100%',
            maxWidth: '680px',
            maxHeight: '90vh',
            overflowY: 'auto',
            padding: '28px',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)',
            boxSizing: 'border-box'
          }}>
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e5e7eb', paddingBottom: '16px', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '0.78rem', color: '#ffb300', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  COMPLAINT OVERVIEW & ACTION CENTER
                </div>
                <h3 style={{ margin: '2px 0 0 0', fontSize: '1.4rem', fontWeight: 800, color: '#4a071a' }}>
                  {selectedComplaint.complaint_id}
                </h3>
              </div>
              <button
                onClick={() => setSelectedComplaint(null)}
                style={{ backgroundColor: '#f3f4f6', border: 'none', width: '32px', height: '32px', borderRadius: '50%', fontSize: '1.1rem', cursor: 'pointer', color: '#4b5563', fontWeight: 800 }}
              >
                ✕
              </button>
            </div>

            {/* Overview Metadata Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', backgroundColor: '#f8fafc', padding: '16px', borderRadius: '10px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 700 }}>TRAIN & COACH</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#111827', marginTop: '2px' }}>
                  Train {selectedComplaint.train_number} • Coach {selectedComplaint.coach_number || 'N/A'} {selectedComplaint.seat_number ? `(Seat ${selectedComplaint.seat_number})` : ''}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 700 }}>PNR NUMBER</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#111827', marginTop: '2px' }}>
                  {selectedComplaint.pnr_number || 'N/A'}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 700 }}>CATEGORY</div>
                <div style={{ fontSize: '0.95rem', fontWeight: 800, color: '#111827', marginTop: '2px' }}>
                  {selectedComplaint.main_class || selectedComplaint.category_name}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 700 }}>PRIORITY & STATUS</div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '4px' }}>
                  <PriorityBadge priority={selectedComplaint.priority} />
                  <StatusBadge status={selectedComplaint.internal_status} />
                </div>
              </div>
            </div>

            {/* Passenger Complaint Description */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 800, color: '#111827', marginBottom: '6px' }}>
                📝 Passenger Complaint Description:
              </label>
              <div style={{ backgroundColor: '#fffbe8', padding: '14px 16px', borderRadius: '10px', border: '1px solid #fde68a', fontSize: '0.92rem', color: '#92400e', lineHeight: '1.5' }}>
                "{selectedComplaint.complaint_description}"
              </div>
            </div>

            {/* Action Buttons Section: Accept & Reassign */}
            {!['Resolved', 'Closed'].includes(selectedComplaint.internal_status) && (
              <div style={{ display: 'flex', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {selectedComplaint.internal_status === 'Assigned' && (
                  <button
                    type="button"
                    onClick={() => handleAcceptTask(selectedComplaint.complaint_id)}
                    disabled={submitting}
                    style={{ flex: 1, padding: '10px 16px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 800, fontSize: '0.88rem', cursor: 'pointer' }}
                  >
                    {submitting ? 'Updating...' : '✅ Accept Task'}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setShowReassignForm(!showReassignForm)}
                  style={{ flex: 1, padding: '10px 16px', backgroundColor: '#6b7280', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 800, fontSize: '0.88rem', cursor: 'pointer' }}
                >
                  🔄 Request Reassignment
                </button>
              </div>
            )}

            {/* Reassignment Reason Input Form (Toggled) */}
            {showReassignForm && (
              <form onSubmit={handleRequestReassign} style={{ backgroundColor: '#fef2f2', padding: '16px', borderRadius: '10px', border: '1px solid #fecaca', marginBottom: '20px' }}>
                <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#991b1b', marginBottom: '10px' }}>
                  Reassign Task to CMO Control Desk
                </div>
                <div style={{ marginBottom: '12px' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
                    Select Reassignment Reason:
                  </label>
                  <select
                    value={reassignReason}
                    onChange={(e) => setReassignReason(e.target.value)}
                    style={{ width: '100%', padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.85rem' }}
                  >
                    <option value="Outside Assigned Coach Range">Outside Assigned Coach Range</option>
                    <option value="Specialized Department Required">Specialized Department Required (Electrical / RPF)</option>
                    <option value="Off Duty Shift Completed">Off Duty Shift Completed</option>
                    <option value="Active Workload Limit Exceeded">Active Workload Limit Exceeded</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{ padding: '8px 16px', backgroundColor: '#991b1b', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: 800, fontSize: '0.82rem', cursor: 'pointer' }}
                >
                  {submitting ? 'Submitting...' : 'Submit Reassignment Request'}
                </button>
              </form>
            )}

            {/* Staff Remarks Section */}
            <form onSubmit={handleCloseComplaint}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 800, color: '#111827', marginBottom: '6px' }}>
                  💬 Staff Action Taken / Remarks (Required to Close):
                </label>
                <textarea
                  rows={4}
                  required={!['Resolved', 'Closed'].includes(selectedComplaint.internal_status)}
                  disabled={['Resolved', 'Closed'].includes(selectedComplaint.internal_status)}
                  placeholder="Enter detailed action taken (e.g. Served fresh meal tray to seat C3-42, rectified AC cooling, etc.)..."
                  value={staffRemark}
                  onChange={(e) => setStaffRemark(e.target.value)}
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '0.88rem', boxSizing: 'border-box' }}
                />
              </div>

              {/* Modal Action Buttons: Close Complaint & Dismiss */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedComplaint(null)}
                  style={{ padding: '10px 18px', backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Dismiss
                </button>

                {!['Resolved', 'Closed'].includes(selectedComplaint.internal_status) && (
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{ padding: '10px 22px', backgroundColor: '#059669', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', boxShadow: '0 2px 8px rgba(5,150,105,0.25)' }}
                  >
                    {submitting ? 'Closing...' : '🔒 Close & Mark Resolved'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
