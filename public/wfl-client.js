
var criteria = [];
var restPool = [];

function restaurantSearch() {
    var location = $("#location").val();
    var radius = Math.round($("#radius").val() * 1609.344);
    var categories = '';
    
    $.each(criteria, function( index, value ) {
        if (criteria.length > 1 && index != criteria.length - 1) {
            categories += value.replace(/[^a-zA-Z-]/g, '').toLowerCase() + ",";
        }
        else {
            categories += value.replace(/[^a-zA-Z-]/g, '').toLowerCase();
        }
    });
    
    
    
    $("#results-section").remove();
        
    var resultsHeader = '<div class="section" id="results-section" data-aos="fade-up"><div class="container" id="results-container"><div class="row section-heading justify-content-center mb-5"><div class="col-md-8 text-center"><h2 class="heading mb-3" id="section-results">Results</h2><p class="sub-heading mb-5">Select multiple restuarants and let us narrow down the options. Press \'Pick Restaurant\' when you are ready.</p><input type="button" class="btn btn-primary btn-outline-primary btn-block" id="pick-rest" onclick="pickRest()" value="Pick Restaurant"></div></div></div></div>'
        
    $("#search-form-section").after(resultsHeader);
    
    $.get("/restaurants", {location:location, radius:radius, categories:categories}, function(data) {
        
        var resultsBody = '<div class="row"><div class="ftco-46 results-display">';
        
        for (var i = 0; i < 6; i++) {
            resultsBody += '<div class="ftco-46-row d-flex flex-column flex-lg-row"><div class="ftco-46-image" style="background-image: url(' + data.businesses[i].image_url + ');"></div><div class="ftco-46-text ftco-46-arrow-left"><div id="' + data.businesses[i].id + '" class="rest-option" onclick="addToPool(\'' + data.businesses[i].id + '\')"><h3 class="ftco-46-heading">' + data.businesses[i].name + '</h3><p class="mb-5">' + data.businesses[i].location.address1 + '<br>'  + data.businesses[i].location.address2 + '<br>' + data.businesses[i].location.city + ', ' + data.businesses[i].location.state + ' ' + data.businesses[i].location.zip_code + '</p></div><p class="btn-link" onclick="addToFavorites(\'' + data.businesses[i].id + '\')">Add to favorites <span class="ion-heart"></span></p><p><a href="' + data.businesses[i].url + '" class="btn-link" target="_blank">See on Yelp <span class="ion-android-arrow-forward"></span></a></p></div></div>';
        }
        
        resultsBody += '</div></div>';
        
        $("#results-container").append(resultsBody);
        
    });
    
    $('html,body').animate({
    scrollTop: $("#results-section").offset().top - 50
    });
}

function login() {
    $('#login-error').html('');
    
    var username = $("#username").val();
    var password = $("#password").val();
    
    if (username == '' || password == '') {
        $('#login-error').html('Username and password required.');
        console.log("Login failed");
        return;
    }
    
    var params = {
		username: username,
		password: password
	};
    
    $.post("/login", params, function(result) {
        console.log(result);
        if (result.success === true 
           && result.username != null 
           && result.uuid != null) {
            window.location.href = 'index.html';
            console.log("Login is successful");
        } else {
            $('#login-error').html('Login failed. Please try again.');
            console.log("Login failed");
        }
    });
}

function register() {
    $('#register-error').html('');
    
    var username = $("#username").val();
    var email = $("#email").val();
    var password = $("#password").val();
    var password2 = $("#password2").val();
    
    if (username == '') {
        $('#register-error').html('Username is required');
        return;
    }
    
    if (email == '') {
        $('#register-error').html('Email is required');
        return;
    }
    
    if(!isValidEmailAddress(email)) {
        $('#register-error').html('Please enter a valid email');
        return;
    }
    
    if (password == '' || password2 == '') {
        $('#register-error').html('Please enter a valid password');
        return;
    }
    
    if (password != password2) {
        $('#register-error').html('Passwords do not match');
        return;
    }
    
    var params = {
		username: username,
		password: password,
        email: email
	};
    
    $.post("/user", params, function(result) {
        console.log(result);
        if (result.success === true) {
            console.log("User created");
            window.location.href = 'login.html';
            $('#login-error').html('Account Created. Please Sign In');
        } else {
            $('#register-error').html('Login failed. Please try again.');
            console.log("Login failed");
        }
    });
    
    
}

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
}



function addSearchTerm() {
    var termtext = $("#searchterm").val();

    if (termtext != '') {
        $("#terms").css("display", "inherit");

        $("#terms").append("<a onclick=\"removeSearchTerm(this)\" id=\"" + termtext + "\"><span><i class=\"icon ion-android-remove-circle\"></i>" + termtext + "</span></a>");

        $("#searchterm").val("");
        
        criteria.push(termtext);
    }
}

function removeSearchTerm(ele) {
    var ch = ele.getAttribute("id");
    document.getElementById(ch).outerHTML = '';
    
    var index = criteria.indexOf(ch);
    if (index > -1) {
        criteria.splice(index, 1);
    }  
}

function addToPool(businessId) {

    var index = restPool.indexOf(businessId);
    if (index > -1) {
        restPool.splice(index, 1);
        $("#" + businessId).removeClass("rest-added");
        $("#" + businessId).addClass("rest-option");
    } else {
        restPool.push(businessId);
        $("#" + businessId).addClass("rest-added");
        $("#" + businessId).removeClass("rest-option");
    }
    
    console.log(restPool);

}

function addToFavorites(businessId) {
    
    var params = {
		businessId: businessId
	};
    
    $.post("/favorites/add", params, function(result) {
        console.log(result);
        if (result.success === true) {
            $.toast({
                text: "Added to favorites", // Text that is to be shown in the toast

                icon: 'success', // Type of toast icon
                showHideTransition: 'fade', // fade, slide or plain
                allowToastClose: true, // Boolean value true or false
                hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
                stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
                position: 'bottom-center', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values

                textAlign: 'left',  // Text alignment i.e. left, right or center
                loader: true,  // Whether to show loader or not. True by default
                loaderBg: '#FF7A5C',  // Background color of the toast loader
            });
        } else {
            $.toast({
                text: "Unable to add to favorites", // Text that is to be shown in the toast

                icon: 'success', // Type of toast icon
                showHideTransition: 'fade', // fade, slide or plain
                allowToastClose: true, // Boolean value true or false
                hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
                stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
                position: 'bottom-center', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values

                textAlign: 'left',  // Text alignment i.e. left, right or center
                loader: true,  // Whether to show loader or not. True by default
                loaderBg: '#FF7A5C',  // Background color of the toast loader
            });
        }
    });
    
    $.toast({
        text: "Added to favorites", // Text that is to be shown in the toast

        icon: 'success', // Type of toast icon
        showHideTransition: 'fade', // fade, slide or plain
        allowToastClose: true, // Boolean value true or false
        hideAfter: 3000, // false to make it sticky or number representing the miliseconds as time after which toast needs to be hidden
        stack: 5, // false if there should be only one toast at a time or a number representing the maximum number of toasts to be shown at a time
        position: 'bottom-center', // bottom-left or bottom-right or bottom-center or top-left or top-right or top-center or mid-center or an object representing the left, right, top, bottom values

        textAlign: 'left',  // Text alignment i.e. left, right or center
        loader: true,  // Whether to show loader or not. True by default
        loaderBg: '#FF7A5C',  // Background color of the toast loader
    });
}

function pickRest() {
    
    var chosenRest = '';
    $("#pick-error").remove();
    
    if (restPool.length < 1) {
        var error = '<p id="pick-error">Select at least 1 restaurant to continue.</p>';
        $("#pick-rest").after(error);
        return;
    } else if (restPool.length > 1) {
        var rnum = getRndInteger(0, restPool.length);
        chosenRest = restPool[rnum];
        restPool.splice(rnum, 1);
    } else if (restPool.length == 1) {
        chosenRest = restPool[0];
    }
    
     $("#choice-section").remove();
    
    var choiceHeader = '<div class="section" id="choice-section" data-aos="fade-up"><div class="container" id="choice-container"><div class="row section-heading justify-content-center mb-5"><div class="col-md-8 text-center"><h2 class="heading mb-3" id="section-results">Enjoy your meal at...</h2></div></div></div></div>';
        
    $("#results-section").after(choiceHeader);
    
    $.get("/restaurant", {businessId:chosenRest}, function(data) {
        
        var resultsBody = '<div class="row"><div class="ftco-46 results-display"><div class="ftco-46-row d-flex flex-column flex-lg-row"><div class="ftco-46-image" style="background-image: url(' + data.image_url + ');"></div><div class="ftco-46-text ftco-46-arrow-left"><h3 class="ftco-46-heading">' + data.name + '</h3><p class="mb-5">' + data.location.address1 + '<br>'  + data.location.address2 + '<br>' + data.location.city + ', ' + data.location.state + ' ' + data.location.zip_code + '</p><p class="btn-link" onclick="addToFavorites(\'' + data.id + '\')">Add to favorites <span class="ion-heart"></span></p><p><a href="' + data.url + '" class="btn-link" target="_blank">See on Yelp <span class="ion-android-arrow-forward"></span></a></p></div></div></div></div>';
        
        $("#choice-container").append(resultsBody);
    
    });
    
    $('html,body').animate({
    scrollTop: $("#choice-section").offset().top - 50
    });
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) ) + min;
}