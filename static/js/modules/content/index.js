require('./index.styl');
var React = require('react');
var Pagelist = require('../pagelist/index');
var LeftBar = require('../leftbar/index');

var Content = React.createClass({displayName: "Content",
	render: function(){
		return (
			React.createElement("div", {className: "content-wrap clearfix"}, 
				React.createElement(LeftBar, {params: this.props.params}), 
				React.createElement("div", {className: "right-content"}, 
					React.createElement("div", null, 
						React.createElement(Pagelist, {params: this.props.params})
					)
				)
			)
		)
	}
});

module.exports = Content;