module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getWorkOrders(res, mysql, context, complete){
        mysql.pool.query("SELECT wkOrdID as id, apartments.aptNumber AS aptNum, wkOrdDescription, wkOrdDateSubmitted, wkOrdDateCompleted, wkOrdStatus FROM work_orders INNER JOIN apartments ON work_orders.aptID = apartments.aptID", function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                res.end();
            }
            console.log(results);
            context.work_orders = results;
            complete();
        })
    }

    // Display all work orders
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        var mysql = req.app.get('mysql');
        // getWorkOrders(res, mysql, context, complete);
        // function complete(){
        //     callbackCount++;
        //     if(callbackCount >= 1){
        //         res.render('technician-portal', context);
        //     }
        // }
        mysql.pool.query("SELECT wkOrdID as id, apartments.aptNumber AS aptNum, wkOrdDescription, wkOrdDateSubmitted, wkOrdDateCompleted, wkOrdStatus FROM work_orders INNER JOIN apartments ON work_orders.aptID = apartments.aptID", function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                res.end();
            }
            console.log(results);
            context.work_orders = results;
            res.render('technician-portal', context);
        })
    })

    return router;
}();