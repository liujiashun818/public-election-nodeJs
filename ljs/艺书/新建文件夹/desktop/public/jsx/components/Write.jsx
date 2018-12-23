"use strict";

nodeRequire('babel-polyfill');
const Promise = nodeRequire('bluebird');
const co = Promise.coroutine;
var xdesktop = nodeRequire('xdesktop-render');

import React from 'react';
import TinyMCE from 'react-tinymce';
import { RichEditor } from './Write/RichEditor.jsx';
import { MDEditor } from './Write/MDEditor.jsx';
//import { PostFolder } from './Write/PostFolder.jsx';
//import { PostList } from './Write/PostList.jsx';
import Zlist from './zlist.jsx';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import utils from '../../js/libs/utils.js';
var Db = xdesktop.db;
var Logic = xdesktop.logic;
var Editor = Logic.editor;

module.exports.Write = React.createClass({
  getInitialState(){
    return{
      editorLeft: {left:'0'},
      postListLeft: {left:'0'},
      showList: false,
      floatButtonLeft: {left:'50px'},
      isMarkdown: false,
      mdSrc:"# This is a header\n\nAnd this is a paragraph",
    }
  },
  handleListClick(){
  	if(this.state.showList){
  		this.setState({showList:false});
  		this.setState({editorLeft:{left:"0"}});
	    this.setState({floatButtonLeft:{left:"50px"}});  		
  	}else{
	    this.setState({showList:true});
	    this.setState({editorLeft:{left:"255px"}});
	    this.setState({floatButtonLeft:{left:"280px"}});	    
  	}
  },
  hanldeCreactPost(){
    var ArticlebookId =Editor.getArticleBookId();
    console.log(ArticlebookId);
    /*
    初始化未完毕返回    */
    if(!ArticlebookId) return;
    //this.setState({isMarkdown: false});
    var hco = co(function* () {
      var nw_content = '';
      var i = yield Db.CreateArticleAsync({
        ArticlebookId:  ArticlebookId,
        Title: '',
        Content: nw_content,
        Extra:{
          isMarkdown:false,
          articleId:'',
        },
      });
      Editor.editorSet(i._id, i.Title, i.Content);
      $.llevent.EventObject.fireEvent('nw-article', i);
    });
    hco().catch(function(e){
      console.error(e);
    });
  },
  hanldeCreactMdPost(){
    console.log("Markdown");
    //this.setState({isMarkdown: true});
  },
  render() {
    return (
      <div id="WritePage">
          {this.state.showList &&
            <div id="postListWrap" style={this.state.postListLeft}>
              <Zlist/>
            </div>}
          <div className="floatNewButton" style={this.state.floatButtonLeft} >
              <FloatingActionButton mini={true} style={{margin:"5px"}}  onTouchTap={this.hanldeCreactPost} title="新建文章">
                <ContentAdd />
              </FloatingActionButton>
          </div>
          {this.state.isMarkdown 
            ?<div id="editorWrap" style={this.state.editorLeft}>
                <MDEditor onListClick={this.handleListClick} />
            </div>
            :<div id="editorWrap" style={this.state.editorLeft}>
                <RichEditor onListClick={this.handleListClick} />
            </div>
          }
      </div>
    );
  }
});