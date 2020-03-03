module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getApartments(res, mysql, context, complete){
        mysql.pool.query("SELECT aptNumber, rent, numBeds, numBaths, dateAvailable, availabilityStatus FROM apartments", function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.apartments = results;
            complete();
        })
    }

    // Display all apartments
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        // context.jsscripts = ["deleteapartment.js"];
        var mysql = req.app.get('mysql');
        getApartments(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('manager-portal', context);
            }
        }
    })
};