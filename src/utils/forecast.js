const request = require('request');

const forecast = (latitude, longitude,  callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=6324c144ac379ac0d96fe2c794af0865&query=' + latitude + ',' + longitude +'&units=m';

    request({url, json : true}, (error,{body} = {}) => {

        if(error) {
            callback('Unable to connect to weather service!!!', undefined);
        
        } else if(body.error) {
            callback('Unable to find location', undefined);
        
        } else {
            const weather = body.current;
            const forecast = `${weather.weather_descriptions[0]} It is currently ${weather.temperature} degrees. It feels like ${weather.feelslike} out.`;                                      
            callback(undefined, forecast);
                    
        }
    })

}

module.exports = forecast;
