import axios from 'axios';

const get_user = axios.create({

    baseURL: 'http://localhost:8000/', // Adjust to your backend URL
    withCredentials: true, // Include credentials for session authentication
});

export const getCurrentUser = async () => {
    try {
        const response = await get_user.get('http://localhost:8000/api/current-user/');
        console.log(response.data);
        return response.data; // Return the data from the response
    } catch (error) {
        console.error('Error fetching current user:', error);
        throw error; // Re-throw the error after logging it
    }
};
