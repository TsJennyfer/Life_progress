const mongoose = require('mongoose');

const GoalSchema = mongoose.Schema({
    name:{type: String, require: true},
    priority:{type: Number, require: true},
    parent:[{type:String}],
    mainGoal: [{type:String}]
});

const Goal = module.exports = mongoose.model('Goal', GoalSchema);