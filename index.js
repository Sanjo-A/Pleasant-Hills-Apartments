/*****************************************************************
 * Name: Sanjo Abraham & Abigail Minchilla 
 * Date: 02/09/2020
 * Assignment: CS 340 Step 3
 ****************************************************************/

let express = require('express');
let app = express();

let handlebars = require('express-handlebars').create({defaultLayout:'home'});

var path = require("path");
app.use(express.static(path.join(__dirname+'/public')));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 8899);

//Renders home page
app.get('/', function(req, res, next) {
    var context = {};
    context.mainMessage = "Login";
    res.render('home', context);
});
//Renders home page
app.get('/apartment', function(req, res, next) {
    var context = {};
    context.mainMessage = "Showing all available apartments";
    res.render('apartment', context);
});
//Renders home page
app.get('/actPortal', function(req, res, next) {
    var context = {};
    context.mainMessage = "Tenant Portal";
    res.render('actPortal', context);
});
// //Renders 404 error page
// app.use(function(req, res) {
//     let context = {};
//     context.layout = 'blank';
//     res.status(404);
//     res.render('404', context);
// });

// //Renders 500 error page
// app.use(function(err, req, res, next) {
//     let context = {};
//     context.layout = 'blank';
//     console.error(err.stack);
//     res.status(500);
//     res.render('500', context);
// });

//Begins listening for connections
app.listen(app.get('port'), function() {
    console.log('Web server has begun running on port ' + app.get('port') + '; press Ctrl+C to terminate.');
});