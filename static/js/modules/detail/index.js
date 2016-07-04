var React = require('react');

var Detail = React.createClass({displayName: "Detail",
	render: function(){
		var tid = this.props.params.id;
		return (
			React.createElement("div", {className: "detail"}, 
				'视频:' + tid + '详情'
			)
		)
	}
});

module.exports = Detail;