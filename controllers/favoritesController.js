const favoritesModel = require("../models/favoritesModel.js");

function getFavorites(req, res) {
    var userId = req.query.userId;
    
    favoritesModel.getFavoritesFromDb(userId, function(error, result) {
        if (error) {
			 res.status(500).json({success: false, data: error});
		} else {
			 res.status(200).json(result.rows);
		}
    });
}

function addFavorite(req, res) {
    var businessId = req.body.businessId;
    var userId = req.body.userId;
    
    favoritesModel.addFavoriteToDb(businessId, userId, function(error, result) {
        if (error) {
            res.status(500).json({success: false, data: error});
		} else {
            res.status(201).json({success: true, data: result});
		}
    });
}

function deleteFavorite(req, res) {
    var favId = req.body.favId;
    var userId = req.body.userId;
    
    favoritesModel.removeFavoriteFromDb(favId, userId, function(error, result) {
        if (error) {
            res.status(500).json({success: false, data: error});
		} else {
			res.status(200).json({success: true, data: result});
		}
    });
}


module.exports = {
    getFavorites: getFavorites,
    addFavorite: addFavorite,
    deleteFavorite: deleteFavorite    
};