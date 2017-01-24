var React = require('react');
var ReactDOM = require('react-dom');
var PomodoroClockContainer = require('../containers/pomodoroClockContainer.js');
var TabSwitcher = require('../containers/tabSwitcher.js');

var App = React.createClass({
  getInitialState: function(){
    return {
      pomodoroTime: '15:00',
      breakTime: '05:00'
    }
  },

  changePomodoro: function(newTime){
    this.setState({pomodoroTime: newTime});
  },

  changeBreak: function(newTime){
    this.setState({breakTime: newTime});
  },

  render: function(){
    return (
      <div>
        <div className="jumbotron">
          <PomodoroClockContainer />
        </div>
        <TabSwitcher pomodoroTime={this.state.pomodoroTime}
                     breakTime={this.state.breakTime}
                     changePomodoro={this.changePomodoro}
                     changeBreak={this.changeBreak}/>

      </div>
    )
  }
});

module.exports = App;
