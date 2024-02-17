const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

let app = express();

//Here we are defining the paths that express framework is internally using.
const publicDirectoryPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"..","templates/views");
const partialsPath = path.join(__dirname,"..","templates/partials");
//

//Setting up a request handling function to server static content files.
app.use(express.static(publicDirectoryPath));

//Setting up handlebars module as our preferred views engine and setting our views folder path
app.set("view engine","hbs");
app.set("views",viewsPath);
hbs.registerPartials(partialsPath);
//


//Here we are setting up GET request handler functions

app.get("/", (request,response) => 
{   
    response.render("index", {title: "Weather", name: "Yash Sharma"});
});



app.get("/about", (request,response) => 
{
    response.render("about.hbs",{title: "About me", name: "Yash Sharma"});

});



app.get("/help", (request,response) => 
{
    response.render("help.hbs", {helpMessage: "This is some helpful text", title: "Help Page", name: "Yash Sharma"});
});


app.get("/weather", (request,response) => 
{


    if(!request.query.address)
    {
        response.send({error: "You must provide an address"});
        return;
    }

    const address = request.query.address;

    geocode(address,(error, {latitude, longitude, location} = {}) => 
    {
        if(error)
        {
            response.send({error});
            return;
        }

        forecast(latitude,longitude, (error,forecastData) => 
        {
            if(error)
            {
                response.send({error});
                return;
            }

            response.send({location, forecast: forecastData, address});
        });
    });
});

app.get("/products", (request,response) => 
{
    if(!request.query.search)
    {
        response.send({error: "You must provide a search term"});
        return;    
    }


    response.send({
        products: []
    });
});

app.get("/help/*", (request,response) => 
{
    response.render("notFound",{title:"Help Page Not Found", name: "Yash Sharma", message: "Help article not found"});
});

app.get("*",(request,response) => 
{
    response.render("notFound", {title: "404 Not Found", name: "Yash Sharma", "message": "Page not found"});
});

app.listen(3000, () => 
{
    console.log("Server is running on port 3000");
});
