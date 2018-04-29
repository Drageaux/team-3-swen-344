var express = require('express');
var rentalsController = express.Router();

var models = require('../models');
const Sequelize = require('sequelize');

//returns all rentals
rentalsController.get('/', function (req, res) {
  //res.json(data.rentals);

  models.DeviceRental.findAll({
    attributes: [
      'id',
      'renterId',
      'deviceId',
      [Sequelize.literal('renter.email'), 'renterEmail'],
      'rentDate',
      'dueDate',
      'comment',
      'returnDate',
      'returnCondition'
    ],
    include: [
      {
        model: models.User,
        as: 'renter',
        required: true
      },
      {
        model: models.Device,
        as: 'device',
        required: true,
        include: [
          {
            model: models.DeviceName,
            attributes:  [['name', Sequelize.literal('device')]],
            required: true
          }
        ]
      }
    ]
  }).then(function(rentals){
    res.json(rentals);
  }).catch((error) => {
    console.log(error);
  });

});

//Returns the rental with of the requested id
rentalsController.get('/:id', function (req, res) {

  if(Number.isInteger(parseInt(req.params.id)) && parseInt(req.params.id) > 0){

    models.DeviceRental.findOne({
      attributes: [
        'id',
        [Sequelize.literal('renter.email'), 'renterEmail'],
        'rentDate',
        'dueDate',
        'comment',
        'returnDate',
        'returnCondition'
      ],
      where: {
        id: parseInt(req.params.id)
      },
      include: [
        {
          model: models.User,
          as: 'renter',
          required: true
        },
        {
          model: models.Device,
          required: true,
          as: 'device',
          include: [
            {
              model: models.DeviceName,
              attributes:  [['name', Sequelize.literal('device')]],
              required: true
            }
          ]
        }
      ]
    }).then(function(rental){
      if(!rental){
        res.status(500).send("Cannot find rental.");
      }
      else{
        res.json(rental);
      }
    }).catch((error) => {
      console.log(error);
    });
  }
  else {
    res.status(500).send("Invalid Input.");
  }
});

//create a new rental
rentalsController.post('/', function (req, res) {
  console.log(req.body);
  if(req.body && req.body.deviceId && Number.isInteger(parseInt(req.body.deviceId)) && parseInt(req.body.deviceId) > 0 && req.body.renterId && Number.isInteger(parseInt(req.body.renterId)) && parseInt(req.body.renterId) > 0 && req.body.rentDate && req.body.dueDate){

    models.DeviceRental.create({
      deviceId: parseInt(req.body.deviceId),
      renterId: parseInt(req.body.renterId),
      rentDate: req.body.rentDate,
      dueDate: req.body.dueDate
    }).then((rental) => {
      if(rental == null){
        res.status(500).send("Cannot create rental");
      }
      else {
        res.status(200).json(rental);
      }
    });

  }
  else {
    res.status(500).send("Bad Request");
  }
});

//rental returns
rentalsController.put('/', function(req, res){
    if(req.body && req.body.id && Number.isInteger(parseInt(req.body.id)) && parseInt(req.body.id) > 0 && req.body.returnCondition && req.body.comment && req.body.returnDate){

      models.DeviceRental.findOne({
        where: {
          id: parseInt(req.body.id)
        }
      }).then(function(rental){
        if(rental != null){
          rental.update({
            returnCondition: req.body.returnCondition,
            comment: req.body.comment,
            returnDate: req.body.returnDate
          });
          res.status(200).json(rental);
        }
        else {
          res.status(500).json("Cannot find rental.")
        }
      });

    }
    else {
      res.status(500).send("Bad Request");
    }
});

rentalsController.delete('/:id', function(req, res){
    if(Number.isInteger(parseInt(req.params.id)) && parseInt(req.params.id) >= 0){

      models.DeviceRental.findOne({
        where: {
          id: req.params.id
        }
      }).then(function(rental){
        if(rental == null){
          res.status(500).send("Cannot find rental");
        }
        else {
          rental.destroy().then(function(){
            res.status(200).send("Rental deleted.");
          });
        }
      });
    }
    else {
      res.status(500).send("Bad Request");
    }
});

module.exports = rentalsController;
