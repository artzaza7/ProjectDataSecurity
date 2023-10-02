// Connect Database
const { initMySQL } = require('../Config/database')

class CategoryTask {
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
    static async getAllCategoryTasks() {
        const categories = [];
        try {
            const conn = await initMySQL();
            const results = await conn.query('SELECT * FROM category_task');
            results[0].forEach((value) => {
                categories.push(value);
            });
            const message = "Get all categories, Successful";
            const data = categories;
            const statusCode = 200;
            return { message, data, status: statusCode };
        } catch (error) {
            // console.error(error);
            const message = error.message;
            const data = categories;
            const statusCode = 500;
            return { message, data, status: statusCode };
        }
    }

    static async getCategoryTaskById(categoryTaskId) {
        try {
            const conn = await initMySQL();
            const query = 'SELECT * FROM category_task WHERE id = ?';
            const results = await conn.query(query, [categoryTaskId]);

            if (results[0].length === 0) {
                const message = 'Category task not found';
                const data = null;
                const statusCode = 404;
                return { message, data, status: statusCode };
            }

            const categoryTask = results[0][0];
            const message = 'Get category task by ID, Successful';
            const data = categoryTask;
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

module.exports = CategoryTask