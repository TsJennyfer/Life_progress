var express = require('express');
var router = express.Router();

var Goal = require('../models/goal');


//retrieving data
router.get('/goals', function(req, res, next){
    Goal.find(function(err, goals){
        res.json(goals);
    })
});

//add goal
router.post('/goal', function(req, res, next){
    let newGoal = new Goal({
        name:req.body.name,
        priority:req.body.priority,
        parents:req.body.parents
    });

    newGoal.save(function(err, goal){
        if (err)
        {
            res.json({msg: "Failed to add goal."});
        }
        else
        {
            res.json({msg: "Goal added succesfully."});
        }
    });
});

//delete goal
router.delete('/goal/:id', function(req, res, next){
    Goal.remove({_id: req.params.id}, function(err, result){
        if (err)
        {
            res.json(err);
        }
        else
        {
            res.json(result);
        }
    });
});

module.exports = router;