var koa = require('koa');
var React = require('react/lib/ReactWithAddons');
var ReactDOMServer = require('react-dom/server');
var views = require('koa-views');
var body = require('koa-body');
var routing = require('koa-routing');
var staticCache = require('koa-static-cache');
var path = require('path');
var app = koa();
//var register = require('babel/register');
var env = process.env.NODE_ENV;
var staticPath = env === 'production' ? 'http://cdn.com' : '/img/';
/*register({
	only: [
		'static',
		'views'
	]
});*/
require('require-ignore').install(['jpg', 'gif', 'png', 'css', 'styl']);
require.extensions['.jpg'] = function(module, filename) {
	module.exports = staticPath + path.basename(filename);
};

app.use(staticCache(path.join(__dirname, 'dist'), {
	dynamic: true
}));

app.use(routing(app, {
	defer: true
}));

app.use(views(path.join(__dirname, 'views'), {
	default: 'jade',
	cache: env === 'production' ? true : false
}));

app.use(body());
var page1 = React.createFactory(require('./static/js/page/page1'));
app.route('/$').get(function*(next) {
	var data = {
		data: {
			data1: [{
				name: "pangzi1",
				age: 21
			}, {
				name: "pangzi12",
				age: 22
			}, {
				name: "pangzi3",
				age: 23
			}],
			data2: 'World'
		}
	};
	var reactHtml = ReactDOMServer.renderToStaticMarkup(page1(data));
	console.log(reactHtml);
	yield this.render('index', {
		info: "fandeji",
		demoHtml: reactHtml
	});
});




var page2 = React.createFactory(require('./static/js/page/page2'));
app.route('/page2$').get(function*(next) {
	var data = {count: 22};
	var counterHTML = ReactDOMServer.renderToStaticMarkup(page2({
		pageInfo: data
	}));
	console.log(counterHTML);
	yield this.render('index2', {
		container: {
			counter: counterHTML
		},
		pageInfo: data
	});
});

app.listen(9090);