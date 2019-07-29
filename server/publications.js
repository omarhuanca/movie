import { Meteor } from 'meteor/meteor';
import { Movies } from '../collections/movies.js';
//import { Heroes } from '../collections/heroes.js';

Meteor.publish('movies', function() {
  return Movies.find();
});

Meteor.publish('heroes', function() {
  return Heroes.find();
});

