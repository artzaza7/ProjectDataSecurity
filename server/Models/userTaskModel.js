// Connect Database
const { initMySQL } = require('../Config/database');

class UserTask {
    // Properties
    #id;
    #user_username;
    #task_id;
    #status_id;

    constructor(id, user_username, task_id, status_id) {
        this.#id = id;
        this.#user_username = user_username;
        this.#task_id = task_id;
        this.#status_id = status_id;
    }

    // Getters and setters for properties
    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get user_username() {
        return this.#user_username;
    }

    set user_username(value) {
        this.#user_username = value;
    }

    get task_id() {
        return this.#task_id;
    }

    set task_id(value) {
        this.#task_id = value;
    }

    get status_id() {
        return this.#status_id;
    }

    set status_id(value) {
        this.#status_id = value;
    }

    // Static method to get all user tasks
    static async getAllUserTasks() {
        const userTasks = [];
        try {
            const conn = await initMySQL();
            const results = await conn.query('SELECT * FROM user_task');
            await conn.end();

            results[0].forEach((value) => {
                userTasks.push(value);
            });
            const message = "Get all user tasks, Successful";
            const data = userTasks;
            const statusCode = 200;
            return { message, data, status: statusCode };
        } catch (error) {
            console.error(error);
            const message = error.message;
            const data = userTasks;
            const statusCode = 500;
            return { message, data, status: statusCode };
        }
    }

    static async getUserTaskById(userTaskId) {
        try {
            const conn = await initMySQL();
            const query = 'SELECT * FROM user_task WHERE id = ?';
            const results = await conn.query(query, [userTaskId]);
            await conn.end();

            if (results[0].length === 0) {
                const message = 'User Task not found';
                const data = null;
                const statusCode = 404;
                return { message, data, status: statusCode };
            }

            const userTask = results[0][0];
            const message = 'Get user task by ID, Successful';
            const data = userTask;
            const statusCode = 200;
            return { message, data, status: statusCode };
        } catch (error) {
            console.error(error);
            const message = error.message;
            const data = null;
            const statusCode = 500;
            return { message, data, status: statusCode };
        }
    }

    static async getUserTasksByStatus(username, statusId) {
        try {
            const conn = await initMySQL();
            const query = 'SELECT * FROM user_task WHERE user_username = ? AND status_id = ?';
            const results = await conn.query(query, [username, statusId]);
            await conn.end();

            const userTasks = results[0];
            if (userTasks.length === 0) {
                const message = 'No user tasks found with the specified status';
                const data = [];
                const statusCode = 200;
                return { message, data, status: statusCode };
            }

            const message = 'Get user tasks by status, Successful';
            const data = userTasks;
            const statusCode = 200;
            return { message, data, status: statusCode };
        } catch (error) {
            console.error(error);
            const message = error.message;
            const data = null;
            const statusCode = 500;
            return { message, data, status: statusCode };
        }
    }

    static async countUserTasksByCategory(username) {
        try {
            const conn = await initMySQL();
            const query = `SELECT category_task_id, COUNT(*) AS task_count FROM user_task INNER JOIN tasks ON user_task.task_id = tasks.id WHERE user_task.user_username = ? GROUP BY category_task_id;`;
            const results = await conn.query(query, [username]);
            await conn.end();

            if (results.length === 0) {
                const message = 'No user tasks found for the specified user';
                const data = [];
                const statusCode = 404;
                return { message, data, status: statusCode };
            }

            const message = 'Count user tasks by category, Successful';
            const data = results;
            const statusCode = 200;
            return { message, data, status: statusCode };
        } catch (error) {
            console.error(error);
            const message = error.message;
            const data = null;
            const statusCode = 500;
            return { message, data, status: statusCode };
        }
    }

    static async countUserTasksByCategoryAndStatus(username, statusId) {
        try {
            const conn = await initMySQL();
            const query = `
                SELECT category_task_id, COUNT(*) AS task_count
                FROM user_task
                INNER JOIN tasks ON user_task.task_id = tasks.id
                WHERE user_task.user_username = ? AND user_task.status_id = ?
                GROUP BY category_task_id;
            `;
            const results = await conn.query(query, [username, statusId]);
            await conn.end();

            if (results.length === 0) {
                const message = 'No user tasks found for the specified user and status';
                const data = [];
                const statusCode = 404;
                return { message, data, status: statusCode };
            }

            const message = 'Count user tasks by category and status, Successful';
            const data = results;
            const statusCode = 200;
            return { message, data, status: statusCode };
        } catch (error) {
            console.error(error);
            const message = error.message;
            const data = null;
            const statusCode = 500;
            return { message, data, status: statusCode };
        }
    }


    static async getUserTasksByTaskId(username, taskId) {
        try {
            const conn = await initMySQL();
            const query = 'SELECT * FROM user_task WHERE user_username = ? AND task_id = ?';
            const results = await conn.query(query, [username, taskId]);
            await conn.end();

            const userTasks = results[0];
            if (userTasks.length === 0) {
                const message = 'No user tasks found with the specified task ID';
                const data = [];
                const statusCode = 404;
                return { message, data, status: statusCode };
            }

            const message = 'Get user tasks by task ID, Successful';
            const data = userTasks[0];
            const statusCode = 200;
            return { message, data, status: statusCode };
        } catch (error) {
            console.error(error);
            const message = error.message;
            const data = null;
            const statusCode = 500;
            return { message, data, status: statusCode };
        }
    }

    static async createUserTask(userTaskData) {
        try {
            const conn = await initMySQL();
            const [insertResult] = await conn.query('INSERT INTO user_task SET ?', userTaskData);
            await conn.end();

            if (insertResult.affectedRows === 1) {
                const message = 'User task created successfully';
                const data = { id: insertResult.insertId, ...userTaskData };
                const statusCode = 201;
                return { message, data, status: statusCode };
            } else {
                const message = 'Failed to create user task';
                const data = null;
                const statusCode = 500;
                return { message, data, status: statusCode };
            }
        } catch (error) {
            console.error(error);
            const message = error.message;
            const data = null;
            const statusCode = 500;
            return { message, data, status: statusCode };
        }
    }

    static async updateUserTaskStatus(userTaskStatus, username, taskId) {
        try {
            const conn = await initMySQL();
            const [updateResult] = await conn.query('UPDATE user_task SET status_id = ? WHERE user_username = ? AND task_id = ?', [userTaskStatus, username, taskId]);
            await conn.end();

            if (updateResult.affectedRows === 1) {
                const userTaskData = await UserTask.getUserTasksByTaskId(username, taskId); // Corrected method call
                const message = 'User task updated successfully';
                const data = userTaskData.data;
                const statusCode = 200;
                return { message, data, status: statusCode };
            } else {
                const message = 'Failed to update user task';
                const data = null;
                const statusCode = 500;
                return { message, data, status: statusCode };
            }
        } catch (error) {
            console.error(error);
            const message = error.message;
            const data = null;
            const statusCode = 500;
            return { message, data, status: statusCode };
        }
    }

    static async deleteUserTask(username, taskId) {
        try {
            const conn = await initMySQL();
            const [deleteResult] = await conn.query('DELETE FROM user_task WHERE user_username = ? AND task_id = ?', [username, taskId]);
            await conn.end();

            if (deleteResult.affectedRows === 1) {
                const message = 'User task deleted successfully';
                const data = null;
                const statusCode = 200;
                return { message, data, status: statusCode };
            } else {
                const message = 'User task not found';
                const data = null;
                const statusCode = 404;
                return { message, data, status: statusCode };
            }
        } catch (error) {
            console.error(error);
            const message = error.message;
            const data = null;
            const statusCode = 500;
            return { message, data, status: statusCode };
        }
    }

    static async updateTaskStatusIfNeeded() {
        try {
            // Get the current date in the 'Asia/Bangkok' timezone
            const currentTimezoneOffset = -7 * 60; // Offset for 'Asia/Bangkok' (UTC+7)
            const currentTime = new Date(new Date().getTime() - (currentTimezoneOffset * 60 * 1000));
            const formattedCurrentDate = currentTime.toISOString().slice(0, 19).replace("T", " ");
            const dateComponents = formattedCurrentDate.split(' ');
            const nowDate = dateComponents[0];
            const nowTime = dateComponents[1];

            const query = `
                            UPDATE user_task
                            SET status_id = 3
                            WHERE EXISTS (
                                SELECT tasks.id
                                FROM tasks
                                WHERE tasks.id = user_task.task_id
                                AND user_task.status_id = 1
                                AND (tasks.endDay < ? OR (tasks.endDay = ? AND tasks.endHour < ?))
                            )
                        `;
            const conn = await initMySQL();
            const [updateResult] = await conn.query(query, [nowDate, nowDate, nowTime]);
            await conn.end();

            const message = 'User task statuses updated successfully';
            const data = updateResult;
            const statusCode = 200;
            return { message, data, status: statusCode };
        } catch (error) {
            console.error(error);
            const message = error.message;
            const data = null;
            const statusCode = 500;
            return { message, data, status: statusCode };
        }
    }

}

module.exports = UserTask;
