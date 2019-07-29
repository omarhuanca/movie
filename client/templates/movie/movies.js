import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Movies } from '../../../collections/movies.js';
import './movies.html';

Template.movies.onCreated(() => {
  const template = Template.instance();
  template.subscribe('movies');
  template.editing = new ReactiveVar(null);
});

Template.movies.helpers({
  movies() {
    return Movies.find();
  },
  editing() {
    const editing = Template.instance().editing;
    return { _id: editing.get, editing}
  },
});

Template.movies.events({
  'click .edit': function (event, template) {
    template.editing.set(this._id);
  },
  'click .remove': function (event, template) {
    if (confirm('Are you sure? This is permanent!')) {
      Meteor.call('remove', this._id, (error) => {
        if (error) {
          alert(error.reason);
        } else {
          template.editing.set(null);
        }
      });
    }
  }
});
