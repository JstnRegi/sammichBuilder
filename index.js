//Requirements
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var db = require('./models');
var views = path.join(process.cwd(), 'views/');



var testSammich = {
    name: 'BLT',
    craftsman: 'sammichSage',
    description: 'It tastes awesome',
    sammichType: 'Traditional',
    stats: {
        sour: 2,
        sweet: 4,
        spicy: 1,
        saltiness: 11,
        savory: 20
    },
    vegetarian: false,
    ingredients: ['salami', 'chicken', 'lettuce', 'cheese'],
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
            var data = {
                username: user.username,
                sammichBuilds: user.sammichBuilds
            };
            res.send(data);
        }
    });
});

app.get('/sammiches', function(req, res) {
    var sammich = req.query;
    console.log(sammich);
   db.Sammich.findOne(sammich, function(err, sammich) {
       if(err) {
           return console.log(err);
       }
       if(sammich === null) {
           res.send('Not Found :(')
       } else {
           res.send(sammich);
       }

   });
});

app.post('/sammiches' , function(req, res) {
    //logic to post to sammiches api and push it into current user sammich builds
    req.currentUser(function(err,user) {
        if (user === null) {
            res.sendFile(path.join(views, 'signup.html'));
        } else {
            var data = {
                username: user.username
            };
            user.sammichBuilds.push(testSammich);

            user.save(function(err, success) {
                if(err) {return console.log(err);}
                console.log("Sammich Build added Successfully");
            });
            res.send(data);
        }
    });
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


app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port ' + port);

});