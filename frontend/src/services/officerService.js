import { apiRequest } from './api';

export const officerService = {
  async getAnalytics(zoneCode) {
    const query = zoneCode && zoneCode !== 'all' ? `?zone_code=${zoneCode}` : '';
    return apiRequest(`/api/v1/officer/analytics${query}`);
  },

  async getComplaints(params = {}) {
    const queryParams = new URLSearchParams();
    Object.keys(params).forEach(key => {
      if (params[key] && params[key] !== 'all') {
        queryParams.append(key, params[key]);
      }
    });
    return apiRequest(`/api/v1/officer/complaints?${queryParams.toString()}`);
  },

  async getAvailableStaff(complaintId) {
    return apiRequest(`/api/v1/officer/complaints/${complaintId}/available-staff`);
  },

  async verifyComplaint(complaintId, payload) {
    return apiRequest(`/api/v1/officer/complaints/${complaintId}/verify`, {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  async assignComplaint(complaintId, staffId) {
    return apiRequest(`/api/v1/officer/complaints/${complaintId}/assign`, {
      method: 'POST',
      body: JSON.stringify({ staff_id: staffId })
    });
  },

  async reassignComplaint(complaintId, newStaffId, reason) {
    return apiRequest(`/api/v1/officer/complaints/${complaintId}/reassign`, {
      method: 'POST',
      body: JSON.stringify({ new_staff_id: newStaffId, reason })
    });
  }
};
