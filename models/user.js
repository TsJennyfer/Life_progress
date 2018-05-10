const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const UserSchema = mongoose.Schema({
    //userName:{type: String, require: true},
    userPassword:{type: String, require: true},
    //name:{type: String, require: true},
    //surname:{type: String, require: true},
    //sex:{type: String, require: True},
    email:{type: String, require: true, unique: true},
    //goals:[{type: mongoose.Schema.Types.ObjectId, ref: 'Goal'}]
});

module.exports = mongoose.model('User', UserSchema);