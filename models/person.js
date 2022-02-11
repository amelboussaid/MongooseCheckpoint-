let mongoose = require('mongoose');
//Person_Prototype

let PersonPrototype = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFoods: [String]
  })
  module.exports = mongoose.model('Person', PersonPrototype)