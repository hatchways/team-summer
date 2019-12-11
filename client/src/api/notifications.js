import httpClient from './httpClient';

export const getNotifications = async (userId) => {
  const url = `/notifications/${userId}`;

  try {
    const response = await httpClient.get(url);
    if (response.data.err) return { ...response.data };

    return { data: response.data };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};