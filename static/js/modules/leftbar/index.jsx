require('./index.styl');
var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var LeftBar = React.createClass({
	getDefaultProps: function() {
	    return {
	    	list: [
	    		{
	    			name:'热播剧集',
	    			id: '123'
	    		},
	    		{
	    			name:'内地强档',
	    			id: '456'
	    		}
	    	]	      
	    };
	},
	componentDidMount: function() {
	    this.initShow();
	},
	initShow: function() {
		var cid = this.props.params.id;
	    setTimeout(function(){
	    	_ep.emit('left-bar-click', cid);
	    },0);
	},
	render: function(){
		return (
			<div className="LeftBar">
				<ul>
					{
					    this.props.list.map(function(item,index){
					    	return (
					    		<Itemlist key={item.id} cid={item.id} cname={item.name} />
					    	)
					    }.bind(this))
				  	}
				</ul>
			</div>
		)
	}
});

var Itemlist = React.createClass({
	navClick: function() {
		var cid = this.refs.itemList.props.cid;
		_ep.emit('left-bar-click', cid);
	},
	render: function() {
		return (
			<li key={this.props.id}>
    			<Link ref="itemList" to={'/list/' + this.props.cid } cid={this.props.cid} activeClassName="active" onClick={this.navClick}>
    				{this.props.cname}
    			</Link>
    		</li>
		)
	}
});

module.exports = LeftBar;