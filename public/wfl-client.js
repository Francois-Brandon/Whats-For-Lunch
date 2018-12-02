function restaurantSearch() {
    var location = $("#location").val();
    var radius = $("#radius").val();
    var categories = $("#categories").val();
    
    $.get("/restaurants", {location:location, radius:radius,categories:categories}, function(data) {
        
        var parsedData = JSON.parse(data);
        $("#ulScriptures").append("<li>" + parsedData[0].name + "</li>");
        $("#ulScriptures").append("<li>" + parsedData[1].name + "</li>");
        $("#ulScriptures").append("<li>" + parsedData[2].name + "</li>");
    });
}