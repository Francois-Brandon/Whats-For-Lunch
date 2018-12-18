const { Pool } = require("pg");
const connectionString = process.env.DATABASE_URL;
const pool = new Pool({connectionString: connectionString});

const bcrypt = require('bcrypt');
const saltRounds = 10;

function addUserToDb(username, password, email, callback) {
    var hash = bcrypt.hashSync(password, saltRounds);
    
    var sql = "INSERT INTO login (username, password, email) VALUES ($1, $2, $3)";
    
    var params = [username, hash, email];
    
    pool.query(sql, params, function(err, result) {
		if (err) {
			console.log("Error in query: " + sql)
			console.log(err);
			callback(err, null);
		} else {
            callback(null, {success: true});
        }

		
	});
    
    
}

function verifyPassword(username, password, callback) {
    
    console.log("In verifyPassword - Plaintext Password: " + password);
    console.log("In verifyPassword - Username: " + username);
    
    var sql = "SELECT * FROM login WHERE username = $1";

	var params = [username];

	pool.query(sql, params, function(err, result) {
		if (err) {
			console.log("Error in query: " + sql)
			console.log(err);
			callback(err, null);
		}
        console.log("No error in query. Moving on to compare password with hash.");
        console.log("Query results: " + JSON.stringify(result.rows));
        bcrypt.compare(password, result.rows[0].password, function(err, res) {
            if (err) {
                console.log("There was an error with the bcrypt compare");
                console.log("Error with bcrypt compare: " + err);
                callback(err)
                
            } else if (!res) {
                console.log("Authentication failed: ");
                callback(res)
            } else {
                console.log("There was NO error with the bcrypt compare: " + res);
                console.log("We are past compare about to execute callback");
                callback(null, result);
            }
        });

		
		
	});
     
}

module.exports = {
    addUserToDb: addUserToDb,
    verifyPassword: verifyPassword 
};