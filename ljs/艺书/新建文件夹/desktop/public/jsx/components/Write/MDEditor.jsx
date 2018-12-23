"use strict";

nodeRequire('babel-polyfill');
//require('codemirror/lib/codemirror.css');
require('codemirror/mode/xml/xml');
require('codemirror/mode/markdown/markdown');
const Promise = nodeRequire('bluebird');
const co = Promise.coroutine;
var xdesktop = nodeRequire('xdesktop-render');
var Logic = xdesktop.logic;
var Db = xdesktop.db;
import utils from '../../../js/libs/utils.js';
import React from 'react';
import { NoteTitle } from './NoteTitle.jsx';
import { CopyRightModal } from './CopyRightModal.jsx';

import CodeMirror from 'react-codemirror';
import { getCursorState, applyFormat } from '../../../js/libs/format';

import Icons from '../../../js/libs/icons';
var marked = nodeRequire('marked');
var classNames = require('classnames');

module.exports.MDEditor = React.createClass({
  getInitialState(){
    return {
      extend:false,
      mdinput: '# This is a header\n\nAnd this is a paragraph',
      code: "#ddd",
      cs: {},
    }
  },
  componentDidMount() {
  	this.codeMirror = this.refs.codemirror.getCodeMirror();
    this.codeMirror.on('cursorActivity', this.updateCursorState);
    console.log(this.codeMirror);
  },
  // componentDidMount(){
  //   var hco = co(function* () {
  //     var Id = Logic.editor.getArticleId();
  //     if(Id) {
  //       var doc = yield Db.GetOneArticleAsync(Id);
  //       Logic.editor.editorSetNoSave(doc._id, doc.Title, doc.Content);
  //     }else{
  //       yield Logic.init.initGlobalAsync();
  //       var initDoc = yield Logic.init.getFirstDocAsync();
  //       if(initDoc.ArticleId){
  //         Logic.editor.editorSet(initDoc.ArticleId, initDoc.Title, initDoc.Content);
  //       }
  //     }
  //     Logic.saver.SetEditState(function(){
  //       return Logic.editor.editorGet();
  //     });
  //   });
  //   hco().catch(function(e){
  //     console.error(e);
  //   });
  // },
  // componentWillUnmount() {
  //   Logic.saver.UnSetEditState();
  // },
  // componentWillMount(){
  //   this.setEditorContent();
  // },
  //工具栏按钮
  // handleEditorClick(e) {
  //   if (this.props.onEditorClick) {
  //     this.props.onEditorClick(e);
  //   }
  // },  
  // handleFolderClick(e) {
  //   if (this.props.onFolderClick) {
  //     this.props.onFolderClick(e);
  //   }
  // }, 
  handleListClick(e) {
    if (this.props.onListClick) {
      this.props.onListClick(e);
    }
  },
  handleSaveClick() {
    Logic.saver.Save();
  },
  handleClick() {
    if(this.state.extend){
      this.setState({extend: false});
    }else{
      this.setState({extend: true});
    }
  },
  handleEditorChange(e){
  	let content = e.target.getContent({format : 'text'});
  	this.setState({mdinput: content});
  	console.log(content);
  },
  toggleFormat (formatKey, e) {
    e.preventDefault();
    console.log(this.codeMirror);
    applyFormat(this.codeMirror, formatKey);
  },
  renderIcon (icon) {
    return <span dangerouslySetInnerHTML={{__html: icon}} className="MDEditor_toolbarButton_icon" />;
  },

  renderButton (formatKey, label, action) {
    if (!action) action = this.toggleFormat.bind(this, formatKey);
    var isTextIcon = (formatKey === 'h1' || formatKey === 'h2' || formatKey === 'h3');
    var className = classNames('MDEditor_toolbarButton', ('MDEditor_toolbarButton--' + formatKey));

    var labelClass = isTextIcon ? 'MDEditor_toolbarButton_label-icon' : 'MDEditor_toolbarButton_label';

    return (
      <button className={className} onClick={action} title={formatKey}>
        {isTextIcon ? null : this.renderIcon(Icons[formatKey])}
        <span className={labelClass}>{label}</span>
      </button>
    );
  },
	updateCode: function(newCode) {
		console.log(newCode);
		this.setState({
			code: newCode,
		});
	},
  updateCursorState () {
    let cont = getCursorState(this.codeMirror) ;
    console.log("cont")
    console.log(cont);
    this.setState({ cs: cont});
  },
  render() {
  	var preview = marked(this.state.code);
  	console.log(preview);
	let options = {
		lineNumbers: true,
		mode: "markdown",
    theme: 'monokai',
		readOnly: false
	};
    return (
      <div id="mdEditor">
        <div id="ebook-toolbar" style={this.state.extend?{height: "80px"}:{height: "40px"}}>
            <div id="toolbarContainer">
            	<div className="buttonContainer">
              {/*   <span id="folderBtn" onClick={this.handleFolderClick} title="Open Post Folder">
                  <i className="material-icons md-20">view_column</i>
                </span>
                <span id="editorBtn" onClick={this.handleEditorClick} title="Editor Only">
                  <i className="material-icons md-20">web_asset</i>
                </span> */}
	                <span id="listBtn" onClick={this.handleListClick} title="显示/隐藏文章列表">
	                  <i className="material-icons md-20">storage</i>
	                </span>                             
	      				  <CopyRightModal />
	                <span id="saveBtn" onClick={this.handleSaveClick} title="保存">
	                  <i className="material-icons md-20" >save</i>
	                </span> 
      			</div>                        	
                <div id="mdToolbar">
                    {this.renderButton('h1', 'h1')}
                    {this.renderButton('h2', 'h2')}
                    {this.renderButton('h3', 'h3')}
                    {/*<button type="button" onClick={this.toggleFormat.bind(this, "b")} title="h1">
                      <i class="mce-ico mce-i-bold"></i>
                      <span className="labelClass">Bold</span>
                    </button> */}
                    {this.renderButton('italic', 'i')}
                    {this.renderButton('oList', 'ol')}
                    {this.renderButton('uList', 'ul')}
                    {this.renderButton('quote', 'q')}
                    {/*this.renderButton('link', 'a') */}
                </div>
                <span id="moreBtn" onClick={this.handleClick}>
                  <i className="material-icons" >{this.state.extend?'keyboard_arrow_up':'keyboard_arrow_down'}</i>
                </span>
            </div>
        </div>
        <div id="mdEditorContentWrap" style={this.state.extend?{top: "90px"}:{top: "50px"}}>
            <NoteTitle id="mdTitle" wrapClass="mdTitleWrap"/>
            <div className="editor-pane">
            	<CodeMirror ref="codemirror" className="mdEditorContent" value={this.state.code} onChange={this.updateCode} options={options} />
            </div>
            <div className="result-pane">
            	<div className="preview" dangerouslySetInnerHTML={{__html: preview}} />
            </div>
            <div className="switch switch-rihgt">
              <i className="material-icons">keyboard_arrow_right</i>
            </div>
            <div className="switch switch-left">
              <i className="material-icons">keyboard_arrow_left</i>
            </div>            
        </div>
      </div>
    );
  }
});
