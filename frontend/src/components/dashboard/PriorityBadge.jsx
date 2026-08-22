import React from 'react';
import { PRIORITY_COLORS } from '../../utils/statusMapper';

export default function PriorityBadge({ priority }) {
  const pKey = priority || 'Medium';
  const color = PRIORITY_COLORS[pKey] || PRIORITY_COLORS[pKey.toUpperCase()] || { bg: '#FFFDE7', text: '#FBC02D', border: '#FFF9C4' };
  return (
    <span style={{
      padding: '4px 10px',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: 800,
      backgroundColor: color.bg,
      color: color.text,
      border: `1px solid ${color.border || color.text}`,
      display: 'inline-block'
    }}>
      {pKey}
    </span>
  );
}
