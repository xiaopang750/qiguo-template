var koa = require('koa');
var React = require('react/lib/ReactWithAddons');
var ReactDOMServer = require('react-dom/server');
var views = require('koa-views');
var body = require('koa-body');
var routing = require('koa-routing');
var staticCache = require('koa-static-cache');
var path = require('path');
var fs = require('fs');
var scandir = require('./lib/scandir');
var app = koa();
var env = process.env.NODE_ENV;
var staticPath = env === 'production' ? 'http://cdn.com' : '/img/';

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

var self = this;
var routes = scandir(__dirname + '/routes', ['.svn', '.DS_Store']);
routes.forEach(function(route){
	var oRoute = require(route);
	oRoute.init(app);
});

app.listen(9090);