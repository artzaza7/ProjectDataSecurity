// Connect Database
// CONST Config
const DB_HOST = 'localhost'
const DB_USER = 'root'
const DB_PASSWORD = ''
const DB_NAME = 'task_management_database'
const DB_PORT = '3306'

const mysql = require('mysql2/promise')

async function initMySQL() {
    const conn = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        port: DB_PORT
    })
    return conn
}


module.exports = {
    initMySQL
}
