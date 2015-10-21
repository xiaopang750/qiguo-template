var React = require('react');
var Hello = require('../../components/hello/index.js');
var World = require('../../components/world/index.js');
var Header = React.createClass({
  render: function() {
    return (
    	<div className="header">
    		<div id="Hello">
    			<Hello />
    		</div>
    		<div id="World11">
    			<World/>
    		</div>
    	</div>
    )
  }
});

module.exports = Header;