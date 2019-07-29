import { Mongo } from 'meteor/mongo';

const HeroSchema = new SimpleSchema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  movie: {
    type: [String],
    optional: true,
  },
});

export const Heroes = new Mongo.Collection('heroes');
Heroes.attachSchema(HeroSchema);

if (Meteor.isServer) {
  if (Heroes.find().count() < 1) {
    [
      { name: 'Spider Man', description: 'Description Spider Man', movie: []},
      { name: 'Magneto', description: 'Description Magneto', movie: []},
      { name: 'Hulk', description: 'Description Hulk', movie: []},
    ].forEach((hero) => Heroes.insert(hero));
  }
}