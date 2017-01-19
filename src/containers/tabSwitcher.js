'use strict';

var React = require('react');
var TabHeader = require('../components/tabHeader.js');
var Tab = require('../components/tab.js');

var TabSwitcher = React.createClass({
    getInitialState: function(){
        return {
          active: 'about'
        };
    },

    componentWillMount: function(){
      var aboutSection = (
      <div className="panel-content">
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
      </div> );

      this.content = {
        about: aboutSection,
        pomodoro: 'Setting for pomodoro length',
        break: 'Setting for break length'
      }
    },

    handleClick: function(e){
      var selected = (e.currentTarget.textContent).toLowerCase().split(" ")[0];
      this.setState({active:selected});
    },

    getTabContent: function(){
      var selected = this.state.active;

    },

    render: function(){
        return (
          <div id='tab-container'>
            <TabHeader active={this.state.active} handler={this.handleClick}/>
            <Tab content={this.content[this.state.active]}/>
          </div>
        );
    }
});

module.exports = TabSwitcher;
