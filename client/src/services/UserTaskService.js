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

const getUserTasksByStatusId = async (username, status_id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${username}/tasks/status/${status_id}`, {
            params: {
                user_username: username,
                statusId: status_id
            }
        });
        return response.data;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
};

const getUserTaskById = async (userTask_id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${userTask_id}`);
        return response.data;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
};

const deleteUserTaskById = async (username, taskId) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/users/${username}/tasks/${taskId}`, {
            params: {
                user_username: username,
                taskId : taskId
            }
        });
        return response.data;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
};

const updateUserTaskById = async (user_username, taskId, statusId) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/users/${user_username}/tasks/${taskId}/status/${statusId}`);
        return response.data;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
};



export { createUserTask, getUserTasksCount, getUserTasksCountFinish, getUserTasksByStatusId, getUserTaskById, deleteUserTaskById, updateUserTaskById };
