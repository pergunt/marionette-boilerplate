import Mn from 'backbone.marionette';
import JokeModel from 'Models/joke'


const Joke  = Mn.View.extend({
	className: 'alert alert-dark mn-5',
	template: _.template(
		`<img src="<%= icon_url %>" alt="chuk" />
		<p><%= value %></p>
		`
	)
});

const NorrisWidget = Mn.View.extend({
	tagName: 'div',
	className: 'container mt-5 p-5 text-center',
	template: _.template(
		`<button class="btn btn-primary btn-lg"> New Joke</button>	
		 <div id="js-joke-region"></div>
		`
	),
	ui: {
		'btn': 'button'
	},
	events: {
		'click @ui.btn': 'fetchJoke'
	},
	regions: {
		'jokeRegion': '#js-joke-region'
	},
	modelEvents: {
		'sync': 'renderJoke'
	},
	initialize() {
		this.model = new JokeModel();
	},
	fetchJoke() {
		this.getUI('btn').attr('disabled', true).text('Loading');
		this.model.unset('id')
		this.model.fetch();
	},
	renderJoke(model, response) {
		this.getUI('btn').attr('disabled', false).text('New Joke');
		this.showChildView('jokeRegion', new Joke({model}))
	},
	onRender() {
		this.model.fetch();
	}
});
export default NorrisWidget
