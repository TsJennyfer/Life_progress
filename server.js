const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const { ObjectId } = require('mongodb');
const morgan = require('morgan');
const path = require('path');
const bcrypt = require('bcryptjs');
const nodeMailer = require('nodemailer');
require('dotenv').config();

var random = require('mongoose-simple-random');
var { mongoose } = require('./database/mongoose');
var { Goal } = require('./models/goal');
var { User } = require('./models/user');
var { RandomGoal } = require('./models/randomGoal');
var { SuggestedGoal } = require('./models/suggestedGoals');
var { authenticate } = require('./middleware/authenticate');
var { sender } = require('./middleware/sender');
var { passwordResetEmail } = require('./middleware/passwordResetEmail');


var app = express();
const port = process.env.PORT || 5000;

//View Engine
/* 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
*/

//Set Static Folder
app.use(express.static(path.join(__dirname, 'client/build')));

//Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

//#############################################################
//ROUTES

//Potwierdzenie email
app.get('/users/confirmEmail/:token', (req, res) => {
    var token = req.params.token;

    User.findOneAndUpdate({ 'tokens.token': token }, { activated: true }).then((user) => {
        if (!user) {
            return res.status(404).send();
        };
        res.send({ user });
    }).catch((error) => {
        res.status(400).send(error);
    });
});

//Reset hasła, wysłanie tokena
app.post('/users/resetPassword', (req, res) => {
    var body = _.pick(req.body, ['email']);

    User.findOne({ email: body.email }).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        else {
            var token = user.generateAuthToken();
            token.then(function (result) {
                passwordResetEmail(req, result);
            });
        };
        res.send({ user });
    }).catch((error) => {
        res.status(400).send(error);
    });
});

//Token do resetu hasła
app.get('/users/resetPasswordToken/:token', (req, res) => {
    var token = req.params.token;

    //User.findOneAndUpdate({ 'tokens.token': token }, { tokens: [] }, { new: true }).then((user) => {
    User.findOne({ 'tokens.token': token }).then((user) => {
        if (!user) {
            return res.status(404).send();
        }
        res.redirect('http://localhost:3000/'); //przekierowanie do formularza zmiany hasła
        res.send({ user });
    }).catch((error) => {
        res.status(400).send(error);
    });
});

//Reset hasła po tokenie
app.patch('/users/newPassword/:token', (req, res) => {
    var token = req.params.token;
    var body = _.pick(req.body, ['password']); //jakie pola zmieniamy

    bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(body.password, salt, (error, hash) => {
            body.password = hash;

            User.findOneAndUpdate({ 'tokens.token': token }, { $set: body, tokens: [] }, { new: true }).then((user) => {
                if (!user) {
                    return res.status(404).send();
                }
                //res.redirect('http://localhost:3000/signin/'); // przekierowanie do strony logowania
                res.send({ user });
            }).catch((error) => {
                res.status(400).send(error);
            });
        });
    });
});

//Rejestracja
app.post('/users/signup', (req, res) => {

    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        var confirmToken = user.generateAuthToken();
        var token = user.tokens[0].token;
        sender(req, token);
        return confirmToken;
    }).then((token) => {
        res.header('auth', token).send(user);
    }).catch((error) => {
        res.status(400).send(error);
    })
});

//Pobiera użytkownika po ID
app.get('/users/me', authenticate, (req, res) => {
    res.send(req.user);
});

//Logowanie
app.post('/users/signin', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        if (user.activated === false) {  //czy email potwierdzony
            res.status(401).send('Please confirm your email address.');
            console.log('Please confirm your email address.');
        }
        else {
            user.generateAuthToken().then((token) => {
                res.header('auth', token).send(user);
            });
        }
    }).catch((error) => {
        res.status(400).send(error);
    });
});

//Wylogowanie
app.delete('/users/logout', authenticate, (req, res) => {
    req.user.removeToken(req.token).then(() => {
        res.status(200).send();
    }).catch((error) => {
        res.status(400).send(error);
    });
});

//Zmiana danych użytkownika (hasło, email)
app.patch('/users/:id', authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['email', 'password']); //jakie pola zmieniamy

    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    bcrypt.genSalt(10, (error, salt) => {
        bcrypt.hash(body.password, salt, (error, hash) => {
            body.password = hash;

            User.findOneAndUpdate({ _id: id }, { $set: body }, { new: true }).then((user) => {
                if (!user) {
                    return res.status(404).send();
                }

                res.send({ user });
            }).catch((error) => {
                res.status(400).send(error);
            })
        })
    })
});

//Dodanie celu
app.post('/goals/', authenticate, (req, res) => {
    var goal = new Goal({
        name: req.body.name,
        description: req.body.description,
        _creator: req.user._id,
        parent: req.body.parent,
        createdAt: req.body.createdAt = new Date().getTime(),
        plannedAt: req.body.plannedAt
    });
    goal.save().then((goal) => {
        res.send(goal);
    }).catch((error) => {
        res.status(400).send(error);
    });
});

//Pobieranie głównych celi użytkownika
app.get('/goals/mainUserGoals', authenticate, (req, res) => {
    Goal.find({
        parent: null,
        _creator: req.user._id
    }).then((goals) => {
        res.send({ goals });
    }).catch((error) => {
        res.status(400).send(error);
    });
});

//Pobieranie celu głównego i podceli użytkownika
app.get('/goals/mainUserGoalAndSubgoals/:id', authenticate, (req, res) => {
    Goal.find({
        $or: [{ parent: req.params.id }, { _id: req.params.id }]
    }).then((goals) => {
        res.send({ goals });
    }).catch((error) => {
        res.status(400).send(error);
    });
});

//Pobieranie podceli użytkownika posortowane
app.get('/goals/userSubgoals', authenticate, (req, res) => {
    Goal.find({ $and: [{ _creator: req.user._id }, { parent: { $ne: null } }] }
    ).sort([['plannedAt', 1]])
        .then((goals) => {
            res.send({ goals });
        }).catch((error) => {
            res.status(400).send(error);
        });
});

//Pobieranie podcelów po ID rodzica
app.get('/goals/main/children/:id', authenticate, (req, res) => {
    Goal.find({
        parent: req.params.id
    }).then((goals) => {
        res.send({ goals });
    }).catch((error) => {
        res.status(400).send(error);
    });
});

//Usuwanie celu użytkownika
app.delete('/goals/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    Goal.deleteMany({
        $or: [{ _id: id, _creator: req.user._id }, { parent: id, _creator: req.user._id }]
    }).then((goal) => {
        if (!goal) {
            return res.status(404).send();
        }

        console.log("Deleted main goal and subgoals");
    }).catch((error) => {
        res.status(400).send(error);
    });
});

//Edycja celu
app.patch('/goals/:id', authenticate, (req, res) => {
    var id = req.params.id;
    var body = _.pick(req.body, ['name', 'completed']); //jakie pola zmieniamy

    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Goal.findOneAndUpdate({ _id: id, _creator: req.user._id }, { $set: body }, { new: true }).then((goal) => {
        if (!goal) {
            return res.status(404).send();
        }

        res.send({ goal });
    }).catch((error) => {
        res.status(400).send(error);
    })
});

//Pobranie losowego celu
app.get('/randomGoals', (req, res) => {
    RandomGoal.findOneRandom({}, { _id: 0, name: 1 }, {}, function (error, result) {
        if (!error) {
            console.log(result);
            res.send(result);
        };
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

//Pobieranie proponowanych celi z podcelami
app.get('/suggestedgoals/all', (req, res) =>{
    SuggestedGoal.find().then((goals)=>{
        res.send({goals});
    }).catch((error)=>{
        res.status(400).send(error);
    });
});

//Dodanie celu
app.post('/goals/ListofGoals', authenticate, (req, res) => {
    var response = {};
    for(var key in req.body.subgoals){
        if(key === "a" || key === "_id"){continue;}
        var goal = new Goal({
            name: req.body.subgoals[key],
            //description: req.body.description,
            _creator: req.user._id,
            parent: req.body.id,
            createdAt: req.body.createdAt = new Date().getTime(),
            plannedAt: req.body.plannedAt = new Date().getTime() + (1000*60*60*24*14)
        });
        goal.save().then((goal) => {
            //res.send(goal);
            response.goal = goal;
            //console.log(response);
        }).catch((error) => {
            res.status(400).send(error);
        });
    }
    res.send("ok");
    //res.send(response);
    //console.log(response);
});

//Pobieranie głównych celi użytkownika z dwóch kolekcji
/* app.get('/:var(goals/mainUserGoals|suggestedgoals/all)?', authenticate, (req, res) => {

    //I sposób
    var response = {};
    Goal.find({
        parent: null,
        _creator: req.user._id
    }).then((goals) => {
        response.goals = goals;
        //res.send({ goals });
    }).catch((error) => {
        res.status(400).send(error);
    });
    SuggestedGoal.find().then((suggestedgoals) => {
        //res.send({ goals });
        response.suggestedgoals = suggestedgoals;
        res.send({ response });
    }).catch((error) => {
        res.status(400).send(error);
    });

     //II sposób
    Goal.find({parent: null, _creator: req.user._id}).exec(function(err,goals) {
        var response = {};
        response.goals = goals;
        SuggestedGoal.find().exec(function(err,suggestedgoals) {
            response.suggestedgoals = suggestedgoals
            res.send({response});
          });
    });
}); */