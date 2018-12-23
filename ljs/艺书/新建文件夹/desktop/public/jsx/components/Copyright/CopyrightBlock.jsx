"use strict";

import React from 'react';
import { ShareButton } from './ShareButton.jsx';
import { ProveButton } from './ProveButton.jsx';
import { Link } from 'react-router';
import utils from '../../../js/libs/utils.js';

const urlPath = utils.basePath();
var ebookchain = nodeRequire('js-sdk');
const xdesktop = nodeRequire('xdesktop-render');

function getTm(tm) {
  var t = new Date(tm);
  return t.toLocaleString();
}

module.exports.CopyrightBlock = React.createClass({
	getInitialState(){
		return{
			arTitle:'',
			arAuthor:'',
		}
	},
	componentDidMount(){
		this.getArticle(this.props.aCopyright.assetId);
	},
    componentWillReceiveProps(nextProps) {
    	if(this.props.aCopyright !== nextProps.aCopyright){
    		this.getArticle(nextProps.aCopyright.assetId);		
    	}
    },
	getArticle(assetId){
	 	let self = this;
		$.ajax({
		      headers: {
		        Authorization: window.currentUser.Authorization    //必须
		      },
		      url: xdesktop.tools.resolve('/api/oarticles/' + assetId + '/exists'),
		      type: 'GET',
		      success: function(res) {
				$.ajax({
				      headers: {
				        Authorization: window.currentUser.Authorization    //必须
				      },
				      url: xdesktop.tools.resolve('/api/oarticles/' + assetId + '?filter[include]=ousers'),
				      type: 'GET',
				      success: function(res) {
				      	let title = res.Title.slice(0,10)+'...' ;
						self.setState({
							arTitle: title,
							arAuthor: res.ousers.nickname,
						});
				      },
				      error: function(err) {
				        console.error(err);
				      },
				});
		      },
		      error: function(err) {
		        console.error(err);
		      },
		});
	},
	render(){
	  	let { aCopyright }=this.props;
	    return (
	    	<div>
	    		{this.state.arTitle
			    	?<div style={{minWidth:"300px",height:"370px",backgroundColor:"#fff",borderRadius:"2px",padding:"20px",margin:"20px 0"}}>
			    		<h2>版权</h2>
			    		<hr />
			    		<div style={{marginBottom:"15px",textAlign:"center"}}>{aCopyright.root}</div>
			    		<ul style={{clear:"both",listStyleType:"none",paddingLeft:"0"}}>
			    			<li style={{height:"30px",lineHeight:"30px"}}><span>作品</span><span className="pull-right" style={{color:"#26C6DA",textAlign:"center"}}><Link to={urlPath + 'article/'+ aCopyright.assetId} >{this.state.arTitle}</Link></span></li>
			    			<li style={{height:"30px",lineHeight:"30px"}}><span>作者</span><span className="pull-right">{this.state.arAuthor}</span></li>
			    			<li style={{height:"30px",lineHeight:"30px"}}><span>所有者</span><span className="pull-right">{this.state.arAuthor}</span></li>
			    			<li style={{height:"30px",lineHeight:"30px"}}><span>是否过期</span><span className="pull-right">{aCopyright.expired?"是":"否"}</span></li>
			    			<li style={{height:"30px",lineHeight:"30px"}}><span>注册日期 </span><span className="pull-right">{getTm(aCopyright.created)}</span></li>
			    			<li style={{height:"30px",lineHeight:"30px",color:"#26C6DA"}}>查看记录</li>
			    		</ul>
			    		<hr/>
			    		<div>
			    			<span className="pull-left"><ShareButton aCopyright = {aCopyright} /></span>
			    			<span className="pull-right"><ProveButton assetId={this.props.aCopyright.assetId}  localId ={aCopyright.historyId}/></span>
			    		</div>
			    	</div>
			    	:<div style={{minWidth:"300px",height:"370px",backgroundColor:"#fff",borderRadius:"2px",padding:"20px",margin:"20px 0",textAlign:"center"}}>
	    				<h3>内容不符合规定</h3>
	    				<h3>内容加载失败,版权无效</h3>
	    			</div>    			
	    		}
	    	</div>
		);
	}
});