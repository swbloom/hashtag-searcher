const Twit = require('twit');
const keyword = '#keyword';
const config = require('./config.json');

const T = new Twit({
  consumer_key: config.consumer_key,
  consumer_secret: config.consumer_secret,
  app_only_auth: true,
  timeout_ms: 60 * 1000,
});

//
//  search twitter for all tweets containing the word 'banana' since July 11, 2011
//
T.get('search/tweets', { q: `${keyword} since:2011-07-11`, count: 5 },
  function(err, data, response) {
  filterResults(data.statuses);
});

const filterResults = function(tweets) {
  tweets.forEach((tweet) => console.log(tweet.text));
}
