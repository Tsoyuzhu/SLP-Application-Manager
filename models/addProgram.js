var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var addProgramSchema = new Schema({

  programName: { type: String, Required: 'Name cannot be left blank.'},

  creatorName: { type: String, Required:  'Name cannot be left blank.' },

  coordinators: { type: String, Required:  'Coordinators cannot be left blank.' },

  venue: { type: String, Required:  'Venue cannot be left blank.' },

  date/time: { type: Date, Required:  'Date cannot be left blank.' },

  capacity: { type: String, Required:  'Capacity cannot be left blank.' },

  description: { type: String, Required:  'Description cannot be left blank.' },

// TODO
 // questions: {
  //  type: String
  //}

});

module.exports = mongoose.model('Program', addProgramSchema);