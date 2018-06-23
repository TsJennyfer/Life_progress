const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const index = require('./routes/index');
const goalsRoutes = require('./routes/goals');
const userRoutes = require('./routes/user');
const userProfile = require('./routes/userprofile');
const morgan = require('morgan');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const flash    = require('connect-flash');


const app = express();
//google
//passport = require('passport');
auth = require("./auth");
//cookieParser = require('cookie-parser'),
cookieSession = require('cookie-session');

//const app = express();

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
/*app.get('/', (req, res) => {
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
});*/
//google
app.get('/logout', (req, res) => {
    req.logout();
    req.session = null;
    res.redirect('/');
});
//google
app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
//google
app.get('/auth/google/callback',
    passport.authenticate('google', {successRedirect: 'http://localhost:3000' ,failureRedirect:'/'})
);

require('./config/passport')(passport); // pass passport for configuration

const port = 5000;
app.use(morgan('dev'));
//app.use(cookieParser());


//Connect to mongodb
mongoose.connect('mongodb://admin:!admin!@lifeprogress-shard-00-00-3k52d.mongodb.net:27017,lifeprogress-shard-00-01-3k52d.mongodb.net:27017,lifeprogress-shard-00-02-3k52d.mongodb.net:27017/Life_Progress?ssl=true&replicaSet=LifeProgress-shard-0&authSource=admin&retryWrites=true');

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


// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//Routes
app.use('/user', userRoutes);
app.use('/', index);
app.use('/goals', goalsRoutes);
//require('./routes/userprofile.js')(app, passport);



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