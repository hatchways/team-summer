import httpClient from './httpClient';

export const addInvestment = (value, projectId) => {
    return httpClient.post(`/investments/${projectId}`, { value, projectId });
};
