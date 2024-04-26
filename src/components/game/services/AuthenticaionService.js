import axios from 'axios';

const BASE_URL = "http://localhost:8080/api/user";

const login = async (username, password) => {
    try {
        const response = await axios.get(`${BASE_URL}/login?username=${username}&password=${password}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const register = async (username, password) => {
    try {
        const response = await axios.get(`${BASE_URL}/register?username=${username}&password=${password}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const authenticationService = { login, register };
export default authenticationService;