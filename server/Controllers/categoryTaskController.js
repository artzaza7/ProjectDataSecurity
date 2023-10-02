// USING MODEL
const CategoryTask = require("../Models/categoryTaskModel")

async function getAllCategoryTasks(req, res) {
    try {
        const responseData = await CategoryTask.getAllCategoryTasks();
        if (responseData.status === 404) {
            return res.status(404).json({ error: 'Categories not found' });
        }
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

async function getCategoryTaskById(req, res) {
    const id = req.params.categoryTaskId;
    try {
        const responseData = await CategoryTask.getCategoryTaskById(id);
        if (responseData.status === 404) {
            return res.status(404).json({ error: 'Category not found' });
        }
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