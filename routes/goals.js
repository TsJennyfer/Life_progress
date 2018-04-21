const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Goal = require('../models/goal');

//retrieving data
/* router.get('/', function(req, res, next){
    Goal.find(function(err, goals){
        res.json(goals);
    })
}); */

router.get("/", (req, res, next) => {
    Goal.find()
      .select("name priority parent _id")
      .exec()
      .then(docs => {
        const response = {
          //count: docs.length,
          products: docs.map(doc => {
            return {
              name: doc.name,
              priority: doc.priority,
              parent: doc.parent,
              _id:doc._id,
              request: {
                type: "GET",
                url: "http://localhost:5000/goals/"
              }
            };
          })
        };
        //   if (docs.length >= 0) {
        res.status(200).json(response);
        //   } else {
        //       res.status(404).json({
        //           message: 'No entries found'
        //       });
        //   }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });

//add goal
router.post('/', function(req, res, next){
    let newGoal = new Goal({
        name:req.body.name,
        priority:req.body.priority,
        parent:req.body.parent
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
router.delete('/:id', function(req, res, next){
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

//get goal by name
router.get('/:mainGoal', function(req, res, next){
    Goal.find({mainGoal: req.params.mainGoal}, function(err, goal){
        if (err)
        {
            res.json(err);
        }
        else
        {
            res.json(goal);
        }
    });
});


module.exports = router;