import React from 'react';
import { STATUS_COLORS } from '../../utils/statusMapper';

export default function StatusBadge({ status }) {
  const color = STATUS_COLORS[status] || { bg: '#e8f0fe', text: '#1a73e8' };
  return (
    <span style={{
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: 800,
      backgroundColor: color.bg,
      color: color.text,
      display: 'inline-block'
    }}>
      {status || 'Unknown'}
    </span>
  );
}
