import httpClient from './httpClient';

//EG request
export const addInvestment = (value, projectId) => {
    return httpClient.post(`/investments/${projectId}`, {
        {
            "value": value,
            "projectId": projectId
        }
    });
};
