let Twitter = require('twit');

const CONSUMER_KEY = process.env.CONSUMER_KEY;
const CONSUMER_SECRET = process.env.CONSUMER_SECRET;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const ACCESS_SECRET = process.env.ACCESS_SECRET;

if (!CONSUMER_KEY) { missing("CONSUMER_KEY"); }
if (!CONSUMER_SECRET) { missing("CONSUMER_SECRET"); }
if (!ACCESS_TOKEN) { missing("ACCESS_TOKEN"); }
if (!ACCESS_SECRET) { missing("ACCESS_SECRET"); }

let twitter = new Twitter({

    consumer_key : CONSUMER_KEY,
    consumer_secret : CONSUMER_SECRET,
    access_token : ACCESS_TOKEN,
    access_token_secret : ACCESS_SECRET,
    
});

module.exports = twitter;
