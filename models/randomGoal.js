var mongoose = require('mongoose');
mongoose.plugin(require('mongoose-simple-random'));

var RandomGoal = mongoose.model('RandomGoal', {
    name: {type: String, required: true, minlenght: 3, trim: true}
});


module.exports = {RandomGoal};