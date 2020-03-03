module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        res.render('newTechnician', context);
    })

    // Add new technician listing
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO technicians(techFName, techLName, techPhone, techEmail) VALUES(?, ?, ?, ?);";
        var inserts = [req.body.techFName, req.body.techLName, req.body.techPhone, req.body.techEmail];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }
            else{
                res.redirect('/manager-portal');
            }
        });
    });

    return router;
}();