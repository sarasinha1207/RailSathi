import React from 'react';
import { PRIORITY_COLORS } from '../../utils/statusMapper';



export default function PriorityBadge({ priority }) {
  const color = PRIORITY_COLORS[priority] || { bg: '#fef7e0', text: '#b06000' };
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
      {priority || 'Medium'}
    </span>
  );
}
