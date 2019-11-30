import httpClient from './httpClient';

export const getUser = (id) => {
  return httpClient.get(`/users/${id}`);
};

export const createOrLoginUser = async (method, userData) => {
  const url = {
    login: '/auth/authenticate',
    register: '/auth/register'
  };

  try {
    let response = await httpClient.post(url[method], { ...userData });
    if (response.data.hasOwnProperty('err')) return { ...response.data };

    localStorage.setItem('jwtToken', response.data.token);

    return { success: true, id: response.data.user._id, name: response.data.user.name };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
