// app/models/user.js
// load the things we need
var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// define the schema for our user model
var userProfileSchema = mongoose.Schema({

    local            : {
        email        : {type: String, require: true},
        password     : {type: String, require: true},
    },
    facebook         : {
        id           : {type: String, require: true},
        token        : {type: String, require: true},
        name         : {type: String, require: true},
        email        : {type: String, require: true}
    },
    google           : {
        id           : {type: String, require: true},
        token        : {type: String, require: true},
        email        : {type: String, require: true},
        name         : {type: String, require: true}
    }

});

// methods ======================
// generating a hash
userProfileSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userProfileSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

// create the model for users and expose it to our app
module.exports = mongoose.model('UserProfile', userProfileSchema);