var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var productSchema = new Schema({

  timestamp: { type: String, Required: 'Timestamp cannot be left blank.'},

  name: { type: String, Required:  'Name cannot be left blank.' },

  email: { type: String, Required:  'Email cannot be left blank.' },

  phone: { type: String, Required:  'Phone cannot be left blank.' },

  year: { type: String, Required:  'Year cannot be left blank.' },

  uni: { type: String, Required:  'Uni cannot be left blank.' },

  degree: { type: String, Required:  'Degree cannot be left blank.' },

  preference: { type: String, Required:  'Preference cannot be left blank.' }//,

// TODO
 // questions: {
  //  type: String
  //}

});

module.exports = mongoose.model('Products', productSchema);