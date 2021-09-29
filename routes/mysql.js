const mysql = require('mysql');
const client = mysql.createConnection({
    host: 'guru.cafe24app.com',
    user: 'jun950419',
    password: 'jeongjun9183!',
    database: 'jun950419',
    port: '3306',
});
client.query('use jun950419');
module.exports = client;