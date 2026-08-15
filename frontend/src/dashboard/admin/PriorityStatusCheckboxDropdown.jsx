import React, { useState, useEffect, useRef } from 'react';

export default function PriorityStatusCheckboxDropdown({
  selectedPriorities,
  setSelectedPriorities,
  selectedStatuses,
  setSelectedStatuses
}) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const totalSelected = selectedPriorities.length + selectedStatuses.length;

  const togglePriority = (p) => {
    if (selectedPriorities.includes(p)) {
      setSelectedPriorities(selectedPriorities.filter((item) => item !== p));
    } else {
      setSelectedPriorities([...selectedPriorities, p]);
    }
  };

  const toggleStatus = (s) => {
    if (selectedStatuses.includes(s)) {
      setSelectedStatuses(selectedStatuses.filter((item) => item !== s));
    } else {
      setSelectedStatuses([...selectedStatuses, s]);
    }
  };

  const handleClearAll = () => {
    setSelectedPriorities([]);
    setSelectedStatuses([]);
  };

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block', flex: 1, minWidth: '170px' }}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: '100%',
          padding: '9px 14px',
          backgroundColor: totalSelected > 0 ? '#800020' : '#ffffff',
          color: totalSelected > 0 ? '#ffffff' : '#374151',
          border: '1px solid #d1d5db',
          borderRadius: '8px',
          fontWeight: 700,
          fontSize: '0.86rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          boxSizing: 'border-box'
        }}
      >
        <span style={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
          {totalSelected > 0 ? `Filtered (${totalSelected})` : 'Priority & Status Filter'}
        </span>
        <span style={{ fontSize: '0.7rem' }}>{open ? '' : ''}</span>
      </button>

      {open && (
        <div style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          marginTop: '6px',
          width: '280px',
          backgroundColor: '#ffffff',
          borderRadius: '10px',
          border: '1px solid #e5e7eb',
          boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
          zIndex: 100,
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          {/* Priority Section */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#800020', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
              Filter by Priority
            </div>
            {['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map((p) => (
              <label key={p} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#374151', padding: '4px 0', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={selectedPriorities.includes(p)}
                  onChange={() => togglePriority(p)}
                  style={{ accentColor: '#800020', cursor: 'pointer' }}
                />
                <span style={{ fontWeight: selectedPriorities.includes(p) ? 700 : 500 }}>
                  {p === 'CRITICAL' ? 'Critical / Emergency' : p}
                </span>
              </label>
            ))}
          </div>

          <div style={{ height: '1px', backgroundColor: '#e5e7eb' }} />

          {/* Status Section */}
          <div>
            <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#800020', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
              Filter by Status
            </div>
            {['Open', 'In Progress', 'Assigned', 'Closed', 'Reassigned Request', 'Escalated'].map((s) => (
              <label key={s} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.84rem', color: '#374151', padding: '4px 0', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={selectedStatuses.includes(s)}
                  onChange={() => toggleStatus(s)}
                  style={{ accentColor: '#800020', cursor: 'pointer' }}
                />
                <span style={{ fontWeight: selectedStatuses.includes(s) ? 700 : 500 }}>
                  {s === 'Open' ? 'Open (Pending)' : s === 'Closed' ? 'Closed (Resolved)' : s}
                </span>
              </label>
            ))}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid #f3f4f6' }}>
            <button
              type="button"
              onClick={handleClearAll}
              style={{ background: 'none', border: 'none', color: '#6b7280', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer', textDecoration: 'underline' }}
            >
              Clear All
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              style={{ padding: '5px 12px', backgroundColor: '#800020', color: '#ffffff', border: 'none', borderRadius: '6px', fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}
            >
              Apply Filter
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
