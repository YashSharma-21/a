const request = require("request");

const geocode = (address, callback) => 
{
    address = encodeURIComponent(address);

    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoieWFzaC1zaGFybWEiLCJhIjoiY2xzYTRqa2JnMDkxNzJrcXJ0d2FsY292YiJ9.a8ORpxvhpt_IuQDMw5iBqw&limit=1`;

    request({url, json: true}, (error,{body} = {}) => 
    {
        if(error)
            callback("Unable to connect to location services!",undefined);

        else if(body.features.length === 0)
            callback("Unable to find location. Try another search.");

            //We are following the common convention in node.js that when no error occurrs,
            //the "error" parameter of a callback function is passed the value null
        else 
        {

            callback(null, 
                {
                    location: body.features[0].place_name, 
                    latitude: body.features[0].center[1], 
                    longitude: body.features[0].center[0]
                });
        }
    });
};


module.exports = geocode;
