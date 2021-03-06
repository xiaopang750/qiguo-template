var React = require("react");
var ReactDom = require("react-dom");

var Page2 = React.createClass({displayName: "Page2",
  getInitialState : function(){
    return this.props.pageInfo;
  },
  onClick : function(event){
    this.setState({
      count : this.state.count + 1
    });
  },
  render : function(){

    return (
      React.createElement("div", {onClick: this.onClick}, 
        "Count (Click to increment): ", this.state.count
      )
    )
  }
});


if(global.document) {
    ReactDom.render(React.createElement(Page2, {pageInfo: global.pageInfo}), document.getElementById('container'));
}

module.exports = Page2;