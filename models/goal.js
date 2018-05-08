const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const GoalSchema = mongoose.Schema({
    name:{type: String, require: true},
    priority:{type: Number, require: true},
    status:{type: Number},
    parent:{type:String},
    //parent:{type: Schema.Types.ObjectId, ref: 'Goal' },
    userId:{type: Schema.Types.ObjectId, ref: 'User'},
    //mainGoal: {type:String}
    //mainGoal:{type: Schema.Types.ObjectId, ref: 'Goal' }
});

const Goal = module.exports = mongoose.model('Goal', GoalSchema);