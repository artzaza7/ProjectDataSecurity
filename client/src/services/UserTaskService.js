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

const getAllUserTasksByStatusId = async (username, statusId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${username}/tasks/status/${statusId}`, {
            params: {
                user_username: username,
                statusId: statusId
            }
        });
        return response.data;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
};

export { createUserTask, getAllUserTasksByStatusId };
