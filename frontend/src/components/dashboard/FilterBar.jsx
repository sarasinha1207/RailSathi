import React from 'react';

export default function FilterBar({
  searchTerm,
  onSearchChange,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  deptFilter,
  onDeptChange,
  showStatus = true,
  showPriority = true,
  showDept = true
}) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '20px', alignItems: 'center' }}>
      {onSearchChange && (
        <input
          type="text"
          placeholder="Search Complaint ID, PNR, Phone, Train..."
          value={searchTerm || ''}
          onChange={(e) => onSearchChange(e.target.value)}
          style={{
            padding: '10px 14px',
            borderRadius: '8px',
            border: '1px solid #cccccc',
            fontSize: '0.88rem',
            width: '280px',
            boxSizing: 'border-box'
          }}
        />
      )}

      {showStatus && onStatusChange && (
        <select
          value={statusFilter || 'all'}
          onChange={(e) => onStatusChange(e.target.value)}
          style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cccccc', fontSize: '0.88rem' }}
        >
          <option value="all">All Internal Statuses</option>
          <option value="Assigned">Assigned</option>
          <option value="In Progress">In Progress</option>
          <option value="Reassignment Requested">Reassignment Requested</option>
          <option value="Escalated">Escalated</option>
          <option value="Resolved">Resolved / Closed</option>
        </select>
      )}

      {showPriority && onPriorityChange && (
        <select
          value={priorityFilter || 'all'}
          onChange={(e) => onPriorityChange(e.target.value)}
          style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cccccc', fontSize: '0.88rem' }}
        >
          <option value="all">All Priorities</option>
          <option value="High">High Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="Low">Low Priority</option>
          <option value="Critical">Critical Only</option>
        </select>
      )}

      {showDept && onDeptChange && (
        <select
          value={deptFilter || 'all'}
          onChange={(e) => onDeptChange(e.target.value)}
          style={{ padding: '10px 14px', borderRadius: '8px', border: '1px solid #cccccc', fontSize: '0.88rem' }}
        >
          <option value="all">All Departments</option>
          <option value="ELEC">Electrical</option>
          <option value="MECH_CLEAN">Mechanical (Cleanliness)</option>
          <option value="RPF">Security (RPF)</option>
          <option value="COMM_STAFF">Commercial Staff</option>
          <option value="MEDICAL">Medical</option>
        </select>
      )}
    </div>
  );
}
