// USING MODEL
const User = require("../Models/userModel")

// Using jwt
const jwt = require("jsonwebtoken")

async function getAllUsers(req, res) {
    try {
        const responseData = await User.getAllUsers(req.conn);
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
        const responseData = await User.getUserByUsername(username, req.conn);
        if (responseData.status === 404) {
            return res.status(404).json({ error: 'User not found' });
        }
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
    console.log(req.body);

    try {
        const responseData = await User.registerUser(username, password, email, firstname, lastname, req.conn);
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
    console.log(req.body);

    try {
        const responseData = await User.login(username, password, req.conn);
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

module.exports = {
    getAllUsers,
    getUserByUsername,
    registerUser,
    loginUser,
}