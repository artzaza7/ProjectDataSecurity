// USING MODEL
const Status = require("../Models/statusModel")

//USING ENCRYPT AND DECRYPT
const {decrypt} = require("../Utils/cryptoUtils")

async function getAllStatuses(req, res) {
    try {
        const responseData = await Status.getAllStatuses();
        responseData.data = responseData.data.map(status => ({
            id: status.id,
            name: decrypt(status.name)
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

async function getStatusById(req, res) {
    const id = req.params.statusId;
    try {
        const responseData = await Status.getStatusById(id);

        if (responseData.status === 404) {
            return res.status(404).json({ error: 'Status not found' });
        }
        responseData.data.name = decrypt(responseData.data.name);
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

module.exports = {
    getAllStatuses,
    getStatusById,
}