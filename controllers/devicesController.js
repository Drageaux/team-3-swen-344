var express = require('express');
var deviceController = express.Router();

//models
var models = require('../models');
const Sequelize = require('sequelize');

/*
let data = {
  devices: [
    {id: 0, name: "Microscope", rentable: true},
    {id: 1, name: "Laptop", rentable: true},
    {id: 2, name: "Tape Measure", rentable: false}
  ]
}

let currID = data.devices.length;

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
    id: currID,
    name: newName,
    rentable: true
  }
  data.devices.push(newDevice);
  currID++;
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
}*/

//Returns all devices
deviceController.get('/', function (req, res){
  //res.json(data.devices);

  //select name, serial, type from DEVICES d inner join DEVICE_NAMES dn on d.deviceName = dn.id;
  models.Device.findAll({
    attributes: ['id', [Sequelize.literal('DeviceName.name'), 'name'],'type', 'serial'],
    include: [
      {
        model: models.DeviceName,
        required: true
      }
    ]
  }).then(function(devices){

    var rentalPromises = devices.map(function(device) {
      return models.DeviceRental.findOne({where: {deviceId: device.id, returnDate: null}});
    });

    Promise.all(rentalPromises).then(function(rentals){
      for(var i = 0; i < rentals.length; i++){
        if(rentals[i] != null){
          devices[i].rentable = false;
        }
        else {
          devices[i].rentable = true;
        }
      }
      res.json(devices);
    });

  }).catch((error) => {
      console.log(error);
  });

});

//Returns the device with of the requested id
deviceController.get('/:id', function(req, res){
  if(Number.isInteger(parseInt(req.params.id)) && parseInt(req.params.id) >= 0){
    /*
    let devData = findDeviceByID(req.params.id);
    if(devData){
      //res.json(devData);
    }
    else{
      res.status(500).send("Cannot find device.");
    }
    */

    models.Device.findOne({
      attributes: ['id', [Sequelize.literal('DeviceName.name'), 'name'],'type', 'serial'],
      where: {
        id: req.params.id
      },
      include: [
        {
          model: models.DeviceName,
          required: true
        }
      ]
    }).then(function(device){
      if(device != null){
        models.DeviceRental.findOne({where: {deviceId: device.id}})
        .then(function(deviceRental){
          if(deviceRental != null){
            device.rentable = false;
          }
          else{
            device.rentable = true;
          }
          res.json(device);
        });
      }
      else {
        res.status(500).send("Cannot find device.");
      }

    }).catch((error) => {
        console.log(error);
    });
  }
  else {
    res.status(500).send("Invalid Input.");
  }
});

//Add new device
deviceController.post('/', function (req, res) {
  if(req.body && req.body.name && req.body.type && req.body.serial){
    //res.json(addNewDevice(req.body.name));

    //Find or create the device name.
    models.DeviceName.findOrCreate({
      where: {name: req.body.name}
    }).spread((dName, created) => {

      //////Find or Create the Device////////
      models.Device.findOrCreate({
        where: {
          deviceName: dName.id,
          type: req.body.type,
          serial: req.body.serial
        }
      }).spread((device, created) => {
        //list should contain one item
        if(!created){
          //do something if the device already exist
          res.status(500).send("Device already exist.");
        }
        else{
          res.status(200).json(device);
        }
      });

    });
  }
  else {
    res.status(500).send("Missing information.");
  }
});

//Update device
deviceController.put('/', function (req, res) {
  if(req.body && req.body.id && Number.isInteger(req.body.id) && req.body.id >= 0 && req.body.name && req.body.type && req.body.serial){
    /*
    let updatedDevice = updateDevice(req.body.id, req.body.name);
    if(updatedDevice){
      res.json(data.devices);
    }
    else {
      res.status(500).send("Device not found.");
    }
    */

    //Find or create the device name.
    models.DeviceName.findOrCreate({
      where: {name: req.body.name}
    }).spread((dName, created) => {
      models.Device.findOne({
        where: {
          id: req.body.id
        }
      }).then(function(device){
        if(device == null){
          res.status(500).send("Device not found.");
        }
        else {

          device.update({
            deviceName: dName.id,
            type: req.body.type,
            serial: req.body.serial
          });
          res.status(200).json(device);
        }
      });

    });

  }
  else {
    res.status(500).send("Invalid or missing information.");
  }
});

//Deletes a device
deviceController.delete('/:id', function(req, res){

  if(Number.isInteger(parseInt(req.params.id)) && parseInt(req.params.id) >= 0){

    /*
    let devData = findDeviceByID(req.params.id);
    if(devData){
      deleteDeviceByID(req.params.id);
      res.json(data.devices);
    }
    else {
      res.status(500).send("Device not found.");
    }
    */

    models.Device.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(device){
      if(device == null){
        res.status(500).send("Device not found.");
      }
      else {
        device.destroy().then(function(){
          res.status(200).send("Device deleted.");
        });
      }
    });

  }
  else {
    res.status(500).send("Invalid or missing information.")
  }
});

module.exports = deviceController;
