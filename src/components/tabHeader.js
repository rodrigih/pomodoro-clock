'use strict';

var React = require('react');
var Tab = require('./tab.js')

var TabHeader = React.createClass({
  getInitialState: function(){
      return {active: 'about'};
  },

  render: function(){
    var names = ['About','Pomodoro Length', 'Break Length'];
    var active = this.props.active;
    var handler = this.props.handler;

    return (
      <ul className='tabs'>
      {names.map(function(name,i){
        return (<a href="#" onClick={handler}>
          <li className={'tab-link' +
            (name.toLowerCase().split(" ")[0] === active ? ' active' :'')}>
                {name}
          </li>
          </a>);
      })}
      </ul>);
  }
});

module.exports = TabHeader;
