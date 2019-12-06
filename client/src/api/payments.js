import httpClient from './httpClient';

export const pay = (projectId, token, investmentAmount) => {
  console.log("amount", investmentAmount )
    return httpClient.post(`/investments/invest`, {
      projectId,
      token,
      investmentAmount
    });
}

