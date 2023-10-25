// USING MODEL
const UserTask = require("../Models/userTaskModel");
const Task = require("../Models/taskModel");
const CategoryTask = require("../Models/categoryTaskModel");
const Status = require("../Models/statusModel");
const crypto = require('crypto');

async function getAlluserTask(req, res) {
    await UserTask.updateTaskStatusIfNeeded();
    try {
        const responseData = await UserTask.getAllUserTasks();
        const userTasks = responseData.data;

        const userTasksWithCategoryNStatus = [];

        for (const userTask of userTasks) {
            const taskResponse = await Task.getTaskById(userTask.task_id);

            if (taskResponse.status === 200) {
                userTask.task = taskResponse.data;
                delete userTask.task_id;

                const categoryResponse = await CategoryTask.getCategoryTaskById(userTask.task.category_task_id);

                if (categoryResponse.status === 200) {
                    userTask.task.category_task = categoryResponse.data;
                    delete userTask.task.category_task_id;
                }
            }

            const statusResponse = await Status.getStatusById(userTask.status_id);
            if (statusResponse.status === 200) {
                userTask.status = statusResponse.data;
                delete userTask.status_id;
            }

            userTasksWithCategoryNStatus.push(userTask);
        }

        let response = {
            message: responseData.message,
            data: userTasksWithCategoryNStatus,
            status: responseData.status
        };
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getUserTaskById(req, res) {
    try {
        const userTaskId = req.params.userTaskId;
        await UserTask.updateTaskStatusIfNeeded();

        const responseData = await UserTask.getUserTaskById(userTaskId);
        const userTask = responseData.data;

        if (responseData.status === 404) {
            return res.status(404).json({ error: 'User Task not found' });
        }

        const taskResponse = await Task.getTaskById(userTask.task_id);

        if (taskResponse.status === 200) {
            userTask.task = taskResponse.data;
            delete userTask.task_id;

            const categoryResponse = await CategoryTask.getCategoryTaskById(userTask.task.category_task_id);

            if (categoryResponse.status === 200) {
                userTask.task.category_task = categoryResponse.data;
                delete userTask.task.category_task_id;
            }
        }

        const statusResponse = await Status.getStatusById(userTask.status_id);
        if (statusResponse.status === 200) {
            userTask.status = statusResponse.data;
            delete userTask.status_id;
        }

        let response = {
            message: responseData.message,
            data: userTask,
            status: responseData.status
        };
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getUserTasksByStatus(req, res) {
    try {
        const username = req.params.user_username;
        const statusId = req.params.statusId;
        await UserTask.updateTaskStatusIfNeeded();

        const responseData = await UserTask.getUserTasksByStatus(username, statusId);
        const userTasks = responseData.data;

        if (responseData.status === 404) {
            return res.status(404).json({ error: 'No user tasks found with the specified status' });
        }

        const userTasksWithDetails = [];

        for (const userTask of userTasks) {
            const taskResponse = await Task.getTaskById(userTask.task_id);

            if (taskResponse.status === 200) {
                // const secretKey = 'dataSecure';
                // const encryptedName = decryptTaskName(taskResponse.data.name, secretKey);
                // taskResponse.data.name = encryptedName;
                userTask.task = taskResponse.data;
                delete userTask.task_id;

                const categoryResponse = await CategoryTask.getCategoryTaskById(userTask.task.category_task_id);

                if (categoryResponse.status === 200) {
                    userTask.task.category_task = categoryResponse.data;
                    delete userTask.task.category_task_id;
                }
            }

            const statusResponse = await Status.getStatusById(userTask.status_id);
            if (statusResponse.status === 200) {
                userTask.status = statusResponse.data;
                delete userTask.status_id;
            }

            userTasksWithDetails.push(userTask);
        }

        let response = {
            message: 'Get user tasks by status, Successful',
            data: userTasksWithDetails,
            status: 200
        };
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getUserTasksByTaskId(req, res) {
    try {
        const username = req.params.user_username;
        const taskId = req.params.taskId;
        await UserTask.updateTaskStatusIfNeeded();

        const responseData = await UserTask.getUserTasksByTaskId(username, taskId);
        const userTasks = responseData.data;

        if (responseData.status === 404) {
            return res.status(404).json({ error: 'No user tasks found with the specified task ID' });
        }

        const userTasksWithDetails = [];

        for (const userTask of userTasks) {
            const taskResponse = await Task.getTaskById(userTask.task_id);

            if (taskResponse.status === 200) {
                userTask.task = taskResponse.data;
                delete userTask.task_id;

                const categoryResponse = await CategoryTask.getCategoryTaskById(userTask.task.category_task_id);

                if (categoryResponse.status === 200) {
                    userTask.task.category_task = categoryResponse.data;
                    delete userTask.task.category_task_id;
                }
            }

            const statusResponse = await Status.getStatusById(userTask.status_id);
            if (statusResponse.status === 200) {
                userTask.status = statusResponse.data;
                delete userTask.status_id;
            }

            userTasksWithDetails.push(userTask);
        }

        let response = {
            message: 'Get user tasks by status, Successful',
            data: userTasksWithDetails,
            status: 200
        };
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function postUserTask(req, res) {
    const { user_username } = req.params;
    const task = req.body;

    try {
        // const secretKey = 'dataSecure';
        const statusId = 1;
        // const encryptedName = encryptTaskName(task.name, secretKey);
        // task.name = encryptedName;

        let newTask = await Task.createTask(task);

        const userTaskData = {
            user_username,
            task_id: newTask.data.id,
            status_id: statusId,
        };

        const responseData = await UserTask.createUserTask(userTaskData);

        const statusData = await Status.getStatusById(statusId);

        const categoryResponse = await CategoryTask.getCategoryTaskById(task.category_task_id);

        if (categoryResponse.status === 200) {
            newTask.data.category_task = categoryResponse.data;
            delete newTask.data.category_task_id;
        }

        if (statusData.status === 200) {
            responseData.data.task = newTask.data;
            delete responseData.data.task_id;
            responseData.data.status = statusData.data;
            delete responseData.data.status_id;
        }

        res.status(responseData.status).json({
            message: responseData.message,
            data: responseData.data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function putUserTaskStatus(req, res) {
    const { user_username, taskId, statusId } = req.params;

    try {
        const responseData = await UserTask.updateUserTaskStatus(statusId, user_username, taskId);

        const taskResponse = await Task.getTaskById(taskId);

        if (taskResponse.status === 200) {
            responseData.data.task = taskResponse.data;
            delete responseData.data.task_id;
        }

        const statusData = await Status.getStatusById(statusId);

        if (statusData.status === 200) {
            responseData.data.status = statusData.data;
            delete responseData.data.status_id;
        }

        const categoryResponse = await CategoryTask.getCategoryTaskById(taskResponse.data.category_task_id);

        if (categoryResponse.status === 200) {
            responseData.data.task.category_task = categoryResponse.data;
            delete responseData.data.task.category_task_id;
        }

        res.status(responseData.status).json({
            message: responseData.message,
            data: responseData.data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function deleteUserTask(req, res) {
    const username = req.params.user_username;
    const taskId = req.params.taskId;

    try {
        const responseData = await UserTask.deleteUserTask(username, taskId);

        if (responseData.status === 404) {
            return res.status(404).json({ error: 'User task not found' });
        }

        if (responseData.status === 200) {
            const task = await Task.deleteTask(taskId);

            if (task.status === 404) {
                return res.status(404).json({ error: 'Task not found' });
            }
        }

        res.status(responseData.status).json({
            message: responseData.message,
            data: responseData.data,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function countUserTasksByCategory(req, res) {
    const username = req.params.user_username;
    await UserTask.updateTaskStatusIfNeeded();
    try {
        const countResponse = await UserTask.countUserTasksByCategory(username);

        if (countResponse.status === 404) {
            return res.status(404).json({ error: 'No user tasks found for the specified user' });
        }

        if (countResponse.status === 500) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const categoryCounts = {};

        countResponse.data[0].forEach(entry => {
            categoryCounts[entry.category_task_id] = entry.task_count;
        });

        const categories = {
            1: 'งาน',
            2: 'ครอบครัว',
            3: 'โรงพยาบาล',
            4: 'อื่นๆ'
        };

        const result = [];

        for (const categoryId of Object.keys(categories)) {
            const count = categoryCounts[categoryId] || 0;
            result.push(count);
        }

        res.status(countResponse.status).json({
            message: countResponse.message,
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function countUserTasksByCategoryAndStatus(req, res) {
    const username = req.params.user_username;
    const status = req.params.statusId;
    await UserTask.updateTaskStatusIfNeeded();
    try {
        const countResponse = await UserTask.countUserTasksByCategoryAndStatus(username, status);

        if (countResponse.status === 404) {
            return res.status(404).json({ error: 'No user tasks found for the specified user' });
        }

        if (countResponse.status === 500) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        const categoryCounts = {};

        countResponse.data[0].forEach(entry => {
            categoryCounts[entry.category_task_id] = entry.task_count;
        });

        const categories = {
            1: 'งาน',
            2: 'ครอบครัว',
            3: 'โรงพยาบาล',
            4: 'อื่นๆ'
        };

        const result = [];

        for (const categoryId of Object.keys(categories)) {
            const count = categoryCounts[categoryId] || 0;
            result.push(count);
        }

        res.status(countResponse.status).json({
            message: countResponse.message,
            data: result,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Function to encrypt the task name
function encryptTaskName(taskName, secretKey) {
    const cipher = crypto.createCipher('aes-256-cbc', secretKey);
    let encryptedName = cipher.update(taskName, 'utf8', 'hex');
    encryptedName += cipher.final('hex');
    return encryptedName;
}

function decryptTaskName(encryptedName, secretKey) {
    try {
        const decipher = crypto.createDecipher('aes-256-cbc', secretKey);
        let decryptedName = decipher.update(encryptedName, 'hex', 'utf8');
        decryptedName += decipher.final('utf8');
        return decryptedName;
    } catch (error) {
        console.error('Error during decryption:', error);
        return encryptedName; // Handle the error gracefully, e.g., return null or a default value.
    }
}

module.exports = {
    getAlluserTask,
    getUserTaskById,
    getUserTasksByStatus,
    getUserTasksByTaskId,
    postUserTask,
    putUserTaskStatus,
    deleteUserTask,
    countUserTasksByCategory,
    countUserTasksByCategoryAndStatus,
};
