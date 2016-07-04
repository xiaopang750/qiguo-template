var React = require('react');

var Header = React.createClass({
  render: function() {
	return (
		<div className="header">
			<div id="Hello">
				<Hello />
			</div>
			<div id="World">
				<World />
			</div>
			<TabSwitch/>
		</div>
	);
  }
});

module.exports = Header;