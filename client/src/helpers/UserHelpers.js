import axios from 'axios';

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 409) return Promise.resolve({ data: error.response.data });

    return Promise.reject(error);
  }
);

export const registerUser = async (userData) => {
  let response = await axios
    .post('/register', { ...userData })
    .catch((err) => console.log(err.response));

  if (response.data.hasOwnProperty('err')) return { ...response.data };

  return response.data;
};
