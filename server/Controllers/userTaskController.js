// USING MODEL
const UserTask = require("../Models/userTaskModel");
const Task = require("../Models/taskModel");
const CategoryTask = require("../Models/categoryTaskModel");
const Status = require("../Models/statusModel");

async function getAlluserTask(req, res) {
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

        const responseData = await UserTask.getUserTasksByStatus(username, statusId);
        const userTasks = responseData.data;

        if (responseData.status === 404) {
            return res.status(404).json({ error: 'No user tasks found with the specified status' });
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

async function getUserTasksByTaskId(req, res) {
    try {
        const username = req.params.user_username;
        const taskId = req.params.taskId;

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
        const statusId = 1;
        let newTask = await Task.createTask(task);

        const userTaskData = {
            user_username,
            task_id: newTask.data.id,
            status_id: statusId,
        };

        const responseData = await UserTask.createUserTask(userTaskData);

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

module.exports = {
    getAlluserTask,
    getUserTaskById,
    getUserTasksByStatus,
    getUserTasksByTaskId,
    postUserTask,
    deleteUserTask,
};
