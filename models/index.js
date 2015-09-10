var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI ||
                 process.env.MONGOHQ_URL ||
                 "mongodb://localhost/sammichBuilder");

module.exports.Sammich = require('./sammich');
module.exports.User = require('./user');