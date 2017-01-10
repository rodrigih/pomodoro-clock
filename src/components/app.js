var React = require('react');
var ReactDOM = require('react-dom');
var PomodoroClockContainer = require('../containers/pomodoroClockContainer.js');

var App = React.createClass({
  render: function(){
    return (
      <div className="jumbotron">
        <PomodoroClockContainer />
      </div>
    )
  }
});

module.exports = App;
