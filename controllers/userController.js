var express = require('express');
var userController = express.Router();
var models = require('../models');

//Returns all devices
userController.get('/', function (req, res){
    models.User.findAll().then((users) => {
        res.json({
            status: true,
            users: users
        })
    })
});

userController.get('/:id', function (req, res){
    if(!isNaN(parseInt(req.params.id)) && req.params.id >= 0) {
        models.User.findAll({
            where: {
                authId: req.params.id
            }
        }).then((users) => {
            res.json({
                status: true,
                users: users
            })
        }).catch((error) =>{
            console.log("THIS IS THE BUG" + error);
        })

    } else {
        res.status(400).json({
            status: false,
            message: "Incorrect Parameters"
        })
    }
});

userController.post('/', function (req, res){
    var allowedRoles = ['admin', 'instructor', 'proxy', 'student'];
    if(req.body.authId
        && req.body.email
        && req.body.role && allowedRoles.includes(req.body.role)
        && req.body.name) {
        models.User.create({
            authId: req.body.authId,
            email: req.body.email,
            name: req.body.name,
            role: req.body.role
        }).then((newUser) => {
            if(newUser) {
                res.json({
                    status:true,
                    user: newUser
                })
            } else {
                res.json({
                    status: false,
                    message: "New user not added."
                })
            }
        })

    } else {
        res.status(400).json({
            status: false,
            message: "Incorrect Parameters"
        })
    }

});


module.exports = userController;
