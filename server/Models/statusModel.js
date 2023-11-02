// Connect Database
const { initMySQL } = require('../Config/database')

class Status {
    // Properties
    #id
    #name
    constructor(id, name) {
        this.#id = id
        this.#name = name
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

    // Function
    static async getAllStatuses() {
        const statuses = [];
        const conn = await initMySQL();
        try {
            const results = await conn.query('SELECT * FROM status');

            results[0].forEach((value) => {
                statuses.push(value);
            });
            const message = "Get all statuses, Successful";
            const data = statuses;
            const statusCode = 200;
            return { message, data, status: statusCode };
        } catch (error) {
            // console.error(error);
            const message = error.message;
            const data = statuses;
            const statusCode = 500;
            return { message, data, status: statusCode };
        } finally {
            conn.end();
        }
    }

    static async getStatusById(statusId) {
        const conn = await initMySQL();
        try {
            const query = 'SELECT * FROM status WHERE id = ?';
            const results = await conn.query(query, [statusId]);

            if (results[0].length === 0) {
                const message = 'Status not found';
                const data = null;
                const statusCode = 404;
                return { message, data, status: statusCode };
            }

            const status = results[0][0];
            const message = 'Get status by ID, Successful';
            const data = status;
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

}

module.exports = Status