const https = require('https');
//http://api.timezonedb.com/v2.1/convert-time-zone?key=TD7T2OZK0WON&lat=10.3584&lng=-84.5147&format=json&country=CR

const buses = [
    { Departure: 'Cuidad Quesada', Arrival: 'Upala', DepartureTime: '04:00 am' },
    { Departure: 'Ciudad Quesada', Arrival: 'Fortuna by EL Tanque', DepartureTime: '04:00 am' },
    { Departure: 'Ciudad Quesada', Arrival: 'Fortuna by Chahagua', DepartureTime: '05:00 am' },
    { Departure: 'Cuidad Quesada', Arrival: 'Upala', DepartureTime: '05:15 am' },
    { Departure: 'Fortuna', Arrival: 'Ciudad Quesada by Chahagua', DepartureTime: '05:15 am' },
    { Departure: 'Ciudad Quesada', Arrival: 'Fortuna by EL Tanque', DepartureTime: '05:15 am' },
    { Departure: 'Ciudad Quesada', Arrival: 'Fortuna by Chahagua', DepartureTime: '06:00 am' },
    { Departure: 'Ciudad Quesada', Arrival: 'Fortuna by EL Tanque', DepartureTime: '06:30 am' },
    { Departure: 'Fortuna', Arrival: 'Ciudad Quesada by Chahagua', DepartureTime: '07:15 am' },
    { Departure: 'Ciudad Quesada', Arrival: 'Venado', DepartureTime: '07:50 am' },
    { Departure: 'Ciudad Quesada', Arrival: 'Fortuna by EL Tanque', DepartureTime: '07:50 am' },
    { Departure: 'Fortuna', Arrival: 'Ciudad Quesada by Chahagua', DepartureTime: '08:00 am' },
    { Departure: 'Ciudad Quesada', Arrival: 'Fortuna by Chahagua', DepartureTime: '08:00 am' },
    { Departure: 'Cuidad Quesada', Arrival: 'Upala', DepartureTime: '08:30 am' },
    { Departure: 'Ciudad Quesada', Arrival: 'Fortuna by Chahagua', DepartureTime: '09:00 am' },
    { Departure: 'Ciudad Quesada', Arrival: 'Fortuna by EL Tanque', DepartureTime: '09:00 am' },
    { Departure: 'Fortuna', Arrival: 'Ciudad Quesada by Chahagua', DepartureTime: '09:30 am' },
    { Departure: 'Ciudad Quesada', Arrival: 'Fortuna by Chahagua', DepartureTime: '10:30 am' },
    { Departure: 'Ciudad Quesada', Arrival: 'Fortuna by EL Tanque', DepartureTime: '10:00 am' },
    { Departure: 'Cuidad Quesada', Arrival: 'Upala', DepartureTime: '10:00 am' },
    { Departure: 'Ciudad Quesada', Arrival: 'Fortuna by EL Tanque', DepartureTime: '10:45 am' },
    { Departure: 'Ciudad Quesada', Arrival: 'Fortuna by EL Tanque', DepartureTime: '11:30 am' },
    { Departure: 'Fortuna', Arrival: 'Ciudad Quesada by Chahagua', DepartureTime: '11:30 am' },
    { Departure: 'Ciudad Quesada', Arrival: 'Fortuna by EL Tanque', DepartureTime: '12:00 md' },
    { Departure: 'Fortuna', Arrival: 'Ciudad Quesada by Chahagua', DepartureTime: '12:15 md' },
    { Departure: 'Ciudad Quesada', Arrival: 'Fortuna by Chahagua', DepartureTime: '12:20 md' },
    { Departure: 'Ciudad Quesada', Arrival: 'Fortuna by EL Tanque', DepartureTime: '01:00 pm' },
    { Departure: 'Cuidad Quesada', Arrival: 'Upala', DepartureTime: '01:30 pm' },
    { Departure: 'Ciudad Quesada', Arrival: 'Fortuna by Chahagua', DepartureTime: '01:40 pm' },
    { Departure: 'Ciudad Quesada', Arrival: 'La Tigra by Bajo Rodriguez', DepartureTime: '02:00 pm' },
    { Departure: 'Ciudad Quesada', Arrival: 'Venado', DepartureTime: '02:30 pm' },
    { Departure: 'Ciudad Quesada', Arrival: 'Fortuna by EL Tanque', DepartureTime: '02:30 pm' },
    { Departure: 'Cuidad Quesada', Arrival: 'Upala', DepartureTime: '03:00 pm' },
    { Departure: 'Fortuna', Arrival: 'Ciudad Quesada by Chahagua', DepartureTime: '03:15 pm' },
    { Departure: 'Ciudad Quesada', Arrival: 'Fortuna by EL Tanque', DepartureTime: '03:30 pm' },
    { Departure: 'Cuidad Quesada', Arrival: 'Upala', DepartureTime: '04:20 pm' },
    { Departure: 'Cuidad Quesada', Arrival: 'Upala', DepartureTime: '05:00 pm' },
    { Departure: 'Ciudad Quesada', Arrival: 'Fortuna by Chahagua', DepartureTime: '05:15 pm' },
    { Departure: 'Ciudad Quesada', Arrival: 'Fortuna by EL Tanque', DepartureTime: '05:50 pm' },
    { Departure: 'Fortuna', Arrival: 'Ciudad Quesada by Chahagua', DepartureTime: '05:30 pm' },
    { Departure: 'Ciudad Quesada', Arrival: 'Fortuna by EL Tanque', DepartureTime: '06:00 pm' },
    { Departure: 'Cuidad Quesada', Arrival: 'Upala', DepartureTime: '06:00 pm' },
    { Departure: 'Ciudad Quesada', Arrival: 'Fortuna by Chahagua', DepartureTime: '06:30 pm' },
    { Departure: 'Fortuna', Arrival: 'Ciudad Quesada by Chahagua', DepartureTime: '07:30 pm' },
    { Departure: 'Ciudad Quesada', Arrival: 'Fortuna by EL Tanque', DepartureTime: '07:30 pm' },
    { Departure: 'Ciudad Quesada', Arrival: 'Fortuna by Chahagua', DepartureTime: '08:00 pm' },
    { Departure: 'Ciudad Quesada', Arrival: 'Fortuna by EL Tanque', DepartureTime: '09:00 pm' },
    { Departure: 'Ciudad Quesada', Arrival: 'Fortuna by EL Tanque', DepartureTime: '10:10 pm' },
    { Departure: 'Cuidad Quesada', Arrival: 'Upala', DepartureTime: '10:10 pm' },
];

function time(s) {
    return new Date(s * 1e3).toISOString().slice(-13, -5);
}

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

function getSantaClaraBusesSchedule() { return buses; }

module.exports = {
    'getSantaClaraBusesSchedule': getSantaClaraBusesSchedule,
    'httpGet': httpGet
};