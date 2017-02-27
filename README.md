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


## Configuration

### Twitter

1. Head to [apps.twitter.com](https://apps.twitter.com/)
1. Create a new application
  1. Give it whatever name/description you like
  1. Callback URL doesn't matter and can be blank 
1. Navigate to the "Keys and Access Tokens" tab of your newly created app
1. Record the `Consumer Key` and `Consumer Secret` for later use
1. Scroll down to "Your Access Token", and click the "Create my access tokens" button
1. Record the `Access Token` and `Access Token Secret` for later use

### Slack

1. Head to [Slack Integrations](https://slack.com/apps/build/custom-integration)
1. Create a new incoming webhook
1. Record the webhook URL for later use


## Deployment

Now that you have all of the required secrets, you're ready to deploy!

The application requires the following environment variables:

|  Environment Variable  |  Description  |
|------------------------|---------------|
| `SLACK_CHANNEL_NAME`   | the name of the Slack channel to send incoming tweets to |
| `TWITTER_SEARCH_STRING`| the keyword to look for on the Twitter firehose |
| `CONSUMER_KEY`         | the key for your Twitter application |
| `CONSUMER_SECRET`      | the secret for your Twitter application |
| `ACCESS_TOKEN`         | the token for authorizing your app to use your twitter account |
| `ACCESS_SECRET`        | the accompanying secret for your twitter account's use of the app |

To launch, simply execute `npm start`.

_Heroku note: Don't forget to run `heroku ps:scale web=0 worker=1` to get Heroku to run the worker dyno._
