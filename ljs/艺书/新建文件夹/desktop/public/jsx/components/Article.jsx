"use strict";

import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { ReportBox }  from './Read/ReportBox.jsx';
import CircularProgress from 'material-ui/CircularProgress';
import { Link } from 'react-router';
import utils from '../../js/libs/utils.js';

const urlPath = utils.basePath();
const xdesktop = nodeRequire('xdesktop-render');
const shell = nodeRequire('electron').shell;

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
  position:"relative",
};

let _app ;
let elem = document.querySelector('article');


module.exports.Article = React.createClass({
	getInitialState:function(){
		return{
			article:{},
			isloading: true,
			showReport:false,// 显示举报框与否
			reportContent:"",
			reportState:"举报",
		}
	},
	componentWillMount(){
		let articleid = this.props.params.id;
		this.addView(articleid);
	},
	componentDidMount(){
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

	componentDidUpdate(){
	    const exlinks = document.querySelectorAll('a[href]');
	    Array.prototype.forEach.call(exlinks, function (exlinks) {
	      const url = exlinks.getAttribute('href');
	      console.log(url);
	      if (url.indexOf('http') === 0) {
	        exlinks.addEventListener('click', function (e) {
	          console.log("click url");
	          e.preventDefault();
	          shell.openExternal(url);
	        })
	      }
	    });
	},
	getArticleById(articleid){
		let { articles, curArticle } = this.state;
		let self = this;
		$.ajax({
		      headers: {
		        Authorization: global.currentUser.Authorization    //必须
		      },
		      // url: xdesktop.tools.resolve('/api/oarticles/' + articleid + '?filter[include]=ousers'),
		      url: xdesktop.tools.resolve('/api/oarticles/findalc/' + articleid ),//新的接口
		      type: 'GET',
		      success: function(res) {
				console.log(res);
				self.setState({article: res});
				self.setState({isloading: false});
		      },
		      error: function(err) {
		        console.error(err);
		      },
		      complete: function(){
		      }
		});
	},
	//文章被打开，阅读数量加1
	addView(articleid){
		let self = this;
		console.log("我是addView,我执行了");
		console.log(this.state);
		$.ajax({
		      headers: {
		        Authorization: global.currentUser.Authorization    //必须
		      },
		      url: xdesktop.tools.resolve('/api/oarticles/view/' + articleid),
		      type: 'GET',
		      success: function(res) {
					console.log(res);
					self.getArticleById(articleid);
		      },	
		      error: function(err) {
		        console.error(err);
		      },
		      complete: function(){
		      }
		});		
	},
	//得到点赞和举报的状态，一个id只能点赞和举报一次,点赞和举报前先验证用户id和有没有登录，是不是匿名用户
	getReportState(){
			let self = this;
			let articleid = this.props.params.id;
		    let userId = global.currentUser.userId;
				$.ajax({
					headers: {
								Authorization: global.currentUser.Authorization    //必须
							},
				url: xdesktop.tools.resolve('/api/oarticles/state'),
				type: "POST", 
				data: JSON.stringify({
					"articleId":articleid,
					"userId":userId,
				}), 
				success: function(res) {
						 if(!res.data.isReport){
						 	alert("您已经举报过了，不可以重复举报");
						 }else{
							self.setState({showReport:true});
						 };
				},
				error: function(err) {
						console.log(err);
				},
			});
	},
	getLikeState(){
			let self = this;
			let articleid = this.props.params.id;
		    let userId = global.currentUser.userId;
				$.ajax({
					headers: {
								Authorization: global.currentUser.Authorization    //必须
							},
				url: xdesktop.tools.resolve('/api/oarticles/state'),
				type: "POST", 
				data: JSON.stringify({
					"articleId":articleid,
					"userId":userId,
				}), 
				success: function(res) {
						console.log(res);
						console.log(self.state)
						if(!res.data.isLike){
							alert("您已经点赞过了,不可以重复点赞");
							return;
						}else{
							self.addLike();
						};
						
				},
				error: function(err) {
						console.log(err);
				},
			});
	},
	//点赞
	addLike(){
			let self = this;
			let articleid = this.props.params.id;
		    let userId = global.currentUser.userId;
				$.ajax({
					headers: {
								Authorization: global.currentUser.Authorization    //必须
							},
				url: xdesktop.tools.resolve('/api/oarticles/like'),
				type: "POST", 
				data: JSON.stringify({
					"articleId":articleid,
					"userId":userId,
				}), 
				success: function(res) {
						alert('您已经成功点赞');
						console.log(res);
						self.getArticleById(articleid);
				},
				error: function(err) {
						console.log(err);
				},
			});
	},
	// 得到举报内容函数
	getReportContent(reportContent){
		this.setState({reportContent:reportContent})
	 },
	//点击发送ajax,举报 
	reportContent(e){
			let self = this;
			let articleid = this.props.params.id;
		    let userId = global.currentUser.userId;
			$.ajax({
					headers: {
								Authorization: global.currentUser.Authorization    //必须
							},
				url: xdesktop.tools.resolve('/api/oarticles/reportwithcomment'),
				type: "POST", 
				data: JSON.stringify({
					"userId":userId,
					"comment":self.state.reportContent,
					"articleId":articleid
				}), 
				success: function(res) {
						console.log(res);
						self.setChildRen({showReport:false});
						alert("举报成功");
						self.setState({reportState:"已举报"});
						self.getArticleById(articleid);
				},
				error: function(err) {
						console.log(res);
						console.log(err);
				},
			});	
		},
	//让子组件改变我的state
 	setChildRen(obj) {
        this.setState(obj);
    },
	render(){
		let {article, isloading} = this.state;
		return (
			<div className="containerwrap">
				<div className="subNav" style={{backgroundColor: "#e3f2fd",color:"#2196F3"}}>
			       <ul role="nav">
			          <li><Link to={urlPath + 'discover'}>发现</Link></li>
					  <li><Link to={urlPath + 'myArticle'}>我的文章</Link></li>     
			       </ul>	      		
	      		</div>
				<div className="postPage" style={{backgroundColor:"#fafafa",position:"absolute",top:0, bottom:0, left:0, right:0,overflowY:"auto"}}>
		    		{isloading
		    			?<div style={{marginTop:"80px",textAlign:"center"}}><CircularProgress size={60} thickness={7}/></div>
			    		:<div>
				    		<Paper style={paperStyle} zDepth={2} rounded={false}  >
				    			<div className="postHeader text-center">
					    			<h2>{article.Title}</h2>
			    					<div><span>作者: {utils.hidename(article.userInfo.nickname)}</span><span>发布时间: {getTm(article.CreatedTime)}</span></div>
			    					<div>版权ID: {article.Extra.Root}</div>
								</div>
			    				<div className="postContent" id="postContent">
			    					<article dangerouslySetInnerHTML={{__html: article.Content}}></article>
			    				</div>
				    			<div  style={{textAlign:"right",padding:"20px"}}>
									<span style={{color:"#999",marginRight:"20px"}} onClick={this.getState}>
										<i className="material-icons md-20">visibility</i><span style={{marginLeft:"5px"}}>{article.View}</span>
									</span>
				    				<span style={{color:"#999",marginRight:"20px" ,cursor:"pointer"}} onClick={this.getLikeState}>
				    					<i className="material-icons md-20">favorite</i><span style={{marginLeft:"5px"}}>{article.likeCount}</span>
				    				</span>	
				    				<span style={{marginRight:"10px",cursor:"pointer",color:"#999"}}  onClick={this.getReportState}>
				    					<i className="material-icons md-18">pan_tool</i>
				    					<span style={{marginLeft:"5px"}}>{this.state.reportState}{article.reportContent}</span>
				    				</span>
			    				</div>
			    				{this.state.showReport?<div style={{position:"absolute",top:"50%",marginTop:"-150px",left:"50%",marginLeft:"-150px"}}><ReportBox setChildRen={this.setChildRen} showReport={this.state.showReport}  getReportContent={this.getReportContent} reportContent={this.reportContent}/></div>:""}
			    			</Paper>
			    		</div>
		    		}
				</div>
			</div>		
		);
	}
});
