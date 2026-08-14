import React, { useState, useEffect } from 'react';
import { officerService } from '../../../services/officerService';
import KPICard from '../../../components/dashboard/KPICard';
import StatusBadge from '../../../components/dashboard/StatusBadge';
import PriorityBadge from '../../../components/dashboard/PriorityBadge';
import FilterBar from '../../../components/dashboard/FilterBar';

export default function OfficerDashboardPage({ user }) {
  const [metrics, setMetrics] = useState({
    total_pending: 0,
    under_review: 0,
    assigned: 0,
    high_critical: 0,
    reassignment_requests: 0
  });

  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMsg, setSuccessMsg] = useState('');

  // Filters
  const [activeTab, setActiveTab] = useState('review_queue'); // review_queue, reassignment_requests, all
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [deptFilter, setDeptFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Categories master list for verification dropdown
  const [categories, setCategories] = useState([]);

  // Selected complaint for verification/assignment modal
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Verification Form State
  const [verifiedCategoryCode, setVerifiedCategoryCode] = useState('');
  const [verifiedPriority, setVerifiedPriority] = useState('Medium');
  const [isCritical, setIsCritical] = useState(false);
  const [verificationRemarks, setVerificationRemarks] = useState('');
  const [verifying, setVerifying] = useState(false);

  // Staff Assignment State
  const [availableStaff, setAvailableStaff] = useState([]);
  const [loadingStaff, setLoadingStaff] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [reassignReason, setReassignReason] = useState('');
  const [assigning, setAssigning] = useState(false);

  // Fetch complaints & metrics
  const fetchComplaints = async () => {
    setLoading(true);
    setError(null);
    try {
      let st = 'all';
      if (activeTab === 'review_queue') {
        st = 'Assigned';
      } else if (activeTab === 'reassignment_requests') {
        st = 'Reassignment Requested';
      }

      const params = {};
      if (st && st !== 'all') params.status = st;
      if (priorityFilter && priorityFilter !== 'all') params.priority = priorityFilter;
      if (deptFilter && deptFilter !== 'all') params.department_code = deptFilter;
      if (searchTerm) params.search = searchTerm;

      const data = await officerService.getComplaints(params);
      setComplaints(data.data || []);
      if (data.metrics) setMetrics(data.metrics);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories master list
  useEffect(() => {
    fetch('/api/v1/categories')
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error loading categories", err));
  }, []);

  useEffect(() => {
    fetchComplaints();
  }, [activeTab, statusFilter, priorityFilter, deptFilter, searchTerm]);

  // Open Verification Modal
  const handleOpenVerify = (cmp) => {
    setSelectedComplaint(cmp);
    setVerifiedCategoryCode(cmp.verified_category_code || cmp.category_code || '');
    setVerifiedPriority(cmp.priority || 'Medium');
    setIsCritical(cmp.is_critical || false);
    setVerificationRemarks(cmp.verification_remarks || '');
    setShowVerifyModal(true);
  };

  // Submit Verification
  const handleVerifySubmit = async (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;
    setVerifying(true);
    try {
      const data = await officerService.verifyComplaint(selectedComplaint.complaint_id, {
        verified_category_code: verifiedCategoryCode,
        priority: verifiedPriority,
        is_critical: isCritical,
        verification_remarks: verificationRemarks
      });
      
      setSuccessMsg(`Complaint ${selectedComplaint.complaint_id} verified successfully!`);
      setShowVerifyModal(false);
      fetchComplaints();
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setVerifying(false);
    }
  };

  // Open Staff Assignment Modal
  const handleOpenAssign = async (cmp) => {
    setSelectedComplaint(cmp);
    setSelectedStaff(null);
    setReassignReason('');
    setShowAssignModal(true);
    setLoadingStaff(true);
    try {
      const data = await officerService.getAvailableStaff(cmp.complaint_id);
      setAvailableStaff(data.data || []);
    } catch (err) {
      alert(`Error: ${err.message}`);
    } finally {
      setLoadingStaff(false);
    }
  };

  // Open Confirmation Modal
  const handleSelectStaffForConfirmation = (staff) => {
    if (!staff.is_available) {
      alert(`Staff member ${staff.name} has reached the maximum workload limit (5 active tasks). Please choose another staff member.`);
      return;
    }
    setSelectedStaff(staff);
    setShowConfirmModal(true);
  };

  // Execute Final Staff Assignment
  const handleConfirmAssignment = async () => {
    if (!selectedComplaint || !selectedStaff) return;
    setAssigning(true);
    try {
      const isReassignment = selectedComplaint.internal_status === "Reassignment Requested";

      if (isReassignment) {
        await officerService.reassignComplaint(
          selectedComplaint.complaint_id,
          selectedStaff.staff_id,
          reassignReason || "Officer approved reassignment"
        );
      } else {
        await officerService.assignComplaint(
          selectedComplaint.complaint_id,
          selectedStaff.staff_id
        );
      }

      setSuccessMsg(`Complaint ${selectedComplaint.complaint_id} assigned to ${selectedStaff.name} successfully!`);
      setShowConfirmModal(false);
      setShowAssignModal(false);
      fetchComplaints();
    } catch (err) {
      alert(`Assignment Error: ${err.message}`);
    } finally {
      setAssigning(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', boxSizing: 'border-box' }}>
      
      {/* Top Banner Header */}
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '20px 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
        borderLeft: '5px solid #800020'
      }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.4rem', color: '#800020', fontWeight: 800 }}>
            Complaint Officer Operational Control Desk
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', color: '#666' }}>
            Verify passenger grievances, map departments, evaluate staff workloads, and assign active field personnel.
          </p>
        </div>
        <button
          onClick={fetchComplaints}
          style={{
            padding: '10px 18px',
            backgroundColor: '#800020',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 2px 6px rgba(128,0,32,0.25)'
          }}
        >
          Refresh Queue
        </button>
      </div>

      {/* Toast Notification Alert */}
      {successMsg && (
        <div style={{
          backgroundColor: '#e6f4ea',
          border: '1px solid #34a853',
          color: '#137333',
          padding: '14px 20px',
          borderRadius: '8px',
          fontWeight: 700,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <span>{successMsg}</span>
          <button onClick={() => setSuccessMsg('')} style={{ background: 'none', border: 'none', color: '#137333', cursor: 'pointer', fontWeight: 800 }}>X</button>
        </div>
      )}

      {/* Operational Summary Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px'
      }}>
        <KPICard title="Pending Complaints" value={metrics.total_pending} subtitle="Awaiting initial officer audit" accentColor="#ea4335" textColor="#ea4335" />
        <KPICard title="Under Review" value={metrics.under_review} subtitle="Category verified & pending staff" accentColor="#fbbc04" textColor="#b06000" />
        <KPICard title="Active Assigned" value={metrics.assigned} subtitle="In Progress with field staff" accentColor="#1a73e8" textColor="#1a73e8" />
        <KPICard title="High / Critical" value={metrics.high_critical} subtitle="Urgent safety/operational risks" accentColor="#c5221f" textColor="#c5221f" />
        <KPICard title="Reassignments" value={metrics.reassignment_requests} subtitle="Staff requested replacement" accentColor="#a142f4" textColor="#8430ce" />
      </div>

      {/* Main Section: Tab Bar + Filter Controls + Queue Table */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        
        {/* Navigation Tabs */}
        <div style={{ display: 'flex', gap: '12px', borderBottom: '2px solid #eeeeee', paddingBottom: '12px', marginBottom: '20px' }}>
          <button
            onClick={() => setActiveTab('review_queue')}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 800,
              cursor: 'pointer',
              fontSize: '0.9rem',
              backgroundColor: activeTab === 'review_queue' ? '#800020' : '#f4f6f9',
              color: activeTab === 'review_queue' ? '#ffffff' : '#555555'
            }}
          >
            Pending Verification Queue ({metrics.total_pending})
          </button>

          <button
            onClick={() => setActiveTab('reassignment_requests')}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 800,
              cursor: 'pointer',
              fontSize: '0.9rem',
              backgroundColor: activeTab === 'reassignment_requests' ? '#800020' : '#f4f6f9',
              color: activeTab === 'reassignment_requests' ? '#ffffff' : '#555555'
            }}
          >
            Reassignment Requests ({metrics.reassignment_requests})
          </button>

          <button
            onClick={() => setActiveTab('all')}
            style={{
              padding: '10px 20px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 800,
              cursor: 'pointer',
              fontSize: '0.9rem',
              backgroundColor: activeTab === 'all' ? '#800020' : '#f4f6f9',
              color: activeTab === 'all' ? '#ffffff' : '#555555'
            }}
          >
            All Complaints List
          </button>
        </div>

        {/* Filter Bar Controls */}
        <FilterBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          priorityFilter={priorityFilter}
          onPriorityChange={setPriorityFilter}
          deptFilter={deptFilter}
          onDeptChange={setDeptFilter}
          showStatus={activeTab === 'all'}
        />

        {/* Complaints Table */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#666', fontWeight: 600 }}>
            ⏳ Loading complaints queue...
          </div>
        ) : error ? (
          <div style={{ backgroundColor: '#fce8e6', color: '#c5221f', padding: '16px', borderRadius: '8px', fontWeight: 700 }}>
            ⚠️ Error: {error}
          </div>
        ) : complaints.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#777', fontWeight: 600 }}>
            📭 No complaints found matching current queue filters.
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ backgroundColor: '#f4f6f9', borderBottom: '2px solid #e0e0e0', color: '#333' }}>
                  <th style={{ padding: '12px 14px' }}>Complaint ID</th>
                  <th style={{ padding: '12px 14px' }}>Date / Time</th>
                  <th style={{ padding: '12px 14px' }}>Location</th>
                  <th style={{ padding: '12px 14px' }}>Passenger Category</th>
                  <th style={{ padding: '12px 14px' }}>Verified Category</th>
                  <th style={{ padding: '12px 14px' }}>Priority</th>
                  <th style={{ padding: '12px 14px' }}>Status</th>
                  <th style={{ padding: '12px 14px', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {complaints.map((c) => {
                  const locationText = c.complaint_type === 'Train'
                    ? `Train ${c.train_number || 'N/A'} (Coach ${c.coach_number || 'N/A'})`
                    : `Station ${c.station_code || 'N/A'} (Platform ${c.platform_number || 'N/A'})`;

                  const isReassignReq = c.internal_status === "Reassignment Requested";

                  return (
                    <tr key={c.complaint_id} style={{ borderBottom: '1px solid #eeeeee', backgroundColor: isReassignReq ? '#fff8f0' : '#ffffff' }}>
                      <td style={{ padding: '12px 14px', fontWeight: 800, color: '#800020' }}>
                        {c.complaint_id}
                        {c.is_critical && (
                          <span style={{ display: 'block', fontSize: '0.7rem', color: '#c5221f', fontWeight: 800 }}>🚨 CRITICAL</span>
                        )}
                      </td>
                      <td style={{ padding: '12px 14px', color: '#555' }}>
                        {c.incident_date || 'N/A'}
                        <span style={{ display: 'block', fontSize: '0.75rem', color: '#888' }}>{c.incident_time || ''}</span>
                      </td>
                      <td style={{ padding: '12px 14px', fontWeight: 600 }}>
                        {locationText}
                        <span style={{ display: 'block', fontSize: '0.75rem', color: '#666' }}>Div: {c.assigned_division_code || 'Delhi'}</span>
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        {c.category_name || 'Unspecified'}
                        <span style={{ display: 'block', fontSize: '0.75rem', color: '#777' }}>Sub: {c.subcategory_name || 'General'}</span>
                      </td>
                      <td style={{ padding: '12px 14px', fontWeight: 700, color: c.verified_category_name ? '#137333' : '#b06000' }}>
                        {c.verified_category_name || '⚠️ Pending Verification'}
                        {c.verification_remarks && (
                          <span style={{ display: 'block', fontSize: '0.75rem', color: '#555', fontStyle: 'italic' }}>"{c.verification_remarks}"</span>
                        )}
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <PriorityBadge priority={c.priority} />
                      </td>
                      <td style={{ padding: '12px 14px' }}>
                        <StatusBadge status={c.internal_status} />
                        {c.assigned_staff_id && (
                          <span style={{ display: 'block', fontSize: '0.75rem', color: '#666', marginTop: '2px' }}>Staff: {c.assigned_staff_id}</span>
                        )}
                      </td>
                      <td style={{ padding: '12px 14px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', gap: '6px', justifyContent: 'center' }}>
                          <button
                            onClick={() => handleOpenVerify(c)}
                            style={{
                              padding: '6px 12px',
                              backgroundColor: '#f4f6f9',
                              color: '#333',
                              border: '1px solid #ccc',
                              borderRadius: '6px',
                              fontWeight: 700,
                              fontSize: '0.78rem',
                              cursor: 'pointer'
                            }}
                          >
                            ✏️ Verify
                          </button>

                          <button
                            onClick={() => handleOpenAssign(c)}
                            style={{
                              padding: '6px 12px',
                              backgroundColor: isReassignReq ? '#8430ce' : '#800020',
                              color: '#fff',
                              border: 'none',
                              borderRadius: '6px',
                              fontWeight: 700,
                              fontSize: '0.78rem',
                              cursor: 'pointer'
                            }}
                          >
                            {isReassignReq ? '🔄 Reassign' : '👤 Assign'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Verification Modal */}
      {showVerifyModal && selectedComplaint && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#ffffff', borderRadius: '12px', padding: '28px',
            width: '90%', maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, color: '#800020', fontSize: '1.25rem', fontWeight: 800 }}>
                Audit & Verify Grievance: {selectedComplaint.complaint_id}
              </h3>
              <button onClick={() => setShowVerifyModal(false)} style={{ border: 'none', background: 'none', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 800 }}>✕</button>
            </div>

            <div style={{ backgroundColor: '#f9fafb', padding: '14px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #e5e7eb' }}>
              <div style={{ fontSize: '0.78rem', color: '#6b7280', fontWeight: 700, textTransform: 'uppercase', marginBottom: '6px' }}>
                📌 Original Passenger Submission (Preserved Audit Record)
              </div>
              <div style={{ fontSize: '0.88rem', color: '#111827', fontWeight: 700 }}>
                Category: {selectedComplaint.category_name} ({selectedComplaint.subcategory_name})
              </div>
              <div style={{ fontSize: '0.85rem', color: '#374151', marginTop: '4px' }}>
                Description: "{selectedComplaint.complaint_description}"
              </div>
            </div>

            <form onSubmit={handleVerifySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', color: '#374151' }}>
                  Verified Official Category & Subcategory:
                </label>
                <select
                  value={verifiedCategoryCode}
                  onChange={(e) => setVerifiedCategoryCode(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.88rem' }}
                >
                  <option value="">-- Keep Passenger Category --</option>
                  {categories.map((cat) => (
                    <option key={cat.category_code} value={cat.category_code}>
                      {cat.category_name} ({cat.subcategory_name}) [{cat.department_code}]
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', color: '#374151' }}>
                  Verified Priority Level:
                </label>
                <select
                  value={verifiedPriority}
                  onChange={(e) => {
                    setVerifiedPriority(e.target.value);
                    if (e.target.value === 'Critical') setIsCritical(true);
                  }}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.88rem' }}
                >
                  <option value="Critical">Critical Priority (Emergency Response)</option>
                  <option value="High">High Priority</option>
                  <option value="Medium">Medium Priority</option>
                  <option value="Low">Low Priority</option>
                </select>

              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#fef2f2', padding: '12px', borderRadius: '8px', border: '1px solid #fecaca' }}>
                <input
                  type="checkbox"
                  id="critical_check"
                  checked={isCritical}
                  onChange={(e) => setIsCritical(e.target.checked)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="critical_check" style={{ fontSize: '0.88rem', fontWeight: 800, color: '#991b1b', cursor: 'pointer' }}>
                  Mark Complaint as Critical Operational Safety Risk 🚨
                </label>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '6px', color: '#374151' }}>
                  Officer Verification Remarks:
                </label>
                <textarea
                  rows="3"
                  value={verificationRemarks}
                  onChange={(e) => setVerificationRemarks(e.target.value)}
                  placeholder="Enter audit notes or category corrections..."
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #d1d5db', fontSize: '0.88rem', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setShowVerifyModal(false)}
                  style={{ padding: '10px 18px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#fff', fontWeight: 700, cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={verifying}
                  style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#800020', color: '#fff', fontWeight: 800, cursor: 'pointer' }}
                >
                  {verifying ? 'Saving...' : '✓ Save Verification'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Staff Selection Modal */}
      {showAssignModal && selectedComplaint && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#ffffff', borderRadius: '12px', padding: '28px',
            width: '90%', maxWidth: '750px', maxHeight: '90vh', overflowY: 'auto',
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, color: '#800020', fontSize: '1.25rem', fontWeight: 800 }}>
                Select Field Personnel: {selectedComplaint.complaint_id}
              </h3>
              <button onClick={() => setShowAssignModal(false)} style={{ border: 'none', background: 'none', fontSize: '1.2rem', cursor: 'pointer', fontWeight: 800 }}>✕</button>
            </div>

            <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', padding: '14px', borderRadius: '8px', marginBottom: '20px' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#1e40af' }}>
                Recommended Department: {selectedComplaint.verified_department_name || selectedComplaint.assigned_department_code || 'General'}
              </div>
              <div style={{ fontSize: '0.8rem', color: '#1e3a8a', marginTop: '2px' }}>
                Evaluated from verified category: "{selectedComplaint.verified_category_name || selectedComplaint.category_name}"
              </div>
            </div>

            {selectedComplaint.internal_status === "Reassignment Requested" && (
              <div style={{ backgroundColor: '#fdf4ff', border: '1px solid #f0abfc', padding: '14px', borderRadius: '8px', marginBottom: '20px' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#86198f' }}>
                  ⚠️ Previous Staff Requested Reassignment:
                </div>
                <div style={{ fontSize: '0.82rem', color: '#701a75', fontStyle: 'italic', marginTop: '4px' }}>
                  "{selectedComplaint.reassignment_reason || 'Staff requested replacement due to technical/workload constraints.'}"
                </div>
                <div style={{ marginTop: '10px' }}>
                  <label style={{ fontSize: '0.8rem', fontWeight: 700, color: '#701a75' }}>Reassignment Approval Notes:</label>
                  <input
                    type="text"
                    placeholder="Enter reason for approving reassignment..."
                    value={reassignReason}
                    onChange={(e) => setReassignReason(e.target.value)}
                    style={{ width: '100%', padding: '8px', borderRadius: '6px', border: '1px solid #e9d5ff', marginTop: '4px', fontSize: '0.85rem' }}
                  />
                </div>
              </div>
            )}

            {loadingStaff ? (
              <div style={{ textAlign: 'center', padding: '30px 0', color: '#666', fontWeight: 600 }}>
                ⏳ Evaluating eligible staff workloads...
              </div>
            ) : availableStaff.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '30px 0', color: '#777', fontWeight: 600 }}>
                ⚠️ No active on-duty staff members found for this department.
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '14px' }}>
                {availableStaff.map((staff) => (
                  <div
                    key={staff.staff_id}
                    style={{
                      border: staff.is_available ? '2px solid #e5e7eb' : '2px dashed #fca5a5',
                      borderRadius: '10px',
                      padding: '16px',
                      backgroundColor: staff.is_available ? '#ffffff' : '#fef2f2',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '10px'
                    }}
                  >
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#111827' }}>{staff.name}</span>
                        <span style={{
                          padding: '2px 8px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 800,
                          backgroundColor: staff.is_on_duty ? '#dcfce7' : '#f3f4f6',
                          color: staff.is_on_duty ? '#166534' : '#6b7280'
                        }}>
                          {staff.is_on_duty ? 'On-Duty' : 'Off-Duty'}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#6b7280', marginTop: '4px' }}>
                        ID: <strong>{staff.staff_id}</strong> | Dept: <strong>{staff.department_name}</strong>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#6b7280', marginTop: '2px' }}>
                        Active Workload: <strong style={{ color: staff.active_workload >= 5 ? '#dc2626' : '#16a34a' }}>{staff.active_workload} / 5 active tasks</strong>
                      </div>
                    </div>

                    <button
                      onClick={() => handleSelectStaffForConfirmation(staff)}
                      disabled={!staff.is_available}
                      style={{
                        width: '100%',
                        padding: '8px 14px',
                        borderRadius: '6px',
                        border: 'none',
                        backgroundColor: staff.is_available ? '#800020' : '#9ca3af',
                        color: '#ffffff',
                        fontWeight: 800,
                        fontSize: '0.82rem',
                        cursor: staff.is_available ? 'pointer' : 'not-allowed'
                      }}
                    >
                      {staff.is_available ? 'Select for Assignment →' : 'Workload Limit Reached (Max 5)'}
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
              <button
                onClick={() => setShowAssignModal(false)}
                style={{ padding: '10px 18px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#fff', fontWeight: 700, cursor: 'pointer' }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {showConfirmModal && selectedComplaint && selectedStaff && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100
        }}>
          <div style={{
            backgroundColor: '#ffffff', borderRadius: '12px', padding: '28px',
            width: '90%', maxWidth: '480px', boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
            borderTop: '6px solid #800020'
          }}>
            <h3 style={{ margin: 0, color: '#800020', fontSize: '1.2rem', fontWeight: 800, marginBottom: '12px' }}>
              Confirm Staff Assignment
            </h3>
            
            <p style={{ fontSize: '0.88rem', color: '#374151', lineHeight: 1.5 }}>
              Are you sure you want to assign grievance <strong>{selectedComplaint.complaint_id}</strong> to:
            </p>

            <div style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '8px', padding: '14px', margin: '14px 0', fontSize: '0.85rem' }}>
              <div>👤 <strong>Staff Name:</strong> {selectedStaff.name} ({selectedStaff.staff_id})</div>
              <div>🏢 <strong>Department:</strong> {selectedStaff.department_name}</div>
              <div>📊 <strong>Current Workload:</strong> {selectedStaff.active_workload} active tasks</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
              <button
                onClick={() => setShowConfirmModal(false)}
                style={{ padding: '10px 18px', borderRadius: '8px', border: '1px solid #ccc', backgroundColor: '#fff', fontWeight: 700, cursor: 'pointer' }}
              >
                Go Back
              </button>
              <button
                onClick={handleConfirmAssignment}
                disabled={assigning}
                style={{ padding: '10px 20px', borderRadius: '8px', border: 'none', backgroundColor: '#800020', color: '#fff', fontWeight: 800, cursor: 'pointer' }}
              >
                {assigning ? 'Assigning...' : '✓ Confirm Assignment'}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
