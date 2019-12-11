import httpClient from './httpClient';

export const getConversations = (userId) => httpClient(`/conversations?user=${userId}`);

export const createConversation = (users) => httpClient.post('/conversations/create', {users});