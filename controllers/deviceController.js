var express = require('express');
var deviceController = express.Router();

let data = {
  devices: [
    {id: 0, name: "Microscope", rentStatus: true},
    {id: 1, name: "Laptop", rentStatus: true},
    {id: 2, name: "Tape Measure", rentStatus: false}
  ]
}

function findDeviceByID(id){
  for (var i = 0; i < data.devices.length; i++){
    if (data.devices[i].id == id){
      return data.devices[i];
    }
  }
  return null;
}

function findDeviceByName(name){
  for (var i = 0; i < data.devices.length; i++){
    if (data.devices[i].name.toLowerCase() == name.toLowerCase()){
      return data.devices[i];
    }
  }
  return null;
}

function addNewDevice(newName){
  data.devices.push({
    id: data.devices.length,
    name: newName,
    rentStatus: true
  });
}

function deleteDeviceByID(id){
  for (var i = 0; i < data.devices.length; i++){
    if (data.devices[i].id == id){
      data.devices = data.devices.filter(item => item !== data.devices[i]);
      break;
    }
  }
}

//Returns all devices
deviceController.get('/', function (req, res){
  res.json(data.devices);
});

//Returns the device with of the requested id
deviceController.get('/find/:id', function(req, res){
  let devData = findDeviceByID(req.params.id);
  if(devData){
    res.json(devData);
  }
  else{
    res.status(500).send("Cannot find device.");
  }
});

//Add new device
deviceController.post('/', function (req, res) {
  if(req.body && req.body.newName){
    addNewDevice(req,body.newName);
    res.json(data.devices);
  }
  else {
    res.status(500).send("Missing information.");
  }
});

//Deletes a device
deviceController.post('/delete', function(req, res){
  if(req.body && req.body.id){
    deleteDeviceByID(req.params.id);
    res.json(data.devices);
  }
  else{
    res.status(500).send("Missing information.");
  }
});
module.exports = deviceController;
