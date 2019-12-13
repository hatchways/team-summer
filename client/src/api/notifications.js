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

export const setNotificationToSeen = async (notificationId) => {
  const url = `/notifications/${notificationId}`;

  try {
    const response = await httpClient.put(url);
    if (response.data.err) return { ...response.data };

    return {
      data: response.data,
      success: true
    };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}

export const deleteNotification = async (notificationId) => {
  const url = `/notifications/${notificationId}`;

  try {
    const response = await httpClient.delete(url);
    if (response.data.err) return { ...response.data };

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
}