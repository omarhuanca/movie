import { Meteor } from 'meteor/meteor';
import { Movies } from '../../collections/movies.js';

Meteor.methods({
  add: function (movie) {
    return Movies.insert(movie);
  },
  update: function (movie) {
    Movies.update(movie._id, { $set: movie });
  },
  remove: function (_id) {
    Movies.remove(_id);
  }
});