const { Schema, model } = require('mongoose');

const schema = new Schema({
  tconst: {
    type: String,
  },
  titleType: {
    type: String,
  },
  primaryTitle: {
    type: String,
  },
  originalTitle: {
    type: String
  },
  isAdult: {
    type: String
  },
  startYear: {
    type: String
  }, 
  endYear: {
    type: String
  },
  runtimeMinutes: {
    type: String
  },
  genres: {
    type: String
  },
  averageRating: {
    type: String
  },
  numVotes: {
    type: String
  }
}, {
    timestamps: true,
});

const Movie = model('Movie', schema);

module.exports = Movie;