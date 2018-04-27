var express = require('express');
var deviceController = express.Router();

//models
var models = require('../models');
const Sequelize = require('sequelize');


let data = {
  devices: [
    {id: 0, name: "Microscope", rentStatus: true},
    {id: 1, name: "Laptop", rentStatus: true},
    {id: 2, name: "Tape Measure", rentStatus: false}
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
    rentStatus: true
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
}

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
      res.json(devices);
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
      res.json(device);
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
      //console.log("****start****")
      //console.log(dName.id);
      //console.log("****end****");

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
          res.json(device);
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

    let dNID = null;
    //Find or create the device name.
    models.DeviceName.findOrCreate({
      where: {name: req.body.name}
    }).spread((dNames, created) => {
      console.log(dNames);
      dNID = dNames[0].id;
    });

    models.Device.findOne({
      include: [models.deviceName, {required: true}],
      attributes: ['name', 'type', 'serial'],
      where: {
        id: req.params.id
      }
    }).then(function(device){
      if(!device){
        res.status(500).send("Device not found.");
      }
      else {
        device.update({
          deviceName: dNID,
          type: req.body.type,
          serial: req.body.serial
        });
      }
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
      if(!device){
        res.status(500).send("Device not found.");
      }
      else {
        device.destroy();
      }
    });
  }
  else {
    res.status(500).send("Invalid or missing information.")
  }
});

module.exports = deviceController;
