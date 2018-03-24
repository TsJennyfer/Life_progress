var mongoose = require('mongoose');

var GoalSchema = mongoose.Schema({
    name:{type: String, require: true},
    priority:{type: Number, require: true},
    parents:[{type:String}]
});

var Goal = module.exports = mongoose.model('Goal', GoalSchema);