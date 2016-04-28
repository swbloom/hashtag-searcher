const Twit    = require('twit');
const keyword = '#sup';
const config  = require('./config.json');
const express = require('express');
const app     = express();

const T = new Twit({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  app_only_auth: true,
  timeout_ms: 60 * 1000,
});

const getTweets = function(tweets) {
    return new Promise((resolve,reject) => {
      T.get('search/tweets', { q: `${keyword} since:2011-07-11`, count: 5 }, (err, data, response) => {
        var tweets = data.statuses.map((tweet) => tweet.text);
        resolve(tweets);
      });
    });
};

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

app.get('/', function(req, res){
  getTweets().then((tweets) => {
    res.render('pages/index', {tweets: tweets});
  });
});






app.listen(8080);
console.log('Listening on 8080');
