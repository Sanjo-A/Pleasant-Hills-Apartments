var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit : 100,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_minchela',
    password: '',
    database: ''
});

module.exports.pool = pool;