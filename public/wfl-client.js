function restaurantSearch1() {
    var location = $("#location").val();
    var radius = $("#radius").val();
    var categories = $("#categories").val();
    
    $.get("/restaurants", {location:location, radius:radius,categories:categories}, function(data) {

        $("#ulRestaurants").append("<li>" + data.businesses[0].name + "</li>");
        $("#ulRestaurants").append("<li>" + data.businesses[1].name + "</li>");
        $("#ulRestaurants").append("<li>" + data.businesses[2].name + "</li>");
    });
}

function restaurantSearch() {
    //var location = $("#location").val();
    //var radius = $("#radius").val();
    //var categories = $("#categories").val();
    
    var location = "85296";
    var radius = "10000";
    var categories = "sushi";
    
    $.get("/restaurants", {location:location, radius:radius, categories:categories}, function(data) {
        
        $("#results-section").remove();
        
        var resultsHeader = "<div class=\"section\" id=\"results-section\" data-aos=\"fade-up\"><div class=\"container\" id=\"search-container\"><div class=\"row section-heading justify-content-center mb-5\"><div class=\"col-md-8 text-center\"><h2 class=\"heading mb-3\" id=\"section-results\">Results</h2><p class=\"sub-heading mb-5\">Select multiple restuarants and let us narrow down the options</p></div></div></div></div>"
        
        $("#search-form-section").after(resultsHeader);
        
        var resultsBody = "<div class=\"row\"><div class=\"ftco-46\"><div class=\"ftco-46-row d-flex flex-column flex-lg-row\"><div class=\"ftco-46-image\" style=\"background-image: url(" + data.businesses[0].image_url + ");\"></div><div class=\"ftco-46-text ftco-46-arrow-left\"><h3 class=\"ftco-46-heading\">" + data.businesses[0].name + "</h3><p class=\"mb-5\">" + data.businesses[0].location.address1 + "</p><p class=\"mb-5\">" + data.businesses[0].location.city + ", " + data.businesses[0].location.state + " " + data.businesses[0].location.zip_code + "</p><p><a href=\"#\" class=\"btn-link\">Learn More <span class=\"ion-android-arrow-forward\"></span></a></p></div><div class=\"ftco-46-image\" style=\"background-image: url(" + data.businesses[2].image_url + ");\"></div></div><div class=\"ftco-46-row d-flex flex-column flex-lg-row\"><div class=\"ftco-46-text ftco-46-arrow-right\"><h3 class=\"ftco-46-heading\">" + data.businesses[1].name + "</h3><p class=\"mb-5\">" + data.businesses[1].location.address1 + "</p><p class=\"mb-5\">" + data.businesses[1].location.city + ", " + data.businesses[1].location.state + " " + data.businesses[1].location.zip_code + "</p><p><a href=\"#\" class=\"btn-link\">Learn More <span class=\"ion-android-arrow-forward\"></span></a></p></div><div class=\"ftco-46-image\" style=\"background-image: url(" + data.businesses[1].image_url + ");\"></div><div class=\"ftco-46-text ftco-46-arrow-up\"><h3 class=\"ftco-46-heading\">" + data.businesses[2].name + "</h3><p class=\"mb-5\">" + data.businesses[2].location.address1 + "</p><p class=\"mb-5\">" + data.businesses[2].location.city + ", " + data.businesses[2].location.state + " " + data.businesses[2].location.zip_code + "</p><p><a href=\"#\" class=\"btn-link\">Learn More <span class=\"ion-android-arrow-forward\"></span></a></p></div></div></div></div>";
        
        $("#results-container").append(resultsBody);
        
    });
}

function addSearchTerm() {
    var termtext = $("#searchterm").val();

    if (termtext != '') {
        $("#terms").css("display", "inherit");

        $("#terms").append("<a onclick=\"removeSearchTerm(this)\" id=\"" + termtext + "\"><span><i class=\"icon ion-android-remove-circle\"></i>" + termtext + "</span></a>");

        $("#searchterm").val("");
    }
}

function removeSearchTerm(ele) {
    //console.log(ele);
    var ch = ele.getAttribute("id");
    document.getElementById(ch).outerHTML = '';
    
    //var index = criteria.indexOf(ch);
    //if (index > -1) {
    //    criteria.splice(index, 1);
    //}  
}