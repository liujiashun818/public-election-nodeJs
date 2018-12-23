"use strict";

var xdesktop = nodeRequire('xdesktop-render');
import React from 'react';

module.exports.NoteTitle = React.createClass({
  getInitialState() {
    return{
      noteTitle:'',
    }
  },
  // handleTitleChange(e){
  //   this.setState({noteTitle: e.target.value});
  // },
  render(){
    return(
      <div className={this.props.wrapClass}>
           <input 
           type="text" 
           name="noteTitle" 
           id={this.props.id}
           //value={this.state.noteTitle} 
           //onChange={this.handleTitleChange.bind(this)} 
           placeholder="无标题"
           tabindex="1" 
           onBlur = { this.inputOnBlur }
           />
      </div>
    );
  },
  inputOnBlur(e){
    var Title = e.target.value;
    $.llevent.EventObject.fireEvent('ch-article', {
      Title: Title + ' '
    });
  }
});