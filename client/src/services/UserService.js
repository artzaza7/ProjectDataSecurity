import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/users';

const tokenVerify = async (token) => {
  var data = {
    "token": token
  }
  try {
    const response = await axios.post(`${API_BASE_URL}/verifyToken`, data);
    return response.data;
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการเรียก API');
    throw error;
  }
};

const register = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, data);
    return response.data;
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการเรียก API');
    throw error;
  }
};

const login = async (data) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, data);
    return response.data;
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการเรียก API');
    throw error;
  }
};

const reset = async (data) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/resetPassword`,data);
    return response.data;
} catch (error) {
    console.error('เกิดข้อผิดพลาดในการเรียก API');
    throw error;
}
};

const getUserbyUsername = async (username) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${username}`, {
      params: {
        username: username
      }
    });
    return response.data;
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการเรียก API');
    throw error;
  }
}

export { tokenVerify, register, login, getUserbyUsername, reset};
