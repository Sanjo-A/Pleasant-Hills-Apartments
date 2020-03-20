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



   //Renders assignment-details page
    router.get('/assignment-details/:id', function(req, res) {
        var callbackCount = 0;
        var context = {};
        var mysql = rep.app.get('mysql');
        getTechs(res, mysql, context, complete);
        function complete(){
            callbackCount++;
            if(callbackCount >= 1){
                res.render('assignment-details', context);
            }
        }
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