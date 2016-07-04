var React = require('react');
require('./index.styl');
var ReactRouter = require('react-router'); 
var Link = ReactRouter.Link;
var IndexLink = ReactRouter.IndexLink;

var Fenye = React.createClass({displayName: "Fenye",
	getInitialState: function() {
		var page = this.props.total || 0;
	    return {
	        total: 2  
	    };
	},
	render: function() {
		var result = [];
		for (i=0; i<this.state.total; i++) {
			result.push(React.createElement(FenyeButton, {key: i+1, cid: this.props.cid, page: i+1, onPagechange: this.props.onPagechange}));
		};
		return (
			React.createElement("div", {className: "fenye-wrap"}, 
				result
			)	
		)
	}
});


var FenyeButton = React.createClass({displayName: "FenyeButton",
	btnClick: function(){
		var page = this.refs.btn.props.page;
		this.props.onPagechange(page);
	},
	render: function(){
		var page = this.props.page;
		var cid = this.props.cid;
		var onPagechange = this.props.onPagechange;
		var btn;
		if(page == 1) {
			btn = React.createElement(IndexLink, {ref: "btn", page: this.props.page, onClick: this.btnClick, to: '/list/' + this.props.cid, activeClassName: "active"}, this.props.page)
		} else {
			btn = React.createElement(Link, {ref: "btn", page: this.props.page, onClick: this.btnClick, to: '/list/' + this.props.cid + '/' + this.props.page, activeClassName: "active"}, this.props.page)
		}
		return (
			React.createElement("span", null, 
				btn
			)
		)
	}
});	

module.exports = Fenye;