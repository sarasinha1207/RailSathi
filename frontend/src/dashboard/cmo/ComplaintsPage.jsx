import React, { useState, useEffect, useMemo } from 'react';
import { officerService } from '../../services/officerService';
import { CMOKPISection } from '../../components/dashboard/CmoCharts';




export default function ComplaintsPage({ user, initialSubTab = 'pending' }) {
  // Active Sub-Tab Queue: 'pending' | 'reassignment' | 'all'
  const [activeSubTab, setActiveSubTab] = useState(initialSubTab || 'pending');


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

  // Filter Form State
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

      if (Array.isArray(catRes) && catRes.length > 0) setCategoriesList(catRes);
      if (Array.isArray(deptRes) && deptRes.length > 0) setDepartmentsList(deptRes);

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
      if (c.category_name) set.add(c.category_name.trim());
    });
    return Array.from(set).sort();
  }, [categoriesList]);

  // Subclasses for Dropdown 2 filtered by selected Main Class
  const availableSubClasses = useMemo(() => {
    if (!modalMainClass) return [];
    return categoriesList.filter(
      c => c.category_name && c.category_name.trim().toLowerCase() === modalMainClass.trim().toLowerCase()
    );
  }, [categoriesList, modalMainClass]);

  // OPEN ASSIGN STAFF MODAL
  const openAssignModal = async (complaint) => {
    setSelectedComplaint(complaint);
    setSelectedStaffId(complaint.assigned_staff_id || '');

    // Ensure categories are loaded if not already in state
    let activeCats = categoriesList;
    if (activeCats.length === 0) {
      try {
        const catRes = await fetch('/api/v1/categories').then(r => r.json());
        if (Array.isArray(catRes) && catRes.length > 0) {
          activeCats = catRes;
          setCategoriesList(catRes);
        }
      } catch (e) {
        console.error('Failed to load categories:', e);
      }
    }

    // Pre-select Main Class
    let currMain = complaint.main_class || complaint.category_name || '';
    if (!currMain && activeCats.length > 0) {
      currMain = activeCats[0].category_name;
    }
    setModalMainClass(currMain);

    // Pre-select Subclass Code
    let currCode = complaint.verified_category_code || complaint.category_code || '';
    if (!currCode && currMain && activeCats.length > 0) {
      const match = activeCats.find(c => c.category_name.trim().toLowerCase() === currMain.trim().toLowerCase());
      if (match) currCode = match.category_code;
    }
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
    const subList = categoriesList.filter(
      c => c.category_name && c.category_name.trim().toLowerCase() === newMain.trim().toLowerCase()
    );
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

      {/* 2. COMPACT FILTER WORKSPACE CARD */}
      <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '20px 24px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
        
        {/* QUEUE BUTTONS INSIDE CARD */}
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

        {/* COMPACT FILTER FORM */}
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

          {/* Priority */}
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
                  
                  // Compute Displayed Status Badge
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

                  // TRAIN vs STATION OVERVIEW DISPLAY FIX
                  const isTrainComplaint = c.complaint_type === 'Train' || (c.train_number && c.train_number !== 'N/A');

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
                        
                        {isTrainComplaint ? (
                          <div style={{ fontSize: '0.78rem', color: '#374151' }}>
                            Train: {c.train_number} {c.train_name ? `- ${c.train_name}` : ''} {c.coach_number ? `(Coach: ${c.coach_number})` : ''}
                          </div>
                        ) : (
                          c.station_name && (
                            <div style={{ fontSize: '0.78rem', color: '#374151' }}>
                              Station: {c.station_name} {c.station_code ? `(${c.station_code})` : ''} {c.platform_number ? `- Pf ${c.platform_number}` : ''}
                            </div>
                          )
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

                      {/* HIGHLIGHTED PRIORITY BADGE */}
                      <td style={{ padding: '12px 14px', verticalAlign: 'top', textAlign: 'center' }}>
                        <span style={{
                          backgroundColor: priorityColor + '20',
                          color: priorityColor,
                          border: `1px solid ${priorityColor}`,
                          padding: '4px 10px',
                          borderRadius: '999px',
                          fontWeight: 800,
                          fontSize: '0.75rem',
                          display: 'inline-block',
                          boxShadow: `0 2px 4px ${priorityColor}15`
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

      {/* --- ENHANCED ASSIGN STAFF MODAL --- */}
      {showAssignModal && selectedComplaint && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '24px', maxWidth: '640px', width: '92%', maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
            <h3 style={{ margin: '0 0 16px 0', color: '#800020', fontSize: '1.25rem', fontWeight: 800 }}>
              Assign Field Staff & Update Complaint Category
            </h3>
            
            {/* REQUIREMENT 1: COMPLAINT DETAILS & OVERVIEW (INCLUDING PASSENGER CHOSEN CATEGORY & SUBCATEGORY) */}
            <div style={{ backgroundColor: '#f9fafb', borderRadius: '8px', padding: '16px', border: '1px solid #e5e7eb', marginBottom: '18px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #d1d5db', paddingBottom: '8px', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.95rem', fontWeight: 800, color: '#800020' }}>
                  Complaint ID: {selectedComplaint.complaint_id}
                </span>
                
                {/* HIGHLIGHTED PRIORITY BADGE IN MODAL */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '0.78rem', color: '#4b5563', fontWeight: 700 }}>Priority:</span>
                  <span style={{
                    backgroundColor: (selectedComplaint.is_critical ? '#c5221f' : selectedComplaint.priority === 'High' ? '#ea4335' : selectedComplaint.priority === 'Medium' ? '#b06000' : '#137333') + '20',
                    color: selectedComplaint.is_critical ? '#c5221f' : selectedComplaint.priority === 'High' ? '#ea4335' : selectedComplaint.priority === 'Medium' ? '#b06000' : '#137333',
                    border: `1px solid ${selectedComplaint.is_critical ? '#c5221f' : selectedComplaint.priority === 'High' ? '#ea4335' : selectedComplaint.priority === 'Medium' ? '#b06000' : '#137333'}`,
                    padding: '3px 10px',
                    borderRadius: '999px',
                    fontWeight: 800,
                    fontSize: '0.76rem',
                    display: 'inline-block'
                  }}>
                    {selectedComplaint.is_critical ? 'Critical' : selectedComplaint.priority}
                  </span>
                </div>
              </div>

              {/* OVERVIEW GRID WITH PASSENGER CHOSEN CATEGORY & SUBCATEGORY */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.82rem', color: '#374151', marginBottom: '10px' }}>
                <div><strong>PNR / Phone:</strong> {selectedComplaint.pnr_number || 'N/A'} ({selectedComplaint.phone_number || 'N/A'})</div>
                <div><strong>Submitted Date:</strong> {new Date(selectedComplaint.created_at).toLocaleString()}</div>
                
                {selectedComplaint.complaint_type === 'Train' || (selectedComplaint.train_number && selectedComplaint.train_number !== 'N/A') ? (
                  <div><strong>Train:</strong> {selectedComplaint.train_number} - {selectedComplaint.train_name || 'Express'} {selectedComplaint.coach_number ? `(Coach ${selectedComplaint.coach_number})` : ''}</div>
                ) : (
                  selectedComplaint.station_name && (
                    <div><strong>Station:</strong> {selectedComplaint.station_name} ({selectedComplaint.station_code || 'N/A'})</div>
                  )
                )}

                <div><strong>Zone / Division:</strong> {selectedComplaint.zone_code || 'NR'} / {selectedComplaint.assigned_division_code || selectedComplaint.division_code || 'DLI'}</div>
              </div>

              {/* REQUIREMENT 1: PASSENGER CHOSEN CATEGORY & SUBCATEGORY */}
              <div style={{ fontSize: '0.82rem', color: '#374151', padding: '6px 10px', backgroundColor: '#edf2f7', borderRadius: '6px', marginBottom: '10px' }}>
                <strong>Passenger Category Chosen:</strong>{' '}
                <span style={{ color: '#800020', fontWeight: 800 }}>
                  {selectedComplaint.main_class || selectedComplaint.category_name || 'General'} — {selectedComplaint.sub_class || selectedComplaint.subcategory_name || 'General'}
                </span>
              </div>

              {/* DESCRIPTION BOX */}
              <div style={{ marginTop: '8px' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#111827' }}>Complaint Description:</span>
                <div style={{ backgroundColor: '#ffffff', padding: '10px 12px', borderRadius: '6px', border: '1px solid #d1d5db', marginTop: '4px', fontSize: '0.82rem', color: '#1f2937', lineHeight: 1.45 }}>
                  {selectedComplaint.complaint_description || selectedComplaint.description || 'No description provided.'}
                </div>
              </div>
            </div>

            {/* REQUIREMENT 2: UPDATE PRIMARY COMPLAINT CATEGORY (DROPDOWNS + UPDATE CATEGORY BUTTON) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', backgroundColor: '#fcf8f9', padding: '16px', borderRadius: '8px', border: '1px solid #f3d0d8' }}>
                <label style={{ fontSize: '0.88rem', fontWeight: 800, color: '#800020' }}>
                  Update Primary Complaint Category:
                </label>

                {/* DROPDOWN 1: Main Category / Class */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>1. Select Complaint Class (Main Category):</label>
                  <select
                    value={modalMainClass}
                    onChange={(e) => handleMainClassChange(e.target.value)}
                    style={{ padding: '9px 12px', borderRadius: '6px', border: '1px solid #d1d5db', fontSize: '0.85rem', backgroundColor: '#fff', fontWeight: 600 }}
                  >
                    {uniqueMainClasses.length === 0 ? (
                      <option value="">-- Loading Categories... --</option>
                    ) : (
                      uniqueMainClasses.map(m => (
                        <option key={m} value={m}>{m}</option>
                      ))
                    )}
                  </select>
                </div>

                {/* DROPDOWN 2: Subcategory / Subclass */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#374151' }}>2. Select Subclass (Subcategory):</label>
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
                      <option value="">-- Select Main Category First --</option>
                    ) : availableSubClasses.length === 0 ? (
                      <option value="">-- No Subcategories Available --</option>
                    ) : (
                      availableSubClasses.map(sc => (
                        <option key={sc.category_code} value={sc.category_code}>
                          {sc.subcategory_name}
                        </option>
                      ))
                    )}
                  </select>
                </div>

                {/* UPDATE CATEGORY BUTTON PLACED AFTER THE DROPDOWNS */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
                  <button
                    type="button"
                    onClick={() => {
                      const match = categoriesList.find(c => c.category_code === modalSubClassCode);
                      const catText = match ? `${match.category_name} — ${match.subcategory_name}` : modalMainClass;
                      showToast(`Primary category updated to: ${catText}`);
                    }}
                    style={{
                      padding: '8px 18px',
                      backgroundColor: '#800020',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '6px',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer',
                      boxShadow: '0 2px 5px rgba(128,0,32,0.25)'
                    }}
                  >
                    Update Category
                  </button>
                </div>

              </div>


              {/* ON-DUTY FIELD STAFF SELECTION */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <label style={{ fontSize: '0.86rem', fontWeight: 800, color: '#111827' }}>
                  Eligible Onboard On-Duty Field Staff:
                </label>
                {staffLoading ? (
                  <div style={{ padding: '18px', textAlign: 'center', color: '#666', fontSize: '0.85rem', fontWeight: 600 }}>
                    Loading eligible staff from database...
                  </div>
                ) : availableStaff.length === 0 ? (
                  <div style={{ padding: '14px 16px', backgroundColor: '#fef3c7', border: '1px solid #fde68a', color: '#92400e', borderRadius: '8px' }}>
                    <div style={{ fontWeight: 800, fontSize: '0.88rem', marginBottom: '2px' }}>No On-Duty Staff Available</div>
                    <div style={{ fontSize: '0.78rem', color: '#b45309' }}>
                      No eligible staff member from the selected department is currently available for this complaint's train/station.
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxHeight: '220px', overflowY: 'auto', paddingRight: '4px' }}>
                    {availableStaff.map(s => {
                      const isSelected = selectedStaffId === s.staff_id;
                      return (
                        <label
                          key={s.staff_id}
                          onClick={() => setSelectedStaffId(s.staff_id)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            padding: '12px 14px',
                            borderRadius: '8px',
                            border: isSelected ? '2px solid #800020' : '1px solid #e5e7eb',
                            cursor: 'pointer',
                            backgroundColor: isSelected ? '#fdf2f4' : '#ffffff',
                            boxShadow: isSelected ? '0 2px 8px rgba(128,0,32,0.12)' : 'none',
                            transition: 'all 0.15s ease'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <input
                              type="radio"
                              name="staffSelection"
                              value={s.staff_id}
                              checked={isSelected}
                              onChange={() => setSelectedStaffId(s.staff_id)}
                              style={{ accentColor: '#800020', width: '16px', height: '16px' }}
                            />
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                              <div style={{ fontWeight: 800, fontSize: '0.88rem', color: '#111827' }}>
                                {s.name || s.staff_name}
                              </div>
                              <div style={{ fontSize: '0.76rem', color: '#4b5563' }}>
                                Staff ID: <strong>{s.staff_id}</strong> | Designation: <strong>{s.designation || 'Field Staff'}</strong>
                              </div>
                              <div style={{ fontSize: '0.74rem', color: '#6b7280' }}>
                                Department: <strong>{s.department_name || s.department_code}</strong> | Duty Location: <strong>{s.duty_location}</strong>
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#16a34a', display: 'inline-block' }} />
                            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#15803d' }}>
                              On Duty
                            </span>
                          </div>
                        </label>
                      );
                    })}
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
              {selectedComplaint.complaint_type === 'Train' || selectedComplaint.train_number ? (
                <div><strong>Train Number:</strong> {selectedComplaint.train_number || 'N/A'} ({selectedComplaint.train_name || 'N/A'})</div>
              ) : (
                <div><strong>Station Name:</strong> {selectedComplaint.station_name || 'N/A'} ({selectedComplaint.station_code || 'N/A'})</div>
              )}
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
