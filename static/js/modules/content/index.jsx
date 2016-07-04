require('./index.styl');
var React = require('react');
var Pagelist = require('../pagelist/index');
var LeftBar = require('../leftbar/index');

var Content = React.createClass({
	render: function(){
		return (
			<div className="content-wrap clearfix">
				<LeftBar params={this.props.params}/>
				<div className="right-content">
					<div>
						<Pagelist params={this.props.params}/>
					</div>
				</div>
			</div>
		)
	}
});

module.exports = Content;