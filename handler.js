'use strict';
const aws = require('aws-sdk');
const https = require('https');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

const scuid = '31xxxxx62';

module.exports.feed = (event, context, callback) => {
    var payload = '';

    https.get('https://feeds.soundcloud.com/users/soundcloud:users:' + scuid + '/sounds.rss', function(response) {
        response.on('data', function (chunk) {
            payload += chunk;
        });
        response.on('end', function () {
            console.log('Got response: ' + payload);
            callback(null, {
                statusCode: response.statusCode,
                headers: response.headers,
                body: payload.replace(/url=\"http\:/gi,'url=\"https:')
            });
        });
    }).on('error', function(e) {
        console.log('Got error: ' + e.message);
        callback(null, {
                statusCode: response.statusCode,
                headers: response.headers,
                body: e.message
            });
    });  
};