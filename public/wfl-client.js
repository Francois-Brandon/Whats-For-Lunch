function restaurantSearch() {
    var location = $("#location").val();
    var radius = $("#radius").val();
    var categories = $("#categories").val();
    
    $.get("/restaurants", {location:location, radius:radius,categories:categories}, function(data) {
        console.log(data);
        var parsedData = JSON.parse(data);
        console.log(parsedData);
        $("#ulScriptures").append("<li>" + parsedData.data.businesses[0].name + "</li>");
        $("#ulScriptures").append("<li>" + parsedData.data.businesses[1].name + "</li>");
        $("#ulScriptures").append("<li>" + parsedData.data.businesses[2].name + "</li>");
    });
}