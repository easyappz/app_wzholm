import apiClient from './authClient';

export async function registerMember({ username, password }) {
  const response = await apiClient.post('/auth/register', { username, password });
  return response.data;
}

export async function loginMember({ username, password }) {
  const response = await apiClient.post('/auth/login', { username, password });
  return response.data;
}

export async function fetchProfile() {
  const response = await apiClient.get('/profile');
  return response.data;
}
