var express = require('express');
var models= require('../models');
var messagingController = express.Router();
//Returns all devices
messagingController.get('/', function (req, res){
    models.Message.findAll().then((messages) => {
        res.json({
            status: true,
            messages: messages
        })
    })
});

//Returns the device with of the requested id
messagingController.get('/to/:id', function(req, res){
    if(Number.isInteger(parseInt(req.params.id)) && parseInt(req.params.id) >= 0){
        models.Message.findAll({
            where: {
                ToId: req.params.id,
                deleted: false
            }
        }).then((result) => {
            var returnObj = {
                messages: []
            };
            if(Object.keys(result).length !== 0){
                returnObj = {
                    messages: result
                }
            }
            res.json(returnObj);
        });
    }
    else{
        res.status(500).send("Improper Input Values.");
    }
});


messagingController.get('/users/', function(req, res){
    models.User.findAll({
        attributes: ['id','authId', 'name', 'email']
    }).then((users) => {
        let retAry = [];
        if(users) {
            users.forEach((user) => {
                retAry.push({
                    "name": user.get('name'),
                    "email": user.get('email'),
                    "authId": user.get("authId"),
                    "id": user.get("id")
                })
            });
        }
        res.json({
            users: retAry
        });
    })
});

//Add new message
messagingController.post('/', function (req, res) {
  if(req.body && req.body.message && Number.isInteger(parseInt(req.body.fromId)) && req.body.fromId >= 0 && Number.isInteger(parseInt(req.body.toId)) && req.body.toId >= 0 && req.body.title){
      models.Message.create({
          fromId: parseInt(req.body.fromId),
          toId: parseInt(req.body.toId),
          dateCreated: Date.now().toString(),
          title: req.body.title,
          message: req.body.message,
          deleted: false
      }).then((message) => {
          if(message) {
              res.json({
                  message: message,
                  status: true
              })
          }
      })
  }
  else {
    res.status(500).json({
        status: false,
        message: "Missing input information"
    });
  }
});

//Update message
messagingController.put('/', function (req, res) {
  if(req.body && Number.isInteger(parseInt(req.body.id)) && req.body.id >= 0 && req.body.title && req.body.message){
      models.Message.find({
          where: {
              id: req.body.id
          }
      }).then((message) => {
          if(message) {
              message.update({
                  message: req.body.message,
                  title: req.body.title,
              }).then((updatedMessage) => {
                  res.json({
                      status: true,
                      message: updatedMessage
                  })
              })
          }
      });
  }
  else {
      res.status(500).json({
          status: false,
          message: "Missing input information"
      });
  }
});

//Deletes a device
messagingController.delete('/:id', function(req, res){
    if(Number.isInteger(parseInt(req.params.id)) && req.params.id >= 0){
        models.Message.find({
            where: {
                id: parseInt(req.params.id)
            }
        }).then((message) => {
            if(message) {
                message.update({
                    deleted: true
                }).then((updatedMessage) => {
                    res.json({
                        status: true,
                        message: updatedMessage
                    })
                })
            }
        });
    }
    else {
        res.status(500).json({
            status: false,
            message: "Missing input information"
        });
    }
});
module.exports = messagingController;
