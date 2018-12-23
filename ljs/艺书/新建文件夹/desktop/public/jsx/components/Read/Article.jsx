"use strict";

import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import utils from '../../../js/libs/utils.js';

const urlPath = utils.basePath();
const xdesktop = nodeRequire('xdesktop-render');

function getTm(tm) {
  var t = new Date(tm);
  return t.toLocaleString();
}

const paperStyle = {
  margin: "0 auto",
  marginBottom:"50px",
  minHeight:"600px",
  minWidth:"400px",
  maxWidth:"800px",
  width:"70%",
  textAlign: 'center',
  display: 'block',
};

let _app ;
let elem = document.querySelector('article');

module.exports.Article = React.createClass({
	componentDidMount(){
		let {article}=this.props;
		let pageUri = function () {
		    return {
		        beforeAnnotationCreated: function (ann) {
		            ann.uri = article.id;
		        }
		    };
		};
		_app = new annotator.App();
		_app.include(annotator.ui.main, {element: elem });
		// _app.include(annotator.storage.http, {
  		// prefix: 'http://120.27.12.9/api',
		// });
		// _app.include(pageUri);
		_app.start().then(function () {
	 	   app.annotations.load({uri: article._id});
	 	});
	},
	componentWillUnmount(){
		if(_app){
			_app.destroy();
			console.log("_app destroyed");
		}
	},
	handleClick(){
		if(this.props.handleBackClick){
			this.props.handleBackClick();
		}
	},
	render(){
		let {article} = this.props;
		return (
			<div className="postPage" style={{backgroundColor:"#fafafa",position:"absolute",top:0, bottom:0, left:0, right:0,overflowY:"auto"}}> 		
	    		<div className="backButton">
	    		    <FlatButton
				      label="返回"
				      primary={true}
				      icon={<i className="material-icons">keyboard_backspace</i>}
				      onTouchTap={this.handleClick}
				    />
	    		</div>
	    		<div>
		    		<Paper style={paperStyle} zDepth={2} rounded={false} >
		    			<div className="postHeader text-center">
			    			<h2>{article.Title}</h2>
	    					<div><span>作者: {article.ousers.nickname?article.ousers.nickname:article.ousers.email}</span><span>发布时间: {getTm(article.CreatedTime)}</span></div>
	    					<div>版权ID: {article.Extra.Root}</div>
						</div>
	    				<div className="postContent" id="postContent">
	    					<article dangerouslySetInnerHTML={{__html: article.Content}}></article>
	    				</div>
	    			</Paper>
	    		</div>
			</div>		
		);
	}
});
