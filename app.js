var express = require('express');
var router = express.Router();
var app = express();


/** IMPORT DEPENDENCIES */
var bodyParser = require('body-parser');


/** SETTINGS */
// parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.urlencoded({ extended: false }));

/** SET UP DATABASE */
var models = require('./models');

/** SERVE PUBLIC FILES */
app.use('/', express.static(__dirname + '/dist'));

/** API ENDPOINTS */
// import the API controllers
var devicesApi = require('./controllers/devicesController');
var rentalsApi = require('./controllers/rentalsController');
var messagingApi = require('./controllers/messagingController');
var classroomsApi = require('./controllers/classroomsController');
var reservationsApi = require('./controllers/reservationsController');
var twitterApi = require('./controllers/twitterController');
// register controllers for endpoints
router.use('/devices', devicesApi);//Api for devices
router.use('/rentals', rentalsApi);//Api for rentals
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

exports.close = function (callback) {
    this.server.close(callback);
};
