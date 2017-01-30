'use strict';

var React = require('react');
var toastr = require('toastr');

var TimerSetting = React.createClass({
  getInitialState: function(){
      return {
        editable: false
      };
  },

  getTime: function(){
    var minutes = this.refs[this.props.label + "-minutes"].value;
    var seconds = this.refs[this.props.label + "-seconds"].value;

    return minutes + ":" + seconds;
  },

  handleChange: function(e){
    this.props.onChange(this.getTime());
  },

  handleKeyPress: function(e){
    if(e.key === 'Enter'){
      this.setTime(e);
    }
  },

  setTime: function(e){
    var value = this.getTime();

    var regex = /^([0-9][0-9]):([0-5][0-9])$/;

    //regex2 is used to fix times without leading zero, such as "2:00"
    var regex2 = /^([0-9]):([0-5][0-9])$/;


    if(regex2.test(value)){
      value = "0" + value;
    }
    else if(!regex.test(value)){
      value = this.props.defaultTime;
      toastr.error("Please enter valid numbers for the time","Error");
    }else if(value === "00:00"){
      value = this.props.defaultTime;
      toastr.error("Time must be greater than zero.","Error");
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
        <form>
          <input type="text"
                 ref={this.props.label + "-minutes"}
                 onClick={this.handleClick}
                 onChange={this.handleChange}
                 onKeyPress={this.handleKeyPress}
                 maxLength="2"
                 size="2"
                 autoFocus/>
          :
          <input type="text"
                 ref={this.props.label + "-seconds"}
                 onClick={this.handleClick}
                 onChange={this.handleChange}
                 onKeyPress={this.handleKeyPress}
                 maxLength="2"
                 size="2"
                 />

          <button type="button"
                  className="btn btn-primary"
                  onClick={this.setTime}>
            Set Time
          </button>
        </form>
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
