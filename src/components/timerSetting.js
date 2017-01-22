'use strict';

var React = require('react');
var toastr = require('toastr');

var TimerSetting = React.createClass({
  getInitialState: function(){
      return {
        editable: false
      };
  },

  handleChange: function(e){
    var time = e.target.value;
    this.props.onChange(time);
  },

  onBlur: function(e){
    var regex = /^([0-9][0-9]):([0-5][0-9])$/;

    //regex2 is used to fix times without leading zero, such as "2:00"
    var regex2 = /^([0-9]):([0-5][0-9])$/;

    var value = e.target.value;

    if(regex2.test(value)){
      value = "0" + value;
    }
    else if(!regex.test(value)){
      value = this.props.defaultTime;
      toastr.error("Time must be in the proper format 'MM:SS'");
    }

    this.props.onChange(value);
    this.setState({editable:false});
  },

  handleClick: function(e){
    this.setState({editable:true});
  },

  getElement: function(){
    if(this.state.editable){
      return (
        <input type="text"
               name={this.props.label + "-timer"}
               value={this.props.time}
               onClick={this.handleClick}
               onChange={this.handleChange}
               onBlur={this.onBlur}
               autoFocus/>
      );
    }
    else{
      return (
        <p onClick={this.handleClick}>
          {this.props.time}
        </p>);
    }
  },

  render: function(){
      return (
        <div id="timer-settings">
          <h2>{this.props.label} Length</h2>
          {this.getElement()}
        </div> );
  }

});

module.exports = TimerSetting;
