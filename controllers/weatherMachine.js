var weather = require('weather-js');

const weatherQuotes = {
    // below 32 F
    cold: [],
    // from 32 to 50 F
    chilly: [],
    // from 50 to 68 F
    warm: [],
    // above 68 F
    hot: [],
}

function selectRandomQuote(quoteList) {
    var max = quoteList.length;
    var index = Math.floor(Math.random() * Math.floor(max));
}

var weatherMachine = {
    // Options:
    // search:     location name or zipcode
    // degreeType: F or C
    getCurrentWeather: function (callback) {
        weather.find({ search: 'Rochester, NY', degreeType: 'F' }, function (err, result) {
            if (err) console.log(err);

            //console.log(JSON.stringify(result[0].current, null, 2));
            callback(result[0].current);
        });
    },

    getWeatherQuote: function (temperature) {
        //console.log(temperature)
        switch (true) {
            case (temperature <= 32):
                // cold
                return;
            case (temperature >= 32 ):
                // chilly
                return;
            case (temperature >= 32):
                // warm
                return;
            case (temperature > 68):
                // warm
                return;
            default:
                return '';
        }
    }
};

module.exports = weatherMachine;