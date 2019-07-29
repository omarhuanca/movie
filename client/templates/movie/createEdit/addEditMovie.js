import { Template } from 'meteor/templating';
import { Movies } from '../../../../collections/movies.js';
import { Heroes } from '../../../../collections/heroes.js';
import './addEditMovie.html';

Template.addEditMovie.onRendered(function() {
  let template = Template.instance();

  $( "#form-movie" ).validate({
    rules: {
      name: {
        required: true,
      },
      description: {
        required: true
      },
      release: {
        required: true,
      },
      mount: {
        required: true,
        number:true,
      },
    },
    submitHandler: function() {
      console.log('submit');
      const movieId = template.data._id;
      const method = movieId ? "add" : "update";
      const movie = {
        name: template.find('[name="name"]').value,
        description: template.find('[name="description"]').value,
        release: template.find('[name="release"]').value,
        mount: template.find('[name="mount"]').value,
      };
      console.log('movie', JSON.stringify(movie));

      if (movieId) movie._id = movie;

      Meteor.call(method, movie, (error) => {
        if (error){
          alert(error.message);
        } else {
          template.data.editing.set(null);
          event.target.reset();
        }
      });
    }
  });
});

Template.addEditMovie.helpers({
  editing() {
    return Movies.findOne(Template.instance().data._id);
  },
  submitButtonLabel() {
    return Template.instance().data._id ? 'Update Movie' : 'Add Podcast';
  },
  heroes() {
    return Heroes.find();
  },
});

Template.addEditMovie.events({
  'submit form': function(event, template) {
    event.preventDefault();
  }
});