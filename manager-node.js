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

    function getAmenities(res, mysql, context, complete){
        mysql.pool.query("SELECT amenDescription FROM amenities", function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.amenities = results;
            complete();
        })
    }

    function getCustomers(res, mysql, context, complete){
        mysql.pool.query("SELECT custFName, custLName, custEmail, custPhone, rentStatus FROM customers", function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.customers = results;
            complete();
        })
    }

    function getTechnicians(res, mysql, context, complete){
        mysql.pool.query("SELECT techFName, techLName, techEmail, techPhone FROM technicians", function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.technicians = results;
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
        getAmenities(res, mysql, context, complete);
        getCustomers(res, mysql, context, complete);
        getTechnicians(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 4){
                res.render('manager-portal', context);
            }
        }
    })

    return router;
}();