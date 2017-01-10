/*
  * TODO:
  * switch this and container, as container do the logic.
  * currently not working correctly
*/

'use strict';

var React = require('react');

var PomodoroClock = React.createClass({
  render: function(){

      return (
        <div>
          <h1>Pomodoro Timer</h1>
          <p id='timer'>{this.props.current}</p>
            <button type="button"
                    className="btn btn-info btn-lg"
                    onClick={this.props.handlePause}>
              Start
            </button>
            <button type="button"
                    className="btn btn-danger btn-lg"
                    onClick={this.props.handleReset}>
              Reset
            </button>
        </div>
      )
  }

});

module.exports = PomodoroClock;
