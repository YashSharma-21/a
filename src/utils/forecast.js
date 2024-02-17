const request = require("request");

const forecast = (latitude,longitude,callback) => 
{
    let access_key = "79f84b08e44dabcd757c4d1b19d4f6eb";
    let url = `http://api.weatherstack.com/current?access_key=${access_key}&units=f&query=${latitude},${longitude}`;

    request({url, json: true}, (error,{body} = {}) => 
    {
        if(error)
            callback("Unable to connect to weather service!");

        else if(body.error)
            callback("Unable to find location");

        else 
        {   

            callback(null,`It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees out.`);
        }
            
    });
};

module.exports = forecast;