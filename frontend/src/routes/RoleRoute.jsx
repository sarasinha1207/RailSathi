import React from 'react';
import { hasRole } from '../utils/roles';

export default function RoleRoute({ user, allowedRoles, children }) {
  if (!user) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '12px' }}>
        <h3 style={{ color: '#c5221f' }}>Authentication Required</h3>
        <p>Please log in to access the control desk.</p>
      </div>
    );
  }

  if (!hasRole(user.role, allowedRoles)) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', backgroundColor: '#fff', borderRadius: '12px' }}>
        <h3 style={{ color: '#c5221f' }}>Access Restricted</h3>
        <p>You do not have authorization to view this role dashboard.</p>
      </div>
    );
  }

  return <>{children}</>;
}
