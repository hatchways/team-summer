import axios from 'axios';

export const registerUser = async (userData) => {
  let response = await axios
    .post('/register', { ...userData })
    .catch((err) => console.log(err.response));

  if (response.data.hasOwnProperty('err')) return { ...response.data };
};
