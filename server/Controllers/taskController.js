// USING MODEL
const Task = require("../Models/taskModel");
const CategoryTask = require("../Models/categoryTaskModel");

//USING ENCRYPT AND DECRYPT
const {encrypt, decrypt} = require("../Utils/cryptoUtils")
const { encryption, decryption } = require('../Utils/encryption')

async function getAllTasks(req, res) {
    try {
        const responseData = await Task.getAllTasks();
        const tasks = responseData.data;

        const tasksWithCategory = [];

        for (const task of tasks) {
            task.name = decrypt(task.name);
            const categoryResponse = await CategoryTask.getCategoryTaskById(task.category_task_id);

            if (categoryResponse.status === 200) {
                categoryResponse.data.name = decrypt(categoryResponse.data.name);
                task.category_task = categoryResponse.data;
                delete task.category_task_id;
            }

            tasksWithCategory.push(task);
        }

        let response = {
            message: responseData.message,
            data: tasksWithCategory,
            status: responseData.status
        };
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getTaskById(req, res) {
    const id = req.params.taskId;

    try {
        const responseData = await Task.getTaskById(id);
        const task = responseData.data;

        if (responseData.status === 404) {
            return res.status(404).json({ error: 'Task not found' });
        }
        task.name = decrypt(task.name);

        const categoryResponse = await CategoryTask.getCategoryTaskById(task.category_task_id);

        if (categoryResponse.status === 200) {
            categoryResponse.data.name = decrypt(categoryResponse.data.name);
            task.category_task = categoryResponse.data;
            delete task.category_task_id;
        }

        let response = {
            message: responseData.message,
            data: task,
            status: responseData.status
        };
        var jsonString = JSON.stringify(response);
        encrypt_data = encryption(jsonString)
        res.json(encrypt_data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function putTaskByTaskId(req, res) {
    const taskId = req.params.taskId;
    const {decrypt_data} = req.body;
    const updatedTaskData = JSON.parse(decryption(decrypt_data))
    try {
        updatedTaskData.name = encrypt(updatedTaskData.name);
        const responseData = await Task.putTaskByTaskId(taskId, updatedTaskData);
        const updatedTask = responseData.data;

        if (responseData.status === 404) {
            return res.status(404).json({ error: 'Task not found' });
        }

        updatedTask.name = decrypt(updatedTask.name);

        const categoryResponse = await CategoryTask.getCategoryTaskById(updatedTask.category_task_id);

        if (categoryResponse.status === 200) {
            categoryResponse.data.name = decrypt(categoryResponse.data.name);
            updatedTask.category_task = categoryResponse.data;
            delete updatedTask.category_task_id;
        }

        let response = {
            message: responseData.message,
            data: updatedTask,
            status: responseData.status
        };

        var jsonString = JSON.stringify(response);
        var encrypt_data = encryption(jsonString)
        res.json(encrypt_data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    getAllTasks,
    getTaskById,
    putTaskByTaskId,
};
