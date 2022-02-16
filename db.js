'use_strich'

const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_laundry"
})

module.exports = db;