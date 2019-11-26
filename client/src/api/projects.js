import httpClient from './httpClient';

export const addProject = async (id, projectData) => {
    const url = `/api/projects/add/${id}`;
    try {
        // projectData.set("user", id);
        const response = await httpClient.post(url, projectData);
        console.log(response.data)
        if (response.data.err) return { ...response.data }

        localStorage.setItem('projects', response.data.projects);
        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false };
    }
}