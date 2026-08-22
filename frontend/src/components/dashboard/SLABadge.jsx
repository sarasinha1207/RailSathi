import React from 'react';

export default function SLABadge({ slaStatus, slaTier, slaTimeDetails, slaBreached, slaWarning, targetFormatted }) {
  const isBreached = slaBreached || slaTier === 'SLA-3' || (slaStatus && slaStatus.includes('Breached'));
  const isWarning = !isBreached && (slaWarning || slaTier === 'SLA-2' || (slaStatus && slaStatus.includes('Warning')));

  let style = {
    bg: '#e6f4ea',
    text: '#137333',
    border: '1px solid #86efac',
    label: slaStatus || 'SLA-1 On-Track'
  };

  if (isBreached) {
    style = {
      bg: '#fce8e6',
      text: '#c5221f',
      border: '1px solid #f87171',
      label: slaStatus || 'SLA-3 Breached'
    };
  } else if (isWarning) {
    style = {
      bg: '#fef3c7',
      text: '#b45309',
      border: '1px solid #fde047',
      label: slaStatus || 'SLA-2 Warning'
    };
  }

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '2px', alignItems: 'flex-start' }}>
      <span
        style={{
          padding: '3px 9px',
          borderRadius: '12px',
          fontSize: '0.74rem',
          fontWeight: 800,
          backgroundColor: style.bg,
          color: style.text,
          border: style.border,
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          whiteSpace: 'nowrap'
        }}
      >
        {style.label}
      </span>
      {slaTimeDetails && (
        <span style={{ fontSize: '0.72rem', color: isBreached ? '#b91c1c' : isWarning ? '#92400e' : '#4b5563', fontWeight: 600, paddingLeft: '2px' }}>
          {slaTimeDetails}
        </span>
      )}
    </div>
  );
}
