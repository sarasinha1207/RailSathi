import React, { useState, useEffect, useMemo } from 'react';
import PriorityBadge from '../../../components/dashboard/PriorityBadge';
import StatusBadge from '../../../components/dashboard/StatusBadge';

export default function StaffComplaintsPage({ user }) {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('active'); // 'all', 'active', 'reassignment', 'resolved'
  const [searchTerm, setSearchTerm] = useState('');

  // Modal States
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showResolveModal, setShowResolveModal] = useState(false);
  const [resolutionRemarks, setResolutionRemarks] = useState('');
  
  const [showReassignModal, setShowReassignModal] = useState(false);
  const [reassignReason, setReassignReason] = useState('Outside Assigned Coach Range');
  const [reassignRemarks, setReassignRemarks] = useState('');

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

  // Filter complaints based on active tab and search term
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      // Search term
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchId = c.complaint_id.toLowerCase().includes(term);
        const matchCat = (c.main_class || c.category_name || '').toLowerCase().includes(term);
        const matchDesc = (c.complaint_description || '').toLowerCase().includes(term);
        const matchCoach = (c.coach_number || '').toLowerCase().includes(term);
        if (!matchId && !matchCat && !matchDesc && !matchCoach) return false;
      }

      // Tab filter
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
  const handleAccept = async (complaintId) => {
    try {
      const res = await fetch(`/api/v1/staff/complaints/${complaintId}/accept`, { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        fetchComplaints();
      } else {
        alert(data.detail || 'Failed to accept task.');
      }
    } catch (err) {
      alert('Network error accepting task.');
    }
  };

  // Handle Mark In Progress
  const handleInProgress = async (complaintId) => {
    try {
      const res = await fetch(`/api/v1/staff/complaints/${complaintId}/progress`, { method: 'POST' });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        fetchComplaints();
      } else {
        alert(data.detail || 'Failed to update task progress.');
      }
    } catch (err) {
      alert('Network error updating task progress.');
    }
  };

  // Handle Submit Resolve Modal
  const handleSubmitResolve = async (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;
    if (!resolutionRemarks || resolutionRemarks.trim().length < 5) {
      alert('Please enter detailed resolution action taken (minimum 5 characters).');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(`/api/v1/staff/complaints/${selectedComplaint.complaint_id}/resolve`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resolution_remarks: resolutionRemarks.trim() })
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setShowResolveModal(false);
        setResolutionRemarks('');
        setSelectedComplaint(null);
        fetchComplaints();
      } else {
        alert(data.detail || 'Failed to resolve grievance.');
      }
    } catch (err) {
      alert('Network error submitting resolution.');
    } finally {
      setSubmitting(false);
    }
  };

  // Handle Submit Reassign Modal
  const handleSubmitReassign = async (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    setSubmitting(true);
    try {
      const res = await fetch(`/api/v1/staff/complaints/${selectedComplaint.complaint_id}/reassign-request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reason: reassignReason, remarks: reassignRemarks.trim() })
      });
      const data = await res.json();
      if (res.ok && data.status === 'success') {
        setShowReassignModal(false);
        setReassignRemarks('');
        setSelectedComplaint(null);
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
            Manage grievances assigned to you on active train duty, log resolution actions, and request reassignments.
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
          { id: 'resolved', label: '✅ Resolved History', count: complaints.filter(c => ['Resolved', 'Closed'].includes(c.internal_status)).length },
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
                  <th style={{ padding: '14px 16px', color: '#374151', fontWeight: 700 }}>Assigned Date</th>
                  <th style={{ padding: '14px 16px', color: '#374151', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((c) => {
                  const isResolved = ['Resolved', 'Closed'].includes(c.internal_status);
                  const isReassignmentRequested = c.internal_status === 'Reassignment Requested';

                  return (
                    <tr key={c.complaint_id} style={{ borderBottom: '1px solid #f3f4f6' }}>
                      <td style={{ padding: '14px 16px', fontWeight: 800, color: '#800020' }}>
                        {c.complaint_id}
                        {c.pnr_number && <div style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 500 }}>PNR: {c.pnr_number}</div>}
                      </td>
                      <td style={{ padding: '14px 16px', maxWidth: '240px' }}>
                        <div style={{ fontWeight: 700, color: '#111827' }}>{c.main_class || c.category_name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#4b5563' }}>{c.sub_class || c.subcategory_name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#6b7280', marginTop: '4px', fontStyle: 'italic', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }} title={c.complaint_description}>
                          "{c.complaint_description}"
                        </div>
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
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end', flexWrap: 'wrap' }}>
                          {/* Accept Button */}
                          {c.internal_status === 'Assigned' && (
                            <button
                              onClick={() => handleAccept(c.complaint_id)}
                              style={{ padding: '6px 12px', backgroundColor: '#2563eb', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                            >
                              Accept Task
                            </button>
                          )}

                          {/* In Progress Button */}
                          {c.internal_status === 'Accepted' && (
                            <button
                              onClick={() => handleInProgress(c.complaint_id)}
                              style={{ padding: '6px 12px', backgroundColor: '#d97706', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                            >
                              Start Working
                            </button>
                          )}

                          {/* Resolve Button */}
                          {!isResolved && !isReassignmentRequested && (
                            <button
                              onClick={() => {
                                setSelectedComplaint(c);
                                setResolutionRemarks(c.resolution_remarks || '');
                                setShowResolveModal(true);
                              }}
                              style={{ padding: '6px 12px', backgroundColor: '#059669', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                            >
                              Resolve
                            </button>
                          )}

                          {/* Request Reassignment Button */}
                          {!isResolved && !isReassignmentRequested && (
                            <button
                              onClick={() => {
                                setSelectedComplaint(c);
                                setShowReassignModal(true);
                              }}
                              style={{ padding: '6px 12px', backgroundColor: '#6b7280', color: '#fff', border: 'none', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                            >
                              Reassign
                            </button>
                          )}

                          {/* View Action if resolved */}
                          {isResolved && (
                            <button
                              onClick={() => alert(`Resolution Remarks:\n${c.resolution_remarks || 'Action completed on duty.'}`)}
                              style={{ padding: '6px 12px', backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
                            >
                              View Remarks
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* RESOLVE MODAL */}
      {showResolveModal && selectedComplaint && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', width: '100%', maxWidth: '520px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', fontWeight: 800, color: '#4a071a' }}>
              Resolve Complaint — {selectedComplaint.complaint_id}
            </h3>
            <p style={{ margin: '0 0 16px 0', fontSize: '0.85rem', color: '#6b7280' }}>
              Coach {selectedComplaint.coach_number} • {selectedComplaint.main_class || selectedComplaint.category_name}
            </p>

            <form onSubmit={handleSubmitResolve}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Action Taken / Resolution Remarks (Mandatory):
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe the action taken to rectify the passenger grievance..."
                  value={resolutionRemarks}
                  onChange={(e) => setResolutionRemarks(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.88rem', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowResolveModal(false)}
                  style={{ padding: '10px 18px', backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{ padding: '10px 20px', backgroundColor: '#059669', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
                >
                  {submitting ? 'Submitting...' : 'Mark Resolved'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REQUEST REASSIGNMENT MODAL */}
      {showReassignModal && selectedComplaint && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', width: '100%', maxWidth: '520px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', fontWeight: 800, color: '#4a071a' }}>
              Request Reassignment — {selectedComplaint.complaint_id}
            </h3>
            <p style={{ margin: '0 0 16px 0', fontSize: '0.85rem', color: '#6b7280' }}>
              Submit a request to CMO Control Desk to reassign this task to another official.
            </p>

            <form onSubmit={handleSubmitReassign}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Reassignment Reason:
                </label>
                <select
                  value={reassignReason}
                  onChange={(e) => setReassignReason(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.88rem' }}
                >
                  <option value="Outside Assigned Coach Range">Outside Assigned Coach Range</option>
                  <option value="Specialized Department Required">Specialized Department Required (e.g. Electrical / RPF)</option>
                  <option value="Off Duty Shift Completed">Off Duty Shift Completed</option>
                  <option value="Active Workload Limit Exceeded">Active Workload Limit Exceeded</option>
                </select>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                  Additional Remarks (Optional):
                </label>
                <textarea
                  rows={3}
                  placeholder="Provide context for the Complaint Officer..."
                  value={reassignRemarks}
                  onChange={(e) => setReassignRemarks(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.88rem', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  onClick={() => setShowReassignModal(false)}
                  style={{ padding: '10px 18px', backgroundColor: '#f3f4f6', color: '#374151', border: '1px solid #d1d5db', borderRadius: '8px', fontWeight: 700, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  style={{ padding: '10px 20px', backgroundColor: '#800020', color: '#ffffff', border: 'none', borderRadius: '8px', fontWeight: 800, cursor: 'pointer' }}
                >
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
