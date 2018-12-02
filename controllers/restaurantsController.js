const yelp = require('yelp-fusion');
const client = yelp.client(process.env.API_KEY);

function getRestaurants(req, res) {
    var searchlocation = req.query.location;
    var radius = req.query.radius;
    var categories = req.query.categories;
    
    client.search({
        term:'restaurants',
        limit: 20,
        location: req.query.location,
        radius: req.query.radius,
        categories: req.query.categories
    }).then(response => {
        console.log(response.jsonBody);
        res.status(200).json(response.jsonBody);
    }).catch(e => {
        console.log(e);
    });
}

module.exports = {
    getRestaurants: getRestaurants
};