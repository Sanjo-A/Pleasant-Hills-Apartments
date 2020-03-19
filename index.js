/*****************************************************************
 * Name: Sanjo Abraham & Abigail Minchella 
 * Date: 02/09/2020
 * Assignment: CS 340 Step 3
 ****************************************************************/

// IMGUR API STUFF:
//     CLIENT ID: 6bc5cc08f8dfbcc
//     CLIENT SECRET: 3087fc9094a520d146cc0efc5dce0f1c117a45e2

var express = require('express');
var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var path = require("path");
app.use(express.static(path.join(__dirname+'/public')));

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 8899);
app.set('mysql', mysql);

//Renders home page
app.get('/', function(req, res, next) {
    var context = {};
    context.mainMessage = "Login";
    res.render('home', context);
});

app.route('/api/amenities')
    .get(function(req,res,next){

    })
    .post(function(req,res,next){

    })
    .put(function(req,res,next){

    })
    .delete(function(req,res,next){

    })

app.route('/api/technicians')
    .get(function(req,res,next){

    })
    .post(function(req,res,next){

    })
    .put(function(req,res,next){

    })
    .delete(function(req,res,next){

    })

app.route('/api/customers')
    .get(function(req,res,next){

    })
    .post(function(req,res,next){

    })
    .put(function(req,res,next){

    })
    .delete(function(req,res,next){

    })

app.route('/api/apartments')
    .get(function(req,res, next){
        var context = {};
        mysql.pool.query("SELECT aptID, aptNumber, rent, numBeds, numBaths, DATE_FORMAT(dateAvailable, '%Y-%m-%d') AS dateAvailable, availabilityStatus FROM apartments", function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                return;
            }
            context.apartments = results;
            res.send(context.apartments);
        });
    })
    .post(function(req,res,next){
        console.log(req.body.aptNumber);
        var context = {};
        var sql = "UPDATE apartments SET aptNumber = " + [JSON.stringify(req.body.aptNumber)] +", rent = "+[JSON.stringify(req.body.rent)]+", numBeds = "
            +[JSON.stringify(req.body.numBeds)]+", numBaths = "+[JSON.stringify(req.body.numBaths)]+", dateAvailable = "+[JSON.stringify(req.body.dateAvailable)]
            +", availabilityStatus = "+[JSON.stringify(req.body.availabilityStatus)]+" WHERE aptID = "+[JSON.stringify(req.body.aptID)];
        mysql.pool.query(sql, function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                return;
            }
            context.apartments = results;
            res.send(context.apartments);
        });
    })
    .put(function(req,res,next){
        var context = {};
        var sql = "INSERT INTO apartments(aptNumber, rent, numBeds, numBaths, dateAvailable, availabilityStatus) VALUES("+JSON.stringify(req.body.aptNumber)+","+JSON.stringify(req.body.rent)+","+JSON.stringify(req.body.numBeds)+","
            +JSON.stringify(req.body.numBaths)+","+JSON.stringify(req.body.dateAvailable)+","+JSON.stringify(req.body.availabilityStatus)+");";

        mysql.pool.query(sql, function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                return;
            }
            console.log(results,fields);
            res.end();
        });
    })
    .delete(function(req,res,next){
        console.log(req.body);
        var context = {};
        var sql = "DELETE FROM apartments WHERE aptID = "+[JSON.stringify(req.body.aptID)]
        mysql.pool.query(sql, function(error, results, fields){
            if (error){
                res.write(JSON.stringify(error));
                return;
            }
            res.end();
        });
    })

//Renders apartment page
app.use('/apartments', require('./apartments-node.js'));

//Renders portal page
app.get('/act-portal', function(req, res, next) {
    var context = {};
    context.mainMessage = "Tenant Portal";
    res.render('act-portal', context);
});

//Renders apartment-details page
app.get('/apartment-details/:id', function(req, res, next) {
    var context = {};
    mysql.pool.query('SELECT * FROM apartments where aptID =? ',[req.params.id],function(err,results,fields){
        if(err){
            console.log("error showing apartment detalis");
            res.end();
            return;
        }           
        context.apartment = results;
        mysql.pool.query('SELECT amenDescription FROM amenities INNER JOIN apartment_amenities ON apartment_amenities.amenID=amenities.amenID WHERE aptID= ?',[req.params.id],function(err,results,fields){
            if(err){
                console.log("error showing apartment detalis");
                res.end();
                return;
            }
            var params = [];
            for(result in results){
                var newRow ={
                    'amenDescription': results[result].amenDescription,
                };
                params.push(newRow);
            }
            context.amenities = params;
            context.mainMessage = "More details";
            console.log(context);
            res.render('apartment-details', context);
        });

    });

});

//Renders technician-portal page
app.use('/technician-portal', require("./technician-node.js"));

//Renders manager-portal page
app.use('/manager-portal', require('./manager-node.js'));

//Renders create-account page
app.use('/create-account', require("./create-account-node.js"));

//Renders edit-listings page
app.get('/edit-listing', function(req, res, next) {
    var context = {};
    // context.mainMessage = "Please enter your information";
    res.render('edit-listing', context);
});

//Renders new-listings page
app.use('/new-listing', require("./new-listing-node.js"));

//Renders edit-customer page
app.get('/edit-customer', function(req, res, next) {
    var context = {};
    // context.mainMessage = "";
    res.render('edit-customer', context);
});

//Renders edit-technican page
app.get('/edit-technician/:id', function(req, res, next) {
    var context = {};
    context.mainMessage = "Edit Technician: ";
    mysql.pool.query('SELECT techID, techFName, techLName, techEmail, techPhone FROM technicians WHERE techid = ?',[req.params.id],function(err,results,fields){
        if(err){
            console.log("error showing technican");
            res.end();
            return;
        }
        context.technican = results;
        res.render('edit-technician', context);
    });
});
//update technician
app.get('/edit-technicians',function(req,res,next){
    console.log("Updated Technican"); 
    console.log(req.query);
    var sql = 'UPDATE technicians SET techFName = '+[JSON.stringify(req.query.techFName)]+', techLName = '+[JSON.stringify(req.query.techLName)]+', techPhone = '
        +[JSON.stringify(req.query.techPhone)]+', techEmail = '+[JSON.stringify(req.query.techEmail)]+' WHERE techID = '+[JSON.stringify(req.query.techID)];
    mysql.pool.query(sql,function(err,results){
        if(err){
            console.log("error editing technician");
            console.log(err);
            res.end();
            return;
        }
        context= {};
        context.mainMessage = "Manager Portal";
        res.redirect('manager-portal');
    });
});
//delete technicians
app.get('/delete-technicians',function(req,res,next){
    console.log("Deleting Technican"); 
    var sql = 'DELETE FROM technicians WHERE techID = '+[JSON.stringify(req.query.techID)];
    mysql.pool.query(sql,function(err,results){
        if(err){
            console.log("error deleting technician");
            console.log(err);
            res.end();
            return;
        }
        res.redirect('manager-portal');
    });
});
//Renders new-technician page
app.use('/new-technician', require("./new-technician-node.js"));

//Renders 404 error page
app.use(function(req, res) {
    res.status(404);
    res.render('404');
});

//Renders 500 error page
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

//Begins listening for connections
app.listen(app.get('port'), function() {
    console.log('Web server has begun running on port ' + app.get('port') + '; press Ctrl+C to terminate.');
});