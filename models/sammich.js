var mongoose = require('mongoose');
var schema = mongoose.Schema;



var sammichSchema = new Schema ({
    name: String,
    craftsman: String,
    description: String,
    sammichType: String,
    temp: String,
    created: Date,
    comments: [Comment]
});

var Comment = {
    comment: String,
    person: String
};

var Sammich = mongoose.model('Sammich', sammichSchema);

module.exports = Sammich;