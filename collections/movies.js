import { Mongo } from 'meteor/mongo';

const MovieSchema = new SimpleSchema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  release: {
    type: String,
  },
  mount: {
    type: Number,
  },
  heroes: {
    type: [String],
    optional: true,
  },
});

export const Movies = new Mongo.Collection('movies');
Movies.attachSchema(MovieSchema);

if (Meteor.isServer) {
  if (Movies.find().count() < 1) {
    [
      { name: 'Transformer', description: 'description movie', release: '15/07/2019', mount: 1000 },
    ].forEach((movie) => Movies.insert(movie));
  }
}