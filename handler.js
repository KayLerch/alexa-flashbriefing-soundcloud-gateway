'use strict';
const https = require('https');

module.exports.feed = (event, context, callback) => {
    var payload = '';
    // expect uid from query-string passed thru from API gateway
    https.get('https://feeds.soundcloud.com/users/soundcloud:users:' + event.queryStringParameters.uid + '/sounds.rss', function(response) {
        response.on('data', function (chunk) {
            payload += chunk;
        });
        response.on('end', function () {
            // split into array of items
            var chunks = payload.replace(/url=\"http\:/gi,'url=\"https:').split('</item>');
            // where first item is contained in the first chunk and will always be part of the return
            var body = chunks[0];
            if (chunks.length > 1) {
                // while splitting by the item-end-tag it got lost so we have to append it again
                body += '</item>';
                // max number of feed items to return (please note it will at least be one no matter if you set this parameter below 1)
                var items_to_return = Math.max(1, event.queryStringParameters.limit);
                // go through rest of the items and append until desired num of items or number of items returned is reached
                // ignore the last chunk as it contains the tail-payload we will append later on
                for(var i = 1; i < Math.min(chunks.length - 1, items_to_return); i++){
                    // while splitting by the item-end-tag it got lost so we have to append it again
                    body += (chunks[i] + '</item>');
                }
                // finally, append the tail payload
                body += chunks.slice(-1)[0];
            }
            callback(null, {
                statusCode: response.statusCode,
                headers: response.headers,
                body: body
            });
        });
    }).on('error', function(e) {
        console.log('Got error: ' + e.message);
        callback(null, {
            statusCode: 500,
            body: e.message
        });
    });  
};