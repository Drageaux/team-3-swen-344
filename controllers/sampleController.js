var express = require('express');
var sampleController = express.Router();

sampleController.get('/', function (req, res) { // sample GET request
    res.json({ 'message': 'Sample GET' });
});

sampleController.post('/', function (req, res) { // sample POST request
    // we extract the JSON payload by using req.body
    if (req.body && req.body.newFirstName && req.body.lastName) {
        res.json({
            firstName: req.body.newFirstName,
            lastName: req.body.lastName
        });
    } else {
        // ideally we should send a specific error code and an appropriate error message
        res.status(500).send('Missing first name or last name!');
    }
});

module.exports = sampleController;