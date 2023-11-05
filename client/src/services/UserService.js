import axios from 'axios';
import { encryption, decryption } from "../utils/encryption"

const API_BASE_URL = 'http://localhost:8000/api/users';

const tokenVerify = async (token) => {
  var data = {
    "token": token
  }
  try {
    const jsonString = JSON.stringify(data);
    const encrypt_data = encryption(jsonString)
    var dataJson = {
      "decrypt_data": encrypt_data
    }
    const response = await axios.post(`${API_BASE_URL}/verifyToken`, dataJson);
    return response.data;
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการเรียก API');
    throw error;
  }
};

const register = async (data) => {
  try {
    const jsonString = JSON.stringify(data);
    const encrypt_data = encryption(jsonString)
    var dataJson = {
      "decrypt_data": encrypt_data,
    }
    const response = await axios.post(`${API_BASE_URL}/register`, dataJson);
    const decrypt_data = decryption(response.data)
    const dataJjson = JSON.parse(decrypt_data)
    return dataJjson;
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการเรียก API');
    throw error;
  }
};

const login = async (data) => {
  try {
    const jsonString = JSON.stringify(data);
    const encrypt_data = encryption(jsonString)
    var dataJson = {
      "decrypt_data": encrypt_data,
    }
    const response = await axios.post(`${API_BASE_URL}/login`, dataJson);
    const decrypt_data = decryption(response.data)
    const dataJjson = JSON.parse(decrypt_data)
    return dataJjson;
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการเรียก API');
    throw error;
  }
};

const reset = async (data) => {
  try {
    const jsonString = JSON.stringify(data);
    const encrypt_data = encryption(jsonString)
    var dataJson = {
      "decrypt_data": encrypt_data,
    }
    const response = await axios.put(`${API_BASE_URL}/resetPassword`, dataJson);
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
    const decrypt_data = decryption(response.data)
    const dataJson = JSON.parse(decrypt_data)
    return dataJson;
  } catch (error) {
    console.error('เกิดข้อผิดพลาดในการเรียก API');
    throw error;
  }
}

export { tokenVerify, register, login, getUserbyUsername, reset };
