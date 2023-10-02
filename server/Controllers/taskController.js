// USING MODEL
const Task = require("../Models/taskModel");
const CategoryTask = require("../Models/categoryTaskModel");

async function getAllTasks(req, res) {
    try {
        const responseData = await Task.getAllTasks();
        const tasks = responseData.data;

        if (responseData.status === 404) {
            return res.status(404).json({ error: 'Tasks not found' });
        }

        const tasksWithCategory = [];

        for (const task of tasks) {
            const categoryResponse = await CategoryTask.getCategoryTaskById(task.category_task_id);

            if (categoryResponse.status === 200) {
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

        const categoryResponse = await CategoryTask.getCategoryTaskById(task.category_task_id);

        if (categoryResponse.status === 200) {
            task.category_task = categoryResponse.data;
            delete task.category_task_id;
        }

        let response = {
            message: responseData.message,
            data: task,
            status: responseData.status
        };

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function putTaskByTaskId(req, res) {
    const taskId = req.params.taskId;
    const updatedTaskData = req.body;

    try {
        const responseData = await Task.putTaskByTaskId(taskId, updatedTaskData);
        const updatedTask = responseData.data;

        if (responseData.status === 404) {
            return res.status(404).json({ error: 'Task not found' });
        }

        const categoryResponse = await CategoryTask.getCategoryTaskById(updatedTask.category_task_id);

        if (categoryResponse.status === 200) {
            updatedTask.category_task = categoryResponse.data;
            delete updatedTask.category_task_id;
        }

        let response = {
            message: responseData.message,
            data: updatedTask,
            status: responseData.status
        };

        res.json(response);
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
