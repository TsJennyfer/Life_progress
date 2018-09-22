var mongoose = require('mongoose');

var Goal = mongoose.model('Goal', {
    name: {type: String, required: true, minlenght: 3, trim: true},
    completed: {type: Boolean, default: false},
    createdAt: {type: Number, default: null},
    completedAt: {type: Number, default: null},
    _creator: {type: mongoose.Schema.Types.ObjectId, required: true},
    parent: {type: mongoose.Schema.Types.ObjectId,  default: null}

/*  priority:{type: Number, require: true},
    status:{type: Number},
    parent:{type: mongoose.Schema.Types.ObjectId, ref: 'Goal'},
    userId:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    createDate:{type: Date, default: Date.now},
    finishDate:{type: Date}
*/
});

module.exports = {Goal};