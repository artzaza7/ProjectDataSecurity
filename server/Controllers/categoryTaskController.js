// USING MODEL
const CategoryTask = require("../Models/categoryTaskModel")

//USING ENCRYPT AND DECRYPT
const {decrypt} = require("../Utils/cryptoUtils")
const { encryption, decryption } = require('../Utils/encryption')

async function getAllCategoryTasks(req, res) {
    try {
        const responseData = await CategoryTask.getAllCategoryTasks();
        responseData.data = responseData.data.map(category => ({
            id: category.id,
            name: decrypt(category.name)
        }));
        let response = {
            message: responseData.message,
            data: responseData.data,
            status: responseData.status
        }
        var jsonString = JSON.stringify(response);
        encrypt_data = encryption(jsonString)
        res.json(encrypt_data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getCategoryTaskById(req, res) {
    const id = req.params.categoryTaskId;
    try {
        const responseData = await CategoryTask.getCategoryTaskById(id);
        if (responseData.status === 404) {
            return res.status(404).json({ error: 'Category not found' });
        }
        responseData.data.name = decrypt(responseData.data.name);
        let response = {
            message: responseData.message,
            data: responseData.data,
            status: responseData.status
        }
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllCategoryTasks,
    getCategoryTaskById,
}