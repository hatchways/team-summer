import httpClient from './httpClient';

export const addProject = async (id, projectData) => {
    const url = `/api/projects/add/${id}`;
    try {
        let response = await httpClient.post(url, projectData);
        localStorage.setItem('projects', response.data.projects);
        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false };
    }
}