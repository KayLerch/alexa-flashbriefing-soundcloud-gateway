# Alexa Flash-Briefing Gateway-Service for Soundcloud Podcasts
This gateway-service pulls your Soundcloud-RSS-feed and converts audio-feed-urls to HTTPS in order
to comply with SSL requirements for audio-feeds for Alexa Flash-Briefing skills. Secondly, the script
also picks the first configurable X items of your Soundcloud feed and returns it for your Flash-Briefing by
cutting off the trailing (likely outdated) feed items.

Before you start, make sure you configured your Podcast's RSS feed in Soundcloud ([Howto](https://help.soundcloud.com/hc/en-us/articles/115003570048-Setting-up-your-podcast-s-RSS-feed))

1. Go to handler.js and enter your Soundcloud user-id.

2. Optionally, adjust the max number of feeds from Soundcloud you want to return to Alexa

3. Deploy the Serverless-stack with "serverless deploy" in your CLI (don't forget to set AWS credentials in your environment)

4. Use the AWS API-Gateway endpoint you'll find in the console output once your stack is deployed and use it as your Flash-Briefing skill-endpoint.
