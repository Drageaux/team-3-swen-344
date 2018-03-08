var express = require('express');
var router = express.Router();
var app = express();


/** IMPORT DEPENDENCIES */
var bodyParser = require('body-parser');
var mysql = require('mysql');


/** SETTINGS */
app.use(bodyParser.json()); // parse application/json
var connection = mysql.createConnection({ // set up MySQL
    host: 'localhost',
    user: 'root',
    password: '',
    database: ''
});
connection.connect(function (err) {
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
var devicesApi = require('./controllers/devicesController');
var messagingApi = require('./controllers/messagingController');
var classroomsApi = require('./controllers/classroomsController');
var reservationsApi = require('./controllers/reservationsController');
var twitterApi = require('./controllers/twitterController');
// register controllers for endpoints
router.use('/devices', devicesApi);//Api for devices
router.use('/messaging', messagingApi); //Api for messaging
router.use('/classrooms', classroomsApi); //API for classrooms
router.use('/reservations', reservationsApi); //API for reservations
router.use('/twitter', twitterApi); //API for Twitter
// any route starting with '/api' will be interfacing our API
app.use('/api', router);


/** KRUTZ'S WEATHER MACHINE */
var weatherMachine = require('./controllers/krutzsWeatherMachine');

/** RUN APP */
var server = app.listen(process.env.PORT || '3000', function () {
    console.log('[SERVER] I\'m listening on PORT: ' + (process.env.PORT || '3000'));
});

module.exports = server;
