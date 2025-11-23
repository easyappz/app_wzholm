import apiClient from './authClient';

export async function fetchChatMessages(limit) {
  const params = {};

  if (typeof limit === 'number') {
    params.limit = limit;
  }

  const response = await apiClient.get('/chat/messages', { params });
  return response.data;
}

export async function sendChatMessage(text) {
  const response = await apiClient.post('/chat/messages', { text });
  return response.data;
}
