const mongoose = require('mongoose');

const videoGameSchema = new mongoose.Schema({
  Rank: Number,
  Name: String,
  Platform: String,
  Year: Number,
  Genre: String,
  Publisher: String,
  NA_Sales: Number,
  EU_Sales: Number,
  JP_Sales: Number,
  Other_Sales: Number,
  Global_Sales: Number
}, { collection: 'Videogamesales' }); 

module.exports = mongoose.model('VideoGame', videoGameSchema);
