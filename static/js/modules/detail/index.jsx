var React = require('react');

var Detail = React.createClass({
	render: function(){
		var tid = this.props.params.id;
		return (
			<div className="detail">
				{'视频:' + tid + '详情'}
			</div>
		)
	}
});

module.exports = Detail;