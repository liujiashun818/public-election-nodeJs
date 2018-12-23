"use strict";

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import utils from '../../../js/libs/utils.js';
var xdesktop = nodeRequire('xdesktop-render');
var Logic = xdesktop.logic;
var Db = xdesktop.db;
var merkle = nodeRequire('merkle');
var ebookchain = nodeRequire('js-sdk');
var bip39 = nodeRequire('bip39');

function abstract(c) {
	var cont = utils.Summary(c).substr(0,130) + '...';
	return cont;
}

//Dialog Content Style
const getStyles = () => {
  return {
    root: {
      width: '100%',
      maxWidth: 'none',
      margin: 'auto',
      marginTop: 60,
    },
    list:{
    	position: 'absolute',
    	backgroundColor: '#fafafa',
    	borderLeft: '2px solid #ccc',
    	width: 250,
    	right: 0,
    	top: 0,
    	bottom: 54,
    	boxShadow: '-1px 0 5px #ccc',
    },
    listTitle:{
    	height: 56,
    	lineHeight: '56px',
    	textAlign: 'center',
    	boxShadow: '0 0 5px #ccc',
    },	    
    body: {
    	minHeight: 400,
    	wordWrap: 'break-word',
    },
    nav: {
    	position: 'absolute',
    	top: 0,
    	left: 0,
    	right: 250,
		padding: '10px 30px',
		borderBottom: '1px solid #e4e5e7',
		backgroundColor: '#fafafa',
		boxShadow: '0 0 5px #ccc',
    },
    title: {
    	textAlign: 'center',
    	borderBottom: '1px solid #ccc',
    	margin: '5px 50px',
    	padding: '20px',
    },
    content: {
      	margin: '10px 16px',
    },
    actions: {
      marginTop: 12,
    },
    button: {
      marginRight: 12,
    },
  };
};

function getTm(tm) {
  var t = new Date(tm);
  return t.toLocaleDateString();
}
module.exports.CopyRightContent = React.createClass({
	getInitialState:function(){
	 return {
	 	open: false,
	 	stepIndex: null,
	    registed: false,
	    cacheList: [],
	    cacheNum: 0,
	    IsMarkdown: false,
	    isPlay: true,
	    merkleRoot: '',
	    loaded:'false',
	    hasRegisted: false,
	    arAuthor:''
       }		
	},
	componentDidMount() {
		this.getHistories();		
		this.setState({stepIndex: 1});
		var currentUser = global.currentUser;
		//获取作者名称
		let self = this;
		let userId = global.currentUser.userId;
		$.ajax({
		      headers: {
		        Authorization: global.currentUser.Authorization    //必须
		      },
		      url: xdesktop.tools.resolve('/api/ousers/'+ userId),
		      type: 'GET',
		      success: function(res) {
				console.log("res");
				console.log(res);
				self.setState({arAuthor: res.nickname});
		      },
		      error: function(err) {
		        console.error(err);
		      },
		});	
	},
	componentWillUnmount(){
		this.timerx && clearInterval(this.timerx);
	},
	//打开注册提示框，生成merkle树
	handleOpen(){
		let {cacheList} = this.state;			
		var historieIds = cacheList.map((Item)=>{
			var historyId = Item._id;
			return historyId;
		});
		let title = cacheList[0].Title;
		let content = cacheList[0].Content;
		if(!content || !title){
			alert("文章标题和内容不能为空")
			return;
		}
		console.log(historieIds);
		this.setState({registed: true});
		this.setState({open: true});
		let mtree = merkle('md5').sync(historieIds);
		this.setState({merkleRoot:mtree.root()});
	},
	//关闭注册版权提示框
	handleClose(){
		this.setState({open: false});
		this.setState({passwordError:''});
		this.setState({password:''});
	},
    // 还原版本内容
	handleRestore: function() {
		let {stepIndex, cacheList, cacheNum} = this.state;
        if(confirm("确定返回到该版本？我们将保存该内容到当前笔记.")) {
            // 保存当前版本
            let curIndex = cacheNum-stepIndex;
            let curTitle = cacheList[curIndex].Title;
            let curContent = cacheList[curIndex].Content;
            Logic.editor.editorHistorySet(curTitle, curContent);
        }
	},
	//获取历史记录
	getHistories: function () {
        var _this = this;           
        var noteId = Logic.editor.getArticleId();
        console.log(noteId);
        Db.GetArticleHistoriesAsync(noteId).then(data=>{
        	let histories = data.map(item=>{
				item.Version = data.length - data.indexOf(item);
        		return item;
        	})
        	_this.setState({cacheList: histories});
        	_this.setState({cacheNum: histories.length});
        	_this.setState({stepIndex:histories.length});
        	_this.setState({loaded:'true'});
        }).catch(function(e){
      		console.error(e);
    	})
    },
    //确定进行版权保护交易,写入区块链---内容保存到中心化服务器
	handleRegister: function() {
		let {merkleRoot,cacheList,password} = this.state;
		console.log(cacheList[0]);
		let localId = Logic.editor.getArticleId();
		let title = cacheList[0].Title;
		let content = cacheList[0].Content;
		let brief = abstract(content);
		let isMark = cacheList[0].IsMark || false;
	    let version = cacheList[0].Version.toString();
	    let articleId 
	    let createdAt = cacheList[0].CreatedTime;
	    let updatedAt = cacheList[0].UpdatedTime;
	    let publishedAt = new Date().getTime();
	    let address = global.currentUser.wallets[0].address;
		if(!password){
			this.setState({passwordError: "请输入您的密码"});
			return;
		}
		let phaseSeed = global.currentUser.wallets[0].seed;
		let phaseKey = Logic.crypto.getRawSeed(phaseSeed, password);
		let seedHex = bip39.mnemonicToSeedHex(phaseKey, password);
		const keys = ebookchain.crypto.getKeys(seedHex);
    	const adds = ebookchain.crypto.getAddress(keys.publicKey);
    	if(adds !== address){
    		this.setState({passwordError: "您输入的密码有误"});
    		return ;
    	}		
		if(adds == address){
			let self=this;
			$.ajax({
			      headers: {
			        Authorization: global.currentUser.Authorization    //必须
			      },
			      url: xdesktop.tools.resolve('/api/oarticles/insertalc'),
			      type: 'POST',
			      data: {
			        Title: title,
			        Content: content,
			        Brief: brief,
			        Headimg: '文章封面',
			        View: 0,
			        Extra: {
			          LocalId: localId,  //必须
			          IsMark: isMark,  //是否是markdown格式
			          Root: merkleRoot,
			          Version: version,
			          CreatedAt: createdAt,
			          UpdatedAt: updatedAt,
			          PublishedAt: publishedAt,
			          // 可继续自由添加字段...
			        }
			      },
			      success: function(res) {
			        console.log(res);
				 	let articleId = res._id;
					ebookchain.request.assetRegister(articleId,localId,version,merkleRoot,seedHex,'')
					.then(data=>{
						console.log(data);
					});
					self.timerf = setTimeout(function(){
				 		alert("版权已注册,感谢使用亿书网络");
					},500);
			      },
			      error: function(err) {
			        console.error(err);
			      },
			      complete: function(){
					self.setState({open: false});
					self.setState({passwordError:''});
					self.setState({password:''});
			      }
			});			
		}else{
			this.setState({passwordError: "您输入的密码有误,请重新输入"});				
		}					
	},    

	//播放时更新内容
	updateContent: function(){
		let {stepIndex, cacheNum} = this.state;
		//let me = this;
		// this.timerp = setTimeout(function(){
		// 		me.updateContent();
		// 	},500);			
		if(stepIndex < cacheNum){
			console.log(stepIndex);
			this.setState({stepIndex: stepIndex+1});
			console.log('next.....');
			//this.timerp;
		}else{
			console.log('播放完成...');
			clearInterval(this.timerx);
			console.log(stepIndex);
			//clearTimeOut(timerp);
			//return ;
		}				
	},
	//历史回放按钮
	handlePlay: function() {
		//clearTimeOut(timerp);

		let {isPlay,stepIndex,cacheList} = this.state;
		this.setState({stepIndex: 1})
		this.setState({isPlay: !isPlay});
		let me = this;
	    if(isPlay){
		    this.timerx = setInterval(function(){
		    	me.updateContent()},500
		     );
		    console.log('开始播放');			    				    	
	    }else{
	    	clearInterval(this.timerx);
	    }
	},
    //监测密码输入
    handlePasswordChange(e){
    	this.setState({password:e.target.value});
    	this.setState({passwordError:''});
    	console.log(this.state.password);
    },
	render: function () {
		let {stepIndex, registed, cacheList, cacheNum, IsMarkdown, loaded, arAuthor } = this.state;
		const styles = getStyles();
		//创建step内容
		let listItems = cacheList.map((Item) =>
			<Step completed={registed} active={stepIndex === Item.Version} key={Item.Version} style={{marginTop:0}}>
				<StepButton onClick={() => this.setState({stepIndex: Item.Version})} className='listButtton' icon={Item.Version} style={{height:"64px",lineHeight:"64px"}} >
				  <div>{getTm(Item.UpdatedTime)}</div>
				</StepButton>
			</Step>
		);
	    const actions = [
	      <FlatButton
	        label="取消"
	        primary={true}
	        onTouchTap={this.handleClose}
	      />,
	      <FlatButton
	        label="确定"
	        primary={true}
	        onTouchTap={this.handleRegister}
	      />,
	    ];
		function CurContent ({cacheList,stepIndex,IsMarkdown,styles}){
			if(!cacheList[0]){
				return (<p>加载中...</p>);
			}else{
				var index = cacheList.length - stepIndex;
				var useId = global.currentUser.useId;
				console.log(index);
				if(IsMarkdown){
					return (<pre dangerouslySetInnerHTML={{__html: cacheList[index].Content}}></pre>);
				}else{
					return (
						<div>
					      	<div style={styles.title}>
				      			<h2>{cacheList[index].Title}</h2>
				      		</div>
							<div style={styles.content}>
								<p style={{textAlign:"center"}}>
									<span style={{marginRight:"30px"}}>Author:{arAuthor}</span>
									<span>version: {cacheList[index].Version} </span>
								</p>
								<div dangerouslySetInnerHTML={{__html: cacheList[index].Content}}></div>
							</div>
						</div>
					);						
				}
			}
		}
		//3个按钮图标
        const restoreIcon = (<i className="material-icons">replay</i>);
        const registerIcon = (<i className="material-icons">verified_user</i>);
        const playIcon = (<i className="material-icons">play_circle_outline</i>);
	    return (
		    <div style={styles.root} className='clearfix'>
		      	<div style={styles.list} >
		      		<div style={styles.listTitle}>历史版本({cacheList.length})</div>
			        <Stepper linear={false} orientation='vertical' style={{position:'absolute', display: 'block',overflowY: 'auto',top:56, bottom:0, left:0,right:0}} >
			        	{listItems}
			        </Stepper>
		      	</div>
		      	<div style={styles.body}>
		      		<div style={styles.nav}>
		      		    <RaisedButton
					      label="恢复该版本"
					      labelPosition="before"
					      primary={true}
					      icon={restoreIcon}
					      style={styles.button}
					      onTouchTap={this.handleRestore}
					    />
		      		    <RaisedButton
					      label="注册版权"
					      labelPosition="before"
					      primary={true}
					      icon={registerIcon}
					      style={styles.button}
					      onTouchTap={this.handleOpen}
					    />
		      		    <RaisedButton
					      label="播放"
					      labelPosition="before"
					      primary={true}
					      icon={playIcon}
					      style={styles.button}
					      onTouchTap={this.handlePlay}
					    />
				        <Dialog
				          actions={actions}
				          modal={false}
				          open={this.state.open}
				          onRequestClose={this.handleClose}
				        >
				          <p>已为您的文章生成版权ID：{this.state.merkleRoot} </p>
				          {this.state.hasRegisted && <p>内容无修改，该版权已注册</p>}
				          <p>注册到亿书链将花费 0 EBC</p>
				          <TextField
						      hintText="请输入您的密码"
						      fullWidth={true}
						      type="password"							      							      
						      value={this.state.password}
							  onChange={this.handlePasswordChange}
							  errorText={this.state.passwordError}						      			      
						   />
				        </Dialog>
				    </div>
			        <CurContent 
			        cacheList={cacheList} 
			        stepIndex={stepIndex} 
			        IsMarkdown={IsMarkdown} 
			        styles={styles}
			        loaded = {loaded}
			        />
		      	</div>		      	
		    </div>
	    );   	    
	}
});