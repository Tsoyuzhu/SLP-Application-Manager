var express = require('express');
var csv = require("fast-csv");
var router = express.Router();
var fs = require('fs');

var mongoose = require('mongoose');

var Product  = mongoose.model('Products');

var csvfile = __dirname + "/../public/files/products.csv";
var stream = fs.createReadStream(csvfile);


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
module.exports = router;
