var mongoose = require('mongoose');
var Schema = mongoose.Schema;


/* var SubGoal = new Schema({
    name: {type: String, required: true, minlenght: 3, trim: true},
    //description: {type: String, default: null},
    //isDescription: {type: Boolean, default: false}
});
 */
var SuggestedGoal = mongoose.model('SuggestedGoal', {
    name: {type: String, required: true, minlenght: 3, trim: true},
    //description: {type: String, default: null},
    //category: {type: String, default: null},
    //completed: {type: Boolean, default: false},
    //createdAt: {type: Number, default: null},
    //plannedAt: {type: Number, default: null},
    //completedAt: {type: Number, default: null},
    //subgoals : [SubGoal],
    //_creator: {type: mongoose.Schema.Types.ObjectId, required: true},
    //parent: {type: mongoose.Schema.Types.ObjectId,  default: null},
    //isDescription: {type: Boolean, default: false}
    
});

module.exports = {SuggestedGoal};