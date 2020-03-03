module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getAmenities(res, mysql, context, complete){
        mysql.pool.query("SELECT amenID, amenDescription FROM amenities", function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.amenities = results;
            complete();
        })
    }

    // Display amenities in dropdown
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        getAmenities(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('new-listing', context);
            }
        }
    })

    // Add new apartment listing
    router.post('/', function(req, res){
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO apartments(aptNumber, rent, numBeds, numBaths, dateAvailable, availabilityStatus) VALUES(?, ?, ?, ?, ?, ?);";
        var inserts = [req.body.aptNumber, req.body.rent, req.body.numBeds, req.body.numBaths, req.body.dateAvail, req.body.availStatus];
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