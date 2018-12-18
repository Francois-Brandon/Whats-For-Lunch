const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

const bcrypt = require('bcrypt');
const saltRounds = 10;

function addUserToDb(username, password, callback) {
    var hash = bcrypt.hashSync(password, saltRounds);
    
    var sql = "INSERT INTO login (username, password) VALUES ($1, $2)";
    
    var params = [username, hash];
    
    pool.query(sql, params, function(err, result) {
		if (err) {
			console.log("Error in query: " + sql)
			console.log(err);
			callback(err, null);
		}
        console.log(result.password);
        bcrypt.compare(result.password, hash, function(err, res) {
            if (err) {
                callback(err)
            }
            
		    next();

        });

		result = "User: " + username + " has been created";
		callback(null, result);
	});
    
    
}

function verifyPassword(username, password, callback) {
    
    var sql = "SELECT * FROM login WHERE username = $1";

	var params = [username];

	pool.query(sql, params, function(err, result) {
		if (err) {
			console.log("Error in query: " + sql)
			console.log(err);
			callback(err, null);
		}
        consloe.log(result.password);
        bcrypt.compare(result.password, hash, function(err, res) {
            if (err) {
                callback(err)
            }
            
            next();
            // res == true
        });

		console.log("ARE WE GETTING PAST COMPARE?");
		callback(null, result);
	});
     
}

module.exports = {
    addUserToDb: addUserToDb,
    verifyPassword: verifyPassword 
};