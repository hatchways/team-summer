import httpClient from './httpClient';

export const addProject = async (id, projectData) => {
    const url = `/api/projects/add/${id}`;
    const token = localStorage.getItem('jwtToken')
    const authOptions = {
        headers: {
            Authorization: `Bearer ${token}`,
            'content-type': 'multipart/form'
        }
    }
    try {
        const response = await httpClient.post(url, projectData, authOptions);
        console.log(response.data)
        if (response.data.err) return { ...response.data }

        localStorage.setItem('projects', response.data.projects);
        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false };
    }
}