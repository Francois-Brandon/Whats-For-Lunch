const userModel = require("../models/userModel.js");
//var session = require('express-session');

function createUser(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    var email = request.body.email;
    
    console.log("This is the username: " + username);
    console.log("This is the password: " + password);
    console.log("This is the email: " + email);
    
    userModel.addUserToDb(username, password, email, function(error, result) {
        if (error) {
            response.status(400).json({success: false, data: error});
        } if (result == false) {
            response.status(200).json({success: false, data: result});
        } else {
            response.status(201).json({success: true, data: result});
        }
    });
}

function handleLogin(request, response) {
	
    var username = request.body.username;
    var password = request.body.password;
    
    userModel.verifyPassword(username, password, function(error, result) {
        console.log("Error: " + error);
        console.log("Result: " + result);
        if (error) {
            response.status(401).json({success: false, data: error});
        }
        if (result == false) {
            response.status(200).json({success: false, data: error});
        } else {
            console.log("BACK TO HANDLELOGIN");
            request.session.id = result.rows[0].id;
            request.session.username = username;
            console.log("UUID: " + request.session.id);
            response.status(200).json({success: true, username: username, uuid: result.rows[0].id});
        }
        
    });

}

// If a user is currently stored on the session, removes it
function handleLogout(request, response) {
	var result = {success: false};

	// We should do better error checking here to make sure the parameters are present
	if (request.session.user) {
		request.session.destroy();
		result = {success: true};
	}

	response.json(result);
}

function verifyLogin(request, response, next) {
	if (request.session.id) {
		// They are logged in!
        console.log("Logged in. Moving on.")
		// pass things along to the next function
		next();
	} else {
		// They are not logged in
		// Send back an unauthorized status
		var result = {succes:false, message: "Login to add to favorites"};
		response.status(200).json(result);
	}
}

module.exports = {
    createUser: createUser,
    handleLogin: handleLogin,
    handleLogout: handleLogout,
    verifyLogin: verifyLogin    
};