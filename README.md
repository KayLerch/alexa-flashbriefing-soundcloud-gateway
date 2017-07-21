# alexa-flashbriefing-soundcloud-gateway
This gateway-service pulls a Soundcloud-RSS-feed and converts audio-feed-urls to HTTPS in order
to comply with SSL requirements for audio-feeds for Alexa Flash-Briefing skills. 

1) Go to handler.js and enter your Soundcloud user-id.
2) Deploy the Serverless-stack with "serverless deploy" in your CLI
3) Use the AWS API-Gateway endpoint you'll find in the console output once your stack is deployed and use it as your Flash-Briefing skill-endpoint.
