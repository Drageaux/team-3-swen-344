var express = require('express');
var sampleController = express.Router();

sampleController.get('/', function (req, res) { // sample GET request
    res.json({ 'message': 'Sample GET' });
});
sampleController.post('/', function (req, res) { // sample POST request
    // we extract the JSON payload by using req.body
    if (req.body && req.body.name) {
        res.json({ 'message': 'Sample POST with name ' + req.body.name + ' in the body' });
    } else {
        // ideally we should send a specific error code and an appropriate error message
        res.status(500).send('Something broke!');
    }
});

module.exports = sampleController;