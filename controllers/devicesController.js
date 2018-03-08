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

function addNewDevice(newName){
  newDevice = {
    id: data.devices.length,
    name: newName,
    rentStatus: true
  }
  data.devices.push(newDevice);
  return newDevice;
}

function updateDevice(id, newName){
  var dev = findDeviceByID(id);
  if(dev){
    dev.name = newName;
    return dev;
  }
  else{
    return null;
  }

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
deviceController.get('/:id', function(req, res){
  if(Number.isInteger(parseInt(req.params.id)) && parseInt(req.params.id) >= 0){
    let devData = findDeviceByID(req.params.id);
    if(devData){
      res.json(devData);
    }
    else{
      res.status(500).send("Cannot find device.");
    }
  }
  else {
    res.status(500).send("Invalid Input.");
  }
});

//Add new device
deviceController.post('/', function (req, res) {
  if(req.body && req.body.name){
    res.json(addNewDevice(req.body.name));
  }
  else {
    res.status(500).send("Missing information.");
  }
});

//Update device
deviceController.put('/', function (req, res) {
  if(req.body && req.body.id && Number.isInteger(req.body.id) && req.body.id >= 0 && req.body.name){
    let updatedDevice = updateDevice(req.body.id, req.body.name);
    if(updatedDevice){
      res.json(data.devices);
    }
    else {
      res.status(500).send("Device not found.");
    }
  }
  else {
    res.status(500).send("Invalid or missing information.");
  }
});

//Deletes a device
deviceController.delete('/:id', function(req, res){
  if(Number.isInteger(parseInt(req.params.id)) && parseInt(req.params.id) >= 0){
    let devData = findDeviceByID(req.params.id);
    if(devData){
      deleteDeviceByID(req.params.id);
      res.json(data.devices);
    }
    else {
      res.status(500).send("Device not found.");
    }
  }
  else {
    res.status(500).send("Invalid or missing information.")
  }
});

module.exports = deviceController;
