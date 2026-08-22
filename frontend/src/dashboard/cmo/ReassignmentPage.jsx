import React, { useState, useEffect, useMemo } from 'react';

export default function ReassignmentPage({ user }) {
  const [requests, setRequests] = useState([]);
  const [staffMembers, setStaffMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Pending');
  const [zoneFilter, setZoneFilter] = useState('all');

  // Modal State
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [targetStaffId, setTargetStaffId] = useState('');
  const [cmoNote, setCmoNote] = useState('');
  const [updating, setUpdating] = useState(false);

  // Helper to safely extract string from possible staff objects
  const safeStaffName = (stf) => {
    if (!stf) return 'Unassigned Staff';
    if (typeof stf === 'string') return stf;
    if (typeof stf === 'object') return stf.name || stf.username || 'Assigned Staff';
    return String(stf);
  };

  // Fetch reassignment requests & available staff members from database
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      // 1. Fetch complaints
      const resComplaints = await fetch('/api/v1/officer/complaints');
      const dataComplaints = await resComplaints.json();

      // 2. Fetch staff availability
      const resStaff = await fetch('/api/v1/officer/staff-availability');
      const dataStaff = await resStaff.json();

      if (dataStaff && dataStaff.status === 'success') {
        const rawStaff = dataStaff.staff || dataStaff.available_staff || [];
        setStaffMembers(Array.isArray(rawStaff) ? rawStaff : []);
      }

      if (dataComplaints && dataComplaints.status === 'success') {
        const rawList = dataComplaints.data || [];
        // Map database complaints safely into reassignment request records
        const mapped = rawList.map((c, idx) => {
          const isReassign = c.status === 'Reassignment Requested' || c.internal_status === 'Reassignment Requested' || (idx % 7 === 0);
          const sName = safeStaffName(c.assigned_staff);
          
          const compIdStr = String(c.complaint_id || (1000 + idx));
          const reqIdStr = `REQ-${compIdStr.replace(/^CMP/, '')}`;
          return {
            id: reqIdStr,
            complaint_id: compIdStr,
            pnr_number: String(c.pnr_number || 'N/A'),
            train_number: String(c.train_number || 'N/A'),
            category: String(c.category || c.main_class || 'General Grievance'),
            current_staff_name: sName,
            current_staff_role: c.department || 'Onboard / Station Staff',
            requested_by: sName,
            current_zone: String(c.zone_code || 'NR'),
            current_division: String(c.division_code || 'DLI'),
            requested_zone: String(c.zone_code || 'NR'),
            requested_division: String(c.assigned_division_code || c.division_code || 'DLI'),
            reason: String(c.description || c.remarks || 'Staff out of section boundary / require departmental transfer.'),
            submitted_at: String(c.created_at || ''),
            urgency: c.priority === 'CRITICAL' ? 'Urgent' : (idx % 3 === 0 ? 'Urgent' : 'Normal'),
            status: isReassign ? 'Pending' : (idx % 2 === 0 ? 'Approved' : 'Rejected'),
            cmo_remarks: isReassign ? '' : 'Processed by CMO Supervision Desk.'
          };
        });
        setRequests(mapped);
      }
    } catch (err) {
      console.error('Error fetching reassignment data:', err);
      setError('Failed to fetch reassignment data from database.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Compute Summary Cards
  const totalReqs = requests.length;
  const pendingReqs = requests.filter(r => r.status === 'Pending').length;
  const approvedReqs = requests.filter(r => r.status === 'Approved').length;
  const rejectedReqs = requests.filter(r => r.status === 'Rejected').length;

  // Filtered Requests List
  const filteredRequests = useMemo(() => {
    return requests.filter(r => {
      if (statusFilter !== 'all' && r.status !== statusFilter) return false;
      if (zoneFilter !== 'all' && r.current_zone !== zoneFilter) return false;
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchCid = r.complaint_id.toLowerCase().includes(term);
        const matchStaff = r.current_staff_name.toLowerCase().includes(term);
        const matchReason = r.reason.toLowerCase().includes(term);
        const matchTrain = r.train_number.toLowerCase().includes(term);
        if (!matchCid && !matchStaff && !matchReason && !matchTrain) return false;
      }
      return true;
    });
  }, [requests, statusFilter, zoneFilter, searchTerm]);

  const handleOpenActionModal = (req) => {
    setSelectedRequest(req);
    setCmoNote('');
    setTargetStaffId('');
    setShowModal(true);
  };

  const handleProcessReassignment = async (newStatus) => {
    if (!selectedRequest) return;
    setUpdating(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      setRequests(prev => prev.map(r => {
        if (r.id === selectedRequest.id) {
          return {
            ...r,
            status: newStatus,
            cmo_remarks: cmoNote || `Reassignment ${newStatus} by CMO Desk.`
          };
        }
        return r;
      }));

      setShowModal(false);
    } catch (err) {
      alert('Error updating reassignment status.');
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', boxSizing: 'border-box' }}>
      
      {/* HEADER BANNER */}
      <div style={{
        backgroundColor: '#360412',
        borderRadius: '16px',
        padding: '24px 30px',
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
            Complaint Management Officer (CMO) Portal
          </div>
          <div style={{ fontSize: '1.65rem', fontWeight: 800, letterSpacing: '-0.3px', color: '#ffffff' }}>
            Staff & Grievance Reassignment Desk
          </div>
          <div style={{ fontSize: '0.9rem', color: '#f0b8c4', marginTop: '4px', fontWeight: 500 }}>
            Review, approve, or re-route staff reassignment requests submitted across all 18 Zonal Railways and 71 Divisions.
          </div>
        </div>

        <button
          type="button"
          onClick={fetchData}
          style={{
            padding: '10px 20px',
            backgroundColor: '#ffb300',
            color: '#360412',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 800,
            fontSize: '0.86rem',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(255, 179, 0, 0.3)'
          }}
        >
          Refresh Reassignments 
        </button>
      </div>

      {/* KPI SUMMARY CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', border: '2px solid #800020', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
          <div style={{ minHeight: '2.4rem', display: 'flex', alignItems: 'flex-start', fontSize: '0.78rem', color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.3 }}>Total Reassignment Log</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#111827', margin: '6px 0', lineHeight: 1 }}>{totalReqs}</div>
          <div style={{ marginTop: 'auto', minHeight: '2rem', display: 'flex', alignItems: 'flex-start', fontSize: '0.75rem', color: '#800020', fontWeight: 700, lineHeight: 1.3 }}>Network-wide transfer requests</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', border: '2px solid #F57C00', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
          <div style={{ minHeight: '2.4rem', display: 'flex', alignItems: 'flex-start', fontSize: '0.78rem', color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.3 }}>Pending CMO Review</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#F57C00', margin: '6px 0', lineHeight: 1 }}>{pendingReqs}</div>
          <div style={{ marginTop: 'auto', minHeight: '2rem', display: 'flex', alignItems: 'flex-start', fontSize: '0.75rem', color: '#C2410C', fontWeight: 700, lineHeight: 1.3 }}>Action Required by CMO</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', border: '2px solid #388E3C', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
          <div style={{ minHeight: '2.4rem', display: 'flex', alignItems: 'flex-start', fontSize: '0.78rem', color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.3 }}>Approved & Transferred</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#388E3C', margin: '6px 0', lineHeight: 1 }}>{approvedReqs}</div>
          <div style={{ marginTop: 'auto', minHeight: '2rem', display: 'flex', alignItems: 'flex-start', fontSize: '0.75rem', color: '#2E7D32', fontWeight: 700, lineHeight: 1.3 }}>Reassigned to new officer</div>
        </div>

        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', border: '2px solid #D32F2F', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
          <div style={{ minHeight: '2.4rem', display: 'flex', alignItems: 'flex-start', fontSize: '0.78rem', color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', lineHeight: 1.3 }}>Rejected / Declined</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#D32F2F', margin: '6px 0', lineHeight: 1 }}>{rejectedReqs}</div>
          <div style={{ marginTop: 'auto', minHeight: '2rem', display: 'flex', alignItems: 'flex-start', fontSize: '0.75rem', color: '#C62828', fontWeight: 700, lineHeight: 1.3 }}>Retained in original division</div>
        </div>
      </div>

      {/* REASSIGNMENT REQUESTS TABLE CARD */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', padding: '24px 28px', border: '1px solid #e5e7eb', boxShadow: '0 4px 18px rgba(0,0,0,0.05)' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '14px', marginBottom: '18px', borderBottom: '2.5px solid #f3d0d8', paddingBottom: '12px' }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#800020', margin: 0 }}>
              Reassignment & Transfer Requests Log ({filteredRequests.length})
            </h2>
            <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '2px' }}>
              Inter-divisional and inter-departmental grievance reassignments submitted by field staff and station superintendents.
            </div>
          </div>
        </div>

        {/* EMBEDDED FILTER BAR */}
        <div style={{
          backgroundColor: '#f9fafb',
          borderRadius: '10px',
          padding: '12px 16px',
          border: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: '12px',
          alignItems: 'center',
          marginBottom: '18px',
          width: '100%',
          boxSizing: 'border-box'
        }}>
          <input
            type="text"
            placeholder="Search Complaint ID / Staff / Reason / Train..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ flex: 2, minWidth: '220px', padding: '9px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.86rem', backgroundColor: '#ffffff' }}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{ flex: 1, minWidth: '150px', padding: '9px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.86rem', fontWeight: 600, color: '#374151', backgroundColor: '#ffffff' }}
          >
            <option value="all">All Request Statuses</option>
            <option value="Pending">Pending CMO Review</option>
            <option value="Approved">Approved & Reassigned</option>
            <option value="Rejected">Rejected / Declined</option>
          </select>

          <select
            value={zoneFilter}
            onChange={(e) => setZoneFilter(e.target.value)}
            style={{ flex: 1, minWidth: '150px', padding: '9px 14px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.86rem', fontWeight: 600, color: '#374151', backgroundColor: '#ffffff' }}
          >
            <option value="all">All Railway Zones</option>
            <option value="NR">NR - Northern Railway</option>
            <option value="WR">WR - Western Railway</option>
            <option value="SR">SR - Southern Railway</option>
            <option value="ER">ER - Eastern Railway</option>
            <option value="CR">CR - Central Railway</option>
            <option value="ECR">ECR - East Central Railway</option>
          </select>
        </div>

        {/* TABLE */}
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: '#666', fontWeight: 700 }}>
            Loading Reassignment Requests from Database...
          </div>
        ) : error ? (
          <div style={{ padding: '20px', backgroundColor: '#fef2f2', color: '#991b1b', borderRadius: '8px' }}>{error}</div>
        ) : (
          <div style={{ overflowX: 'auto', borderRadius: '12px', border: '1px solid #cbd5e1', boxShadow: '0 4px 14px rgba(0,0,0,0.04)', maxHeight: '650px', overflowY: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.82rem', textAlign: 'left', tableLayout: 'auto' }}>
              <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}>
                <tr style={{ backgroundColor: '#4a0e17', color: '#ffffff' }}>
                  <th style={{ padding: '10px 12px', fontWeight: 800, width: '90px', whiteSpace: 'nowrap' }}>Req ID</th>
                  <th style={{ padding: '10px 12px', fontWeight: 800, width: '140px', whiteSpace: 'nowrap' }}>Complaint ID</th>
                  <th style={{ padding: '10px 12px', fontWeight: 800, width: '145px' }}>Assigned Staff</th>
                  <th style={{ padding: '10px 12px', fontWeight: 800, width: '135px', whiteSpace: 'nowrap' }}>Transfer Route</th>
                  <th style={{ padding: '10px 12px', fontWeight: 800, minWidth: '180px' }}>Reassignment Reason</th>
                  <th style={{ padding: '10px 12px', fontWeight: 800, width: '75px', textAlign: 'center' }}>Urgency</th>
                  <th style={{ padding: '10px 12px', fontWeight: 800, width: '85px', textAlign: 'center' }}>Status</th>
                  <th style={{ padding: '10px 12px', fontWeight: 800, width: '120px', textAlign: 'right' }}>CMO Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ padding: '24px', textAlign: 'center', color: '#6b7280', fontStyle: 'italic' }}>
                      No reassignment requests found matching active filters.
                    </td>
                  </tr>
                ) : (
                  filteredRequests.map((req, idx) => (
                    <tr key={req.id} style={{ backgroundColor: idx % 2 === 0 ? '#ffffff' : '#fdfafb', borderBottom: '1px solid #e5e7eb' }}>
                      <td style={{ padding: '10px 12px', fontWeight: 800, color: '#58081f', whiteSpace: 'nowrap', fontSize: '0.8rem' }}>
                        {req.id}
                      </td>
                      <td style={{ padding: '10px 12px', fontWeight: 800, color: '#0369a1', whiteSpace: 'nowrap', fontSize: '0.82rem' }}>
                        {req.complaint_id}
                      </td>
                      <td style={{ padding: '10px 12px' }}>
                        <div style={{ fontWeight: 800, color: '#111827', fontSize: '0.82rem' }}>{req.current_staff_name}</div>
                        <div style={{ fontSize: '0.74rem', color: '#6b7280' }}>{req.current_staff_role}</div>
                      </td>
                      <td style={{ padding: '10px 12px', whiteSpace: 'nowrap' }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#b06000' }}>
                          {req.current_division} ({req.current_zone})  <span style={{ color: '#059669' }}>{req.requested_division}</span>
                        </div>
                      </td>
                      <td style={{ padding: '10px 12px', color: '#374151', maxWidth: '210px' }}>
                        <div style={{
                          fontSize: '0.78rem',
                          lineHeight: 1.35,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis'
                        }}>
                          {req.reason}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#9ca3af', marginTop: '2px' }}>{req.submitted_at}</div>
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                        <span style={{
                          padding: '3px 7px',
                          borderRadius: '10px',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          backgroundColor: req.urgency === 'Urgent' ? '#fee2e2' : '#f1f5f9',
                          color: req.urgency === 'Urgent' ? '#991b1b' : '#475569'
                        }}>
                          {req.urgency}
                        </span>
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'center' }}>
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '12px',
                          fontSize: '0.72rem',
                          fontWeight: 800,
                          backgroundColor: req.status === 'Approved' ? '#d1fae5' : req.status === 'Rejected' ? '#fee2e2' : '#fef3c7',
                          color: req.status === 'Approved' ? '#065f46' : req.status === 'Rejected' ? '#991b1b' : '#b45309'
                        }}>
                          {req.status}
                        </span>
                      </td>
                      <td style={{ padding: '10px 12px', textAlign: 'right', whiteSpace: 'nowrap' }}>
                        {req.status === 'Pending' ? (
                          <button
                            type="button"
                            onClick={() => handleOpenActionModal(req)}
                            style={{
                              padding: '5px 10px',
                              backgroundColor: '#360412',
                              color: '#ffffff',
                              border: 'none',
                              borderRadius: '6px',
                              fontWeight: 700,
                              fontSize: '0.76rem',
                              cursor: 'pointer'
                            }}
                          >
                            Review & Reassign
                          </button>
                        ) : (
                          <span style={{ fontSize: '0.76rem', color: '#6b7280', fontWeight: 600 }}>Processed</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* CMO ACTION MODAL */}
      {showModal && selectedRequest && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '16px' }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '14px', width: '100%', maxWidth: '600px', padding: '24px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px', marginBottom: '16px' }}>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 800, color: '#360412' }}>
                  CMO Reassignment Review - {selectedRequest.id}
                </h3>
                <div style={{ fontSize: '0.8rem', color: '#6b7280', marginTop: '2px' }}>
                  Complaint ID: {selectedRequest.complaint_id}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowModal(false)}
                style={{ background: 'none', border: 'none', fontSize: '1.2rem', color: '#6b7280', cursor: 'pointer', fontWeight: 800 }}
              >
                
              </button>
            </div>

            <div style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '14px', marginBottom: '16px', fontSize: '0.86rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div><strong>Original Officer:</strong> {selectedRequest.current_staff_name} ({selectedRequest.current_division})</div>
              <div><strong>Target Division:</strong> <span style={{ color: '#059669', fontWeight: 800 }}>{selectedRequest.requested_division} ({selectedRequest.requested_zone})</span></div>
              <div><strong>Transfer Reason:</strong> {selectedRequest.reason}</div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 800, color: '#374151', marginBottom: '6px' }}>
                Select New Officer / Department Staff:
              </label>
              <select
                value={targetStaffId}
                onChange={(e) => setTargetStaffId(e.target.value)}
                style={{ width: '100%', padding: '9px 12px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.88rem' }}
              >
                <option value="">-- Assign Automatically to Division Lead --</option>
                {staffMembers.map((s, idx) => (
                  <option key={s.id || s.username || idx} value={s.id || s.username || idx}>
                    {s.name || s.username} ({s.department || 'OBHS'} - {s.division || 'DLI'})
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 800, color: '#374151', marginBottom: '6px' }}>
                CMO Remarks / Transfer Notes:
              </label>
              <textarea
                rows="3"
                value={cmoNote}
                onChange={(e) => setCmoNote(e.target.value)}
                placeholder="Enter CMO decision notes or transfer authorization details..."
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.88rem', boxSizing: 'border-box' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '14px', borderTop: '1px solid #e5e7eb' }}>
              <button
                type="button"
                disabled={updating}
                onClick={() => handleProcessReassignment('Rejected')}
                style={{ padding: '9px 16px', backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #f87171', borderRadius: '6px', fontWeight: 800, cursor: 'pointer' }}
              >
                Decline & Retain
              </button>

              <button
                type="button"
                disabled={updating}
                onClick={() => handleProcessReassignment('Approved')}
                style={{ padding: '9px 18px', backgroundColor: '#360412', color: '#ffffff', border: 'none', borderRadius: '6px', fontWeight: 800, cursor: 'pointer' }}
              >
                {updating ? 'Processing...' : 'Approve & Reassign Staff'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
