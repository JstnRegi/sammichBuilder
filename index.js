//Requirements
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
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

//session id with secret ket
app.use( session( {
    secret: 'pesto-aioli',
    resave: false,
    saveUninitialized: true
    })
);

app.use(function (req, res, next) {
    req.login = function(user) {
        req.session.userId = user._id;
    };

    req.currentUser = function (cb) {
        db.User.findOne({_id: req.session.userId},
            function (err, user) {
                req.user = user;
                cb(null, user);
            })
    };

    req.logout - function() {
        req.session.userId = null;
        req.user = null;
    };
    next();
});


//Routes

app.get('/', function(req,res) {
    //console.log(req.headers.cookie.split(' '));
    //res.cookie('test2', 123, {signed: true});
    res.sendFile(path.join(views, 'index.html'));
});

app.post('/login', function(req, res) {
    var user = req.body.user;
    var email = user.email;
    var password = user.password;
    db.User.authenticate(email, password, function(err, user) {
        if(err) {
            res.send(400)
        } else {
            req.login(user);
            res.sendFile(path.join(views, 'index.html'));
        }
    })
});

app.get('/logout', function(req, res) {
   req.logout();
    res.sendFile('You have logged out')
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