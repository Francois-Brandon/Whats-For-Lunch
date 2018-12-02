const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

function getFavorites(req, res) {
    var userId = req.query.userId;
    
    getFavoritesFromDb(userId, function(error, result) {
        if (error) {
			res.status(500).json({success: false, data: error});
		} else {
			res.status(200).json(result.rows);
		}
    });
}

function getFavoritesFromDb(userId, callback) {
    var sql = "SELECT restaurant_id FROM favorites WHERE user_id = $1::int";

	var params = [userId];

	pool.query(sql, params, function(err, result) {
		if (err) {
			console.log("Error in query: " + sql)
			console.log(err);
			callback(err, null);
		}

		console.log("Favorites Retrieved");
		callback(null, result);
	});
}

function addFavorite(req, res) {
    var businessId = req.body.businessId;
    var userId = req.body.userId;
    
    addFavoriteToDb(businessId, userId, function(error, result) {
        if (error) {
			res.status(500).json({success: false, data: error});
		} else {
			res.status(201).json({success: true, data: result});
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

		console.log("Added favorite restaurant: " + businessId);
        result = "Added favorite restaurant: " + businessId;
		callback(null, result);
	});
}

function deleteFavorite(req, res) {
    var favId = req.body.favId;
    var userId = req.body.userId;
    
    removeFavoriteFromDb(favId, userId, function(error, result) {
        if (error) {
			res.status(500).json({success: false, data: error});
		} else {
			res.status(200).json({success: true, data: result});
		}
    });
}

function removeFavoriteFromDb(favId, userId, callback) {
    var sql = "DELETE FROM favorites WHERE id = $2::int AND user_id = $1::int";

	var params = [userId, favId];

	pool.query(sql, params, function(err, result) {
		if (err) {
			console.log("Error in query: " + sql)
			console.log(err);
			callback(err, null);
		}

		console.log("Favorite Removed");
        result = "Removed favorite restaurant";
		callback(null, result);
	});
}

module.exports = {
    getFavorites: getFavorites,
    addFavorite: addFavorite,
    deleteFavorite: deleteFavorite    
};