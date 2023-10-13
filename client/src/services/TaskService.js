import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/tasks';

const getTaskById = async (task_id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/${task_id}`);
        return response.data;
    } catch (error) {
        console.error('เกิดข้อผิดพลาดในการเรียก API');
        throw error;
    }
};

const editTaskById = async (task_id, data) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/${task_id}`, data, {
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