import { apiRequest } from './api';

export const complaintService = {
  async submitTrainComplaint(data) {
    return apiRequest('/api/v1/complaints/train', { method: 'POST', body: JSON.stringify(data) });
  },

  async submitStationComplaint(data) {
    return apiRequest('/api/v1/complaints/station', { method: 'POST', body: JSON.stringify(data) });
  },

  async trackComplaint(id) {
    return apiRequest(`/api/v1/complaints/track/${id}`);
  }
};
