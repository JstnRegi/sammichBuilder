var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/sammichBuilder");

module.exports.Sammich = require('./sammich');
module.exports.User = require('./user');