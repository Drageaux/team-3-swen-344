var express = require('express');
var sampleController = express.Router();

sampleController.get('/', function(req, res) { // sample GET request
    res.json({'message': 'Sample GET'})
});
sampleController.post('/', function(req, res) { // sample POST request
    res.json({'message': 'Sample POST'})
});

module.exports = sampleController;