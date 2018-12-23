"use strict";

import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
var xdesktop = nodeRequire('xdesktop-render');
var Logic = xdesktop.logic;
var Db = xdesktop.db;
var ebookchain = nodeRequire('js-sdk');


//Dialog Content Style
const getStyles = () => {
  return {
    root: {
      width: '100%',
      maxWidth: 'none',
      margin: 'auto',
      marginTop: 60
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
    	right: 0,
		padding: '10px 30px',
		borderBottom: '1px solid #e4e5e7',
		backgroundColor: '#fafafa',
		boxShadow: '0 0 5px #ccc',
    },
    title: {
    	textAlign: 'center',
    	borderBottom: '1px solid #ccc',
    	margin: '5px 50px',
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

module.exports.ProveModal = React.createClass({
	getInitialState:function(){
	 return {
	 	open: false,
	 	stepIndex: null,
	    registed: false,
	    cacheList: [],
	    cacheNum: 0,
	    isPlay: true,
	    arAuthor:''
       }		
	},
	componentDidMount() {
		this.getHistories();		
		this.setState({stepIndex: 1});
		  var assetId = this.props.assetId
	   console.log("assetId") 
	   console.log(assetId) 
	   console.log("this.props.localId") 
	   console.log(this.props.localId) 
//		this.getArticle(assetId);
        var _this = this;           
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
				      	console.log("res.ousers.nickname")
				      	console.log(res.ousers.nickname)
				      	console.log(typeof(res.ousers.nickname))
				      	$('#arAuthorValue').innerHtml=res.ousers.nickname
						_this.setState({
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
	//打开注册提示框，生成merkle树
	handleOpen(){
		let {cacheList} = this.state;			
		var historieIds = cacheList.map((Item)=>{
			var historyId = Item.HistoryId;
			return historyId;
		});
		this.setState({
			registed: true,
			open: true,
		});
	},
	//关闭注册版权提示框
	handleClose(){
		this.setState({open: false});
	},
	getHistories: function () {
        var _this = this;           
        var noteId = this.props.localId;
        console.log(noteId);
        Db.GetArticleHistoriesAsync(noteId).then(data=>{
        	let histories = data.map(item=>{
				item.Version = data.length - data.indexOf(item);
        		return item;
        	})
        	console.log("histories")
        	console.log(histories)
        	_this.setState({
        		cacheList: histories,
        		cacheNum: histories.length,
        		stepIndex:histories.length
        	});
        }).catch(function(e){
      		console.error(e);
    	})
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
	componentWillUnmount(){
		this.timerx && clearInterval(this.timerx);
	},
	render: function () {
		let {stepIndex, registed, cacheList, cacheNum, arAuthor} = this.state;
		const styles = getStyles();
		//创建step内容
		let listItems = cacheList.map((Item) =>
			<Step completed={registed} active={stepIndex === Item.Version} key={Item.Version} style={{marginTop:0}}>
				<StepButton onClick={() => this.setState({stepIndex: Item.Version})} className='listButtton' icon={Item.Version}>
				  <div>{getTm(Item.UpdatedTime)}</div>
				</StepButton>
			</Step>
		);
		function CurContent ({cacheList,stepIndex,styles}){
			if(!cacheList[0]){
				return (<p>加载中...</p>);
			}else{
				var index = cacheList.length - stepIndex;
				console.log(index);
				return (
					<div> 
				      	<div style={styles.title}>
			      			<h2>{cacheList[index].Title}</h2>
			      		</div>
						<div style={styles.content}>
							<p style={{textAlign:"center"}}>
								<span  style={{marginRight:"30px"}}>author:{arAuthor}</span>
								<span>Version: {cacheList[index].Version} </span>
							</p>
							<div dangerouslySetInnerHTML={{__html: cacheList[index].Content}}></div>
						</div>
					</div>
				);						
			}
		}
        const playIcon = (<i className="material-icons">play_circle_outline</i>);
	    return (
		    <div style={styles.root} className='clearfix'>		 
		      	<div style={styles.body}>
		      		<div style={styles.nav}>
		      		    <RaisedButton
					      label="播放"
					      labelPosition="before"
					      primary={true}
					      icon={playIcon}
					      style={styles.button}
					      onTouchTap={this.handlePlay}
					    />
				    </div>
			        <CurContent arAuthor={this.state.arAuthor} cacheList={cacheList} stepIndex={stepIndex} styles={styles}/>
		      	</div>		      	
		    </div>
	    );   	    
	}
});