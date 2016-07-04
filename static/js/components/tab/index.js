var React = require('react');

var arr = [{name:'tab1'}, {name:'tab2'}, {name:'tab3'}];

var TabSwitch = React.createClass({displayName: "TabSwitch",
	getInitialState: function() {
	    return {
	        selected: 'tab1'  
	    };
	},
	handelOnClick: function(ev){
		this.setState({'selected': ev.target.getAttribute('data-value')})
	},
	render: function() {
		var tabs = arr.map(function(item){
			var selected = item.name === this.state.selected ? 'selected' : '';
			return React.createElement("li", {className: selected, "data-value": item.name, key: item.name, onClick: this.handelOnClick}, item.name)		
		}, this);

		return React.createElement("div", {className: "tab-wrap"}, 
			React.createElement("ul", null, 
				tabs
			)
		)
	}
});

module.exports = TabSwitch;
