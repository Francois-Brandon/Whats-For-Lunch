const restaurantsModel = require("../models/restaurantsModel.js");

function getRestaurants(req, res) {
    var searchlocation = req.query.location;
    var radius = req.query.radius;
    var categories = req.query.categories;
    
    restaurantsModel.getRestaurantsFromYelp(searchlocation, radius, categories, function(error, results) {
        if (error) {
            res.status(500).json({success: false, data: error});
		} else {
			res.status(200).json(results);
		}
    }); 
}

function getRestaurants(req, res) {
    var businessId = req.query.businessId;
    
    restaurantsModel.getRestaurantFromYelp(businessId, function(error, results) {
        if (error) {
            res.status(500).json({success: false, data: error});
		} else {
			res.status(200).json(results);
		}
    }); 
}

module.exports = {
    getRestaurants: getRestaurants,
    getRestaurant: getRestaurant
};