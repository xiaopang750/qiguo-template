var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var Fenye = require('../../components/fenye/index');
require('./index.styl');

var list = {
	'123': {
		page1: [
			{
				name: "热播电视剧1",
				id: "1"
			},
			{
				name: "热播电视剧2",
				id: "2"
			}
		],
		page2: [
			{
				name: "热播电视剧3",
				id: "3"
			},
			{
				name: "热播电视剧4",
				id: "4"
			}
		],
		total: 4
	},
	'456': {
		page1: [
			{
				name: "内地电视剧5",
				id: "5"
			},
			{
				name: "内地电视剧6",
				id: "6"
			}
		],
		page2: [
			{
				name: "内地电视剧7",
				id: "7"
			},
			{
				name: "内地电视剧8",
				id: "8"
			}
		],
		total: 4
	}
};

var pageList = React.createClass({
	getInitialState: function() {
		this.pagesize = 2;
	    return {
	       	list: [] 
	    };
	},
	componentWillUnmount: function() {
		_ep.removeListener('left-bar-click');
	},
	componentDidUpdate: function(preProps) {
		preProps.params.page = preProps.params.page || 1;
		this.props.params.page = this.props.params.page || 1;
		var shouldRender = (JSON.stringify(this.props.params) != JSON.stringify(preProps.params));
		if(shouldRender) {
			this.fetchData();
		}
	},
	componentDidMount: function() {
		this.fetchData();
	    this.listenEvent();
	},
	listenEvent: function() {
		_ep.on('left-bar-click', function(cid){
			this.props.cid = cid;
		}.bind(this));
	},
	fetchData: function(cid, page) {
		var cid = cid || this.props.params.cid
		var page = page || this.props.params.page || 1;
		var info = list[cid];
		var data = info['page' + page];
		this.total = parseInt(info['total']/this.pagesize);
		this.changePage();
		setTimeout(function(){
			this.setState({list: data});
		}.bind(this), 200);
	},
	changePage: function(page) {
		this.props.page = page;
	},
	render: function(){
		var cid = this.props.params.cid;
		this.fetchCount ++;
		return (
			<div className="page-list">
				<ul className="clearfix">
					{
						this.state.list.map(function(item){
							return (
								<li className="item-list" key={item.id}>
									<Link activeClassName="active" to={ '/detail/' + item.id}>
										<span>{item.name}</span>
									</Link>
								</li>
							)
						}.bind(this))
					}
				</ul>
				<Fenye cid={cid} total={this.total} onPagechange={this.changePage}/>
			</div>
		)
	}
});

module.exports = pageList;