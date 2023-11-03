// USING MODEL
const User = require("../Models/userModel")

// Using jwt
const jwt = require("jsonwebtoken")

//USING ENCRYPT AND DECRYPT
const { encrypt, decrypt } = require("../Utils/cryptoUtils")

async function getAllUsers(req, res) {
    try {
        const responseData = await User.getAllUsers();
        responseData.data = responseData.data.map(user => ({
            username: decrypt(user.username),
            password: user.password,
            email: decrypt(user.email),
            firstname: decrypt(user.firstname),
            lastname: decrypt(user.lastname)
        }));
        let response = {
            message: responseData.message,
            data: responseData.data,
            status: responseData.status
        }
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function getUserByUsername(req, res) {
    const username = req.params.username;
    try {
        const responseData = await User.getUserByUsername(username);
        if (responseData.status === 404) {
            return res.status(404).json({ error: 'User not found' });
        }
        responseData.data.username = decrypt(responseData.data.username);
        responseData.data.password = responseData.data.password;
        responseData.data.email = decrypt(responseData.data.email);
        responseData.data.firstname = decrypt(responseData.data.firstname);
        responseData.data.lastname = decrypt(responseData.data.lastname);
        let response = {
            message: responseData.message,
            data: responseData.data,
            status: responseData.status
        }
        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function registerUser(req, res) {
    const { username, password, email, firstname, lastname } = req.body;

    try {
        const responseData = await User.registerUser(encrypt(username), password, encrypt(email), encrypt(firstname), encrypt(lastname));
        if (responseData.status === 400) {
            return res.status(400).json({ error: responseData.message });
        }
        let response = {
            message: responseData.message,
            data: responseData.data,
            status: responseData.status
        }
        res.status(responseData.status).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function loginUser(req, res) {
    const { username, password } = req.body;

    try {
        await User.checkAndResetLoginStatus();
        const responseData = await User.login(encrypt(username), password);
        if (responseData.status === 404) {
            return res.status(404).json({ error: responseData.message });
        } else if (responseData.status === 401) {
            return res.status(401).json({ error: responseData.message });
        }
        const usernameData = responseData.data.username;
        // create Secret 
        const secret = 'DataSecuritySystem'
        // create token
        const token = jwt.sign({ username: usernameData }, secret, { expiresIn: '2h' })
        let response = {
            message: responseData.message,
            data: {
                token
            },
            status: responseData.status
        }
        res.status(responseData.status).json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function resetPassword(req, res) {
    const { username, email, password } = req.body;

    try {
        await User.checkAndResetLoginStatus();
        const resetResult = await User.resetPassword(encrypt(username), encrypt(email), password);

        if (resetResult.status === 200) {
            return res.status(200).json({ message: 'Password reset successful' });
        } else if (resetResult.status === 401) {
            return res.status(404).json({ error: resetResult.message });
        } else if (resetResult.status === 404) {
            return res.status(404).json({ error: 'User not found' });
        } else if (resetResult.status === 400) {
            return res.status(400).json({ error: 'Email does not match user record' });
        } else {
            return res.status(500).json({ error: 'Failed to reset password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function isTokenValid(req, res) {
    const token = req.body.token;

    try {
        const secret = 'DataSecuritySystem';
        jwt.verify(token, secret);
        const response = {
            message: 'Token is valid',
            status: 200
        };
        res.status(200).json(response);
    } catch (error) {
        const response = {
            error: 'Token is invalid',
            status: 401
        };
        res.status(401).json(response);
    }
}

module.exports = {
    getAllUsers,
    getUserByUsername,
    registerUser,
    loginUser,
    resetPassword,
    isTokenValid
}