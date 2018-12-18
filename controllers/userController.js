const userModel = require("../models/userModel.js");
//var session = require('express-session');

function createUser(request, response) {
    var username = request.body.username;
    var password = request.body.password;
    
    console.log("This is the username: " + username);
    console.log("This is the password: " + password);
    
    userModel.addUserToDb(username, password, function(error, result) {
        if (error) {
            response.status(400).json({success: false, data: error});
        } else {
            response.status(201).json({success: true, data: result});
        }
    });
}

function handleLogin(request, response) {
	
    var username = request.body.username;
    var password = request.body.password;
    
    userModel.verifyPassword(username, password, function(error, result) {
        if (error) {
            response.status(401).json({success: false, data: error});
        } else {
            console.log("BACK TO HANDLELOGIN");
            request.session.user = username;
            response.status(200).json({success: true, data: result});
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
	if (request.session.user) {
		// They are logged in!

		// pass things along to the next function
		next();
	} else {
		// They are not logged in
		// Send back an unauthorized status
		var result = {succes:false, message: "Access Denied"};
		response.status(401).json(result);
	}
}

module.exports = {
    createUser: createUser,
    handleLogin: handleLogin,
    handleLogout: handleLogout,
    verifyLogin: verifyLogin    
};