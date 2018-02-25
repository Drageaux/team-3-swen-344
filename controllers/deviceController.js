var express = require('express');
var deviceController = express.Router();

let data = {
  devices: [
    {name: "Microscope", rentStatus: true},
    {name: "Laptop", rentStatus: true},
    {name: "Tape Measure", rentStatus: false}
  ]
}

deviceController.get('/', function (req, res){
  res.json(data.devices);
});

deviceController.post('/', function (req, res) {
  if(req.body && req.body.newName){
    newData = {name: req.body.newName, rentStatus: true}
    data.devices.push(newData);
    res.json(newData);
  }
  else {
    res.status(500).send("Missing parameters.");
  }
});


module.exports = deviceController;
