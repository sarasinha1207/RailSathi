export const STATUS_COLORS = {
  'Assigned': { bg: '#e8f0fe', text: '#1a73e8' },
  'In Progress': { bg: '#e8f0fe', text: '#1a73e8' },
  'Reassignment Requested': { bg: '#f3e8fd', text: '#8430ce' },
  'Escalated': { bg: '#fce8e6', text: '#c5221f' },
  'Resolved': { bg: '#e6f4ea', text: '#137333' },
  'Closed': { bg: '#e6f4ea', text: '#137333' }
};

export const PRIORITY_COLORS = {
  'Critical': { bg: '#fce8e6', text: '#c5221f' },
  'High': { bg: '#fee8e6', text: '#ea4335' },
  'Medium': { bg: '#fef7e0', text: '#b06000' },
  'Low': { bg: '#e6f4ea', text: '#137333' }
};


export function getPassengerStatus(internalStatus) {
  if (['Resolved', 'Closed'].includes(internalStatus)) return 'RESOLVED';
  return 'IN-PROGRESS';
}
