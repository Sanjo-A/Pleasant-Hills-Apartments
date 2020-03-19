module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getApartments(res, mysql, context, complete){
        mysql.pool.query("SELECT aptID, aptNumber, rent, numBeds, numBaths, availabilityStatus,  DATE_FORMAT(dateAvailable, '%Y-%m-%d') AS dateAvailable FROM apartments", function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                // res.end();
                // next(err);
                return;
            }
            context.apartments = results;
            // console.log(results)
            complete();

        })
    }

    function getAmenities(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM amenities", function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                // res.end();
                // next(err);
                return;
            }
            context.amenities = results;
            complete();
        })
    }

    function getCustomers(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM customers", function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                // res.end();
                // next(err);
                return;
            }
            context.customers = results;
            complete();
        })
    }

    function getTechnicians(res, mysql, context, complete){
        mysql.pool.query("SELECT * FROM technicians", function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                // res.end();
                // next(err);
                return;
            }
            context.technicians = results;
            complete();
        })
    }

    // Display all apartments, amenities, customers, and technicians
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

    // Add a new amenity
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO amenities(amenDescription) VALUES (?);";
        var inserts = [req.body.amenDescrip];
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