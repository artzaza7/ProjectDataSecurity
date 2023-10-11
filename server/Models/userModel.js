// Connect Database
const { initMySQL } = require('../Config/database')
const bcrypt = require('bcrypt');

class User {
    // Properties
    #username
    #password
    #email
    #firstname
    #lastname
    constructor(username, password, email, firstname, lastname) {
        this.#username = username
        this.#password = password
        this.#email = email
        this.#firstname = firstname
        this.#lastname = lastname
    }

    // Getters and setters for properties
    get username() {
        return this.#username;
    }

    set username(value) {
        this.#username = value;
    }

    get password() {
        return this.#password;
    }

    set password(value) {
        this.#password = value;
    }

    get email() {
        return this.#email;
    }

    set email(value) {
        this.#email = value;
    }

    get firstname() {
        return this.#firstname;
    }

    set firstname(value) {
        this.#firstname = value;
    }

    get lastname() {
        return this.#lastname;
    }

    set lastname(value) {
        this.#lastname = value;
    }

    // Function
    static async getAllUsers(conn) {
        const users = []
        try {

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

    static async getUserByUsername(username, conn) {
        try {

            const query = 'SELECT * FROM users WHERE username = ?';
            const results = await conn.query(query, [username]);

            if (results[0].length === 0) {
                const message = 'User not found';
                const data = null;
                const statusCode = 404;
                return { message, data, status: statusCode };
            }

            const user = results[0][0];
            const message = 'Get user by username, Successful';
            const data = user;
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

    static async registerUser(username, password, email, firstname, lastname, conn) {
        try {
            const existingUser = await this.getUserByUsername(username);
            if (existingUser.status === 200) {
                return { message: 'Username already exists', data: null, status: 400 };
            }

            const hashedPassword = await bcrypt.hash(password, 10);


            const query = 'INSERT INTO users (username, password, email, firstname, lastname) VALUES (?, ?, ?, ?, ?)';
            const [insertResult] = await conn.query(query, [username, hashedPassword, email, firstname, lastname]);

            const newUser = {
                username,
                email,
                firstname,
                lastname,
            };

            if (insertResult.affectedRows === 1) {
                const message = 'User registration successful';
                const data = newUser;
                const statusCode = 201;
                return { message, data, status: statusCode };
            } else {
                const message = 'Failed to register user';
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

    static async login(username, password, conn) {
        try {

            const query = 'SELECT * FROM users WHERE username = ?';
            const results = await conn.query(query, [username]);

            if (results[0].length === 0) {
                return { message: 'User not found', data: null, status: 404 };
            }

            const user = results[0][0];

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                return { message: 'Invalid password', data: null, status: 401 };
            }

            const message = 'Login successful';
            const data = user;
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

module.exports = User