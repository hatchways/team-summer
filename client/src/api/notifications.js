import httpClient from './httpClient';

export const getNotifications = async () => {
  const url = `/notifications`;
  const token = localStorage.getItem('jwtToken');
  const authOptions = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  try {
    const response = await httpClient.get(url, authOptions);
    if (response.data.err) return { ...response.data };

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const createNotification = async (notificationData) => {
  const url = `/notifications`;
  const token = localStorage.getItem('jwtToken');
  const authOptions = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  try {
    const response = await httpClient.post(url, notificationData, authOptions);
    if (response.data.err) return { ...response.data };

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

