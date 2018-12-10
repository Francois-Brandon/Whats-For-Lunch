
var criteria = [];

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
        
    var resultsHeader = "<div class=\"section\" id=\"results-section\" data-aos=\"fade-up\"><div class=\"container\" id=\"results-container\"><div class=\"row section-heading justify-content-center mb-5\"><div class=\"col-md-8 text-center\"><h2 class=\"heading mb-3\" id=\"section-results\">Results</h2><p class=\"sub-heading mb-5\">Select multiple restuarants and let us narrow down the options</p></div></div></div></div>"
        
    $("#search-form-section").after(resultsHeader);
    
    $.get("/restaurants", {location:location, radius:radius, categories:categories}, function(data) {
        /*var name0 = escapeHtml(data.businesses[0].name);
        
        var resultsBody = "<div class=\"row\"><div class=\"ftco-46 results-display\"><div class=\"ftco-46-row d-flex flex-column flex-lg-row\"><div class=\"ftco-46-image\" style=\"background-image: url(" + data.businesses[0].image_url + ");\"></div><div class=\"ftco-46-text ftco-46-arrow-left\"><h3 class=\"ftco-46-heading\">" + data.businesses[0].name + "</h3><p class=\"mb-5\">" + data.businesses[0].location.address1 + "<br>"  + data.businesses[0].location.address2 + "<br>" + data.businesses[0].location.city + ", " + data.businesses[0].location.state + " " + data.businesses[0].location.zip_code + "</p><p><a href=\"" + data.businesses[0].url + "\" class=\"btn-link\" target=\"_blank\">See on Yelp <span class=\"ion-android-arrow-forward\"></span></a></p><p class=\"btn-link\" onclick=\"addToFavorites('" + data.businesses[0].id + "', '" + name0 + "')\">Add to favorites <span class=\"ion-heart\"></span></p></div><div class=\"ftco-46-image\" style=\"background-image: url(" + data.businesses[2].image_url + ");\"></div></div><div class=\"ftco-46-row d-flex flex-column flex-lg-row\"><div class=\"ftco-46-text ftco-46-arrow-right\"><h3 class=\"ftco-46-heading\">" + data.businesses[1].name + "</h3><p class=\"mb-5\">" + data.businesses[1].location.address1 + "<br>" + data.businesses[1].location.address2 + "<br>" + data.businesses[1].location.city + ", " + data.businesses[1].location.state + " " + data.businesses[1].location.zip_code + "</p><p><a href=\"" + data.businesses[1].url + "\" class=\"btn-link\" target=\"_blank\">See on Yelp <span class=\"ion-android-arrow-forward\"></span></a></p><p class=\"btn-link\" onclick=\"addToFavorites(\"" + data.businesses[1].id + "\", \"" + data.businesses[1].name + "\")\">Add to favorites <span class=\"ion-heart\"></span></p></div><div class=\"ftco-46-image\" style=\"background-image: url(" + data.businesses[1].image_url + ");\"></div><div class=\"ftco-46-text ftco-46-arrow-up\"><h3 class=\"ftco-46-heading\">" + data.businesses[2].name + "</h3><p class=\"mb-5\">" + data.businesses[2].location.address1 + "<br>" + data.businesses[1].location.address2 + "<br>" + data.businesses[2].location.city + ", " + data.businesses[2].location.state + " " + data.businesses[2].location.zip_code + "</p><p><a href=\"" + data.businesses[2].url + "\" class=\"btn-link\" target=\"_blank\">See on Yelp <span class=\"ion-android-arrow-forward\"></span></a></p><p class=\"btn-link\" onclick=\"addToFavorites(\"" + data.businesses[2].id + "\", \"" + data.businesses[2].name + "\")\">Add to favorites <span class=\"ion-heart\"></span></p></div></div></div></div><div class=\"row\"><div class=\"ftco-46 results-display\"><div class=\"ftco-46-row d-flex flex-column flex-lg-row\"><div class=\"ftco-46-image\" style=\"background-image: url(" + data.businesses[3].image_url + ");\"></div><div class=\"ftco-46-text ftco-46-arrow-left\"><h3 class=\"ftco-46-heading\">" + data.businesses[3].name + "</h3><p class=\"mb-5\">" + data.businesses[3].location.address1 + "<br>"  + data.businesses[3].location.address2 + "<br>" + data.businesses[3].location.city + ", " + data.businesses[3].location.state + " " + data.businesses[3].location.zip_code + "</p><p><a href=\"" + data.businesses[3].url + "\" class=\"btn-link\" target=\"_blank\">See on Yelp <span class=\"ion-android-arrow-forward\"></span></a></p><p class=\"btn-link\" onclick=\"addToFavorites(\"" + data.businesses[3].id + "\", \"" + data.businesses[3].name + "\")\">Add to favorites <span class=\"ion-heart\"></span></p></div><div class=\"ftco-46-image\" style=\"background-image: url(" + data.businesses[5].image_url + ");\"></div></div><div class=\"ftco-46-row d-flex flex-column flex-lg-row\"><div class=\"ftco-46-text ftco-46-arrow-right\"><h3 class=\"ftco-46-heading\">" + data.businesses[4].name + "</h3><p class=\"mb-5\">" + data.businesses[4].location.address1 + "<br>" + data.businesses[4].location.address2 + "<br>" + data.businesses[4].location.city + ", " + data.businesses[4].location.state + " " + data.businesses[4].location.zip_code + "</p><p><a href=\"" + data.businesses[4].url + "\" class=\"btn-link\" target=\"_blank\">See on Yelp <span class=\"ion-android-arrow-forward\"></span></a></p><p class=\"btn-link\" onclick=\"addToFavorites(\"" + data.businesses[4].id + "\", \"" + data.businesses[4].name + "\")\">Add to favorites <span class=\"ion-heart\"></span></p></div><div class=\"ftco-46-image\" style=\"background-image: url(" + data.businesses[4].image_url + ");\"></div><div class=\"ftco-46-text ftco-46-arrow-up\"><h3 class=\"ftco-46-heading\">" + data.businesses[5].name + "</h3><p class=\"mb-5\">" + data.businesses[2].location.address1 + "<br>" + data.businesses[4].location.address2 + "<br>" + data.businesses[5].location.city + ", " + data.businesses[5].location.state + " " + data.businesses[5].location.zip_code + "</p><p><a href=\"" + data.businesses[5].url + "\" class=\"btn-link\" target=\"_blank\">See on Yelp <span class=\"ion-android-arrow-forward\"></span></a></p><p class=\"btn-link\" onclick=\"addToFavorites(\"" + data.businesses[5].id + "\", \"" + data.businesses[5].name + "\")\">Add to favorites <span class=\"ion-heart\"></span></p></div></div></div></div>";*/
        
        var resultsBody = '<div class="row"><div class="ftco-46 results-display">';
        
        for (var i = 0; i < 6; i++) {
            resultsBody += '<div class="ftco-46-row d-flex flex-column flex-lg-row"><div class="ftco-46-image" style="background-image: url(' + data.businesses[i].image_url + ');"></div><div class="ftco-46-text ftco-46-arrow-left"><div class="rest-option" onclick="addToPool(\'' + data.businesses[i].id + '\')"><h3 class="ftco-46-heading">' + data.businesses[i].name + '</h3><p class="mb-5">' + data.businesses[i].location.address1 + '<br>'  + data.businesses[i].location.address2 + '<br>' + data.businesses[i].location.city + ', ' + data.businesses[i].location.state + ' ' + data.businesses[i].location.zip_code + '</p></div><p class="btn-link" onclick="addToFavorites(\'' + data.businesses[i].id + '\')">Add to favorites <span class="ion-heart"></span></p><p><a href="' + data.businesses[i].url + '" class="btn-link" target="_blank">See on Yelp <span class="ion-android-arrow-forward"></span></a></p></div></div>';
        }
        
        resultsBody += '</div></div>';
        
        $("#results-container").append(resultsBody);
        
    });
    
    $('html,body').animate({
    scrollTop: $("#results-section").offset().top - 50
    });
}



function addSearchTerm() {
    var termtext = $("#searchterm").val();

    if (termtext != '') {
        $("#terms").css("display", "inherit");

        $("#terms").append("<a onclick=\"removeSearchTerm(this)\" id=\"" + termtext + "\"><span><i class=\"icon ion-android-remove-circle\"></i>" + termtext + "</span></a>");

        $("#searchterm").val("");
        
        criteria.push(termtext);
        //console.log(criteria);
    }
}

function removeSearchTerm(ele) {
    //console.log(ele);
    var ch = ele.getAttribute("id");
    document.getElementById(ch).outerHTML = '';
    
    var index = criteria.indexOf(ch);
    if (index > -1) {
        criteria.splice(index, 1);
    }  
    //console.log(criteria);
}

function addToFavorites(businessId) {
    //businessName = escapeHtml(businessName);
    
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
