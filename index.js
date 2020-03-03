/*****************************************************************
 * Name: Sanjo Abraham & Abigail Minchella 
 * Date: 02/09/2020
 * Assignment: CS 340 Step 3
 ****************************************************************/

var express = require('express');
var app = express();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

var mysql = require('./dbcon.js');
var bodyParser = require('body-parser');

var path = require("path");
app.use(express.static(path.join(__dirname+'/public')));

app.engine('handlebars', handlebars.engine);
app.use(bodyParser.urlencoded({extended:true}));
app.use('/static', express.static('public'));
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.set('mysql', mysql);

//Renders home page
app.get('/', function(req, res, next) {
    var context = {};
    context.mainMessage = "Login";
    res.render('home', context);
});

//Renders apartment page
app.get('/apartment', function(req, res, next) {
    var context = {};
    context.mainMessage = "Showing all available apartments";
    res.render('apartment', context);
});

//Renders portal page
app.get('/actPortal', function(req, res, next) {
    var context = {};
    context.mainMessage = "Tenant Portal";
    res.render('actPortal', context);
});

//Renders apartment-details page
app.get('/apartment-details', function(req, res, next) {
    var context = {};
    context.mainMessage = "More details";
    res.render('apartment-details', context);
});

//Renders technician-portal page
app.get('/technician-portal', function(req, res, next) {
    var context = {};
    context.mainMessage = "Available work orders";
    res.render('technician-portal', context);
});

//Renders manager-portal page
app.use('/manager-portal', require('./manager-node.js'));

//Renders create-account page
app.get('/create-account', function(req, res, next) {
    var context = {};
    context.mainMessage = "Please enter your information";
    res.render('create-account', context);
});

//Renders edit-listings page
app.get('/editListing', function(req, res, next) {
    var context = {};
    // context.mainMessage = "Please enter your information";
    res.render('editListing', context);
});

//Renders new-listings page
app.get('/newListing', function(req, res, next) {
    var context = {};
    // context.mainMessage = "";
    res.render('newListing', context);
});

//Renders edit-customer page
app.get('/editCustomer', function(req, res, next) {
    var context = {};
    // context.mainMessage = "";
    res.render('editCustomer', context);
});

//Renders new-technican page
app.get('/editTechnician', function(req, res, next) {
    var context = {};
    // context.mainMessage = "";
    res.render('editTechnician', context);
});

//Renders edit-technician page
app.get('/newTechnician', function(req, res, next) {
    var context = {};
    // context.mainMessage = "";
    res.render('newTechnician', context);
});

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