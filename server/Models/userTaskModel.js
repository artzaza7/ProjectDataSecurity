// Connect Database
const { initMySQL } = require('../Config/database')

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
            const conn = await initMySQL(); // Make sure you have this function
            const results = await conn.query('SELECT * FROM user_task');
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

            const userTasks = results[0];
            if (userTasks.length === 0) {
                const message = 'No user tasks found with the specified status';
                const data = [];
                const statusCode = 404;
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
        console.log('Task ID data type:', typeof taskId);
        try {
            const conn = await initMySQL();
            const query = 'SELECT * FROM user_task WHERE user_username = ? AND task_id = ?';
            const results = await conn.query(query, [username, taskId]);

            const userTasks = results[0];
            if (userTasks.length === 0) {
                const message = 'No user tasks found with the specified task ID';
                const data = [];
                const statusCode = 404;
                return { message, data, status: statusCode };
            }

            const message = 'Get user tasks by task ID, Successful';
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

    static async createUserTask(userTaskData) {
        try {
            const conn = await initMySQL();
            const [insertResult] = await conn.query('INSERT INTO user_task SET ?', userTaskData);

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

    static async deleteUserTask(username, taskId) {
        try {
            const conn = await initMySQL();
            const [deleteResult] = await conn.query('DELETE FROM user_task WHERE user_username = ? AND task_id = ?', [username, taskId]);

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

}

module.exports = UserTask;
