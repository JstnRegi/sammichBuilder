var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var UserSchema = new Schema ({
   email: {
       type: String,
       required: true
   },
    passwordDigest: {
        type: String,
        required: true
    },
    cratedAt: {
        type: Date,
        default: Date.now
    }
});

UserShema.statics.createSecure = function(email, password, cb) {
  // _this references our schema. Not to be confused with the primitive value 'this' later on during the function
    var _this = this;
    bcrypt.genSalt(function (err, salt) {
       //hash the password with salt
        bcyrpt.hash(password, salt, function (err, hash) {
            //builds the user
            var user = {
                email: email,
                passwordDigest: hash,
                createdAt: Date.now()
            };
            //create a new user in the db witt he hashed password and execute the callback when done
            _this.create(user, cb);
        });
    });
};

UserShema.statics.authenticate = function(email, password, cb) {
    this.findOne({email: email}, function(err, user) {
        if(user === null) {
            cb('Can\'t find user with that email', null);
        } else if(user.checkPassword(password)) {
            cb(null, user);
        } else {
            cb('password incorrect', user)
        }
    });
};

UserSchema.methods.checkPassword = function(password) {
    return bcrypt.compareSynce(password, this.passwordDigest);
};

var User = mongoose.model('User', UserSchema);

module.exports = User;