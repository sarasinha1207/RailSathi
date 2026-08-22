export const STATUS_COLORS = {
  'Assigned': { bg: '#e8f0fe', text: '#1a73e8' },
  'In Progress': { bg: '#e8f0fe', text: '#1a73e8' },
  'Reassignment Requested': { bg: '#f3e8fd', text: '#8430ce' },
  'Escalated': { bg: '#FFEBEE', text: '#D32F2F' },
  'Resolved': { bg: '#E8F5E9', text: '#388E3C' },
  'Closed': { bg: '#E8F5E9', text: '#388E3C' }
};

export const PRIORITY_COLORS = {
  'Critical': { bg: '#FFEBEE', text: '#D32F2F', border: '#FFCDD2' },
  'CRITICAL': { bg: '#FFEBEE', text: '#D32F2F', border: '#FFCDD2' },
  'High': { bg: '#FFF3E0', text: '#F57C00', border: '#FFE0B2' },
  'HIGH': { bg: '#FFF3E0', text: '#F57C00', border: '#FFE0B2' },
  'Medium': { bg: '#FFFDE7', text: '#FBC02D', border: '#FFF9C4' },
  'MEDIUM': { bg: '#FFFDE7', text: '#FBC02D', border: '#FFF9C4' },
  'Low': { bg: '#E8F5E9', text: '#388E3C', border: '#C8E6C9' },
  'LOW': { bg: '#E8F5E9', text: '#388E3C', border: '#C8E6C9' }
};

export function getPassengerStatus(internalStatus) {
  if (['Resolved', 'Closed'].includes(internalStatus)) return 'RESOLVED';
  return 'IN-PROGRESS';
}
