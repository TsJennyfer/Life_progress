var express = require('express');
var router = express.Router();
//hashing password
var bcrypt = require('bcryptjs');
//json web token
var jwt = require('jsonwebtoken');
//user structure in database
var User = require('../models/user');

//retrieving data
router.get('/users', function(req, res, next){
    User.find(function(err, users){
        res.json(users);
    })
});



//add  new user, sign up
router.post('/user', function(req, res, next){
    let newUser = new User({
        //userName:req.body.userName,
        userPassword:bcrypt.hashSync(req.body.userPassword,10),
        //userPassword:req.body.userPassword,
        //name:req.body.name,
        //surname:req.body.surname,
        //sex:req.body.sex,
        email:req.body.email,
        //goals:req.body.goals
    });

    newUser.save(function(err, user){
        if (err)
        {
            res.json({msg: "Failed to add user."});
            res.json(err);
        }
        else
        {
            res.json({msg: "User added succesfully."});
        }
    });
});

//sign in with token
router.post('/signin', function(req, res, next){
    User.findOne({email:req.params.email}, function (err, user) {
        if (err)
        {
            res.json({msg:"An error occurred."});
            res.json(err);
        }
        if (!user)
        {
            res.json({msg:"Invalid login credentials."});
            res.json(err);
        }
        if (!bcrypt.compareSync(req.body.userPassword, user.userPassword))
        {
            res.json({msg:"Invalid login credentials."});
            res.json(err);
        }
        var token = jwt.sign({user: user},'key', {expiresIn: 7200});
        res.status(200).json({
            msg: 'Successfully logged in.',token: token, userId: user._id
        });
      });

});


module.exports = router;