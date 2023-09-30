// Connect Database
const { initMySQL } = require('../Config/database')

class User {
    // Properties
    #username
    #password
    #email
    #firstname
    #lastname
    #conn
    constructor(username, password, email, firstname, lastname) {
        this.#username = username
        this.#password = password
        this.#email = email
        this.#firstname = firstname
        this.#lastname = lastname
    }
    // Function
    static async getAllUser() {
        const users = []
        try {
            const conn = await initMySQL();
            const results = await conn.query('SELECT * FROM users');
            results[0].forEach((value) => {
                users.push(value)
            })
            const message = "Get all users, Successful"
            const data = users
            const status = 200
            return { message, data, status }
        } catch (error) {
            // console.error(error);
            const message = error.message
            const data = users
            const status = 500
            return { message, data, status }
        }
    }
}

module.exports = User