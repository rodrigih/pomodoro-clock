'use strict';

var React = require('react');
var toastr = require('toastr');
var PomodoroClock = require('../components/pomodoroClock.js');

var PomodoroClockContainer = React.createClass({
  getInitialState: function(){
      var obj = {
        pomodoroLength: this.convertTime(this.props.pomodoroTime),
        breakLength: this.convertTime(this.props.breakTime),
        currentSet: 'pomodoro',
        onBreak: false,
        paused: true
    };

    obj.current = obj.pomodoroLength;
    obj.timer = this.timeRemaining(obj.current);

    return obj;
  },

  componentWillReceiveProps: function(nextProps){
      var newState = {
        pomodoroLength: this.convertTime(nextProps.pomodoroTime),
        breakLength: this.convertTime(nextProps.breakTime)
      };

      if(this.state.onBreak && newState.breakLength !== this.state.breakLength){
          newState.current = newState.breakLength;
          newState.timer = this.timeRemaining(newState.current);
      }
      else if(!this.state.onBreak &&
               newState.pomodoroLength !== this.state.pomodoroLength){
          newState.current = newState.pomodoroLength;
          newState.timer = this.timeRemaining(newState.current);
        }

      this.setState(newState);
  },

  convertTime: function(t){
    var times = t.split(":");
    var seconds = ( parseInt(times[0]) * 60 ) + parseInt(times[1]);
    return  seconds * 1000;
  },

  updateTime: function(){
    var newState = {current: this.state.current - 1000};

    /*Handle when current timer is 0*/
    if(newState.current < 0){
      if(this.state.currentSet === 'pomodoro'){
          toastr.info("It is time for a break.","Break Time",
            {positionClass:"toast-top-full-width"});
          newState.currentSet = 'break';
          newState.current = this.state.breakLength;
      }else{
          toastr.info("It is time for productiviy.", "Work Time",
            {positionClass:"toast-top-full-width"});
          newState.currentSet = 'pomodoro';
          newState.current = this.state.pomodoroLength;
      }
    }
    newState.timer = this.timeRemaining(newState.current);

    this.setState(newState);
  },

  componentWillUnmount: function(){
    clearInterval(this.interval);
  },

  toggleTimer: function(){
    if(this.state.paused){
      this.interval = setInterval(this.updateTime,1000);
    }else {
        clearInterval(this.interval);
    }

    this.setState({paused: !this.state.paused});
  },

  resetTimer: function(){
    clearInterval(this.interval);
    this.setState(this.getInitialState);
  },

  timeRemaining: function(current){
    var minutes = (Math.floor((current/1000/60)) % 60).toString();
    var seconds = (Math.floor((current/1000)) % 60).toString();

    if(seconds.length === 1){
      seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
  },

  render: function(){
    var message = (this.state.currentSet == 'pomodoro' ? 'Session': 'Break');
    var colour =  (this.state.currentSet == 'pomodoro' ? '#00C72B': '#C70039');
    var icon = "glyphicon glyphicon-" + (this.state.paused ? 'play': 'pause');

    return (<PomodoroClock current={this.state.timer}
      paused={this.state.paused}
      message={message + ' Time'}
      icon={icon}
      colour={colour}
      handlePause={this.toggleTimer}
      handleReset={this.resetTimer}
      />);
  }

});

module.exports = PomodoroClockContainer;
