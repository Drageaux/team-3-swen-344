var CronJob = require('cron').CronJob;
var weatherController = require('./weatherController');
var giphyController = require('./giphyController');
var twitterApi = require('./twitterController');
var twitterClient = twitterApi.twitterClient;
// callback functions 
var error = function (err, response, body) {
    console.log('[TWITTER ERROR] [%s]', err);
};
var success = function (data) {
    console.log('[TWITTER] Posted');
};

// runs everyday at 12AM
var job = new CronJob('00 00 00 * * *',
    function () {
        run();
    }, function () {
        // this function is executed when the job stops
        console.log("[CRONJOB ERROR] CronJob stopped!");
    },
    true, // start the job right now
    "America/New_York" // time zone of this job
);

function run() {
    // check weather
    weatherController.getCurrentWeather(function callback(weather) {
        if (weather.temperature) {
            // get quote
            var quote = weatherController.getWeatherQuote(weather.temperature);
            // find Giphy gif
            giphyController.getGifUrl(weather.temperature, function (url) {
                // tweet
                var tweetStatus = 'The current temperature is ' + weather.temperature + ' degree. ' +
                    quote + ' #Krutzweathermachine ' + url;
                console.log('[CRONJOB] Tweet is: ' + tweetStatus);
                twitterClient.postTweet({
                    status: tweetStatus
                }, error, success);
            });
        }
    });
}

// for testing
// run();