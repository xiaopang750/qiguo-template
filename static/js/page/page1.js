var React = require('react');
var ReactDom = require('react-dom');
var Header = require('../modules/header/index.js');


var Page1 = React.createClass({displayName: "Page1",
	render: function() {
		return (
			React.createElement("div", {className: "wrap"}, 
				React.createElement(Header, {data: this.props.data})
			)
		)
	}
});


if(global.document) {
  ReactDom.render(React.createElement(Page1, null), global.document.getElementById('wrap'));
}

module.exports = Page1;