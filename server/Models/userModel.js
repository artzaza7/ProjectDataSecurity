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
    static async getAllUsers() {
        const users = []
        try {
            const conn = await initMySQL();
            const results = await conn.query('SELECT * FROM users');
            await conn.end();

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

    static async getUserByUsername(username) {
        try {
            const conn = await initMySQL();
            const query = 'SELECT * FROM users WHERE username = ?';
            const results = await conn.query(query, [username]);
            await conn.end();

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

    static async registerUser(username, password, email, firstname, lastname) {
        try {
            const existingUser = await this.getUserByUsername(username);
            if (existingUser.status === 200) {
                return { message: 'Username already exists', data: null, status: 400 };
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const conn = await initMySQL();
            const query = 'INSERT INTO users (username, password, email, firstname, lastname) VALUES (?, ?, ?, ?, ?)';
            const [insertResult] = await conn.query(query, [username, hashedPassword, email, firstname, lastname]);
            await conn.end();

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

    static async login(username, password) {
        try {
            const conn = await initMySQL();
            const query = 'SELECT * FROM users WHERE username = ?';
            const results = await conn.query(query, [username]);
            await conn.end();

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

    static async resetPassword(username, email, newPassword) {
        try {
            // Check if the user exists by username
            const existingUser = await this.getUserByUsername(username);

            if (existingUser.status === 404) {
                return { message: 'User not found', data: null, status: 404 };
            }

            // Check if the provided email matches the user's email
            if (existingUser.data.email !== email) {
                return { message: 'Email does not match user record', data: null, status: 400 };
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update the user's password in the database
            const conn = await initMySQL();
            const updateQuery = 'UPDATE users SET password = ? WHERE username = ?';
            const [updateResult] = await conn.query(updateQuery, [hashedPassword, username]);
            await conn.end();

            if (updateResult.affectedRows === 1) {
                return { message: 'Password reset successful', data: null, status: 200 };
            } else {
                return { message: 'Failed to reset password', data: null, status: 500 };
            }
        } catch (error) {
            console.error(error);
            return { message: error.message, data: null, status: 500 };
        }
    }
}

module.exports = User