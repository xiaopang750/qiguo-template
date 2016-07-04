module.exports = {
	init: function(app) {
		this.routes = [
			app.route('/').get(function*(next) {
				console.log(1111111);
				yield this.render('index');
			}),
			app.route('/:ctg?/:id?/:page?$').get(function*(next) {
				console.log(1111111);
				yield this.render('index');
			})
		]
	}
}