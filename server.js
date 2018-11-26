var express = require('express');
var app = express();

const yelp = require('yelp-fusion');
 
const client = yelp.client(process.env.API_KEY);

const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/restaurant', function(request, response) {
	getRestaurants(request, response);
});


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

function getRestaurants(req, res) {
    var searchlocation = req.query.location;
    var radius = req.query.radius;
    var categories = req.query.categories;
    
    client.search({
        term:'restaurants',
        location: req.query.location,
        radius: req.query.radius,
        categories: req.query.categories
    }).then(response => {
        console.log(response.jsonBody.businesses[0].name);
        res.status(200).json(response.jsonBody.businesses[0].name);
    }).catch(e => {
        console.log(e);
    });
}