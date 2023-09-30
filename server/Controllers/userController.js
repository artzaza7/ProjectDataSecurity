// USING MODEL
const User = require("../Models/userModel")

async function getAllUser(req, res) {
    const responseData = await User.getAllUser();
    let response = {
        message: responseData.message,
        data: responseData.data,
        status: responseData.status
    }
    res.json(response);
}

module.exports = {
    getAllUser,
}