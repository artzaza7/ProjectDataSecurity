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
    #login_count
    #login_date
    #forgot_name_count
    #forgot_name_date
    #forgot_email_count
    #forgot_email_date
    constructor(username, password, email, firstname, lastname, login_count, login_date, forgot_name_count, forgot_name_date, forgot_email_count, forgot_email_date) {
        this.#username = username
        this.#password = password
        this.#email = email
        this.#firstname = firstname
        this.#lastname = lastname
        this.#login_count = login_count
        this.#login_date = login_date
        this.#forgot_name_count = forgot_name_count
        this.#forgot_name_date = forgot_name_date
        this.#forgot_email_count = forgot_email_count
        this.#forgot_email_date = forgot_email_date
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

    get login_count() {
        return this.#login_count;
    }

    set login_count(value) {
        this.#login_count = value;
    }

    get login_date() {
        return this.#login_date;
    }

    set login_date(value) {
        this.#login_date = value;
    }

    get forgot_name_count() {
        return this.#forgot_name_count;
    }

    set forgot_name_count(value) {
        this.#forgot_name_count = value;
    }

    get forgot_name_date() {
        return this.#forgot_name_date;
    }

    set forgot_name_date(value) {
        this.#forgot_name_date = value;
    }

    get forgot_email_count() {
        return this.#forgot_email_count;
    }

    set forgot_email_count(value) {
        this.#forgot_email_count = value;
    }

    get forgot_email_date() {
        return this.#forgot_email_date;
    }

    set forgot_email_date(value) {
        this.#forgot_email_date = value;
    }

    // Function
    static async getAllUsers() {
        const users = [];
        const conn = await initMySQL();
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
        } finally {
            conn.end();
        }
    }

    static async getUserByUsername(username) {
        const conn = await initMySQL();
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
        } finally {
            conn.end();
        }
    }

    static async getUserByEmail(email) {
        const conn = await initMySQL();
        try {
            const query = 'SELECT * FROM users WHERE email = ?';
            const results = await conn.query(query, [email]);

            if (results[0].length === 0) {
                const message = 'Email not found';
                const data = null;
                const statusCode = 404;
                return { message, data, status: statusCode };
            }

            const user = results[0][0];
            const message = 'Get user by email, Successful';
            const data = user;
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

    static async registerUser(username, password, email, firstname, lastname) {
        const conn = await initMySQL();
        try {
            const existingUser = await this.getUserByUsername(username);
            if (existingUser.status === 200) {
                return { message: 'Username already exists', data: null, status: 400 };
            }

            const existingEmail = await this.getUserByEmail(email);
            if (existingEmail.status === 200) {
                return { message: 'Email already exists', data: null, status: 400 };
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
        } finally {
            conn.end();
        }
    }

    static async login(username, password) {
        const conn = await initMySQL();
        try {
            const query = 'SELECT * FROM users WHERE username = ?';
            const results = await conn.query(query, [username]);

            if (results[0].length === 0) {
                return { message: 'User not found', data: null, status: 404 };
            }

            const user = results[0][0];

            // Check if either login_count is already 10; if so, prevent login
            if (
                user.login_count === 10
            ) {
                return { message: 'Username is locked. Please try again tomorrow.', data: null, status: 202 };
            }

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch) {
                // Update the login count in the database
                const updatedlogin_count = user.login_count + 1;
                const updatelogin_countQuery = 'UPDATE users SET login_count = ? WHERE username = ?';
                await conn.query(updatelogin_countQuery, [updatedlogin_count, username]);

                // Check if so, set the login date to tomorrow
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                const updatelogin_dateQuery = 'UPDATE users SET login_date = ? WHERE username = ?';
                await conn.query(updatelogin_dateQuery, [tomorrow, username]);

                return { message: 'Invalid password', data: null, status: 401 };
            }

            // Reset the login count upon successful login
            const resetlogin_countQuery = 'UPDATE users SET login_count = 0, login_date = NULL WHERE username = ?';
            await conn.query(resetlogin_countQuery, [username]);

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
        } finally {
            conn.end();
        }
    }

    static async resetPassword(username, email, newPassword) {
        const conn = await initMySQL();
        try {
            // Check if the user exists by username
            const existingUser = await this.getUserByUsername(username);

            // Check if the provided email matches the user's email
            if (existingUser.status === 404 || existingUser.data.email !== email) {
                let message = 'Invalid email and username combination';

                if (existingUser.status === 200) {

                    // Check if either forgot_name_count, or forgot_email_count is already 10; if so, prevent password reset
                    if (
                        existingUser.data.forgot_name_count === 10
                    ) {
                        return { message: 'Username is locked. Please try again tomorrow.', data: null, status: 202 };
                    } else if (
                        existingUser.data.forgot_email_count === 10
                    ) {
                        return { message: 'Email is locked. Please try again tomorrow.', data: null, status: 202 };
                    }

                    if (existingUser.data.forgot_name_count < 10) {
                        const newForgotEmailCount = existingUser.data.forgot_name_count + 1;
                        const updateForgotEmailCountQuery = 'UPDATE users SET forgot_name_count = ? WHERE username = ?';
                        await conn.query(updateForgotEmailCountQuery, [newForgotEmailCount, existingUser.data.username]);
                        const tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        const updateForgotEmailDateQuery = 'UPDATE users SET forgot_name_date = ? WHERE username = ?';
                        await conn.query(updateForgotEmailDateQuery, [tomorrow, existingUser.data.username]);
                    }
                } else {
                    const query = 'SELECT username, forgot_name_count, forgot_email_count, forgot_email_date FROM users WHERE email = ?';
                    const result = await conn.query(query, [email]);
                    if (result[0].length === 1) {
                        const user = result[0][0];

                        // Check if either login_count, forgot_name_count, or forgot_email_count is already 10; if so, prevent password reset
                        if (
                            user.forgot_name_count === 10
                        ) {
                            return { message: 'Username is locked. Please try again tomorrow.', data: null, status: 202 };
                        } else if (
                            user.forgot_email_count === 10
                        ) {
                            return { message: 'Email is locked. Please try again tomorrow.', data: null, status: 202 };
                        }

                        if (user.forgot_email_count < 10) {
                            const newForgotNameCount = user.forgot_email_count + 1;
                            const updateForgotNameCountQuery = 'UPDATE users SET forgot_email_count = ? WHERE username = ?';
                            await conn.query(updateForgotNameCountQuery, [newForgotNameCount, user.username]);
                            const tomorrow = new Date();
                            tomorrow.setDate(tomorrow.getDate() + 1);
                            const updateForgotNameDateQuery = 'UPDATE users SET forgot_email_date = ? WHERE username = ?';
                            await conn.query(updateForgotNameDateQuery, [tomorrow, user.username]);
                        }
                    }
                }

                const data = null;
                const statusCode = 400;
                return { message, data, status: statusCode };
            }

            // Check if either login_count, forgot_name_count, or forgot_email_count is already 10; if so, prevent password reset return { message: 'Email is locked. Please try again tomorrow.', data: null, status: 202 };
            if (
                existingUser.data.forgot_name_count === 10
            ) {
                return { message: 'Username is locked. Please try again tomorrow.', data: null, status: 202 };
            } else if (
                existingUser.data.forgot_email_count === 10
            ) {
                return { message: 'Email is locked. Please try again tomorrow.', data: null, status: 202 };
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);

            // Update the user's password in the database
            const updateQuery = 'UPDATE users SET password = ? WHERE username = ?';
            const [updateResult] = await conn.query(updateQuery, [hashedPassword, username]);

            if (updateResult.affectedRows === 1) {
                // Reset the forgot count upon successful password reset
                const resetForgotCountsQuery = 'UPDATE users SET forgot_name_count = 0, forgot_name_date = NULL, forgot_email_count = 0, forgot_email_date = NULL WHERE username = ?';
                await conn.query(resetForgotCountsQuery, [username]);
                return { message: 'Password reset successful', data: null, status: 200 };
            } else {
                return { message: 'Failed to reset password', data: null, status: 500 };
            }
        } catch (error) {
            console.error(error);
            return { message: error.message, data: null, status: 500 };
        } finally {
            conn.end();
        }
    }

    static async checkAndResetLoginStatus() {
        const conn = await initMySQL();
        try {
            const currentDate = new Date();
            const query = 'SELECT username, login_count, login_date, forgot_name_count, forgot_name_date, forgot_email_count, forgot_email_date FROM users ' +
                'WHERE (login_date IS NOT NULL) ' +
                'OR (forgot_name_date IS NOT NULL) ' +
                'OR (forgot_email_date IS NOT NULL)';
            const results = await conn.query(query);

            for (const result of results[0]) {
                const username = result.username;

                if (result.login_date) {
                    const loginDate = new Date(result.login_date);

                    if (currentDate > loginDate) {
                        // Reset the login count and login date
                        const resetQuery = 'UPDATE users SET login_count = 0, login_date = NULL WHERE username = ?';
                        await conn.query(resetQuery, [username]);
                    }
                }

                if (result.forgot_name_date) {
                    const forgotNameDate = new Date(result.forgot_name_date);

                    if (currentDate > forgotNameDate) {
                        // Reset the forgot_name_count and forgot_name_date
                        const resetQuery = 'UPDATE users SET forgot_name_count = 0, forgot_name_date = NULL WHERE username = ?';
                        await conn.query(resetQuery, [username]);
                    }
                }

                if (result.forgot_email_date) {
                    const forgotEmailDate = new Date(result.forgot_email_date);

                    if (currentDate > forgotEmailDate) {
                        // Reset the forgot_email_count and forgot_email_date
                        const resetQuery = 'UPDATE users SET forgot_email_count = 0, forgot_email_date = NULL WHERE username = ?';
                        await conn.query(resetQuery, [username]);
                    }
                }
            }

            const message = 'Login status checked and reset as needed';
            const data = null;
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

module.exports = User