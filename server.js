var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var index = require('./routes/index');
var api = require('./routes/api');

var port = 3000;

var app = express();

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
        console.log('Error in database connoction '+err);
    }
});

//View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

//Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

//Body Parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);
app.use('/api', api);

app.listen(port, function(){
    console.log('Server started on port ' +port);
});