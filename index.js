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
        // var params = [];
        // for(result in results){
        //     var newRow ={
        //         'aptNumber': results[result].aptNumber,
        //         'rent': results[result].rent,
        //         'numBeds': results[result].numBeds,
        //         'numBaths': results[result].numBaths,
        //         'dateAvailable': results[result].dateAvailable,
        //         'aptImg': results[result].aptImg
        //         // 'id':reports[report].id
        //     };
        //     params.push(newRow);
        // }
        context.apartment = results;
        mysql.pool.query('SELECT amenDescription FROM amenities INNER JOIN apartment_amenities ON apartment_amenities.amenID=amenities.amenID WHERE aptID= ?',[req.params.id],function(err,results,fields){
            if(err){
                console.log("error showing apartment detalis");
                res.end();
                return;
            }
            // context.amenities = results;
            // console.log(context.amenities);
            var params = [];
            for(result in results){
                var newRow ={
                    'amenDescription': results[result].amenDescription,
                };
                params.push(newRow);
            }
            context.amenities = params;
            // console.log(context.amenities);
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
app.get('/edit-technician', function(req, res, next) {
    var context = {};
    // context.mainMessage = "";
    res.render('edit-technician', context);
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