const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const GoalSchema = mongoose.Schema({
    name:{type: String, require: true},
    priority:{type: Number, require: true},
    status:{type: Number},
    parent:{type: mongoose.Schema.Types.ObjectId, ref: 'Goal'},
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

const Goal = module.exports = mongoose.model('Goal', GoalSchema);