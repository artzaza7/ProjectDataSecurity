// USING MODEL
const Status = require("../Models/statusModel")

async function getAllStatuses(req, res) {
    try {
        const responseData = await Status.getAllStatuses();
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