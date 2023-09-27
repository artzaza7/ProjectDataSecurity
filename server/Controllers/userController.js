async function getAllUser(req, res) {
    let user = {
        firstname: "Chanakan",
        lastname: "Srisarutiporn",
        age: 22
    }
    res.json(user);
}

module.exports = {
    getAllUser,
}