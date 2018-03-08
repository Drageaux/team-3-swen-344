var weather = require('weather-js');

const weatherQuotes = {
    // below 32 F
    cold: [
        'Does the cold bother you now?',
        'Do you want to build a snowman?'
    ],
    // from 32 to 50 F
    chilly: [
        'Sweater, n.: garment worn by child when its mother is feeling chilly.',
        'It\'s chilly outside'
    ],
    // from 50 to 68 F
    warm: [
        'Don\'t wear sweaters, please.'
    ],
    // above 68 F
    hot: [
        'This weather isn\'t even close to what the Vietnam Veterans experienced.',
        'Play with fire, they said. It\'ll be fun, they said.'
    ],
}

function selectRandomQuote(quoteList) {
    var max = quoteList.length;
    var index = Math.floor(Math.random() * Math.floor(max));

    return quoteList[index];
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
                return selectRandomQuote(weatherQuotes.cold);
            case (temperature > 32 && temperature <= 50):
                // chilly
                return selectRandomQuote(weatherQuotes.chilly);
            case (temperature > 50 && temperature <= 68):
                // warm
                return selectRandomQuote(weatherQuotes.warm);
            case (temperature > 68):
                // warm
                return selectRandomQuote(weatherQuotes.hot);
            default:
                return '';
        }
    }
};

module.exports = weatherMachine;