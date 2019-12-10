import httpClient from './httpClient';

export const getConversations = (userId) => httpClient(`/conversations?user=${userId}`);

export const deleteConversation = (conversationId) => httpClient(`/conversations/delete`);