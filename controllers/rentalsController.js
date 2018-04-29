var express = require('express');
var rentalsController = express.Router();

var models = require('../models');
const Sequelize = require('sequelize');

/*
let data = {
  users: [
    {id:0, username:"abc1234"},
    {id:1, username:"dpo5678"},
    {id:2, username:"zxc0987"}
  ],
  devices: [
    {id: 0, name: "Microscope", rentStatus: true},
    {id: 1, name: "Laptop", rentStatus: true},
    {id: 2, name: "Tape Measure", rentStatus: false}
  ],
  rentals: [
    {id:0, deviceId:0,renterId:0,returnCondition:"good",comment:"none",rentDate:"2018-4-7T09:08:00",dueDate:"2018-4-14T09:00:00",returnDate:"2018-4-9T10:00:00"},
    {id:1, deviceId:1,renterId:1,returnCondition:"brocken",comment:"heavily damaged",rentDate:"2018-4-7T09:08:00",dueDate:"2018-4-14T09:00:00",returnDate:"2018-4-9T10:00:00"}
  ]
};

let currID = data.rentals.length;

function findRentalByID(id) {
  for (var i = 0; i < data.rentals.length; i++) {
    if (data.rentals[i].id == id) {
      return data.rentals[i];
    }
  }
  return null;
}

function createNewRentals(deviceId, renterId, rentDate, dueDate) {
  newRental = {
    id:currID,
    deviceId:deviceId,
    renterId:renterId,
    returnCondition:null,
    comment:null,
    rentDate:rentDate,
    dueDate:dueDate,
    returnDate:null
  }
  currID++;
  data.rentals.push(newRental);
  return newRental;
}

function returnRental(id, condition, comment, returnDate){
  for (var i = 0; i < data.rentals.length; i++) {
    if (data.rentals[i].id == id) {
      var rental = data.rentals[i];
      rental.condition = condition;
      rental.comment = comment;
      rental.returnDate = returnDate;
      return rental;
    }
  }
}
*/

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
  /*
  let rental = findRentalByID(req.params.id);
  if (rental) {
    res.json(rental);
  }
  else {
    res.status(500).send("Cannot find rental.");
  }
  */

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
    if(rental != null){
      res.json(rental);
    }
    else{
      res.status(500).send("Cannot find rental.");
    }
  }).catch((error) => {
    console.log(error);
  });

});

//create a new rental
rentalsController.post('/', function (req, res) {
  console.log(req.body);
  if(req.body && req.body.deviceId && Number.isInteger(parseInt(req.body.deviceId)) && parseInt(req.body.deviceId) > 0 && req.body.renterId && Number.isInteger(parseInt(req.body.renterId)) && parseInt(req.body.renterId) > 0 && req.body.rentDate && req.body.dueDate){
    //res.json(createNewRentals(req.body.deviceId, req.body.renterId, req.body.rentDate, req.body.dueDate));

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
      /*
      let rental = findRentalByID(req.body.id);
      if(rental){
        returnRental(req.body.id, req.body.returnCondition, req.body.comment, req.body.returnDate);
        res.json(data.reservations);
      }
      else {
        res.status(500).send("Bad Request");
      }
      */

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
      /*
      let rental = findRentalByID(req.body.id);
      if(rental){
        returnRental(req.body.id, req.body.returnCondition, req.body.comment, req.body.returnDate);
        res.json(data.reservations);
      }
      else {
        res.status(500).send("Bad Request");
      }
      */

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
