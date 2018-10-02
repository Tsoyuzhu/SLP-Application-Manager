var express = require('express');
var csv = require("fast-csv");
var router = express.Router();
var fs = require('fs');

var mongoose = require('mongoose');

var Product  = mongoose.model('Products');

var csvfile = __dirname + "/../public/files/products.csv";
var stream = fs.createReadStream(csvfile);
var programsDB = require("../models/addProgram");

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Import CSV using NodeJS' });

}).get('/import', function(req, res, next) {

  var  products  = []
  var csvStream = csv()
  .on("data", function(data){

     var item = new Product({
        timestamp: data[0] ,
        name: data[1]   ,
        email: data[2],
        phone: data[3],
        year:data[4],
        uni: data[5],
        degree: data[6],
        preference: data[7] 
    });

     item.save(function(error){
        console.log(item);
        if(error){
           throw error;
       }
   }); 

 }).on("end", function(){

 });

 stream.pipe(csvStream);
 res.json({success : "Data imported successfully.", status : 200});

}).get('/fetchdata', function(req, res, next) {

    Product.find({}, function(err, docs) {
        if (!err){ 
            res.json({success : "Updated Successfully", status : 200, data: docs});
        } else { 
            throw err;
        }
    });

}).get('/cleardb', function(req, res, next) { // removes all data in database

    Product.remove({}, function(err, docs) {
        if (!err){ 
            res.json({success : "Updated Successfully", status : 200, data: docs});
        } else { 
            throw err;
        }
    });

});

router.get('/newProgram', function(req,res) {
    res.render('newProgram');
});

router.post('/newProgram', function (req, res) {
  var programName = req.body.programName;
  var creator = req.body.creatorName;
  var capacity = req.body.capacity;
  var venue = req.body.venue;
  var description = req.body.description;

// argument 1: the data we wanna put in the data base.
// argument 2: call back function - this runs after we put stuff in the database.
  programsDB.create(
    {
        programName: programName,
        creatorName: creator,
        venue: venue,
        capacity: capacity,
        description: description
    },
    function (err, programWeJustSaved) {
        if (err) {
            return console.log(err);
        }
        res.redirect('/showPrograms')
  });
});

// first parameter for find is a condition which you want to place on the query.
router.get('/showPrograms', function(req,res) {
    programsDB.find({}, function(err, programsWeJustGotBack) {
        if (err) {
            console.log(err);
        }
        res.render('showPrograms', {programs : programsWeJustGotBack});
    });
});

router.get('/manageProgram/:id', function(req,res) {
    programsDB.findById(req.params.id, function(err, programWeJustGotBack) {
        if (err) {
            console.log(err);
        }
        res.render('manageProgram', {program : programWeJustGotBack});
    });
});

router.get('/deleteProgram/:id', function(req,res) {
  console.log(req.params.id)
    programsDB.remove({"_id":req.params.id}, function(err, programWeJustGotBack) {
        if (err) {
            console.log(err,);
        }
        res.redirect('/showPrograms')
    });
});
  
router.get('/editProgram/:id', function(req,res) {
    programsDB.findById(req.params.id, function(err, programWeJustGotBack) {
        if (err) {
            console.log(err);
        }
        res.render('editProgram', {program : programWeJustGotBack});
    });
});

router.post('/editProgram/:id', function (req, res) {
  var programName = req.body.programName;
  var creator = req.body.creatorName;
  var capacity = req.body.capacity;
  var venue = req.body.venue;
  var description = req.body.description;

 programsDB.update(
    {
        programName: programName,
        creatorName: creator,
        venue: venue,
        capacity: capacity,
        description: description
    },
    function (err, programWeJustSaved) {
        if (err) {
            return console.log(err);
        }
        res.redirect('/showPrograms')
  });
});

module.exports = router;
