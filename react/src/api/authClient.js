import instance from './axios';

// Configure base URL for API endpoints
instance.defaults.baseURL = '/api';

// Attach auth token from localStorage to every request, if available
instance.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      try {
        const token = window.localStorage.getItem('authToken');

        if (token) {
          if (!config.headers) {
            config.headers = {};
          }

          if (!config.headers.Authorization) {
            config.headers.Authorization = `Token ${token}`;
          }
        }
      } catch (error) {
        // Ignore storage errors silently
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
