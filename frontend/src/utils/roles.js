export const ROLES = {
  ADMIN: 'Admin',
  ZONE_HEAD: 'ZoneHead',
  DIVISION_HEAD: 'DivisionHead',
  DEPARTMENT_HEAD: 'DepartmentHead',
  COMPLAINT_OFFICER: 'ComplaintOfficer',
  STAFF: 'Staff',
  INSPECTOR: 'Inspector'
};

export function hasRole(userRole, allowedRoles = []) {
  if (!userRole) return false;
  if (allowedRoles.includes(userRole)) return true;
  if (userRole === ROLES.ADMIN) return true; // Admin has broad access
  return false;
}
