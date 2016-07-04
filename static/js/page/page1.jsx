require('../../css/common.styl');
var React = require('react');
var ReactDom = require('react-dom');
var ReactRouter = require('react-router');  
var Router = ReactRouter.Router;  
var Route = ReactRouter.Route;
var Redirect = ReactRouter.Redirect;  
var Link = ReactRouter.Link; 
var IndexRoute = ReactRouter.IndexRoute;
var IndexRedirect = ReactRouter.IndexRedirect;
var LeftBar = require('../modules/leftbar/index');
var Content = require('../modules/content/index');
var PageList = require('../modules/pagelist/index');
var Detail = require('../modules/detail/index');
var createBrowserHistory = require('history/lib/createBrowserHistory');
var browserHsitory = createBrowserHistory();
var EventProxy = require('eventProxy');
window._ep = new EventProxy();

var App = React.createClass({
		render: function() {
			return (
				<div className="main clearfix">
					{this.props.children}
				</div>
			)
		}
});


//route
var pageRoutes = (  
	<Router history={browserHsitory}>
		<Route path="/" component={App}>
			<IndexRedirect to="list/123"/>
			<Route path="list/:cid" component={Content}>
				<Route path=":page" component={PageList}/>
			</Route>
			<Route path="detail/:id" component={Detail} />
		</Route>
	</Router>
)

ReactDom.render(pageRoutes, document.getElementById('wrap'));

module.exports = App;