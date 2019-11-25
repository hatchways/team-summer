import axios from 'axios';

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // Code 409 sent by backend for a user existing, conflicting email
    if (error.response.status === 409) return Promise.resolve({ data: error.response.data });

    return Promise.reject(error);
  }
);

export const authenticateUser = async (method, userData) => {
  const url = {
    login: '/authenticate',
    register: '/register'
  };

  let response = await axios.post(url[method], { ...userData }).catch((err) => console.log(err));

  if (response.data.hasOwnProperty('err')) return { ...response.data };

  localStorage.setItem('jwtToken', response.data.token);
  return { success: true };
};
