// USING MODEL
const User = require("../Models/userModel")

// Using jwt
const jwt = require("jsonwebtoken")

//USING ENCRYPT AND DECRYPT
const { encrypt, decrypt } = require("../Utils/cryptoUtils")
const { encryption, decryption } = require('../Utils/encryption')
const secretKey = process.env.SECRET_KEY;

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
        var jsonString = JSON.stringify(response);
        encrypt_data = encryption(jsonString)
        res.json(encrypt_data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function registerUser(req, res) {
    const { decrypt_data } = req.body;
    const { username, password, email, firstname, lastname } = JSON.parse(decryption(decrypt_data));

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
        var jsonString = JSON.stringify(response);
        var encrypt_data = encryption(jsonString)
        res.json(encrypt_data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function loginUser(req, res) {
    const { decrypt_data } = req.body;
    const { username, password } = JSON.parse(decryption(decrypt_data));
    try {
        await User.checkAndResetLoginStatus();
        const responseData = await User.login(encrypt(username), password);
        if (responseData.status === 404) {
            return res.status(404).json({ error: responseData.message });
        } else if (responseData.status === 401) {
            return res.status(401).json({ error: responseData.message });
        } else if (responseData.status === 202) {
            return res.status(202).json({ message: responseData.message });
        }

        const usernameData = responseData.data.username;
        // create token
        const token = jwt.sign({ username: usernameData }, secretKey, { expiresIn: '2h' })
        let response = {
            message: responseData.message,
            data: {
                token
            },
            status: responseData.status
        }
        var jsonString = JSON.stringify(response);
        var encrypt_data = encryption(jsonString)
        res.json(encrypt_data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function resetPassword(req, res) {
    const { decrypt_data } = req.body;
    const { username, email, password } = JSON.parse(decryption(decrypt_data));

    try {
        await User.checkAndResetLoginStatus();
        const resetResult = await User.resetPassword(encrypt(username), encrypt(email), password);

        if (resetResult.status === 200) {
            return res.status(200).json({ message: 'Password reset successful' });
        } else if (resetResult.status === 202) {
            return res.status(202).json({ message: resetResult.message });
        } else if (resetResult.status === 400) {
            return res.status(400).json({ error: resetResult.message });
        } else {
            return res.status(500).json({ error: 'Failed to reset password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function isTokenValid(req, res) {
    const { decrypt_data } = req.body;
    const { token } = JSON.parse(decryption(decrypt_data));

    try {
        jwt.verify(token, secretKey);
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