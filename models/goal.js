var mongoose = require('mongoose');

var Goal = mongoose.model('Goal', {
    name: {type: String, required: true, minlenght: 3, trim: true},
    description: {type: String, default: null},
    category: {type: String, default: null},
    completed: {type: Boolean, default: false},
    createdAt: {type: Number, default: null},
    plannedAt: {type: Number, default: null},
    completedAt: {type: Number, default: null},
    _creator: {type: mongoose.Schema.Types.ObjectId, required: true},
    parent: {type: mongoose.Schema.Types.ObjectId,  default: null}
    
});

module.exports = {Goal};