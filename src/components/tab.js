'use strict';

var React = require('react');

var Tab = React.createClass({
  render: function(){
    return (
      <div id='content'>{this.props.content}</div>
    );
  }
});

module.exports = Tab;
