var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');

app = express();
mongoose.connect("mongodb://localhost/SLPAppManager");

// APP CONFIG
app.set('view engine', 'pug');
app.use(express.static('views'));
app.use(express.static('public'));
app.use(bodyparser.urlencoded({extended: true}));

// ROUTES
app.get('/', function (req, res) {
	res.render('index'); 
});

// START SERVER
app.listen(3000, function(){
	console.log("The SLP Application Manager server is now active!");
}); 