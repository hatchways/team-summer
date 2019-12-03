import httpClient from './httpClient';

export const pay = (projectId, userId, token, investmentAmount) => {
    return httpClient.post(`/investments/invest`, {
      projectId,
      userId,
      token,
      investmentAmount
    });
}

