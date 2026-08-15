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
      {/* Top Banner Matching CMO Dashboard Header */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        borderLeft: '5px solid #800020',
        border: '1px solid #e5e7eb',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', fontWeight: 800, color: '#800020' }}>
            Assigned Complaints Workspace
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', color: '#6b7280' }}>
            Click any complaint to view full audit record, passenger description, log remarks, and mark as closed.
          </p>
        </div>

        <input
          type="text"
          placeholder="Search Complaint ID, Coach, Category..."
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
          { id: 'active', label: 'Active Tasks', count: complaints.filter(c => ['Assigned', 'Accepted', 'In Progress', 'Pending Review', 'Under Review'].includes(c.internal_status)).length },
          { id: 'reassignment', label: 'Reassignment Requested', count: complaints.filter(c => c.internal_status === 'Reassignment Requested').length },
          { id: 'resolved', label: 'Resolved / Closed', count: complaints.filter(c => ['Resolved', 'Closed'].includes(c.internal_status)).length },
          { id: 'all', label: 'All Complaints', count: complaints.length }
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
                color: isActive ? '#800020' : '#6b7280',
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
                          View Record
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

      {/* --- COMPLAINT AUDIT RECORD MODAL (IDENTICAL LAYOUT TO CMO VIEW MODAL) --- */}
      {selectedComplaint && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', maxWidth: '650px', width: '90%', boxShadow: '0 10px 25px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#800020', fontSize: '1.3rem', fontWeight: 800 }}>
              Complaint Audit Record — {selectedComplaint.complaint_id}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.85rem', color: '#374151', marginBottom: '16px' }}>
              <div><strong>Passenger PNR:</strong> {selectedComplaint.pnr_number || 'N/A'}</div>
              <div><strong>Phone Number:</strong> {selectedComplaint.phone_number || 'N/A'}</div>
              <div><strong>Train Number / Coach:</strong> Train {selectedComplaint.train_number || '22477'} (Coach {selectedComplaint.coach_number || 'N/A'})</div>
              <div><strong>Zone / Division:</strong> {selectedComplaint.zone_code || 'NR'} / {selectedComplaint.assigned_division_code || 'DLI'}</div>
              <div><strong>Category & Subcategory:</strong> {selectedComplaint.main_class || selectedComplaint.category_name}</div>
              <div><strong>Submitted At:</strong> {selectedComplaint.created_at || 'Just now'}</div>
              <div><strong>Priority:</strong> <PriorityBadge priority={selectedComplaint.priority} /></div>
              <div><strong>Internal Status:</strong> <StatusBadge status={selectedComplaint.internal_status} /></div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <strong style={{ fontSize: '0.88rem', color: '#111827' }}>Full Complaint Description:</strong>
              <div style={{ backgroundColor: '#f9fafb', padding: '12px', borderRadius: '6px', border: '1px solid #e5e7eb', marginTop: '6px', fontSize: '0.85rem', lineHeight: 1.5, color: '#1f2937' }}>
                {selectedComplaint.complaint_description || selectedComplaint.description || 'No description provided.'}
              </div>
            </div>

            {/* Staff Task Action Buttons */}
            {!['Resolved', 'Closed'].includes(selectedComplaint.internal_status) && (
              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                {selectedComplaint.internal_status === 'Assigned' && (
                  <button
                    type="button"
                    onClick={() => handleAcceptTask(selectedComplaint.complaint_id)}
                    disabled={submitting}
                    style={{ flex: 1, padding: '8px 16px', backgroundColor: '#2563eb', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                  >
                    {submitting ? 'Updating...' : 'Accept Task'}
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setShowReassignForm(!showReassignForm)}
                  style={{ flex: 1, padding: '8px 16px', backgroundColor: '#6b7280', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}
                >
                  Request Reassignment
                </button>
              </div>
            )}

            {/* Reassignment Reason Input Form (Toggled) */}
            {showReassignForm && (
              <form onSubmit={handleRequestReassign} style={{ backgroundColor: '#fef2f2', padding: '14px', borderRadius: '8px', border: '1px solid #fecaca', marginBottom: '16px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#991b1b', marginBottom: '8px' }}>
                  Reassign Task to CMO Control Desk
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#374151', marginBottom: '4px' }}>
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
                  style={{ padding: '6px 14px', backgroundColor: '#991b1b', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: 700, fontSize: '0.8rem', cursor: 'pointer' }}
                >
                  {submitting ? 'Submitting...' : 'Submit Reassignment Request'}
                </button>
              </form>
            )}

            {/* Staff Remarks Section */}
            <form onSubmit={handleCloseComplaint}>
              <div style={{ marginBottom: '16px' }}>
                <strong style={{ display: 'block', fontSize: '0.88rem', color: '#111827', marginBottom: '6px' }}>
                  Action Taken / Staff Remarks (Required to Close):
                </strong>
                <textarea
                  rows={3}
                  required={!['Resolved', 'Closed'].includes(selectedComplaint.internal_status)}
                  disabled={['Resolved', 'Closed'].includes(selectedComplaint.internal_status)}
                  placeholder="Enter detailed action taken (e.g. Served fresh meal tray to seat C3-42, rectified AC cooling, etc.)..."
                  value={staffRemark}
                  onChange={(e) => setStaffRemark(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.85rem', boxSizing: 'border-box', lineHeight: 1.5 }}
                />
              </div>

              {/* Modal Footer Controls */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', paddingTop: '8px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedComplaint(null)}
                  style={{ padding: '8px 18px', borderRadius: '6px', border: '1px solid #d1d5db', backgroundColor: '#f3f4f6', color: '#374151', fontWeight: 700, cursor: 'pointer' }}
                >
                  Close Record
                </button>

                {!['Resolved', 'Closed'].includes(selectedComplaint.internal_status) && (
                  <button
                    type="submit"
                    disabled={submitting}
                    style={{ padding: '8px 18px', borderRadius: '6px', border: 'none', backgroundColor: '#800020', color: '#fff', fontWeight: 700, cursor: 'pointer' }}
                  >
                    {submitting ? 'Closing...' : 'Mark Resolved & Close'}
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
