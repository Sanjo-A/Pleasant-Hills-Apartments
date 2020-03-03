var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 10,
    host: 'classmysql.engr.oregonstate.edu',
    user: 'cs340_minchela',
    password: '6115',
    database: 'cs340_minchela'
});
module.exports.pool = pool;