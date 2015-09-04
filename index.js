//Requirements
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var db = require('./models');
var views = path.join(process.cwd(), 'views/');

//port
var port = 3000;

// CONFIG //
// serve js & css files
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));
// body parser config to accept all datatypes
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req,res) {
    res.sendFile(path.join(views, 'index.html'))
});

app.get('/signup', function(req,res) {
   res.sendFile(path.join(views, 'signup.html'))
});

app.get('/profile', function(req,res) {
   //sendFile profile.html
});

app.get('/users', function(req,res) {
   //send a file that takes users and prints them out
});

app.post('/users', function(req,res) {
    //post and create logic
});

app.listen(port, function() {
   console.log('Listening on port ' + port);

});