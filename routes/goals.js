const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Goal = require('../models/goal');
const User = require('../models/user');
const checkAuth = require("../middleware/check-auth");
const jwt = require("jsonwebtoken");


//Pobiera całą kolekcję goals
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
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:5000/goals/"
                        }
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// Pobieranie głównych celi
router.get("/main/", (req, res, next) => {
    Goal.find({ parent: null })
        .select("name priority parent _id")
        .exec()
        .then(docs => {
            const response = {
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        priority: doc.priority,
                        parent: doc.parent,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:5000/goals/"
                        }
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

// Pobieranie głównego celu po id
router.get("/main/:_id", (req, res, next) => {
    Goal.findOne({ _id: req.params._id })
        .select("name priority parent _id")
        .exec()
        .then(goal => {
            const response = {
                name: goal.name,
                priority: goal.priority,
                status: goal.status,
                parent: goal.parent,
                _id: goal._id,
                request: {
                    type: "GET",
                    url: "http://localhost:5000/goals/"
                }
            };


            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


// Pobieranie głównego celu i jego podcelów po id
router.get("/main/allId/:_id", (req, res, next) => {
    Goal.find({ $or: [{ _id: req.params._id }, { parent: req.params._id }] })
        .select("name priority parent _id")
        .exec()
        .then(docs => {
            const response = {
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        priority: doc.priority,
                        parent: doc.parent,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:5000/goals/"
                        }
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


// Pobieranie  podcelów po id rodzica
router.get("/main/childrenId/:_id", (req, res, next) => {
    Goal.find( { parent: req.params._id } )
        .select("name priority parent _id")
        .exec()
        .then(goals => {
            const response = 
                goals.map(goal => {
                    return {
                        name: goal.name,
                        priority: goal.priority,
                        parent: goal.parent,
                        _id: goal._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:5000/goals/"
                        }
                    };
                });
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});


// Pobieranie rodzica
router.get("/:parent/", (req, res, next) => {
    Goal.find({ _id: req.params.parent })
        .select("name priority parent _id")
        .exec()
        .then(docs => {
            const response = {
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        priority: doc.priority,
                        parent: doc.parent,
                        _id: doc._id,
                        request: {
                            type: "GET",
                            url: "http://localhost:5000/goals/"
                        }
                    };
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

//Dodanie celu
router.post('/',checkAuth, function (req, res, next) {
    //const token = req.headers.authorization.split(" ")[1];
    //const decoded = jwt.decode(token, 'secret');
    req.userData = decoded;
    let newGoal = new Goal({
        name: req.body.name,
        priority: req.body.priority,
        parent: req.body.parent,
        userId: req.body.userId
    });
 
    newGoal.save(function (err, goal) {
        if (err) {
            res.json({ msg: "Failed to add goal." });
        }
        else {
            res.json({ msg: "Goal added succesfully."});
        }
    });
});

// Aktualizacja celu
router.patch('/:id', function (req, res, next) {
    var query = {_id: req.params.id};
    var update = {priority: req.body.priority}
    Goal.findOneAndUpdate(query, update, function (err, goal) {
        if (err) {
            res.status(400).json({ msg: "Failed to update goal." });
        }
        else {
            res.status(200).json({ msg: "Goal updated succesfully." });
        }
    });
});


//Usuwanie celu
router.delete('/:id', function (req, res, next) {
    Goal.remove({ _id: req.params.id }, function (err, result) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(result);
        }
    });
});

//Pobieranie celu po nazwie
router.get('/:mainGoal', function (req, res, next) {
    Goal.find({ mainGoal: req.params.mainGoal }, function (err, goal) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(goal);
        }
    });
});

// Pobierz listę celi po id celu głównego
router.get('/id/:mainGoal', function (req, res, next) {
    Goal.find({ mainGoal: req.params.mainGoal }, function (err, goal) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(goal);
        }
    });
});

// Pobierz listę celi po nazwie celu głównego
// - tymczasowo, potem trzeba zmienić w mainGoal z nazw rodzica, na id rodzica
// później usunąć tą ścieżkę
router.get('/nazwa/:mainGoal', function (req, res, next) {
    Goal.find({ mainGoal: req.params.mainGoal }, function (err, goal) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(goal);
        }
    });
});



module.exports = router;