// Connect Database
// CONST Config
const DB_HOST = 'localhost'
const DB_USER = 'root'
const DB_PASSWORD = ''
const DB_NAME = 'task_management_database'
const DB_PORT = '3306'

const mysql = require('mysql2/promise')

function initMySQL() {
    const conn = mysql.createPool({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        port: DB_PORT,
        connectionLimit: 10,
    })
    return conn
}


module.exports = {
    initMySQL
}
