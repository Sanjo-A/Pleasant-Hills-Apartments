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
            context.workorders = results;
            complete();
        })
    }

    function getTechnicians(res, mysql, context, complete){
        mysql.pool.query("SELECT work_orders.techID, technicians.techFName, technicians.techLName FROM work_orders INNER JOIN technicians ON work_orders.techID = technicians.techID", function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                res.end();
            }
            console.log(results);
            context.technicians = results;
            complete();
        })
    }

    function getWorkOrder(res, mysql, context, id, complete){
        var sql = "SELECT wkOrdID as id, wkOrdDescription, wkOrdDateSubmitted, wkOrdDateCompleted, wkOrdStatus, wkOrdImg, techID FROM work_orders WHERE wkOrdID = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.workorder = results[0];
            complete();
        });
    }

    // Display all work orders
    router.get('/', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateworkorder.js"];
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

   router.get('/:id', function(req, res){
        var callbackCount = 0;
        var context = {};
        context.jsscripts = ["updateworkorder.js"];
        var mysql = req.app.get('mysql');
        getTechnicians(res, mysql, context, complete);
        getWorkOrder(res, mysql, req.params.id, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('update-work-order', context);
            }
        }
    });

    return router;
}();