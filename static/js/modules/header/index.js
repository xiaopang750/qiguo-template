var React = require('react');

var Header = React.createClass({displayName: "Header",
  render: function() {
	return (
		React.createElement("div", {className: "header"}, 
			React.createElement("div", {id: "Hello"}, 
				React.createElement(Hello, null)
			), 
			React.createElement("div", {id: "World"}, 
				React.createElement(World, null)
			), 
			React.createElement(TabSwitch, null)
		)
	);
  }
});

module.exports = Header;