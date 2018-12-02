const yelp = require('yelp-fusion');
const client = yelp.client(process.env.API_KEY);

function getRestaurantsFromYelp(searchlocation, radius, categories, callback) {
    client.search({
        term:'restaurants',
        limit: 20,
        location: searchlocation,
        radius: radius,
        categories: categories
    }).then(response => {
        console.log(response.jsonBody);
        callback(null, response.jsonBody);
    }).catch(e => {
        console.log(e);
        callback(e);
    });
    
}

export modules = {
    getRestaurantsFromYelp: getRestaurantsFromYelp
};