var express = require('express');
var twitterController = express.Router();

var Twitter = require('twitter-node-client').Twitter;

//Get this data from your twitter apps dashboard
var config = {
    "consumerKey": process.env.TWITTER_API_KEY,
    "consumerSecret": process.env.TWITTER_API_SECRET,
    "accessToken": process.env.TWITTER_ACCESS_TOKEN,
    "accessTokenSecret": process.env.TWITTER_ACCESS_TOKEN_SECRET,
    "callBackUrl": process.env.TWITTER_CALLBACK_URL
}
var twitter = new Twitter(config);

twitterController.twitterClient = twitter;

twitterController.get('/', function (req, res) {
    if (parseInt(req.query.count) <= 0) {
        return res.status(500).send('Invalid Tweets count.');
    }
    twitter.getUserTimeline({
        screen_name: 'team3swen344',
        count: req.query.count ? req.query.count : '10'
    }, function err(error, response, body) {
        res.status(500).send(error);
    }, function success(data) {
        var parsedRes = JSON.parse(data);
        res.json(parsedRes);
    });

});

module.exports = twitterController;
