var express = require('express');
var router = express.Router();
var app = express();


/** IMPORT DEPENDENCIES */
var bodyParser = require('body-parser');
var mysql = require('mysql');


/** SETTINGS */
app.use(bodyParser.json()); // parse application/json
var dbUrl = process.env.JAWSDB_URL;
console.log(dbUrl)
var connection = mysql.createConnection(dbUrl); // set up MySQL

connection.connect(function(err) {
    if (err) {
        console.error('[DATABASE] Error connecting: ' + err.stack);
        return;
    }
    console.log('[DATABASE] Connected as id ' + connection.threadId);
});


/** SERVE PUBLIC FILES */
app.use('/', express.static(__dirname + '/dist'));


/** API ENDPOINTS */
// import the API controllers
var sampleApi = require('./controllers/sampleController');
var devicesApi = require('./controllers/devicesController');
// register controllers for endpoints
router.use('/sample', sampleApi);
router.use('/devices', devicesApi);//Api for devices
// any route starting with '/api' will be interfacing our API
app.use('/api', router);


/** RUN APP */
app.listen(process.env.PORT || '3000', function () {
    console.log('[SERVER] I\'m listening on PORT: ' + (process.env.PORT || '3000'));
});
