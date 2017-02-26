let Slack = require('slack-node');

let url = process.env.SLACK_WEBHOOK_URI;
if (!url) { missing("SLACK_WEBHOOK_URI"); }

let slack = new Slack();

slack.setWebhook(url);

module.exports = slack;
