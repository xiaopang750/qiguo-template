var React = require('react');
var ReactDOM = require('react-dom');
//require('./test.styl');

/*require('./test.styl');
var deji = require('./test.jpg');
var nimei = require('./list.jade');

var data = {
	list: [
		{
			name: "222"
		},
		{
			name: "222"
		}
	]
}

console.log(nimei());

var oImage = document.createElement('img');
oImage.src = deji;
document.body.appendChild(oImage);*/
require('./test.styl');
var img1 = require('./hello_test.jpg');
console.log(img1);
var Hello = React.createClass({displayName: "Hello",	
    handleClick: function() {
    ReactDOM.findDOMNode(this.refs.myTextInput).focus();
  },
  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement("input", {type: "text", ref: "myTextInput"}), 
        React.createElement("input", {type: "button", value: "Focus the text input", onClick: this.handleClick})
        
          /*<img src={img1} />*/
        
      )
    );
  }
});

module.exports = Hello;