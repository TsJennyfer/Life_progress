const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const index = require('./routes/index');
const goalsRoutes = require('./routes/goals');
const userRoutes = require('./routes/user');
const morgan = require('morgan');

//google
passport = require('passport');
auth = require("./auth");
cookieParser = require('cookie-parser'),
cookieSession = require('cookie-session');

const app = express();

//google
auth(passport);
app.use(passport.initialize());
//google
app.use(cookieSession({
    name: 'session',
    keys: ['123']
}));
app.use(cookieParser());
//google
app.get('/', (req, res) => {
    if (req.session.token) {
        res.cookie('token', req.session.token);
        res.json({
            status: 'session cookie set'
        });
    } else {
        res.cookie('token', '')
        res.json({
            status: 'session cookie not set'
        });
    }
});
//google
app.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});
//google
app.get('/auth/google', passport.authenticate('google', {
    scope: ['https://www.googleapis.com/auth/userinfo.profile']
}));
//google
app.get('/auth/google/callback',
    passport.authenticate('google', {failureRedirect:'/'}),
    (req, res) => {
        req.session.token = req.user.token;
        res.redirect('http://localhost:3000');
    }
);


const port = 5000;
app.use(morgan('dev'));

//Connect to mongodb
mongoose.connect('mongodb://admin:admin@ds115579.mlab.com:15579/life_progress');

//Mongo on connection
mongoose.connection.on('Connected',()=>{
    console.log('Connected to database mongodb');
});

//Mongo erros
mongoose.connection.on('error',(err)=>{
    if(err)
    {
        console.log('Error in database connection '+ err);
    }
});
mongoose.Promise = global.Promise;

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

//Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//Routes
app.use('/user', userRoutes);
app.use('/', index);
app.use('/goals', goalsRoutes);


app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404;
    next(error);
  });
  
  app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message
      }
    });
  });


app.listen(port, function(){
    console.log('Server started on port ' +port);
});