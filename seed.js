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