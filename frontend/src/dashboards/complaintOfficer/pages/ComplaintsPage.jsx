import React, { useState, useEffect, useMemo } from 'react';
import { officerService } from '../../../services/officerService';
import CMOKPISection from '../components/CMOKPISection';

export default function ComplaintsPage({ user }) {
  // Active Sub-Tab Queue: 'pending' | 'reassignment' | 'all'
  const [activeSubTab, setActiveSubTab] = useState('pending');

  // State for KPIs & Master Data
  const [kpis, setKpis] = useState({});
  const [zonesList, setZonesList] = useState([]);
  const [departmentsList, setDepartmentsList] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);

  // Complaints Data State
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  // Filter Form State (Date Range removed; Priority added)
  const [filters, setFilters] = useState({
    zone: 'all',
    department: 'all',
    priority: 'all',
    search: ''
  });

  // Applied Filter State (sent to backend)
  const [appliedFilters, setAppliedFilters] = useState({ ...filters });

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  // Assign Staff Modal State
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [availableStaff, setAvailableStaff] = useState([]);
  const [staffLoading, setStaffLoading] = useState(false);
  const [selectedStaffId, setSelectedStaffId] = useState('');

  // Assign Staff Modal 2 Cascading Dropdowns for Category & Subcategory
  const [modalMainClass, setModalMainClass] = useState('');
  const [modalSubClassCode, setModalSubClassCode] = useState('');

  // Detail Modal State
  const [showDetailModal, setShowDetailModal] = useState(false);

  // Fetch KPI Analytics & Master Dropdowns on mount
  useEffect(() => {
    fetchMasterData();
    fetchKPIs();
  }, []);

  // Fetch Complaints whenever activeSubTab or appliedFilters change
  useEffect(() => {
    fetchComplaints();
  }, [activeSubTab, appliedFilters]);

  const fetchKPIs = async () => {
    try {
      const data = await officerService.getAnalytics();
      if (data?.kpis) {
        setKpis(data.kpis);
      }
    } catch (err) {
      console.error('Failed to load KPIs:', err);
    }
  };

  const fetchMasterData = async () => {
    try {
      const [catRes, deptRes, analyticsRes] = await Promise.all([
        fetch('/api/v1/categories').then(r => r.json()).catch(() => []),
        fetch('/api/v1/departments').then(r => r.json()).catch(() => []),
        officerService.getAnalytics()
      ]);

      if (Array.isArray(catRes)) setCategoriesList(catRes);
      if (Array.isArray(deptRes)) setDepartmentsList(deptRes);

      if (analyticsRes?.overview_table) {
        const zMap = new Map();
        analyticsRes.overview_table.forEach(r => {
          if (!zMap.has(r.zone_code)) zMap.set(r.zone_code, r.zone_name);
        });
        setZonesList(Array.from(zMap.entries()).map(([code, name]) => ({ code, name })));
      }
    } catch (err) {
      console.error('Failed to fetch master data:', err);
    }
  };

  const fetchComplaints = async () => {
    setLoading(true);
    setError(null);
    try {
      let statusQuery = 'all';
      if (activeSubTab === 'pending') statusQuery = 'Assigned';
      else if (activeSubTab === 'reassignment') statusQuery = 'Reassignment Requested';

      const params = {
        status: statusQuery,
        priority: appliedFilters.priority,
        zone_code: appliedFilters.zone,
        department_code: appliedFilters.department,
        search: appliedFilters.search
      };

      const res = await officerService.getComplaints(params);
      if (res?.data) {
        setComplaints(res.data);
      } else {
        setComplaints([]);
      }
      setCurrentPage(1);
    } catch (err) {
      setError(err.message || 'Failed to load complaints table data.');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyFilters = (e) => {
    e?.preventDefault();
    setAppliedFilters({ ...filters });
  };

  const handleResetFilters = () => {
    const resetState = {
      zone: 'all',
      department: 'all',
      priority: 'all',
      search: ''
    };
    setFilters(resetState);
    setAppliedFilters(resetState);
  };

  // Toast Helper
  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 4000);
  };

  // Unique Main Classes for Dropdown 1
  const uniqueMainClasses = useMemo(() => {
    const set = new Set();
    categoriesList.forEach(c => {
      if (c.category_name) set.add(c.category_name);
    });
    return Array.from(set).sort();
  }, [categoriesList]);

  // Subclasses for Dropdown 2 filtered by selected Main Class
  const availableSubClasses = useMemo(() => {
    if (!modalMainClass) return [];
    return categoriesList.filter(c => c.category_name === modalMainClass);
  }, [categoriesList, modalMainClass]);

  // OPEN ASSIGN STAFF MODAL
  const openAssignModal = async (complaint) => {
    setSelectedComplaint(complaint);
    setSelectedStaffId(complaint.assigned_staff_id || '');

    // Pre-select Main Class and Subclass Code
    const currMain = complaint.main_class || complaint.category_name || '';
    setModalMainClass(currMain);

    const currCode = complaint.verified_category_code || complaint.category_code || '';
    setModalSubClassCode(currCode);

    setShowAssignModal(true);
    setStaffLoading(true);

    try {
      const staffRes = await officerService.getAvailableStaff(complaint.complaint_id);
      setAvailableStaff(staffRes?.available_staff || []);
    } catch (err) {
      showToast(`Failed to load available staff: ${err.message}`);
    } finally {
      setStaffLoading(false);
    }
  };

  // Handle Main Class Dropdown Change in Modal
  const handleMainClassChange = (newMain) => {
    setModalMainClass(newMain);
    const subList = categoriesList.filter(c => c.category_name === newMain);
    if (subList.length > 0) {
      setModalSubClassCode(subList[0].category_code);
    } else {
      setModalSubClassCode('');
    }
  };

  const handleConfirmAssign = async () => {
    if (!selectedStaffId) {
      alert('Please select an on-duty field staff member to assign.');
      return;
    }
    try {
      await officerService.assignComplaint(selectedComplaint.complaint_id, selectedStaffId, {
        verified_category_code: modalSubClassCode || undefined
      });
      showToast(`Complaint ${selectedComplaint.complaint_id} assigned successfully!`);
      setShowAssignModal(false);
      fetchComplaints();
      fetchKPIs();
    } catch (err) {
      alert(`Assignment failed: ${err.message}`);
    }
  };

  // Paginated Complaint Items
  const totalPages = Math.ceil(complaints.length / itemsPerPage) || 1;
  const paginatedComplaints = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return complaints.slice(start, start + itemsPerPage);
  }, [complaints, currentPage]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', boxSizing: 'border-box' }}>

      {/* Page Title Header */}
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
            Complaint Management Officer — Detailed Complaints Workspace
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.88rem', color: '#666' }}>
            Verify, categorize, assign, and audit full passenger complaint records across Indian Railways.
          </p>
        </div>
        <button
          onClick={() => { fetchKPIs(); fetchComplaints(); }}
          style={{
            padding: '10px 18px',
            backgroundColor: '#800020',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '0.88rem',
            boxShadow: '0 2px 6px rgba(128,0,32,0.25)'
          }}
        >
          Refresh Data
        </button>
      </div>

      {/* Toast Notification */}
      {toastMsg && (
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
          <span>{toastMsg}</span>
          <button onClick={() => setToastMsg(null)} style={{ background: 'none', border: 'none', color: '#137333', cursor: 'pointer', fontWeight: 800 }}>X</button>
        </div>
      )}

      {/* 1. TOP KPI SECTION */}
      <div>
        <CMOKPISection kpis={kpis} />
      </div>

      {/* 2. COMPACT FILTER WORKSPACE CARD (NO HEADING, QUEUE BUTTONS INSIDE, COMPACT FILTERS) */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px 24px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        
        {/* REQUIREMENT 1: QUEUE BUTTONS MOVED INSIDE THIS CARD CONTAINER AT THE TOP */}
        <div style={{ display: 'flex', gap: '10px', marginBottom: '18px', borderBottom: '1px solid #f3f4f6', paddingBottom: '14px', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={() => setActiveSubTab('pending')}
            style={{
              padding: '9px 20px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 800,
              cursor: 'pointer',
              fontSize: '0.88rem',
              backgroundColor: activeSubTab === 'pending' ? '#800020' : '#f3f4f6',
              color: activeSubTab === 'pending' ? '#ffffff' : '#374151',
              boxShadow: activeSubTab === 'pending' ? '0 3px 10px rgba(128,0,32,0.25)' : 'none'
            }}
          >
            Pending Complaints ({kpis.pending_complaints || 0})
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('reassignment')}
            style={{
              padding: '9px 20px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 800,
              cursor: 'pointer',
              fontSize: '0.88rem',
              backgroundColor: activeSubTab === 'reassignment' ? '#800020' : '#f3f4f6',
              color: activeSubTab === 'reassignment' ? '#ffffff' : '#374151',
              boxShadow: activeSubTab === 'reassignment' ? '0 3px 10px rgba(128,0,32,0.25)' : 'none'
            }}
          >
            Reassignment Requests ({kpis.reassignment_requests || 0})
          </button>

          <button
            type="button"
            onClick={() => setActiveSubTab('all')}
            style={{
              padding: '9px 20px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 800,
              cursor: 'pointer',
              fontSize: '0.88rem',
              backgroundColor: activeSubTab === 'all' ? '#800020' : '#f3f4f6',
              color: activeSubTab === 'all' ? '#ffffff' : '#374151',
              boxShadow: activeSubTab === 'all' ? '0 3px 10px rgba(128,0,32,0.25)' : 'none'
            }}
          >
            All Complaints List
          </button>
        </div>

        {/* COMPACT FILTER FORM (NO HEADING, DATE RANGE REMOVED, PRIORITY ADDED) */}
        <form onSubmit={handleApplyFilters} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px' }}>
          
          {/* Search by ID/PNR */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#4b5563' }}>Search ID / PNR / Phone:</label>
            <input
              type="text"
              placeholder="e.g. CMP20260812..."
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.85rem' }}
            />
          </div>

          {/* Zone */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#4b5563' }}>Zone:</label>
            <select
              value={filters.zone}
              onChange={(e) => setFilters({ ...filters, zone: e.target.value })}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.85rem', backgroundColor: '#fff' }}
            >
              <option value="all">All Zones ({zonesList.length})</option>
              {zonesList.map(z => (
                <option key={z.code} value={z.code}>{z.name} ({z.code})</option>
              ))}
            </select>
          </div>

          {/* Department */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#4b5563' }}>Department:</label>
            <select
              value={filters.department}
              onChange={(e) => setFilters({ ...filters, department: e.target.value })}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.85rem', backgroundColor: '#fff' }}
            >
              <option value="all">All Departments</option>
              {departmentsList.map(dept => (
                <option key={dept.department_code} value={dept.department_code}>{dept.department_name}</option>
              ))}
            </select>
          </div>

          {/* REQUIREMENT 2: PRIORITY FILTER DROPDOWN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <label style={{ fontSize: '0.76rem', fontWeight: 700, color: '#4b5563' }}>Priority:</label>
            <select
              value={filters.priority}
              onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
              style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.85rem', backgroundColor: '#fff' }}
            >
              <option value="all">All Priorities</option>
              <option value="Critical">Critical Only</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>
          </div>

          {/* Controls */}
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
            <button
              type="submit"
              style={{
                padding: '9px 18px',
                backgroundColor: '#800020',
                color: '#fff',
                border: 'none',
                borderRadius: '6px',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '0.84rem'
              }}
            >
              Apply Filters
            </button>

            <button
              type="button"
              onClick={handleResetFilters}
              style={{
                padding: '9px 16px',
                backgroundColor: '#f3f4f6',
                color: '#374151',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '0.84rem'
              }}
            >
              Reset
            </button>
          </div>

        </form>
      </div>

      {/* 3. COMPLAINT MANAGEMENT TABLE */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h3 style={{ margin: 0, color: '#800020', fontSize: '1.15rem', fontWeight: 800 }}>
            {activeSubTab === 'pending' ? 'Pending Complaints Queue' : activeSubTab === 'reassignment' ? 'Reassignment Requests Queue' : 'All Complaints List'} ({complaints.length} records found)
          </h3>
          <span style={{ fontSize: '0.82rem', color: '#666', fontWeight: 600 }}>
            Showing Page {currentPage} of {totalPages}
          </span>
        </div>

        {error && (
          <div style={{ backgroundColor: '#fce8e6', color: '#c5221f', padding: '14px', borderRadius: '8px', marginBottom: '16px', fontWeight: 700 }}>
            Error: {error}
          </div>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#666', fontWeight: 700 }}>
            Loading complaints records from backend...
          </div>
        ) : complaints.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', color: '#777', backgroundColor: '#f9fafb', borderRadius: '8px' }}>
            No complaints found matching the selected filter criteria.
          </div>
        ) : (
          <div style={{ overflowX: 'auto', maxHeight: '550px', overflowY: 'auto', borderRadius: '8px', border: '1px solid #e5e7eb' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.84rem', textAlign: 'left' }}>
              <thead style={{ position: 'sticky', top: 0, zIndex: 5 }}>
                <tr style={{ backgroundColor: '#4a071a', color: '#ffffff', fontWeight: 800 }}>
                  <th style={{ padding: '12px 14px', width: '13%' }}>Complaint ID</th>
                  <th style={{ padding: '12px 14px', width: '22%' }}>Overview</th>
                  <th style={{ padding: '12px 14px', width: '22%' }}>Complaint Class & Subclass</th>
                  <th style={{ padding: '12px 14px', width: '10%', textAlign: 'center' }}>Priority</th>
                  <th style={{ padding: '12px 14px', width: '20%' }}>Complaint Description</th>
                  <th style={{ padding: '12px 14px', width: '10%', textAlign: 'center' }}>Status</th>
                  <th style={{ padding: '12px 14px', width: '8%', textAlign: 'center' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedComplaints.map((c) => {
                  const isCritical = c.is_critical;
                  const priorityColor = isCritical ? '#c5221f' : c.priority === 'High' ? '#ea4335' : c.priority === 'Medium' ? '#b06000' : '#137333';
                  
                  // Compute Displayed Status Badge (Unassigned vs Assigned vs In Progress)
                  const isAssignedToStaff = Boolean(c.assigned_staff_id);
                  let displayBadgeText = c.internal_status;
                  if (c.internal_status === 'Assigned' && !isAssignedToStaff) {
                    displayBadgeText = 'Unassigned';
                  }

                  // Description text
                  const descText = c.complaint_description || c.description || 'No description provided.';
                  
                  // Category Main Class & Subclass
                  const mainClass = c.main_class || c.category_name || 'General';
                  const subClass = c.sub_class || c.subcategory_name || 'General';

                  return (
                    <tr key={c.complaint_id} style={{ borderBottom: '1px solid #eeeeee' }}>
                      
                      {/* Complaint ID */}
                      <td style={{ padding: '12px 14px', fontWeight: 800, color: '#800020', verticalAlign: 'top' }}>
                        <div>{c.complaint_id}</div>
                        {c.pnr_number && (
                          <div style={{ fontSize: '0.72rem', color: '#4b5563', fontWeight: 600, marginTop: '2px' }}>
                            PNR: {c.pnr_number}
                          </div>
                        )}
                      </td>

                      {/* Overview */}
                      <td style={{ padding: '12px 14px', verticalAlign: 'top', lineHeight: 1.4 }}>
                        <div style={{ fontWeight: 700, color: '#111827' }}>
                          Type: {c.complaint_type || 'Train'}
                        </div>
                        {c.train_number && (
                          <div style={{ fontSize: '0.78rem', color: '#374151' }}>
                            Train: {c.train_number} - {c.train_name || 'Express'}
                          </div>
                        )}
                        {c.station_name && (
                          <div style={{ fontSize: '0.78rem', color: '#374151' }}>
                            Station: {c.station_name} ({c.station_code || 'NDLS'})
                          </div>
                        )}
                        <div style={{ fontSize: '0.74rem', color: '#6b7280', marginTop: '2px' }}>
                          Zone: {c.zone_code || 'NR'} | Div: {c.assigned_division_code || c.division_code || 'DLI'}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: '#9ca3af' }}>
                          Date: {new Date(c.created_at).toLocaleString()}
                        </div>
                      </td>

                      {/* Complaint Class & Subclass */}
                      <td style={{ padding: '12px 14px', verticalAlign: 'top', lineHeight: 1.4 }}>
                        <div style={{ fontWeight: 800, color: '#111827', fontSize: '0.85rem' }}>
                          {mainClass}
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#4b5563', fontWeight: 600, marginTop: '2px' }}>
                          Subclass: {subClass}
                        </div>

                        {c.verified_category_name && (
                          <div style={{ marginTop: '4px', fontSize: '0.72rem', color: '#800020', fontWeight: 800 }}>
                            CMO Verified: {c.verified_category_name}
                          </div>
                        )}
                      </td>

                      {/* Priority */}
                      <td style={{ padding: '12px 14px', verticalAlign: 'top', textAlign: 'center' }}>
                        <span style={{
                          backgroundColor: priorityColor + '18',
                          color: priorityColor,
                          border: `1px solid ${priorityColor}`,
                          padding: '4px 10px',
                          borderRadius: '999px',
                          fontWeight: 800,
                          fontSize: '0.75rem',
                          display: 'inline-block'
                        }}>
                          {isCritical ? 'Critical' : c.priority}
                        </span>
                      </td>

                      {/* Complaint Description */}
                      <td style={{ padding: '12px 14px', verticalAlign: 'top', color: '#374151', fontSize: '0.82rem', lineHeight: 1.4 }}>
                        <div>
                          {descText.length > 90 ? (
                            <>
                              {descText.substring(0, 90)}...
                              <button
                                onClick={() => { setSelectedComplaint(c); setShowDetailModal(true); }}
                                style={{ background: 'none', border: 'none', color: '#1a73e8', cursor: 'pointer', fontWeight: 700, fontSize: '0.75rem', paddingLeft: '4px' }}
                              >
                                Read Full
                              </button>
                            </>
                          ) : (
                            descText
                          )}
                        </div>
                      </td>

                      {/* Status Badge */}
                      <td style={{ padding: '12px 14px', verticalAlign: 'top', textAlign: 'center' }}>
                        <span style={{
                          backgroundColor: displayBadgeText === 'Unassigned' ? '#fef3c7' : displayBadgeText === 'Assigned' ? '#dbeafe' : displayBadgeText === 'In Progress' ? '#e0e7ff' : displayBadgeText === 'Reassignment Requested' ? '#fce7f3' : displayBadgeText === 'Escalated' ? '#fee2e2' : '#dcfce7',
                          color: displayBadgeText === 'Unassigned' ? '#92400e' : displayBadgeText === 'Assigned' ? '#1e40af' : displayBadgeText === 'In Progress' ? '#3730a3' : displayBadgeText === 'Reassignment Requested' ? '#9d174d' : displayBadgeText === 'Escalated' ? '#991b1b' : '#15803d',
                          padding: '4px 10px',
                          borderRadius: '6px',
                          fontWeight: 800,
                          fontSize: '0.74rem',
                          display: 'inline-block'
                        }}>
                          {displayBadgeText}
                        </span>
                      </td>

                      {/* Action Column: ONLY Assign Staff button */}
                      <td style={{ padding: '12px 14px', verticalAlign: 'top', textAlign: 'center' }}>
                        <button
                          onClick={() => openAssignModal(c)}
                          style={{
                            padding: '6px 12px',
                            backgroundColor: '#800020',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '6px',
                            fontWeight: 700,
                            fontSize: '0.76rem',
                            cursor: 'pointer',
                            boxShadow: '0 2px 4px rgba(128,0,32,0.2)'
                          }}
                        >
                          {isAssignedToStaff ? 'Reassign Staff' : 'Assign Staff'}
                        </button>
                      </td>

                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination Bar */}
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', flexWrap: 'wrap', gap: '12px' }}>
            <span style={{ fontSize: '0.82rem', color: '#4b5563', fontWeight: 600 }}>
              Showing {((currentPage - 1) * itemsPerPage) + 1} - {Math.min(currentPage * itemsPerPage, complaints.length)} of {complaints.length} records
            </span>

            <div style={{ display: 'flex', gap: '6px' }}>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(p => p - 1)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  backgroundColor: currentPage === 1 ? '#f3f4f6' : '#fff',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: 700
                }}
              >
                Previous
              </button>

              {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => i + 1).map(pNum => (
                <button
                  key={pNum}
                  onClick={() => setCurrentPage(pNum)}
                  style={{
                    padding: '6px 12px',
                    borderRadius: '6px',
                    border: '1px solid #ccc',
                    backgroundColor: currentPage === pNum ? '#800020' : '#fff',
                    color: currentPage === pNum ? '#fff' : '#333',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    fontWeight: 700
                  }}
                >
                  {pNum}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(p => p + 1)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '6px',
                  border: '1px solid #ccc',
                  backgroundColor: currentPage === totalPages ? '#f3f4f6' : '#fff',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                  fontSize: '0.82rem',
                  fontWeight: 700
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}

      </div>

      {/* --- REFINED ASSIGN STAFF MODAL --- */}
      {showAssignModal && selectedComplaint && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', maxWidth: '560px', width: '92%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#800020', fontSize: '1.25rem', fontWeight: 800 }}>
              Assign Field Staff to Complaint
            </h3>
            
            <div style={{ fontSize: '0.82rem', color: '#4b5563', padding: '10px 14px', backgroundColor: '#f9fafb', borderRadius: '6px', marginBottom: '16px', border: '1px solid #e5e7eb' }}>
              <div>Complaint ID: <strong>{selectedComplaint.complaint_id}</strong> | PNR: {selectedComplaint.pnr_number || 'N/A'}</div>
              <div>Current Category: <strong>{selectedComplaint.main_class} — {selectedComplaint.sub_class}</strong></div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* 2 DROPDOWNS FOR COMPLAINT CLASS AND SUBCLASS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#fcf8f9', padding: '14px', borderRadius: '8px', border: '1px solid #f3d0d8' }}>
                <label style={{ fontSize: '0.85rem', fontWeight: 800, color: '#800020' }}>
                  Update Primary Complaint Class & Subclass:
                </label>

                {/* DROPDOWN 1: Main Complaint Class */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>1. Select Complaint Class (Main Category):</label>
                  <select
                    value={modalMainClass}
                    onChange={(e) => handleMainClassChange(e.target.value)}
                    style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.85rem', backgroundColor: '#fff', fontWeight: 600 }}
                  >
                    <option value="">-- Select Main Class --</option>
                    {uniqueMainClasses.map(m => (
                      <option key={m} value={m}>{m}</option>
                    ))}
                  </select>
                </div>

                {/* DROPDOWN 2: Subclass (Filtered by Main Class) */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>2. Select Subclass:</label>
                  <select
                    value={modalSubClassCode}
                    onChange={(e) => setModalSubClassCode(e.target.value)}
                    disabled={!modalMainClass || availableSubClasses.length === 0}
                    style={{
                      padding: '9px 12px',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db',
                      fontSize: '0.85rem',
                      backgroundColor: !modalMainClass ? '#f3f4f6' : '#fff',
                      cursor: !modalMainClass ? 'not-allowed' : 'pointer',
                      fontWeight: 600
                    }}
                  >
                    {!modalMainClass ? (
                      <option value="">-- Choose Class First --</option>
                    ) : availableSubClasses.length === 0 ? (
                      <option value="">-- No Subclasses Available --</option>
                    ) : (
                      availableSubClasses.map(sc => (
                        <option key={sc.category_code} value={sc.category_code}>
                          {sc.subcategory_name} ({sc.department_code})
                        </option>
                      ))
                    )}
                  </select>
                </div>

              </div>

              {/* ON-DUTY FIELD STAFF SELECTION */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <label style={{ fontSize: '0.82rem', fontWeight: 700, color: '#111827' }}>Select On-Duty Field Staff Member:</label>
                {staffLoading ? (
                  <div style={{ padding: '16px', textAlign: 'center', color: '#666', fontSize: '0.85rem' }}>Loading available staff...</div>
                ) : availableStaff.length === 0 ? (
                  <div style={{ padding: '12px', backgroundColor: '#fef3c7', color: '#92400e', borderRadius: '6px', fontSize: '0.82rem' }}>
                    No active on-duty staff available for this department.
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
                    {availableStaff.map(s => (
                      <label key={s.staff_id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 12px', borderRadius: '6px', border: '1px solid #e5e7eb', cursor: 'pointer', backgroundColor: selectedStaffId === s.staff_id ? '#fdf2f4' : '#fff' }}>
                        <input
                          type="radio"
                          name="staffSelection"
                          value={s.staff_id}
                          checked={selectedStaffId === s.staff_id}
                          onChange={() => setSelectedStaffId(s.staff_id)}
                        />
                        <div>
                          <div style={{ fontWeight: 800, fontSize: '0.85rem' }}>{s.full_name} ({s.staff_id})</div>
                          <div style={{ fontSize: '0.74rem', color: '#6b7280' }}>Role: {s.role} | Active Load: {s.active_assigned_count || 0} tasks</div>
                        </div>
                      </label>
                    ))}
                  </div>
                )}
              </div>

            </div>

            {/* Modal Controls */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
              <button
                type="button"
                onClick={() => setShowAssignModal(false)}
                style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #ccc', backgroundColor: '#fff', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmAssign}
                disabled={!selectedStaffId}
                style={{
                  padding: '8px 20px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: '#800020',
                  color: '#fff',
                  fontWeight: 700,
                  cursor: selectedStaffId ? 'pointer' : 'not-allowed',
                  fontSize: '0.85rem',
                  boxShadow: '0 2px 6px rgba(128,0,32,0.25)'
                }}
              >
                Confirm Staff Assignment
              </button>
            </div>

          </div>
        </div>
      )}

      {/* --- FULL DETAILS MODAL --- */}
      {showDetailModal && selectedComplaint && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', maxWidth: '650px', width: '90%', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h3 style={{ margin: '0 0 12px 0', color: '#800020', fontSize: '1.3rem', fontWeight: 800 }}>
              Complaint Audit Record — {selectedComplaint.complaint_id}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.85rem', color: '#374151', marginBottom: '16px' }}>
              <div><strong>Passenger PNR:</strong> {selectedComplaint.pnr_number || 'N/A'}</div>
              <div><strong>Phone Number:</strong> {selectedComplaint.phone_number || 'N/A'}</div>
              <div><strong>Train Number:</strong> {selectedComplaint.train_number || 'N/A'} ({selectedComplaint.train_name || 'N/A'})</div>
              <div><strong>Station Name:</strong> {selectedComplaint.station_name || 'N/A'} ({selectedComplaint.station_code || 'N/A'})</div>
              <div><strong>Zone / Division:</strong> {selectedComplaint.zone_code || 'NR'} / {selectedComplaint.assigned_division_code || 'DLI'}</div>
              <div><strong>Submitted At:</strong> {new Date(selectedComplaint.created_at).toLocaleString()}</div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <strong style={{ fontSize: '0.88rem', color: '#111827' }}>Full Complaint Description:</strong>
              <div style={{ backgroundColor: '#f9fafb', padding: '12px', borderRadius: '6px', border: '1px solid #e5e7eb', marginTop: '6px', fontSize: '0.85rem', lineHeight: 1.5, color: '#1f2937' }}>
                {selectedComplaint.complaint_description || selectedComplaint.description || 'No description provided.'}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowDetailModal(false)} style={{ padding: '8px 18px', borderRadius: '6px', border: 'none', backgroundColor: '#800020', color: '#fff', fontWeight: 700, cursor: 'pointer' }}>Close Record</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
