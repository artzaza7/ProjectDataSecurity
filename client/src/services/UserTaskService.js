import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/userTasks';

const createUserTask = async (username, data) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/users/${username}/tasks`, data);
        return response.data;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
};

const getUserTasksCount = async (username) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${username}/categoryTasks/tasks`, {
            params: {
                user_username: username,
            }
        });
        return response.data;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
};

const getUserTasksCountFinish = async (username) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${username}/categoryTasks/tasks/status/${2}`, {
            params: {
                user_username: username,
                statusId: 2
            }
        });
        return response.data;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
};


export { createUserTask, getUserTasksCount, getUserTasksCountFinish };
