var express = require('express');
var app = express();

const yelp = require('yelp-fusion');
const client = yelp.client(process.env.API_KEY);

const { Pool } = require("pg");

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(express.json())

app.get('/restaurant', function(request, response) {
	getRestaurants(request, response);
});

app.post('/favorite', function(request, response) {
    if (!request.body) return response.sendStatus(400);
    addFavorite(request, response);
    //response.status(200).json(request.body);
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

function addFavorite(req, res) {
    var businessId = req.body.businessId;
    var userId = req.body.userId;
    
    addFavoriteToDb(businessId, userId, function(error, result) {
        if (error || result == null || result.length != 1) {
			response.status(500).json({success: false, data: error});
		} else {
			var person = result[0];
			response.status(200).json({"responseText": "Added to favorites"});
		}
    });
}

function addFavoriteToDb(businessId, userId, callback) {
    var sql = "INSERT INTO favorites (user_id, restaurant_id) VALUES ($1::int, $2)";

	var params = [userId, businessId];

	pool.query(sql, params, function(err, result) {
		if (err) {
			console.log("Error in query: " + sql)
			console.log(err);
			callback(err, null);
		}

		console.log("Found result: " + JSON.stringify(result.rows));

		callback(null);
	});
}




