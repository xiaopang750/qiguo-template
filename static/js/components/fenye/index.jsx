var React = require('react');
require('./index.styl');
var ReactRouter = require('react-router'); 
var Link = ReactRouter.Link;
var IndexLink = ReactRouter.IndexLink;

var Fenye = React.createClass({
	getInitialState: function() {
		var page = this.props.total || 0;
	    return {
	        total: 2  
	    };
	},
	render: function() {
		var result = [];
		for (i=0; i<this.state.total; i++) {
			result.push(<FenyeButton key={i+1} cid={this.props.cid} page={i+1} onPagechange={this.props.onPagechange}/>);
		};
		return (
			<div className="fenye-wrap">
				{result}
			</div>	
		)
	}
});


var FenyeButton = React.createClass({
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
			btn = <IndexLink ref="btn" page={this.props.page} onClick={this.btnClick} to={'/list/' + this.props.cid } activeClassName="active">{this.props.page}</IndexLink>
		} else {
			btn = <Link ref="btn" page={this.props.page} onClick={this.btnClick} to={'/list/' + this.props.cid + '/' + this.props.page} activeClassName="active">{this.props.page}</Link>
		}
		return (
			<span>
				{btn}
			</span>
		)
	}
});	

module.exports = Fenye;