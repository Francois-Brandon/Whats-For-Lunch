const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

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

function addFavoriteToDb(businessId, userId, callback) {
    var sql = "INSERT INTO favorites (user_id, restaurant_id) VALUES ($1, $2)";

	var params = [userId, businessId];
    
    console.log("Assembling query with " + userId + " and " + businessId);

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

function removeFavoriteFromDb(favId, userId, callback) {
    var sql = "DELETE FROM favorites WHERE id = $2::int AND user_id = $1";

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
    getFavoritesFromDb: getFavoritesFromDb,
    addFavoriteToDb: addFavoriteToDb,
    removeFavoriteFromDb: removeFavoriteFromDb  
};