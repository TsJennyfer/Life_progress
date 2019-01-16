var mongoose = require('mongoose');

var Goal = mongoose.model('Goal', {
    name: {type: String, required: true, minlength: 3, maxlength: 100, trim: true},
    description: {type: String, maxlength: 1000, default: null},
    category: {type: String, default: null},
    completed: {type: Boolean, default: false},
    createdAt: {type: Number, default: null},
    plannedAt: {type: Number, default: null},
    completedAt: {type: Number, default: null},
    _creator: {type: mongoose.Schema.Types.ObjectId, required: true},
    parent: {type: mongoose.Schema.Types.ObjectId,  default: null},
    isDescription: {type: Boolean, default: false}
    
});

module.exports = {Goal};