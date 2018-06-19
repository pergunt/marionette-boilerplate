import Mn from 'backbone.marionette'

const JokeModel = Backbone.Model.extend({
	urlRoot: 'https://api.chucknorris.io/jokes/random'
});

export default JokeModel
