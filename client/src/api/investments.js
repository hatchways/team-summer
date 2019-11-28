import httpClient from './httpClient';

//EG request
export const addInvestment = (value, projectId) => {
    return httpClient.post(`/investments/${id}`, {
        {
            "value": value,
            "projectId": projectId
        }
    });
};
