import httpClient from './httpClient';

export const getNotifications = async (userId) => {
  const url = `/notifications/${userId}`;
  const token = localStorage.getItem('jwtToken');
  const authOptions = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  try {
    const response = await httpClient.get(url, authOptions);
    if (response.data.err) return { ...response.data };

    return { data: response.data };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const createNotification = async (projectOwnerId, investmentAmount, projectId) => {
  const url = `/notifications/${projectOwnerId}`;
  const notificationData = { projectOwnerId, investmentAmount, projectId }
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

