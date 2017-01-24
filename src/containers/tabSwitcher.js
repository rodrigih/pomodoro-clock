'use strict';

var React = require('react');
var TabHeader = require('../components/tabHeader.js');
var TimerSetting = require('../components/timerSetting.js');

var TabSwitcher = React.createClass({
    getInitialState: function(){
        return {
          active: 'About',
        };
    },

    handleClick: function(e){
      var selected = (e.currentTarget.textContent).split(" ")[0];
      this.setState({active:selected});
    },

    getTabContent: function(){
      var selected = this.state.active;

    },

    render: function(){

      var content = {
        About: ( <div className="panel-content">
            <p>
            The Pomodoro Technique is a productivity tool created by Francesco Cirillo,
            where one works on something productive for a set unit of time
            (usually 25 minutes), called <i>pomodoros</i>, and then takes a short
            break (usually 5 minutes). <br /> A Pomodoro clock is just a clock that
            applies this technique, so that one can easily alternate between
            productivity and breaks.
            <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique"
               target="_blank">More info
            </a>
            </p>
            </div> ),

        Pomodoro: <TimerSetting label='Pomodoro'
                                time={this.props.pomodoroTime}
                                defaultTime="15:00"
                                onChange={this.props.changePomodoro}/>,

        Break: <TimerSetting label='Break'
                             time={this.props.breakTime}
                             defaultTime="05:00"
                             onChange={this.props.changeBreak}/>
      };

        return (
          <div id='tab-container'>
            <TabHeader active={this.state.active} handler={this.handleClick}/>

            <div id='content'>
              {content[this.state.active]}
            </div>

          </div>
        );
    }
});

module.exports = TabSwitcher;
