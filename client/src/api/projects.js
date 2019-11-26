import httpClient from './httpClient';

export const addProject = async (id, projectData) => {
    const url = `/api/projects/add/${id}`;
    const token = localStorage.getItem('jwtToken')
    const authOptions = {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    }
    try {
        const response = await httpClient.post(url, projectData, authOptions);
        if (response.data.err) return { ...response.data }

        if (typeof window !== 'undefined') {
            let projects = [];

            if (localStorage.getItem('projects')) {
                projects = JSON.parse(localStorage.getItem('projects'));
            }
            projects.push(response.data);

            localStorage.setItem('projects', JSON.stringify(projects))
        }
        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false };
    }
}