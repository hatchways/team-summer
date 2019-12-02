import httpClient from './httpClient';

export const getPublicStripeKey = () => {
  return fetch(`/api/investments/stripe-key`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      } else {
        return null;
      }
    })
    .then((data) => {
      if (!data || data.error) {
        return data.error
      } else {
        return data.publicKey;
      }
    });
};

export const pay = (token, investmentAmount) => {
    return httpClient.post(`/investments/invest`, 
      {
        investmentAmount,
        token
      }
  );
}

