var express = require('express');
var rentalsController = express.Router();

let data = {
  users: [
    {id:0, username:"abc1234"},
    {id:1, username:"dpo5678"},
    {id:2, username:"zxc0987"}
  ]
  devices: [
    {id: 0, name: "Microscope", rentStatus: true},
    {id: 1, name: "Laptop", rentStatus: true},
    {id: 2, name: "Tape Measure", rentStatus: false}
  ]
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
  data.renatals.push(newRental);
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

//returns all rentals
rentalsController.get('/', function (req, res) {
    res.json(data.rental);
});

//Returns the rental with of the requested id
rentalsController.get('/:id', function (req, res) {
    let rental = findRentalByID(req.params.id);
    if (rental) {
        res.json(rental);
    }
    else {
        res.status(500).send("Cannot find rental.");
    }
});

//create a new rental
rentalsController.post('/', function (req, res) {
    if(req.body){
        res.json(createNewRentals(req.body.deviceId, req.body.renterId, req.body.rentDate, req.body.dueDate));
    }
    else {
        res.status(500).send("Bad Request");
    }
});

//rental returns
reservationsController.post('/return/:id', function(req, res){
    let rental = findRentalByID(req.params.id);
    if(rental && req.body){
        returnRental(req.params.id, req.body.condition, req.body.comment, req.body.returnDate);
        res.json(data.reservations);
    }
    else {
        res.status(500).send("Bad Request");
    }
});

module.exports = rentalsController;
