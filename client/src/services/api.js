import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to inject JWT token if available in localStorage
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('aj_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor to handle unauthenticated 401s
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (window.location.pathname.startsWith('/admin') && window.location.pathname !== '/admin/login') {
        localStorage.removeItem('aj_admin_token');
        localStorage.removeItem('aj_admin_user');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

// Auth Endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  getMe: () => api.get('/auth/me'),
  logout: () => api.post('/auth/logout'),
  updatePassword: (data) => api.put('/auth/update-password', data),
};

// Inquiries Endpoints
export const inquiryAPI = {
  submit: (formData) => api.post('/inquiries/submit', formData),
  getAll: (params) => api.get('/inquiries', { params }),
  getById: (id) => api.get(`/inquiries/${id}`),
  updateStatus: (id, status) => api.patch(`/inquiries/${id}/status`, { status }),
  addNote: (id, note) => api.post(`/inquiries/${id}/notes`, { note }),
  delete: (id) => api.delete(`/inquiries/${id}`),
  getStats: () => api.get('/inquiries/stats'),
  getExportCsvUrl: () => `${API_BASE_URL}/inquiries/export-csv`,
};

// Services Endpoints
export const serviceAPI = {
  getAll: (params) => api.get('/services', { params }),
  getBySlug: (slug) => api.get(`/services/${slug}`),
  create: (data) => api.post('/services', data),
  update: (id, data) => api.put(`/services/${id}`, data),
  delete: (id) => api.delete(`/services/${id}`),
};

// Pricing Endpoints
export const pricingAPI = {
  getPricing: () => api.get('/pricing'),
  updatePackage: (id, data) => api.put(`/pricing/packages/${id}`, data),
  createStandalone: (data) => api.post('/pricing/standalone', data),
  updateStandalone: (id, data) => api.put(`/pricing/standalone/${id}`, data),
  deleteStandalone: (id) => api.delete(`/pricing/standalone/${id}`),
};

// Portfolio Endpoints
export const portfolioAPI = {
  getAll: (params) => api.get('/portfolio', { params }),
  getBySlug: (slug) => api.get(`/portfolio/${slug}`),
  create: (data) => api.post('/portfolio', data),
  update: (id, data) => api.put(`/portfolio/${id}`, data),
  delete: (id) => api.delete(`/portfolio/${id}`),
};

// Blog Endpoints
export const blogAPI = {
  getAll: (params) => api.get('/blog', { params }),
  getBySlug: (slug) => api.get(`/blog/${slug}`),
  create: (data) => api.post('/blog', data),
  update: (id, data) => api.put(`/blog/${id}`, data),
  delete: (id) => api.delete(`/blog/${id}`),
};

// Settings Endpoints
export const settingsAPI = {
  get: () => api.get('/settings'),
  update: (data) => api.put('/settings', data),
};

// Upload Endpoint
export const uploadAPI = {
  uploadFile: (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};

export default api;

