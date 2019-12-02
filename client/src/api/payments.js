import httpClient from './httpClient';

export const getPublicStripeKey = () => {
  return httpClient.get(`/investments/stripe-key`)
};

export const pay = (token, investmentAmount) => {
    return httpClient.post(`/investments/invest`, 
      {
        investmentAmount,
        token
      }
  );
}

