import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Heroes } from '../../../collections/heroes.js';
import './heroes.html';

Template.movies.onCreated(() => {
  const template = Template.instance();
  template.subscribe('heroes');
  template.editing = new ReactiveVar(null);
});

Template.heroes.helpers({
  heroes() {
    return Heroes.find();
  },
});