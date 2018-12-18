const express = require('express');
var app = express();

var cookieParser = require('cookie-parser');
var session = require('express-session');

const favoritesController = require("./controllers/favoritesController");
const restaurantsController = require("./controllers/restaurantsController");
const userController = require("./controllers/userController");



app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(session({
  secret: 'bviasijvjamonipowecjeer',
  resave: false,
  saveUninitialized: false,
  //cookie: { secure: true }
}));


app.get('/restaurants', restaurantsController.getRestaurants);
app.get('/restaurant', restaurantsController.getRestaurant);
app.get('/favorites', favoritesController.getFavorites);
app.post('/favorites/add', favoritesController.addFavorite);
app.post('/favorites/delete', favoritesController.deleteFavorite);
app.post('/login', userController.handleLogin);
app.post('/logout', userController.handleLogout);
app.post('/user', userController.createUser);


app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

