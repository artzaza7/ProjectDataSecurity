import axios from 'axios';
import { encryption, decryption } from "../utils/encryption"

const API_BASE_URL = 'http://localhost:8000/api/categoryTasks';

const getAllCategoryTasks = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}`);
    const decrypt_data = decryption(response.data)
    const dataJson = JSON.parse(decrypt_data)
    return dataJson;
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการเรียก API');
    throw error;
  }
};



export { getAllCategoryTasks };
