

export const getPublicStripeKey = (options) => {
  return window
    .fetch(`/stripe-key`, {
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
        console.log('API error:', { data });
        throw Error('API Error');
      } else {
        return data.publicKey;
      }
    });
};


export const sendStripeToken = (token) => {
    //post token to server
}


export const pay = (token, data) => {
    console.log(token)
}

