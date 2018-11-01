var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://admin:pri2018pri@lifeprogress-shard-00-00-3k52d.mongodb.net:27017,lifeprogress-shard-00-01-3k52d.mongodb.net:27017,lifeprogress-shard-00-02-3k52d.mongodb.net:27017/LifeProgress?ssl=true&replicaSet=LifeProgress-shard-0&authSource=admin&retryWrites=true');

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

module.exports = {mongoose};