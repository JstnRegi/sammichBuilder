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
    username: 'sammichSage',
    email: 'test@123',
    password: 'secret'
};

//db.Sammich.remove({}, function(err, sammiches) {
//    if(err) {
//        return console.log(err);
//    }
//});
//
//db.Sammich.create(testSammich, function(err, sammich) {
//    if(err) {
//        return console.log(err);
//    }
//    db.Sammich.find({}, function(err, sammiches) {
//        console.log(sammiches);
//    });
//});

//var username = testUser.username;
//var password = testUser.password;
//
//db.User.createSecure(email, password, function(err, user) {
//    if(err) {
//        return console.log(err);
//    }
//    console.log(user);
//});

//db.Sammich.find({}, function(err, sammiches) {
//   if(err) {
//       return console.log(err);
//   }
//    console.log(sammiches);
//});

db.User.find({}, function(err, users) {
   if(err) {
       return console.log(err);
   }
    console.log(users);
});

//db.User.remove({}, function(err, users) {
//   if(err) {
//       return console.log(err);
//   }
//    console.log(users);
//
//});