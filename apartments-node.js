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

    // Selects a specific apartment
    function getApartment(res, mysql, context, id, complete){
        var sql = "SELECT aptID AS id, aptNumber, numBeds, numBaths, dateAvailable, rent, aptImg FROM apartments WHERE aptID = ?;";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.apartment = results;
            complete();
        })
    }

    // Selects the amenities for a specific apartment
    function getApartmentAmenities(res, mysql, context, id, complete){
        var sql = "SELECT aptID AS id, amenID, amenities.amenDescription FROM apartments INNER JOIN apartment_amenities on apartments.aptID = apartment_amenities.aptID INNER JOIN amenities ON apartment_amenities.amenID = amenities.amenID WHERE aptID = ?;";
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.amenities = results;
            complete();
        })
    }

    // Display all available apartments
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.mainMessage = "View apartments";
        var mysql = req.app.get('mysql');
        getAvailableApartments(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('apartments', context);
            }
        }
    })

   // Display details on a specific apartment
    router.get('/:id', function(req, res){
        callbackCount = 0;
        var context = {};
        context.mainMessage = "View apartments";
        var mysql = req.app.get('mysql');
        getApartment(res, mysql, context, req.params.id, complete);
        getApartmentAmenities(res, mysql, context, req.params.id, complete)
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('apartment-details', context);
            }

        }
    });

    return router;
}();