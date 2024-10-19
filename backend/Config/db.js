const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Kavya@123',
    database: 'job_posting_board',
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected.');
});

module.exports = db;