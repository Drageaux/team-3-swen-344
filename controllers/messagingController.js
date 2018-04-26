var express = require('express');
var models= require('../models');
var messagingController = express.Router();
//Returns all devices
messagingController.get('/', function (req, res){
  res.json(data.messages);
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
        }).catch((error) => {
            console.log(error);
        });
    }
    else{
        res.status(500).send("Improper Input Values.");
    }
});

//Add new message
messagingController.post('/', function (req, res) {
  if(req.body && req.body.message && Number.isInteger(req.body.fromId) && req.body.fromId >= 0 && Number.isInteger(req.body.toId) && req.body.toId >= 0 && req.body.title){
      models.Message.create({
          fromId: req.body.fromId,
          toId: req.body.toId,
          dateCreated: Date.now().toString(),
          title: req.body.title,
          message: req.body.message,
          deleted: false
      }).then((message) => {
          if(message) {
              res.json({
                  message: {
                      fromId: message.get('fromId'),
                      toId: message.get('toId'),
                      dateCreated: message.get('dateCreated'),
                      title: message.get('title'),
                      message: message.get('message'),
                      deleted: message.get('delete')
                  },
                  status: true
              })
          } else {
              res.status(500).json({
                  status: false,
                  message: "Message not added"
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
  if(req.body && Number.isInteger(req.body.id) && req.body.id >= 0 && req.body.title && req.body.message){
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
                      message: {
                          fromId: updatedMessage.get('fromId'),
                          toId: updatedMessage.get('toId'),
                          dateCreated: updatedMessage.get('dateCreated'),
                          title: updatedMessage.get('title'),
                          message: updatedMessage.get('message'),
                          deleted: updatedMessage.get('delete')
                      }
                  })
              })
          } else {
              res.status(500).json({
                  status: false,
                  message: "Message not found"
              });
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
messagingController.delete('/', function(req, res){
    if(req.body && Number.isInteger(req.body.id) && req.body.id >= 0){
        models.Message.find({
            where: {
                id: req.body.id
            }
        }).then((message) => {
            if(message) {
                message.update({
                    deleted: true
                }).then((updatedMessage) => {
                    res.json({
                        status: true,
                        message: {
                            fromId: updatedMessage.get('fromId'),
                            toId: updatedMessage.get('toId'),
                            dateCreated: updatedMessage.get('dateCreated'),
                            title: updatedMessage.get('title'),
                            message: updatedMessage.get('message'),
                            deleted: updatedMessage.get('delete')
                        }
                    })
                })
            } else {
                res.status(500).json({
                    status: false,
                    message: "Message not found"
                });
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
