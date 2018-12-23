"use strict";
import React from 'react';
import Snackbar from 'material-ui/Snackbar';
import Avatar from 'material-ui/Avatar';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import utils from '../../js/libs/utils.js';
import { Link } from 'react-router';
import { Setting } from './Navbar/Setting.jsx';
import { Loader } from './Navbar/Loader.jsx';

nodeRequire('babel-polyfill');
const Promise = nodeRequire('bluebird');
const remote = nodeRequire('electron').remote;
const shell = nodeRequire('electron').shell;
const urlPath = utils.basePath();
const co = Promise.coroutine;
var xdesktop = nodeRequire('xdesktop-render');
var Logic = xdesktop.logic;
var Db = xdesktop.db;

let window = remote.getCurrentWindow();

module.exports.Navbar = React.createClass({
    getInitialState: function(){
     Logic.init.initGlobalAsync();
     return {
     	openV: false,
     	openAbout: false,
        openSuggest: false,     	
        readSubnav: false,
        rihgtSubnav: false,
        walletSubnav: false,
        email:'',
        suggestTitle:'',
        suggestContent: '',
        emailError: '',
        contentError:'',
        initialLoad:'false',
     };
    },
    componentDidMount(){
    	let self=this;
    	// this.updatetimer = setTimeout(function(){
    	// 	self.setState({initialLoad:false});
	    // },6000);
	    // this.getUsertimer = setTimeout(function(){
	    // 	self.getUserInfo();
	    // },1000);

	    // var hco = co(function* () {
	    //     yield Logic.init.initGlobalAsync();
					// console.log(currentUser);
					// console.log(global.currentUser);
	    // });
	    // hco().catch(function(e){
	    //   console.error(e);
	    // });
    },
    getUserInfo(){
		$.ajax({
		      headers: {
		        Authorization: global.currentUser.Authorization
		      },
		      url: xdesktop.tools.resolve('/api/ousers/'+ global.currentUser.userId),
		      type: 'GET',
		      success: function(res) {
		        console.log(res);
		        global.currentUser.userInfo = {
		        	Email: res.email,
		        	NickName: res.nickname || res.email,
		        	Avatar: res.avatar,
		        }
		      },
		      error: function(err) {
		        console.error(err);
		      },
		});
    },
    handleMouseEnterWrite(){
    	this.setState({readSubnav: false});
    	this.setState({rightSubnav: false});
    	this.setState({walletSubnav: false});
    },
    handleMouseEnterRead(){
    	this.setState({readSubnav: true});
    	this.setState({rightSubnav: false});
    	this.setState({walletSubnav: false});
    },
    handleMouseEnterRight(){
    	this.setState({readSubnav: false});
    	this.setState({rightSubnav: true});
    	this.setState({walletSubnav: false});
    },
    handleMouseEnterWallet(){
    	this.setState({readSubnav: false});
    	this.setState({rightSubnav: false});
    	this.setState({walletSubnav: true});
    },
    handleMinClick(){
    	console.log("min window");
    	window.minimize(); 
    },
    handleMaxClick(){
    	console.log(window.isMaximized());
		if (!window.isMaximized()) {
           window.maximize();          
       	} else {
           window.unmaximize();
       	} 
    },
    handleCloseClick(){
      //window.close();
			utils.QuitApp();
    },
	handleCheckClick(){
		this.setState({
			openV: true,
		});
	},
	handleCheckClose(){
		this.setState({
			openV: false,
		})
	},
	handleOpenSuggest(){
		this.setState({
			openSuggest: true,
		});
	},
	handleCloseSuggest(){
		this.setState({
			openSuggest: false,
		})
	},
	handleEmail(e){
		this.setState({
			email: e.target.value,
		})
	},
	handleSuggestTitle(e){
		this.setState({
			suggestTitle: e.target.value,
			contentError: '',
		})
	},
	handleSuggestContent(e){
		this.setState({
			suggestContent: e.target.value,
			contentError:'',
		})
	},
	handleSummitSuggest(){
		let {email,suggestTitle,suggestContent}=this.state;
		if(!email){
			this.setState({emailError:"请输入您的邮箱"});
			return ;
		}
		if(!suggestTitle && !suggestContent){
			this.setState({contentError:"请输入您的建议,谢谢！"});
			return ;
		}
		console.log(global.currentUser);
		let userId = global.currentUser.userId;
		console.log(email+suggestTitle+suggestContent);
		let self = this;
		$.ajax({
		      url: 'http://120.27.12.9/api/feedbacks',
		      type: 'Post',
			  data: {
				    "userId": userId,
				    "email": email,
				    "title": suggestTitle,
				    "content": suggestContent
			  },
		      success: function(res) {
		        console.log(res);
				self.setState({ 
					email:'',
					suggestTitle:'',
					suggestContent:'',
					openSuggest: false 
				},() => {
					alert("您的建议已提交, 感谢您对亿书的支持!");
				})
		      },
		      error: function(err) {
		        console.error(err);
		      },
		});
	},
	handleOpenAbout(){
		this.setState({
			openAbout: true,
		});
	},
	handleCloseAbout(){
		this.setState({
			openAbout: false,
		})
	},
    handleHelpClick(){    	
       	console.log("help button");
    },
    handleSetClick(){    	
       	console.log("setting button");
    },
    handleOpenUrl(e){
    	e.preventDefault();
    	console.log(e);
    	let outUrl = e.target.href;
    	console.log(outUrl);
    	shell.openExternal(outUrl);
    },
	render(){
		console.log(this.state.initialLoad);
	    const aboutTitle = [
	      <h3 style={{padding:"15px 15px",textAlign:"center"}}>关于亿书</h3>,
	      <i className="material-icons" style={{position:"absolute",top:"10px",right:"15px",cursor:"pointer"}} onTouchTap={this.handleCloseAbout}>close</i>
	    ];
		var iconTitle =(
		        <div>
	                <img src="public/images/logo/ebook_black.png" alt="logo" />
	                <span>反馈建议</span>
	            </div>
			);
	    const actions = [
	      <FlatButton
	        label="取消"
	        primary={true}
	        onTouchTap={this.handleCloseSuggest}
	      />,
	      <FlatButton
	        label="提交"
	        primary={true}
	        onTouchTap={this.handleSummitSuggest}
	      />,
	    ];
		return (
			<div>
				<div className="navBar" style={{backgroundColor: "#2196F3",WebkitAppRegion: "drag"}}>
			       <ul role="nav" className="navbarList">
			       	  <li className="logo"><img alt="logo" width="30px" height="30px" src="./public/images/nav_logo.png" /></li>
			          <li className="winBtn" onClick={this.handleCloseClick}><i className="material-icons md-20" >clear</i></li>
			          <li className="winBtn" onClick={this.handleMaxClick}><i className="material-icons md-20" >crop_square</i></li>
			          <li className="winBtn" onClick={this.handleMinClick}><i className="material-icons md-20" >remove</i></li>
						{/*<li className="avatarBtn"> 
			          	<Avatar
				          size={30}
				          style={{display:"inline-block"}}
				        />
				        <span style={{marginLeft:"4px"}}>Evanlai</span>
				      </li> */}
			          <li className="settingBtn">
			          	<Setting 
			          		handleCheckClick = {this.handleCheckClick}
			          		handleOpenAbout = {this.handleOpenAbout}
			          		handleOpenSuggest = {this.handleOpenSuggest}
			          	/>
			          </li>
			          <li className="navBtn"><Link to={urlPath + 'write'} onClick={this.handleMouseEnterWrite}>
			          		<i className="material-icons md-20">create</i><span>写作</span>
			          	  </Link>
			          </li>
			          <li className="navBtn"><Link to={urlPath + 'discover'} onClick={this.handleMouseEnterRead} >
			          		<i className="material-icons md-20">visibility</i><span>阅读</span>
			          	  </Link>
			          </li>
			          <li className="navBtn"><Link to={urlPath + 'myCopyright'} onClick={this.handleMouseEnterRight} >
			          		<i className="material-icons md-20">copyright</i><span>版权</span>
			          	  </Link>
			          </li>
			          <li className="navBtn"><Link to={urlPath + 'account'} onClick={this.handleMouseEnterWallet} >
			          	  <i className="material-icons md-20">payment</i><span>钱包</span>
			          	  </Link>
			          </li>	           
			       </ul>
		    	</div>
			    <div className="mainBody">
			    	{
						this.state.readSubnav &&
				      		<div className="subNav" style={{backgroundColor: "#e3f2fd",color:"#2196F3"}}>
						       <ul role="nav">
						          <li><Link to={urlPath + 'discover'}>发现</Link></li>
								  <li><Link to={urlPath + 'myArticle'}>我的文章</Link></li>          
						       </ul>	      		
				      		</div>
			    	}
			    	{
						this.state.rightSubnav &&
						<div>
				      		<div className="subNav" style={{backgroundColor: "#e3f2fd",color:"#2196F3"}}>
						       <ul role="nav">
						          <li><Link to={urlPath + 'myCopyright'}>我的版权</Link></li>
						          <li><Link to={urlPath + 'myShare'}>我的版券</Link></li>
						          <li><Link to={urlPath + 'shareMarket'}>版券市场</Link></li>
						       </ul>	      		
				      		</div>
				      		{ global.currentUser.wallets[0].address ? <div>{this.props.children}</div> : <h2 style={{textAlign:"center",marginTop:"200px"}}>您尚无可用的钱包地址,请至钱包的个人账户页面进行创建或导入地址,谢谢！</h2>}
				      	</div>
			      	}
			    	{
						this.state.walletSubnav &&
				      		<div className="subNav" style={{backgroundColor: "#e3f2fd",color:"#2196F3"}}>
						       <ul role="nav">
						          <li><Link to={urlPath + 'account'} >个人账户</Link></li>
						          <li><Link to={urlPath + 'myTransaction'}>我的交易</Link></li>
						          <li><Link to={urlPath + 'blockInfo'}>区块信息</Link></li>
						       </ul>	      		
				      		</div>
			      	}
			      	{!this.state.rightSubnav && <div>{this.props.children}</div> }
			    </div>
		        <Snackbar
		          open={this.state.openV}
		          message="该版本为Beta_v0.2.5, 已是最新版本，无需更新"
		          autoHideDuration={4000}
		          onRequestClose={this.handleCheckClose}
		        />
		        <Dialog
		          title={ aboutTitle }
		          modal={false}
		          open={this.state.openAbout}
		          onRequestClose={this.handleCloseAbout}
		        >
		          <div style={{margin:"0 -24px 15px"}}><img alt="banner" src="public/images/banner.png"/></div>
		          <p>亿书，是一款协作创作软件，也是一个自出版和版权保护应用, 其名字是Ebook的直译，是产品的统称，在通常情况下，它以一个去中心化的的软件出现，就像比特币的客户端</p>
		          <br/>
		          <p><i className="material-icons md-20" style={{marginRight:"10px"}}>warning</i>警告: 本产品版权归亿生生科技有限公司所有。此软件程序受版权法和国际条约的保护。未经授权擅自复制或分发此程序的一部分或全部，可能导致严厉的民事或刑事制裁，并将在法律许可的范围内受到最大程度的起诉。</p>
		          <div style={{textAlign: "center",margin: "20px"}}>
		          	<span style={{margin: "0 20px"}}>
		          		<a target="_blank" href="http://www.ebookchain.org" onClick={this.handleOpenUrl}>亿书官网</a>
		          	</span>
		          	<span style={{margin: "0 20px"}}>
		          		<a target="_blank" href="http://ebookchain.org/ebookchain.pdf" onClick={this.handleOpenUrl}>白皮书</a>
		          	</span>
		          	<span style={{margin: "0 20px"}}>
		          		<a target="_blank" href="http://ebookchain.org/greenpaper-pre.pdf" onClick={this.handleOpenUrl}>绿皮书</a>
		          	</span>		          			      
		          	<span style={{margin: "0 20px"}}>
		          		<a target="_blank" href="http://weibo.com/ebookchain" onClick={this.handleOpenUrl}>关注我们</a>
		          	</span>
		          	<span style={{margin: "0 20px"}}>
		          		<a target="_blank" href="mailto:support@ebookchain.org" onClick={this.handleOpenUrl}>联系我们</a>
		          	</span>
		          	<hr/>
		          </div>
		          <div className="text-center">Copyright © 2017 Ebookchain. All rights reserved.</div>
		        </Dialog>

		        <Dialog
	              contentClassName='accountModal'	            
	              title={ iconTitle }
	              titleClassName='TransferTitle'
		          open={this.state.openSuggest}
		          onRequestClose={this.handleCloseSuggest}
		          actions = { actions }
		        >
				    <TextField
      				  floatingLabelText="邮箱"
      				  floatingLabelFixed={true}
      				  floatingLabelStyle={{fontSize:"20px"}}
      				  style={{height:"85px"}}		 
				      hintText="Email"
				      fullWidth={true}
				      value={this.state.email}
					  onChange={this.handleEmail}				      			      
				    />
				    <br />
				    <TextField
      				  floatingLabelText="标题"
      				  floatingLabelFixed={true}	
      				  floatingLabelStyle={{fontSize:"20px"}}
      				  style={{height:"85px"}}			 
				      hintText="Title"
				      fullWidth={true}
				      value={this.state.suggestTitle}
					  onChange={this.handleSuggestTitle}				      			      
				    />
				    <br />
				    <TextField
      				  floatingLabelText="内容"
      				  floatingLabelFixed={true}
      				  floatingLabelStyle={{fontSize:"20px"}}				 
				      hintText="Content..."
				      fullWidth={true}
				      multiLine={true}
				      rows= {3}
				      rowsMax={5}
				      value={this.state.suggestContent}
					  onChange={this.handleSuggestContent}
					  errorText={this.state.contentError}	      			      
				    />
		        </Dialog>  
		  	</div>
		)
	}
});


