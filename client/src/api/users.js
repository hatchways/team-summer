import httpClient from './httpClient';

export const getUser = (id) => {
  return httpClient.get(`/api/user/${id}`);
};

export const createOrLoginUser = async (method, userData) => {
  const url = {
    login: '/api/authenticate',
    register: '/api/register'
  };

  try {
    let response = await httpClient.post(url[method], { ...userData });
    if (response.data.hasOwnProperty('err')) return { ...response.data };

    localStorage.setItem('jwtToken', response.data.token);
    localStorage.setItem(
      'userData',
      JSON.stringify({
        id: response.data.user._id,
        name: response.data.user.name
      })
    );

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};
