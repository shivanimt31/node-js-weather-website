const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// defines port for heroku server
const PORT = process.env.PORT || 3000;

/* Define paths for express config*/ 
const publicDirectoryPath = path.join(__dirname, '../public');
// path to all the hbs views by default it will look in the views folder
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

/*Set up handlebars engine and views location  */ 
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

/*Set up static directory to serve*/ 
app.use(express.static(publicDirectoryPath));

app.get('',(req, res) => {
    res.render('index', {
        title : 'Weather App',
        name : 'Shivani Thorat'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title : 'About Me',
        name : 'Shivani Thorat'
    });
})

app.get('/help', (req, res) => {
    res.render('help', {
        usage : 'This is the usage',
        title : 'Help',
        name : 'Shivani Thorat'
    })
})


// Now we can use the app constant to tell our application what it should do

//suppose our domain is app.com
// an we have app.com as root
// also other pages like app.com/help app.com/about

// app.get('', (req, res) => {

//     res.send('<h1>Weather</h1>'); // If some one is using npm 'request' module to make a request 
//                 // This is what they will be getting back. Also if one is making request from the 
//                 // browser this is what they will get back.
// })

// app.get('/help', (req, res) => {
//     res.send({
//         name : 'Shivani',
//         age : 27
//     });
// })

// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

app.get('/weather', (req, res) => {

    const address = req.query.address;

    if(!address) {
        return res.send({
            error : 'Address is not specified'
        });
    }

    geoCode(address,(error, {latitude, longitude, location } = {}) => {
        
        if (error) {
            return res.send({error});
        } 

        forecast(latitude, longitude ,(error, forecastData) => {
            if (error) {
                return res.send({error});
            }

            return res.send({
                location,
                forecast : forecastData,
                address
            });
        });
    });
    
    // res.send({
    //     forecast : 'It is 29 degrees out. I might rain today',
    //     location : 'California',
    //     address : req.query.address
    // })
})


app.get('/help/*', (req, res) => {
        res.render('404', {
            errorMsg : 'Help Article not found',
            name : 'Shivani Thorat'
        });
})

// Match any request that has not been matched so far
app.get('*', (req, res) => {
    res.render('404', {
        errorMsg : 'My 404 Page',
        name : 'Shivani Thorat'
    });
})
// we can also pass an optional argument to the listen function is a callback function
// which just runcs when the server is up and running. the process of starting up a server is 
// an asyhchronous process
app.listen(PORT, () => {
    console.log(`Server started correctly on port ${PORT}!!!`);
})  