//Requirements
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var db = require('./models');
var views = path.join(process.cwd(), 'views/');
var files = path.join(process.cwd(), '/files/');
var busboy = require('connect-busboy');
var fs = require('fs');


var cloudinary = require('cloudinary');

cloudinary.config({
    cloud_name: 'sandwichbuilder',
    api_key: '863924945213321',
    api_secret: 'gMbB_F4Bd4gqhcxtzn8g7U0icDg'
});




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

app.use(busboy());

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
            console.log(req.body);
            var newSammwich = req.body;
            var username = user.username;
            newSammwich.craftsman = username;
            db.Sammich.create(newSammwich, function(err, sammich) {
                if(err) {
                    return console.log(err);
                } else {
                    user.sammichBuilds.push(sammich);
                    console.log(user.sammichType);
                    console.log(typeof(user.sammchType));
                    user.save(function(err, success) {
                        if(err) {
                            return console.log(err)
                        }
                        console.log('Pushed and saved a sandwich into user.');
                        res.send(sammich);
                    })
                }
            });
        }
    });
});

app.post('/sammichpictures', function(req, res, next) {
    var fstream;
    var image;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        fstream = fs.createWriteStream(__dirname + '/files/' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            image = path.join(files, filename);
            cloudinary.uploader.upload(image, function(result) {
                console.log(result);
                res.send(result);
                //    filename + '<img src="' + result.url + '"/>')
                //},  { public_id: "test_mario" }
            })
        });
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