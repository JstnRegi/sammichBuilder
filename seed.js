var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('./models');

var testSammich = {
    name: 'The Fitz',
    craftsman: 'The Sandwich Sage',
    description: 'The sandwich Jemma makes for Fitz from the Marvel show, "Agents of Shield',
    sammichType: 'Traditional - cold',
    stats: {
        sour: 10,
        sweet: 26,
        spicy: 4,
        saltiness: 25,
        savory: 35
    },
    directions: 'Never gonna give you up. Never gonna let you down. Never gonna run around and dessert you.',
    ingredients: ['prosciutto', 'lettuce', 'tomato', 'provolone', 'turkey', 'rye bread', 'pesto aioli'],
    picture: 'http://fangirlscook.com/wp-content/uploads/2015/05/Fitzsimmons-sandwich.jpg',
    comments: ['test']
};

var testUser = {
    username: 'The Sandwich Sage',
    email: 'test@123',
    password: 'qwertya',
    picture: 'http://res.cloudinary.com/sandwichbuilder/image/upload/v1442005269/yh7hlnpa8huau5q1gcmo.jpg'
};


db.Sammich.remove({}, function(err, sammiches) {
    if(err) {
     console.log(err);
    }
});

db.User.remove({}, function(err, sammiches) {
    if(err) {
     console.log(err);
    }
});

var username = testUser.username;
var password = testUser.password;
var email = testUser.email;
var picture = testUser.picture;

db.User.createSecure(username, email, password, picture, function(err, user) {
    if(err) {
     console.log(err);
    } else {
        db.Sammich.create(testSammich, function(err, sammich) {
            if(err) {
             console.log(err);
            }
            user.sammichBuilds.push(sammich);
            user.save(function(err, success) {
                if(err) {
                 console.log(err);
                }
                console.log('Sandwich added to user builds');
                db.Sammich.find({}, function(err, sammiches) {
                    if(err) {
                     console.log(err);
                    }
                    console.log(sammiches);
                });

                db.User.find({}, function(err, users) {
                    if(err) {
                     console.log(err);
                    }
                    console.log(users);
                });
            });
        });
        console.log('User added successfully');
    }
});




