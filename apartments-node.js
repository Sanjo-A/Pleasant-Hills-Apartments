module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getAvailableApartments(res, mysql, context, complete){
        mysql.pool.query("SELECT aptNumber, numBeds, numBaths, dateAvailable, rent FROM apartments WHERE availabilityStatus = 'Available'", function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.apartments = results;
            complete();
        })
    }

    // Display all available apartments
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getAvailableApartments(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('apartments', context);
            }
        }
    })

    return router;
}();