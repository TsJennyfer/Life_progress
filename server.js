const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const {ObjectId} = require('mongodb');
const morgan = require('morgan');
const path = require('path');
const bcrypt = require('bcryptjs');
const nodeMailer = require('nodemailer');
require('dotenv').config();

var {mongoose} = require('./db/mongoose');
var {Goal} = require('./models/goal');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');
var {Email} = require('./db/email');


var app = express();
const port = process.env.PORT || 5000;

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

//Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use(morgan('dev'));

//#############################################################
//ROUTES

//Potwierdzenie email
app.get('/users/confirmEmail/:token', (req, res)=>{
    var token = req.params.token;

    User.findOneAndUpdate({'tokens.token': token},{activated: true}).then((user)=>{
        if (!user){
            return res.status(404).send();
        }

        res.send({user});
    }).catch((error)=>{
        res.status(400).send();
    })
})

//Rejestracja
app.post('/users/signup', (req, res)=> {

    var body = _.pick(req.body, ['email', 'password']);
    var user = new User(body);

    user.save().then(() => {
        var confirmToken = user.generateAuthToken();
        var token = user.tokens[0].token;
        console.log(token); //pierwszy token

    //#############################################################
    //Wysyłanie maili

    let transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,      //or 587
        secure: true,   //then false
        auth: {
            user: Email.emailAdress,
            pass: Email.emailPassword
        },
        tls: {
            rejectUnauthorized: false
        }
    });
    let mailOptions = {
        from: '"Life Progress App" <lifeprogress.pri@gmail.com>', // sender address
        to: req.body.email, // list of receivers
        subject: "Welcome in Life Progress", // Subject line
        text: Email.emailMessage, // plain text body
        html: `<b>Registration in Life Progress</b><br><a href="http://localhost:5000/users/confirmEmail/${token}">Click to confirm your email address.<a/><br>` // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        });

    //###############################################################

        return confirmToken;
    }).then((token)=>{
        res.header('auth', token).send(user);
    }).catch((error) => {
        res.status(400).send(error);
    })
});

//Pobiera użytkownika po ID
app.get('/users/me',authenticate, (req , res) => {
    res.send(req.user);
});

//Logowanie
app.post('/users/signin', (req, res) => {
    var body = _.pick(req.body, ['email', 'password']);

    User.findByCredentials(body.email, body.password).then((user) => {
        if (user.activated === false){  //czy email potwierdzony
            res.status(401).send();
    }
    else {
        user.generateAuthToken().then((token) => {
            res.header('auth', token).send(user);
        });
    }
        }).catch((error) => {
            res.status(400).send();
    });
});

//Wylogowanie
app.delete('/users/logout', authenticate, (req, res)=> {
    req.user.removeToken(req.token).then(()=> {
        res.status(200).send();
    }, () => {
        res.status(400).send();
    });
})

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

            User.findOneAndUpdate({_id: id}, {$set: body}, {new: true}).then((user)=>{
                if (!user){
                    return res.status(404).send();
                }
        
                res.send({user});
            }).catch((error)=>{
                res.status(400).send();
            })
        })
    })


});


//Dodanie celu
app.post('/goals/', authenticate, (req, res) => {
    var goal = new Goal({
        name: req.body.name,
        _creator: req.user._id,
        parent: req.body.parent,
        createdAt: req.body.createdAt = new Date().getTime()
    });

    goal.save().then((doc) => {
        res.send(doc);
    }, (error) => {
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
    }, (error) => {
        res.status(400).send(error);
    });
});

//Pobieranie celu głównego i podceli użytkownika
app.get('/goals/mainUserGoalAndSubgoals/:id', authenticate, (req, res) => {
    Goal.find({$or: [{parent: req.params.id}, {_id: req.params.id}]
    }).then((goals) => {
        res.send({ goals });
    }, (error) => {
        res.status(400).send(error);
    });
});

//Pobieranie podcelów po ID rodzica
app.get('/goals/main/children/:id', authenticate, (req, res) => {
    Goal.find({
        parent: req.params.id
    }).then((goals) => {
        res.send({ goals });
    }, (error) => {
        res.status(400).send(error);
    });
});

//Usuwanie celu użytkownika
app.delete('/goals/:id', authenticate, (req, res) => {
    var id = req.params.id;

    if (!ObjectId.isValid(id)) {
        return res.status(404).send();
    }

    Goal.findOneAndRemove({
        _id: id,
        _creator: req.user._id
    }).then((goal) => {
        if (!goal) {
            return res.status(404).send();
        }

        res.send(goal);
    }).catch((error) => {
        res.status(400).send();
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

    Goal.findOneAndUpdate({_id: id, _creator: req.user._id}, {$set: body}, {new: true}).then((goal)=>{
        if (!goal){
            return res.status(404).send();
        }

        res.send({goal});
    }).catch((error)=>{
        res.status(400).send();
    })
});



app.listen(port,() => {
    console.log(`Server started on port ${port}`);
});