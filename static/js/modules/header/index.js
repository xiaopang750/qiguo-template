var React = require('react');
var Hello = require('../../components/hello/index.js');
var World = require('../../components/world/index.js');
var Header = React.createClass({displayName: "Header",
  render: function() {
    return (
    	React.createElement("div", {className: "header"}, 
    		React.createElement("div", {id: "Hello"}, 
    			React.createElement(Hello, null)
    		), 
    		React.createElement("div", {id: "World11"}, 
    			React.createElement(World, null)
    		)
    	)
    )
  }
});

module.exports = Header;