global.exit = function exit(code, msg) { console.log(`ERROR: ${msg}`); process.exit(code || 1); }
global.missing = function missing(variable) { exit(1, `${variable} environment variable required.`); }

let slack = require('./conf/slack');
let twitter = require('./conf/twitter');
let approx = require('approximate-number');

const SLACK_CHANNEL_NAME = process.env.SLACK_CHANNEL_NAME;
const TWITTER_SEARCH_STRING = process.env.TWITTER_SEARCH_STRING;

if (!SLACK_CHANNEL_NAME) { missing("SLACK_CHANNEL_NAME"); }
if (!TWITTER_SEARCH_STRING) { missing("TWITTER_SEARCH_STRING"); }

const track = TWITTER_SEARCH_STRING.split(',');

let tweetStream = twitter.stream('statuses/filter', { track });

tweetStream.on('tweet', (tweet) => {

    let str = '';
    let link = '';
    let text = tweet.text;
    let user = tweet.user;
    let loc = tweet.user.location || undefined;
    let prefix = `[${approx(tweet.user.followers_count, 0)} followers]`;

    prefix += ` <https://twitter.com/${user.screen_name}|@${user.screen_name}>`;

    if (loc) { prefix += ` (${loc})`; }
    str += prefix + `\n`;

    if (typeof tweet.retweeted_status === "object") {
        
        link = ` https://twitter.com/${tweet.retweeted_status.user.screen_name}/status/${tweet.retweeted_status.id_str}`;
        str += ` :retweet:`;
        console.log(`retweet by ${user.screen_name} of ${tweet.retweeted_status.user.screen_name}: ${link}`);  

    }
    else {
    
        str += ` :tweet:`;
        link = ` https://twitter.com/${user.screen_name}/status/${tweet.id_str}`;
        console.log(`original by ${user.screen_name}: ${link}`);

    }

    str += link;
    slack.webhook({

        channel: SLACK_CHANNEL_NAME,
        username: user.name,
        icon_emoji: user.profile_image_url,
        text: str

    }, (err, res) => {

        if (err) { exit(1, `Error posting to Slack: ${err}`); }

    });

});

tweetStream.on('error', (err) => { exit(1, `Twitter stream error: ${err.message} (${err.statusCode})`); });

console.log(`Now streaming tweets containing "${track.join(', ')}" to Slack channel: ${SLACK_CHANNEL_NAME}`);