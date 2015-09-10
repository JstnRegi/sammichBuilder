var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('./models');

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
            });
        });
        console.log('User added successfully');
    }
});

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



