var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
//var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');
var flash = require('connect-flash');

var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/dbproducts', { useNewUrlParser: true }/*, { useMongoClient: true }*/);
require("./models/Product");

var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.use(session({ cookie: { maxAge: 60000 }, 
                  secret: 'woot',
                  resave: false, 
                  saveUninitialized: false}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());


app.use('/', index);
app.use('/users', users);

// ROUTES
app.get('/staffdashboardprograms', function (req, res) {
  res.render('staffDashboardPrograms'); 
});

//<<<<<<< HEAD
//app.get('/staffdashboard', function (req, res) {
//=======
app.post('/dashboardAdmin', function (req, res) {
  var programName = req.body.programName;
  var creator = req.body.creatorName;
  var date = req.body.date;
  var description = req.body.description;
  var table = {
    programName: programName, 
    creator: creatorName, 
    date: date, 
    description: description
  };

  table.save(function(err) {
    if(err) {
      return handleError(err);
    }
  });
});

app.get('/homepage-dashboard', function (req, res) {
  res.render('homepage-dashboard'); 
});
  
app.get('/staffDashboard', function (req, res) {
//>>>>>>> e1632b37950d0cb6fdb8b9dee24a4489674fc696
	res.render('staffDashboard'); 
});

app.get('/staffviewallapplications', function (req, res) {
  res.render('staffViewAllApplications'); 
});

app.get('/markanapplication', function (req, res) {
  res.render('staffMarkAnApplication'); 
});

app.get('/tammy', function (req, res) {
  res.render('tammy'); 
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;


app.listen(3000, function() {
  console.log("The SLP Application Manager server is now active on localhost:3000!");
}); 