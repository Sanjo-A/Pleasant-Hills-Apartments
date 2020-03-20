module.exports = function(){
    var express = require('express');
    var router = express.Router();

    function getTechs(res, mysql, context, complete){
        mysql.pool.query("SELECT techID, techFName, techLName FROM technicians", function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            context.technicians = results;
            complete();
        });
    }

    function getWorkOrd(res, mysql, context, complete){
        var sql = "SELECT wkOrdID, aptID FROM work_orders WHERE wkOrdID = ?";
        var inserts = [id];
        mysql.pool.query(sql, inserts, function (error, results, fields){
            if(error){
                res.qrite(JSON.stringify(error));
                res.end();
            }
            context.wkOrdID = results[0];
            context.aptID = results[1];
            complete;
        });
    }

    router.get('/assignment-details/:id', function(req, res) {
        var callbackCount = 0;
        var context = {};
        context.mainMessage = "Add details"
        var mysql = rep.app.get('mysql');
        getWorkOrd(res, mysql, req.params.id, complete);
        getTechs(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 2){
                res.render('assignment-details', context);
            }
        }
    });

    router.post('assignment-details/:id', function(req,res) {
        var mysql = req.app.get('mysql');
        var sql = "INSERT INTO assignment_details (serviceType, materialCost, techID, wkOrdID, aptID) VALUES ?, ?, ?, ?, ?";
        var inserts = [req.body.serviceType, req.body.materialCost, req.body.techID, req.params.wkOrdID, req.params.aptID];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                res.write(JSON.stringify(error));
                res.end();
            }
            else{
                res.redirect('/technician-portal');
            }
        });
    });

    router.put('/assignment-details:id', function(req, res){
        var mysql = req.app.get('mysql');
        console.log(req.body)
        console.log(req.params.id)
        var sql = "UPDATE assignment_details SET serviceType=?, materialCost=?, techID=? WHERE wkOrdID=?";
        var inserts = [req.body.serviceType, req.body.materialCost, req.body.techID, req.params.id];
        sql = mysql.pool.query(sql, inserts, function(error, results, fields){
            if(error){
                console.log(error)
                res.write(JSON.stringify(error));
                res.end();
            }else{
                res.status(200);
                res.end();
            }
        });
    });

    return router;
}();