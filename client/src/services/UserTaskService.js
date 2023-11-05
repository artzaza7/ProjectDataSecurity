import axios from 'axios';
import { encryption, decryption } from "../utils/encryption"

const API_BASE_URL = 'http://localhost:8000/api/userTasks';

const createUserTask = async (username, data) => {
    try {
        const jsonString = JSON.stringify(data);
        const encrypt_data = encryption(jsonString)
        var dataJson = {
            "decrypt_task": encrypt_data,
        }
        const response = await axios.post(`${API_BASE_URL}/users/${username}/tasks`, dataJson);
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
        const decrypt_data = decryption(response.data) 
        const dataJson = JSON.parse(decrypt_data)
        return dataJson;
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
        const decrypt_data = decryption(response.data) 
        const dataJson = JSON.parse(decrypt_data)
        return dataJson;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
};
const getUserTasksCountProgress = async (username) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${username}/categoryTasks/tasks/status/${1}`, {
            params: {
                user_username: username,
                statusId: 1
            }
        });
        const decrypt_data = decryption(response.data) 
        const dataJson = JSON.parse(decrypt_data)
        return dataJson;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
};
const getUserTasksCountFail = async (username) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/users/${username}/categoryTasks/tasks/status/${3}`, {
            params: {
                user_username: username,
                statusId: 3
            }
        });
        const decrypt_data = decryption(response.data) 
        const dataJson = JSON.parse(decrypt_data)
        return dataJson;
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
        const decrypt_data = decryption(response.data) 
        const dataJson = JSON.parse(decrypt_data)
        return dataJson;
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



export { createUserTask, getUserTasksCount, getUserTasksCountFinish, getUserTasksCountProgress,getUserTasksCountFail,getUserTasksByStatusId, getUserTaskById, deleteUserTaskById, updateUserTaskById };
