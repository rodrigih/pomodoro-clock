var React = require('react');
var ReactDOM = require('react-dom');
var PomodoroClockContainer = require('../containers/pomodoroClockContainer.js');
var TabSwitcher = require('../containers/tabSwitcher.js');

var App = React.createClass({
  render: function(){
    return (
      <div>
        <div className="jumbotron">
          <PomodoroClockContainer />
        </div>
        <TabSwitcher />
      </div>
    )
  }
});

module.exports = App;
