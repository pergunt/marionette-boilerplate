import Mn from 'backbone.marionette'

const JokeModel = Backbone.Model.extend({
	url: 'https://api.chucknorris.io/jokes/random'
});

export default JokeModel
