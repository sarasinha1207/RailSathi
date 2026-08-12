import { apiRequest } from './api';

export const authService = {
  async login(username, password) {
    return apiRequest('/api/v1/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });
  },

  async logout() {
    return apiRequest('/api/v1/auth/logout');
  },

  async checkSession() {
    return apiRequest('/api/v1/auth/me');
  }
};
