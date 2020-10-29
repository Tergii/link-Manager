import axios from 'axios';

const api = axios.create({
    baseURL: `http://localhost:3000/api`,
});

export const saveLinks = payload => api.post('/save', payload);
export const updateLinks = payload => api.put('/update', payload);
export const registerUser = payload => api.post('/register', payload);
export const logInUser = payload => api.post('/login', payload);
export const updateUserData = payload => api.put('/updateData', payload);
export const sendMessage = payload => api.post('/message', payload);



const apis = {
    saveLinks,
    updateLinks,
    logInUser,
};

export default apis;