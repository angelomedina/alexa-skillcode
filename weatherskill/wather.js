'use strict';

const https = require('https');

// Nota: https://openweathermap.org
// http://api.openweathermap.org/data/2.5/weather?lat=10.3584&lon=-84.5147&appid=e40821451f27ef7688c9a3e03b8fab5f


function httpGet(url, endpoint) {

    return new Promise(((resolve, reject) => {

        var options = {
            host: url,
            port: 443,
            path: endpoint,
            method: 'GET',
        };

        const request = https.request(options, (response) => {

            response.setEncoding('utf8');

            let returnData = '';

            response.on('data', (chunk) => {
                returnData += chunk;
            });

            response.on('end', () => {
                resolve(JSON.parse(returnData));
            });

            response.on('error', (error) => {
                reject(error);
            });

        });
        request.end();

    }));
}





module.exports = {
    'httpGet': httpGet
};