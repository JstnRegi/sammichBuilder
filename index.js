//Requirements
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var db = require('./models');
var views = path.join(process.cwd(), 'views/');



var testSammich = {
    name: 'The Fitz',
    craftsman: 'sammichSage',
    description: 'It tastes awesome',
    sammichType: 'Traditional',
    stats: {
        sour: 1,
        sweet: 2,
        spicy: 3,
        saltiness: 4,
        savory: 5
    },
    vegetarian: false,
    comments: ['test']
};



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
    cookie: {httpOnly: false},
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

    req.logout = function() {
        req.session.userId = null;
        req.user = null;
    };
    next();
});


//Routes
app.get(['/', '/login'], function(req,res) {
    //console.log(req.headers.cookie.split(' '));
    //res.cookie('test2', 123, {signed: true});
    req.currentUser(function(err,user) {
        if (user === null) {
            res.sendFile(path.join(views, 'signup.html'));
        } else {
            res.redirect('/home')
        }
    });
});

app.post('/login', function(req, res) {
    var user = req.body.user;
    var email = user.email;
    var password = user.password;
    db.User.authenticate(email, password, function(err, user) {
        if(err) {
            res.redirect('/login');
        } else {
            req.login(user);
            res.redirect('/home');
        }
    });
});

app.get('/logout', function(req, res) {
     req.logout();
    res.redirect('/')
});

app.get('/signup', function(req,res) {
   res.sendFile(path.join(views, 'signup.html'))
});

app.get('/home', function(req,res) {
    req.currentUser(function (err, user) {
        if(user === null) {
            res.redirect('/login');
        } else {
            res.sendFile(path.join(views, 'index.html'));
        }
    })
});


app.get('/user', function(req, res) {
    req.currentUser(function(err,user) {
        if (user === null) {
            res.sendFile(path.join(views, 'signup.html'));
        } else {
            console.log('FOUND');
            var data = {
                username: user.username
            };
            res.send(data);
        }
    });

});

app.get('/users', function(req,res) {
   //send a file that takes users and prints them out
});

app.post('/users', function(req,res) {
    var user = req.body.user;
    var username = user.username;
    var email = user.email;
    var password = user.password;

    db.User.createSecure(username, email, password, function(err, user) {
       console.log(user);
    });
    res.send(email + ' Thanks for signing up');
});


app.listen(port, function() {
   console.log('Listening on port ' + port);

});