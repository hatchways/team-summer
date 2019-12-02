import httpClient from './httpClient';

export const pay = (token, investmentAmount) => {
    return httpClient.post(`/investments/invest`, 
      {
        investmentAmount,
        token
      }
  );
}

