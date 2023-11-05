import axios from 'axios';
import { encryption, decryption } from "../utils/encryption"

const API_BASE_URL = 'http://localhost:8000/api/tasks';

const getTaskById = async (task_id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${task_id}`);
        const decrypt_data = decryption(response.data) 
        const dataJson = JSON.parse(decrypt_data)
        return dataJson;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
};

const editTaskById = async (task_id, data) => {
    try {
        const jsonString = JSON.stringify(data);
        const encrypt_data = encryption(jsonString)
        var dataJson = {
            "decrypt_data": encrypt_data,
        }
        const response = await axios.put(`${API_BASE_URL}/${task_id}`, dataJson, {
            params:{
                taskId : task_id
            }
        });
        return response.data;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
};

export { getTaskById, editTaskById }