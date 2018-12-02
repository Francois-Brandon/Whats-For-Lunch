function restaurantSearch() {
    var location = $("#location").val();
    var radius = $("#radius").val();
    var categories = $("#categories").val();
    
    $.get("/restaurants", {location:location, radius:radius,categories:categories}, function(data) {

        $("#ulRestaurants").append("<li>" + data.businesses[0].name + "</li>");
        $("#ulRestaurants").append("<li>" + data.businesses[1].name + "</li>");
        $("#ulRestaurants").append("<li>" + data.businesses[2].name + "</li>");
    });
}