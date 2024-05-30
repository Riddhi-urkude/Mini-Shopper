import axios from "axios";

const API_URL = "";

const login = (userId, password) => {
    return axios.post(`${API_URL}`, { userId, password});
};

const getUserProfile = (userId) => {
    return axios.get(`${API_URL}`);
};

export default {
    login,
    getUserProfile,
};