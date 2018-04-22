const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const GoalSchema = mongoose.Schema({
    name:{type: String, require: true},
    priority:{type: Number, require: true},
    parent:{type:String},
    mainGoal: {type:String}
    //mainGoal:{type: Schema.Types.ObjectId, ref: 'Goal' }
});

const Goal = module.exports = mongoose.model('Goal', GoalSchema);