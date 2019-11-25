import httpClient from './httpClient';

export const getUser = (id) => {
	return httpClient.get(`/users/${id}`);
}