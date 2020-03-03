module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        res.render('create-account', context);
    })

    // Add new customer
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO customers(custFName, custLName, custEmail, custPhone, username, password) VALUES (?, ?, ?, ?, ?, ?)";
        var inserts = [req.body.firstName, req.body.lastName, req.body.email, req.body.phone, req.body.username, req.body.password];
        sql = mysql.pool.query(sql,inserts,function(error, results, fields){
            if(error){
                console.log(JSON.stringify(error))
                res.write(JSON.stringify(error));
                res.end();
            }
            else{
                res.redirect('/create-account');
            }
        });
    });

    return router;
}();