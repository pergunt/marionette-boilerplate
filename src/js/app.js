import './../scss/app.scss';
import 'bootstrap';
import Mn from 'backbone.marionette';
//import Sample from 'Views/sample';
import Root from 'Views/root'

var App =  Mn.Application.extend({
  region: '#app',
  beforeStart() {
	  Backbone.history.start();
  },
  onStart() {
    this.showView(new Root());
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.start();
});
