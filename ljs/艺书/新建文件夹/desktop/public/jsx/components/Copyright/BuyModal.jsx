import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import utils from '../../../js/libs/utils.js';
import { Link } from 'react-router';

const urlPath = utils.basePath();
var xdesktop = nodeRequire('xdesktop-render');
var Logic = xdesktop.logic;
var ebookchain = nodeRequire('js-sdk');
var bip39 = nodeRequire('bip39');

module.exports.BuyModal = React.createClass({
    getInitialState: function(){
     return {
		open: false,
		balance: 0,
        password: '',
        passwordError:'',
      }
    },
    getAccount(){
    	let self = this;
    	let adds = global.currentUser.wallets[0].address;
    	ebookchain.request.getAccount(adds).then(data=>{
			self.setState({balance:data.account.balance/100000000});
			console.log(data);
		});
    },
	handlePasswordChange: function(e){
		this.setState({passwordError:""});
		this.setState({password: e.target.value});
	},
	handleRequestClose: function() {
		this.setState({
		  	open: false,
		});
	},
	handleTouchTap: function() {
		this.setState({	open: true });
		this.getAccount();
	},
	handleSummit: function(){
		let { password, passwordError, balance} = this.state;
		let { share } = this.props;
		let self = this;
		if(!password){
			self.setState({passwordError:"请输入密码"});
			return				
		}
		if( share.price/100000000 > balance){
			self.setState({passwordError: "您的余额不足"});
			return;	
		}
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
			ebookchain.request.buyCopyright(share.id, share.price, seedHex).then(data =>{
				if (data && data.success) {
				    console.log(data);
				    self.setState({ open: false });
				}
			}).catch(function(err){
				console.log(err);
			});
		}
	},
	render(){
		let { share, article } = this.props;
		const iconTitle =(
		        <div>
	                <img src="public/images/logo/ebook_black.png" alt="logo" />
	                <span>购买版券</span>
	            </div>
			);
	    const actions = [
	      <FlatButton
	        label="取消"
	        primary={true}
	        style={{ marginRight:"12px"}}
	        onTouchTap={this.handleRequestClose}
	      />,
	      <RaisedButton
	        label="确定"
	        primary={true}
	        style={{ marginRight:"12px"}}
	        onTouchTap={this.handleSummit}
	      />,
	    ];
	    var disabled = global.currentUser.wallets[0].seed ? false : true;
		return(
			<div>
				<RaisedButton
			      label="购   买"
			      primary={true}
			      onTouchTap={this.handleTouchTap}
			      style={{width:"70%"}}
			      disabled = {disabled}
			    />
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
		            	<div style={{margin:"10px 0",lineHeight:"30px",fontSize:"14px"}}>
		            		<p><span style={{display:"inline-block",width:"100px"}}>版权ID: </span><span>{article.Extra.Root}</span></p>
		            		<p><span style={{display:"inline-block",width:"100px"}}>文章: </span><span style={{color: "#e3f2fd"}}><Link to={urlPath + 'article/'+ share.assetId} > {article.Title.slice(0,10) + "..." }</Link></span></p>
						    <p><span style={{display:"inline-block",width:"100px"}}>版券单价: </span><span>{(share.price/100000000/share.sellNum).toFixed(4)}</span><span> EBC/EBS</span></p>
						    <p><span style={{display:"inline-block",width:"100px"}}>版券数量: </span><span>{share.sellNum}</span><span> EBS</span></p>
		            	</div>
		            	<div style={{fontSize:"18px"}}><b className="pull-left">总额: {share.price/100000000} EBC</b><b className="pull-right">您的余额: {this.state.balance} EBC</b> </div>
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
	                    	请确认您将购买的版券信息，本操作无法撤消。
	                    </span>
	            	</div>
	            </Dialog>
            </div>
		);
	}
});