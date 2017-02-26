# twitter-slack-stream
Stream tweets to Slack with the greatest of ease!

## About 
This was created as an easy way to monitor tweets containing specific keywords from a [Slack](https://www.slack.com) channel in realtime.

It's been designed to be super easy to deploy via [Heroku](https://www.heroku.com).

You can deploy it anywhere [Node.js](https://nodejs.org/) is installed.

## Requirements

1. [Twitter application](https://apps.twitter.com/)
1. [Incoming Slack webhook](https://api.slack.com/incoming-webhooks)
1. Keyword to search on Twitter
1. Slack channel to stream tweets into

## Deployment

_note: Don't forget to run `heroku ps:scale web=0 worker=1` to get Heroku to run the worker dyno._
