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
var sampleApi = require('./controllers/sampleController');
var devicesApi = require('./controllers/devicesController');
var classroomsApi = require('./controllers/classroomsController');
var twitterApi = require('./controllers/twitterController');
// register controllers for endpoints
router.use('/sample', sampleApi);
router.use('/devices', devicesApi); //API for devices
router.use('/classrooms', classroomsApi); //API for classrooms
router.use('/twitter', twitterApi); //API for Twitter
// any route starting with '/api' will be interfacing our API
app.use('/api', router);


/** KRUTZ'S WEATHER MACHINE */
var CronJob = require('cron').CronJob;
var weatherController = require('./controllers/weatherController');
var giphyController = require('./controllers/giphyController');
var twitterClient = twitterApi.twitterClient;
// callback functions 
var error = function (err, response, body) {
    console.log('TWITTER ERROR [%s]', err);
};
var success = function (data) {
    console.log('TWITTER DATA [%s]', data);
};

// runs everyday at 12AM
var job = new CronJob('0 0 0 * * *',
    function () {
        // check weather
        weatherController.getCurrentWeather(function callback(weather) {
            if (weather.temperature) {
                // get quote
                var quote = weatherController.getWeatherQuote(weather.temperature);
                // TODO: find Giphy gif
                var giphyUrl = '';

                // tweet
                var tweetStatus = 'The current temperature is ' + weather.temperature + ' degree. ' +
                    quote + ' #Krutzweathermachine ' + giphyUrl;
                console.log('[CRONJOB] Tweet is: ' + tweetStatus);

            }
        });
    }, function () {
        // this function is executed when the job stops
        console.log("[CRONJOB ERROR] CronJob stopped!");
    },
    true, // start the job right now
    "America/New_York" // time zone of this job
);


/** RUN APP */
app.listen(process.env.PORT || '3000', function () {
    console.log('[SERVER] I\'m listening on PORT: ' + (process.env.PORT || '3000'));
});


