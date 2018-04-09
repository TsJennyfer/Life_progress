var mongoose = require('mongoose');
var mongooseUniqueValidator = require('mongoose-unique-validator');

var UserSchema = mongoose.Schema({
    //userName:{type: String, require: true},
    userPassword:{type: String, require: true},
    //name:{type: String, require: true},
    //surname:{type: String, require: true},
    //sex:{type: String, require: True},
    email:{type: String, require: true, unique: true},
    //goals:[{type:String}]
});

UserSchema.plugin(mongooseUniqueValidator);
var User = module.exports = mongoose.model('User', UserSchema);