var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var sammichSchema = new Schema ({
    name: String,
    craftsman: String,
    description: String,
    sammichType: String,
    stats: {
        sour: Number,
        sweet: Number,
        spicy: Number,
        saltiness: Number,
        savory: Number
    },
    ingredients: [],
    directions: String,
    picture: String,
    comments: [/*logic to dynamically get comments here*/]
});

var Comment = {
    comment: String,
    person: String
};

var Sammich = mongoose.model('Sammich', sammichSchema);

module.exports = Sammich;