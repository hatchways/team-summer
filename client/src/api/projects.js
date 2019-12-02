import httpClient from './httpClient';

export const addProject = async (projectData) => {
  const url = `/projects`;
  const token = localStorage.getItem('jwtToken');
  const authOptions = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
  try {
    const response = await httpClient.post(url, projectData, authOptions);
    if (response.data.err) return { ...response.data };

    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export const getUserProjects = (userId) => {
  let url = `/projects?userId=${userId}`;
  if (!userId) url = '/projects';

  return httpClient.get(url);
};

export const getProject = (projectId) => {
  return httpClient.get(`/projects/projectId`);
};