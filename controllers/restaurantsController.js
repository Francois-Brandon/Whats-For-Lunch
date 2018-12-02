const restaurantsModel = require("../models/restaurantsModel.js");

function getRestaurants(req, res) {
    var searchlocation = req.query.location;
    var radius = req.query.radius;
    var categories = req.query.categories;
    
    restaurantsModel.getRestaurantsFromYelp(searchlocation, radius, categories, function(error, results) {
        if (error) {
            res.status(500).json({success: false, data: error});
		} else {
			res.status(200).json({success: true, data: results});
		}
    }); 
}

module.exports = {
    getRestaurants: getRestaurants
};