"use strict";
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router'; 
import utils from '../../../js/libs/utils.js';

const urlPath = utils.basePath();
const xdesktop = nodeRequire('xdesktop-render');
var Logic = xdesktop.logic;
var ebookchain = nodeRequire('js-sdk');
var bip39 = nodeRequire('bip39');

module.exports.SharePannel = React.createClass({
	getInitialState(){
		return{
			article:{},
			loaded: false,			
			open: false,
	        password: '',
	        shareNum: '',
	        sharePrice: '',
	        passwordError:'',
			shareNumError: '',
			sharePriceError: '',
		}
	},
	componentDidMount(){
		this.getArticle(this.props.share);
	},
    componentWillReceiveProps(nextProps) {
    	if(this.props.share !== nextProps.share){
    		this.getArticle(nextProps.share);	
    	}
    },
	getArticle(share){
		let self = this;
		$.ajax({
		      headers: {
		        Authorization: window.currentUser.Authorization    //必须
		      },
		      url: xdesktop.tools.resolve('/api/oarticles/' + share.assetId + '?filter[include]=ousers'),
		      type: 'GET',
		      success: function(res) {
				console.log(res);
				self.setState({
					article: res,
					loaded: true,
				});				
		      },
		      error: function(err) {
		        console.error(err);
		      },
		});
	},
	handleRequestClose: function() {
		this.setState({
		  	open: false,
	        password: '',
	        shareNum: '',
	        sharePrice: '',
	        passwordError:'',
			shareNumError: '',
			sharePriceError: '',   
		});	        
	},
	handleTouchTap: function() {
		this.setState({
		  open: true,
		});
	},
	handlePasswordChange: function(e){
		this.setState({passwordError:""});
		this.setState({password: e.target.value});
	},
	handleShareNumChange: function(e){
		this.setState({shareNumError:""});
		this.setState({	shareNum: e.target.value});
	},
	handleSharePriceChange: function(e){
		this.setState({sharePriceError:""});
		this.setState({	sharePrice: e.target.value });
	},
	handleSummit: function(){
		let { share } = this.props;
		let { password, shareNum, sharePrice, passwordError, shareNumError, sharePriceError} = this.state;
		if(!shareNum){
			this.setState({shareNumError:"请输入出售版券数量"});
			return
		}
		if(shareNum > share.num){
			this.setState({shareNumError:"版券数量不足"});
			return
		}
		if(!sharePrice){
			this.setState({sharePriceError:"请输入版券销售金额"});
			return				
		}
		if(!password){
			this.setState({passwordError:"请输入密码"});
			return				
		}
		var pureShareNum = Number(shareNum);
		var pureSharePrice = Number(sharePrice * 100000000);
		if(!pureShareNum){
			this.setState({shareNumError:"请输入数字"});
			return
		}
		if(!pureSharePrice){
			this.setState({sharePriceError:"请输入数字"});
			return
		}
		let assetId = this.props.share.assetId;		
	    let address = global.currentUser.wallets[0].address;
		let phaseSeed = global.currentUser.wallets[0].seed;
		let phaseKey = Logic.crypto.getRawSeed(phaseSeed, password);
		let seedHex = bip39.mnemonicToSeedHex(phaseKey, password);
		const keys = ebookchain.crypto.getKeys(seedHex);
    	const adds = ebookchain.crypto.getAddress(keys.publicKey);
    	if(adds !== address){
    		this.setState({passwordError: "您输入的密码有误,请重新输入"});
    		return ;
    	}
		if(adds == address){
			ebookchain.request.sellCopyright(assetId, pureShareNum, pureSharePrice, null, seedHex, '')
			.then(data=>{
				console.log(data);
			}).catch(function(err){
				console.log(err);
			});
			this.setState({
			  	open: false,
		        receiveAddress: '',
		        password: '',
		        addressError:'',
		        passwordError:'',	        
			});
			this.timerh = setTimeout(function(){
		 		alert("版券已上架");
			},500);
			if(this.props.getMyShares){
				this.props.getMyShares();
			}
		}		
	},
	render(){
		let { share } = this.props;
		let { article } = this.state;
		const iconTitle =(
		        <div>
	                <img src="public/images/logo/ebook_black.png" alt="logo" />
	                <span>出售版券</span>
	            </div>
			);
	    const actions = [
	      <FlatButton
	        label="取消"
	        primary={true}
	        style={{ marginRight:"12px"}}
	        onTouchTap={this.handleRequestClose}
	      />,
	      <FlatButton
	        label="确定"
	        primary={true}
	        style={{ marginRight:"12px"}}
	        onTouchTap={this.handleSummit}
	      />,
	    ];
	    var disabled = global.currentUser.wallets[0].seed ? false : true;
		return(
			<div>
				{this.state.loaded &&
					<div className="sharePannel">
						<div className="pannelLeft"><span>版</span><span style={{marginLeft:"50px"}}>券</span></div>
						<div className="pannelRight">
							<div>
								<span>版权ID: </span><span>{article.Extra.Root}</span>
							</div>
							<div>
								<span>作者: </span><span>{article.ousers.nickname}</span>
								<span  style={{marginLeft:"40px"}}>文章: </span>
								<span style={{color: "#e3f2fd"}}><Link to={urlPath + 'article/'+ share.assetId} > {article.Title.slice(0,10) + "..." }</Link></span>
							</div>
							<div style={{fontSize:"24px",margin:"10px 0"}}>
								<div style={{display:"inline-block"}}>
									<span>总量: </span><span>{share.num + share.sellNum}</span><span> EBS</span>
								</div>
								<div style={{display:"inline-block",color:"#FF9800",marginLeft:"30px"}}>
									<span>出售中: </span><span>{share.sellNum}</span><span> EBS</span>
								</div>
								<RaisedButton
							      label="出售"
							      primary={true}
							      icon={<i className="material-icons">attach_money</i>}
							      onTouchTap={this.handleTouchTap}
							      style={{float:"right"}}
							      disabled = {disabled}
							    />			
							</div>
						</div>
						<Dialog
			            open={this.state.open}
			            contentClassName='accountModal'	            
			            title={ iconTitle }
			            titleClassName='TransferTitle'
			            onRequestClose={this.handleRequestClose}
			            actions= {actions}
			            bodyStyle={{padding:"0 50px 24px",borderBottom:"1px solid #ccc"}}
			            > 
			            	<div className="DialogContent">
				            	<div style={{margin:"10px 0"}}>
				            		<p style={{margin:"10px 0"}}>版权ID:<b className="pull-right">{article.Extra.Root}</b></p>
				            		<p style={{margin:"10px 0"}}>文章:<b className="pull-right" style={{color: "#e3f2fd"}}><Link to={urlPath + 'article/'+ share.assetId} > {article.Title.slice(0,10) + "..." }</Link></b></p>
				            	</div>
							    <TextField
							      floatingLabelText="请输入销售版券数量"
							      fullWidth={true}							      
							      value={this.state.shareNum}
								  onChange={this.handleShareNumChange}
								  errorText={this.state.shareNumError}							      
							    />
							    <TextField
							      floatingLabelText="请输入售价"
							      fullWidth={true}							      
							      value={this.state.sharePrice}
								  onChange={this.handleSharePriceChange}
								  errorText={this.state.sharePriceError}						      
							    />
							    <h4 className="pull-right"><span>版券单价: </span><span>{this.state.sharePrice ? (this.state.sharePrice/this.state.shareNum).toFixed(4) : 0}</span> EBC/EBS</h4>
							    <TextField
							      floatingLabelText="请输入密码"
							      type="password"
							      fullWidth={true}
							      value={this.state.password}
								  onChange={this.handlePasswordChange}
								  errorText={this.state.passwordError}				      			      
							    />						    			            		
			            	</div>
			            	<div className="DialogInfo">
			                    <i className="material-icons">info_outline</i>			            	
			                    <span style={{marginLeft:"10px"}}>
			                    	版券销售信息一旦提交，无法修改。
			                    </span>
			            	</div>
			            </Dialog>						
					</div>
				}
			</div>
	    );				    			
	}
});