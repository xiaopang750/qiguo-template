var React = require('react');
var ReactDom = require('react-dom');
var Header = require('../modules/header/index.js');


var Page1 = React.createClass({
	render: function() {
		return (
			<div className="wrap">
				<Header data={this.props.data} />
			</div>
		)
	}
});


if(global.document) {
  ReactDom.render(<Page1 />, global.document.getElementById('wrap'));
}

module.exports = Page1;