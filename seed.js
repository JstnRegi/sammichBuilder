var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('./models');

var testSammich = {
    name: 'The Fitz',
    craftsman: 'The Sandwich Sage',
    description: 'It tastes awesome',
    sammichType: 'Traditional',
    stats: {
        sour: 1,
        sweet: 2,
        spicy: 3,
        saltiness: 4,
        savory: 5
    },
    directions: 'Never gonna give you up. Never gonna let you down. Never gonna run around and dessert you.',
    ingredients: ['lettuce', 'tomato', 'provolone', 'turkey', 'rye bread'],
    picture: 'http://res.cloudinary.com/sandwichbuilder/image/upload/v1441970565/veledqxmwvn7vock8yns.png',
    comments: ['test']
};

var testUser = {
    username: 'The Sandwich Sage',
    email: 'test@123',
    password: 'qwertya'
};


db.Sammich.remove({}, function(err, sammiches) {
    if(err) {
        return console.log(err);
    }
});

db.User.remove({}, function(err, sammiches) {
    if(err) {
        return console.log(err);
    }
});

var username = testUser.username;
var password = testUser.password;
var email = testUser.email;

db.User.createSecure(username, email, password, function(err, user) {
    if(err) {
        return console.log(err);
    } else {
        db.Sammich.create(testSammich, function(err, sammich) {
            if(err) {
                return console.log(err);
            }
            user.sammichBuilds.push(sammich);
            user.save(function(err, success) {
                if(err) {
                    return console.log(err);
                }
                console.log('Sandwich added to user builds');
                db.Sammich.find({}, function(err, sammiches) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log(sammiches);
                });

                db.User.find({}, function(err, users) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log(users);
                });
            });
        });
        console.log('User added successfully');
    }
});




