"use strict";

nodeRequire('babel-polyfill');
const Promise = nodeRequire('bluebird');
const co = Promise.coroutine;
var xdesktop = nodeRequire('xdesktop-render');
var Logic = xdesktop.logic;
var Db = xdesktop.db;
import utils from '../../../js/libs/utils.js';
import React from 'react';
import TinyMCE from 'react-tinymce';
import { NoteTitle } from './NoteTitle.jsx';
import { CopyRightModal } from './CopyRightModal.jsx';


module.exports.RichEditor = React.createClass({
  getInitialState(){
    return {
      extend:false,
      saving:false,
      wordCount:0,
    }
  },
  componentDidMount(){
    var hco = co(function* () {
      var Id = Logic.editor.getArticleId();
      if(Id) {
        var doc = yield Db.GetOneArticleAsync(Id);
        Logic.editor.editorSetNoSave(doc._id, doc.Title, doc.Content);
      }else{
        yield Logic.init.initGlobalAsync();
        var initDoc = yield Logic.init.getFirstDocAsync();
        console.log(initDoc);
        if(initDoc.ArticleId){
          Logic.editor.editorSet(initDoc.ArticleId, initDoc.Title, initDoc.Content);
        }
      }
      Logic.saver.SetEditState(function(){
        return Logic.editor.editorGet();
      });
    });
    hco().catch(function(e){
      console.error(e);
    });
  },
  componentWillUnmount() {
    Logic.saver.UnSetEditState();
  },
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
  handleEditorChange(e){
    var words = e.target.plugins.wordcount.getCount();
    $('#wordcount').html(words);
  },
  handleListClick(e) {
    if (this.props.onListClick) {
      this.props.onListClick(e);
    }
  },
  handleSaveClick() {
    this.setState({saving:true});
    let self = this;
    Logic.saver.Save(function(){self.setState({saving:false});console.log("123")});
  },
  handleClick() {
    if(this.state.extend){
      this.setState({extend: false});
    }else{
      this.setState({extend: true});
    }
  },

  render() {
    return (
      <div id="richEditor">
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
                  <i className="material-icons md-20" >{this.state.saving?"replay":"save"}</i>
                </span>
      				</div>
              <div id="mceToolbar"></div>
              <span id="moreBtn" onClick={this.handleClick}>
                <i className="material-icons" >{this.state.extend?'keyboard_arrow_up':'keyboard_arrow_down'}</i>
              </span>
            </div>
        </div>
        <div id="editorContentWrap" style={this.state.extend?{top: "90px"}:{top: "50px"}}>
          <div style={{position:"absolute",top:"30px",left:"20px"}} >字数:<span id="wordcount" style={{marginLeft:"10px"}}></span></div>
            <NoteTitle id="noteTitle" wrapClass="noteTitleWrap"/>
            <TinyMCE
              id='editorContent'
              config={{
                menubar: false,
                inline: true,
                skin: 'custom',
                theme:'modern',
                statusbar: false,
                toolbar_items_size: 'small',
                valid_children: "+pre[div|#text|p|span|textarea|i|b|strong]",
                convert_urls: true,
                relative_urls: false,
                remove_script_host: false,
                paste_data_images: true,
                language: 'zh',
                init_instance_callback : function(editor) {
                  editor.on('blur', function(e){
                    var Content = utils.Summary(e.target.getContent());
                    $.llevent.EventObject.fireEvent('ch-article', {
                      Content: Content + ' '
                    });
                  });
                },
                setup: function(ed) {

                    // electron下有问题, Ace剪切导致行数减少, #16
                    ed.on('cut', function(e) {
                      console.log('ed was clicked setup');
                        if ($(e.target).hasClass('ace_text-input')) {
                            e.preventDefault();
                            return;
                        }
                    });
                },
                images_upload_handler: function (blobInfo, success, failure) {
                  success(`data:${blobInfo.blob().type};base64,${blobInfo.base64()}`);
                },
                plugins: [
                  'advlist autolink link image codesample leaui_mindmap lists charmap print preview hr anchor pagebreak spellchecker',
                  'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
                  'save table contextmenu directionality emoticons template paste textcolor wordcount'
                ],
                toolbar1: "| formatselect | forecolor backcolor  | fontselect fontsizeselect | bold italic underline strikethrough | image leaui_mindmap codesample | table | bullist numlist | alignleft aligncenter alignright alignjustify | outdent indent blockquote | link unlink | hr removeformat | subscript superscript |searchreplace | pastetext ",
                fixed_toolbar_container: '#mceToolbar',
                default_link_target:"_blank",
              }}
              onChange={this.handleEditorChange}
            />
        </div>
      </div>
    );
  }
});
