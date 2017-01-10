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
          <h1><strong>Pomodoro Timer</strong></h1>
          <p id='timer-message'><i>{this.props.message}</i></p>

          <div style={{background:this.props.colour}} className='well well-lg' >
            <p id='timer'>{this.props.current}</p>
          </div>

          <button type="button"
                  className="btn btn-info btn-lg"
                  onClick={this.props.handlePause}>
            <span className={this.props.icon} aria-hidden="true"></span>
          </button>
          <button type="button"
                  className="btn btn-danger btn-lg"
                  onClick={this.props.handleReset}>
            <span className="glyphicon glyphicon-stop" aria-hidden="true"></span>
          </button>

        </div>
      )
  }

});

module.exports = PomodoroClock;
