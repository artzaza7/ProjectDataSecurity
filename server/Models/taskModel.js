// Connect Database
const { initMySQL } = require('../Config/database')

class Task {
    // Properties
    #id
    #name
    #startDay
    #startHour
    #endDay
    #endHour
    #category_task_id
    constructor(id, name, startDay, startHour, endDay, endHour, category_task_id
    ) {
        this.#id = id
        this.#name = name
        this.#startDay = startDay
        this.#startHour = startHour
        this.#endDay = endDay
        this.#endHour = endHour
        this.#category_task_id = category_task_id
    }

    // Getters and setters for properties
    get id() {
        return this.#id;
    }

    set id(value) {
        this.#id = value;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        this.#name = value;
    }

    get startDay() {
        return this.#startDay;
    }

    set startDay(value) {
        this.#startDay = value;
    }

    get startHour() {
        return this.#startHour;
    }

    set startHour(value) {
        this.#startHour = value;
    }

    get endDay() {
        return this.#endDay;
    }

    set endDay(value) {
        this.#endDay = value;
    }

    get endHour() {
        return this.#endHour;
    }

    set endHour(value) {
        this.#endHour = value;
    }

    get category_task_id() {
        return this.#category_task_id;
    }

    set category_task_id(value) {
        this.#category_task_id = value;
    }

    // Function
    static async getAllTasks() {
        const tasks = [];
        const conn = await initMySQL();
        try {
            const results = await conn.query('SELECT * FROM tasks');

            results[0].forEach((value) => {
                tasks.push(value);
            });
            const message = "Get all tasks, Successful";
            const data = tasks;
            const statusCode = 200;
            return { message, data, status: statusCode };
        } catch (error) {
            // console.error(error);
            const message = error.message;
            const data = tasks;
            const statusCode = 500;
            return { message, data, status: statusCode };
        } finally {
            conn.end();
        }
    }

    static async getTaskById(taskId) {
        const conn = await initMySQL();
        try {
            const query = 'SELECT * FROM tasks WHERE id = ?';
            const results = await conn.query(query, [taskId]);

            if (results[0].length === 0) {
                const message = 'Task not found';
                const data = null;
                const statusCode = 404;
                return { message, data, status: statusCode };
            }

            const task = results[0][0];
            const message = 'Get task by ID, Successful';
            const data = task;
            const statusCode = 200;
            return { message, data, status: statusCode };
        } catch (error) {
            console.error(error);
            const message = error.message;
            const data = null;
            const statusCode = 500;
            return { message, data, status: statusCode };
        } finally {
            conn.end();
        }
    }

    static async createTask(taskData) {
        const conn = await initMySQL();
        try {
            const [insertResult] = await conn.query('INSERT INTO tasks SET ?', taskData);

            if (insertResult.affectedRows === 1) {
                const message = 'Task created successfully';
                const data = { id: insertResult.insertId, ...taskData };
                const statusCode = 201;
                return { message, data, status: statusCode };
            } else {
                const message = 'Failed to create task';
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
        } finally {
            conn.end();
        }
    }

    static async putTaskByTaskId(taskId, updatedTaskData) {
        const conn = await initMySQL();
        try {
            const query = 'UPDATE tasks SET ? WHERE id = ?';
            const [updateResult] = await conn.query(query, [updatedTaskData, taskId]);

            if (updateResult.affectedRows === 0) {
                const message = 'Task not found';
                const data = null;
                const statusCode = 404;
                return { message, data, status: statusCode };
            }
            const message = 'Update task by ID, Successful';
            const data = { id: taskId, ...updatedTaskData };
            const statusCode = 200;
            return { message, data, status: statusCode };
        } catch (error) {
            console.error(error);
            const message = error.message;
            const data = null;
            const statusCode = 500;
            return { message, data, status: statusCode };
        } finally {
            conn.end();
        }
    }

    static async deleteTask(taskId) {
        const conn = await initMySQL();
        try {
            const [deleteResult] = await conn.query('DELETE FROM tasks WHERE id = ?', [taskId]);

            if (deleteResult.affectedRows === 1) {
                const message = 'Task deleted successfully';
                const data = null;
                const statusCode = 200;
                return { message, data, status: statusCode };
            } else {
                const message = 'Task not found';
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
        } finally {
            conn.end();
        }
    }

}

module.exports = Task