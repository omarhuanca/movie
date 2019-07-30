import { Template } from 'meteor/templating';
import { Movies } from '../../../../collections/movies.js';
import { Heroes } from '../../../../collections/heroes.js';
import './addEditMovie.html';

Template.addEditMovie.onRendered(function() {
  const template = Template.instance();

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
      const movieId = template.data._id;
      const method = movieId ? "update" : "add";

      const heroList = [];
      $("[name='heroes']:checked").each(function(index, element) {
        heroList.push(element.value);
      });

      const movie = {
        name: template.find('[name="name"]').value,
        description: template.find('[name="description"]').value,
        release: template.find('[name="release"]').value,
        mount: template.find('[name="mount"]').value,
        heroes: heroList,
      };

      if (movieId) movie._id = movieId;

      Meteor.call(method, movie, (error, response) => {
        if (error){
          alert(error.reason);
        } else {
          template.data.editing.set(null);
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
    return Template.instance().data._id ? 'Update Movie' : 'Add Movie';
  },
  heroes() {
    return Heroes.find();
  },
  filter() {
    const movieList = Movies.findOne(Template.instance().data._id);
    if (movieList.heroes) {
      const heroesList = movieList;
      console.log('heroesList', JSON.stringify(heroesList));  
    }
  }
});

Template.addEditMovie.events({
  'submit form': function(event, template) {
    event.preventDefault();
  }
});