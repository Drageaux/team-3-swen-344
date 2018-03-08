var GphApiClient = require('giphy-js-sdk-core');
var giphyClient = GphApiClient(process.env.GIPHY_API_KEY);

var giphyController = {
    getGifUrl: function (temperature, callback) {
        var query = this.getQuery(temperature);
        giphyClient.search('gifs', {
            'q': query + ' weather',
            'limit': 1,
            'rating': 'pg-13',
            'sort': 'recent'
        }).then((response) => {
            callback(response.data[0].bitly_url)
        }).catch((err) => {
            console.log('GIPHY ERROR [%s]', err);
        })
    },
    getQuery: function (temperature) {
        switch (true) {
            case (temperature <= 32):
                // cold
                return 'cold';
            case (temperature > 32 && temperature <= 50):
                // chilly
                return 'chilly';
            case (temperature > 50 && temperature <= 68):
                // warm
                return 'warm';
            case (temperature > 68):
                // warm
                return 'hot';
            default:
                return '';
        }
    }
};

module.exports = giphyController;