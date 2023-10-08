import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/categoryTasks';

const getAllCategoryTasks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการเรียก API');
    throw error;
  }
};



export { getAllCategoryTasks };
