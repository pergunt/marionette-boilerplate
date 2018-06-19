import './../scss/app.scss';
import 'bootstrap';
import Mn from 'backbone.marionette';
import JokeModel from 'Models/joke'
import Root from 'Views/root'

var App =  Mn.Application.extend({
  region: '#app',
  beforeStart() {
	  Backbone.history.start();
  },
  onStart() {
    this.showView(new Root( {model: new JokeModel()} ));
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.start();
});
