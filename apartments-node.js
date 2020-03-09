module.exports = function(){
    var express = require('express');
    var router = express.Router();

    // Selects all available apartments
    function getAvailableApartments(res, mysql, context, complete){
        mysql.pool.query("SELECT aptID AS id, aptNumber, numBeds, numBaths, dateAvailable, rent, aptImg FROM apartments WHERE availabilityStatus = 'Available'", function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.apartments = results;
            complete();
        })
    }



    // Selects the amenities for a specific apartment
    function filterApartments(res, req, mysql, context, complete){
        // console.log(req.query);
        if(Object.keys(req.query).length > 0){
            console.log("filtering");
            console.log(req.query);
            mysql.pool.query("SELECT aptID AS id, aptNumber, numBeds, numBaths, dateAvailable, rent, aptImg FROM apartments WHERE availabilityStatus = 'Available' AND (rent BETWEEN ? AND ?) AND (numBeds BETWEEN ? AND ?) AND (numBaths BETWEEN ? AND ?)", [req.query.rentMin, req.query.rentMax, req.query.bedMin, req.query.bedMax, req.query.bathMin, req.query.bathMax], function(error, results, fields){
                if (error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.apartments = results; 
                console.log(context.apartments)
                complete();
            })
        }
        else{
            console.log("showing everything");
            mysql.pool.query("SELECT aptID AS id, aptNumber, numBeds, numBaths, dateAvailable, rent, aptImg FROM apartments WHERE availabilityStatus = 'Available'", function(error, results, fields){
                if (error){
                    res.write(JSON.stringify(error));
                    res.end();
                }
                context.apartments = results;
                complete();
            })
        }

    }

    // Display all available apartments
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.mainMessage = "View available apartments";
        var mysql = req.app.get('mysql');
        // getAvailableApartments(res, mysql, context, complete);
        filterApartments(res, req, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('apartments', context);
            }
        }
    })



    return router;
}();