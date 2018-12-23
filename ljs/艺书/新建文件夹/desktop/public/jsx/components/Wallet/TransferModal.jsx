"use strict";
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
var xdesktop = nodeRequire('xdesktop-render');
var Logic = xdesktop.logic;
var Db = xdesktop.db;
var ebookchain = nodeRequire('js-sdk');
var bip39 = nodeRequire('bip39');

const isAddress = (address) => {
  const rule = /^[0-9]{1,21}[E|e]$/g
  if (!address || !rule.test(address)) {
    return false
  }
  return true
}
module.exports.TransferModal = React.createClass({
	    getInitialState: function(){
	     return {
	        open: false,
	        receiveAddress: '',
	        amount: '',
	        password: '',
	        addressError:'',
	        amountError:'',
	        passwordError:'',
	        fee: 0,
	     };
	    },
		handleRequestClose: function() {
			this.setState({
			  	open: false,
		        receiveAddress: '',
		        amount: '',
		        password: '',
		        addressError:'',
		        amountError:'',
		        passwordError:'',
		        fee: 0,
			});
		},
		handleTouchTap: function() {
	        if(global.currentUser.wallets[0].seed){
	          this.setState({
	            open: true,
	          });         
	        }else{
	          alert("您无权限操作该内容!");
	        }
		},
		handleAddressChange: function(e){
			this.setState({addressError:""});
			this.setState({	receiveAddress: e.target.value });
		},
		handleAmountChange: function(e){
			this.setState({amountError:""});
			this.setState({	amount: e.target.value });
			this.setState({	fee: e.target.value * 0.001 });
		},
		handlePasswordChange: function(e){
			this.setState({passwordError:""});
			this.setState({	password: e.target.value});
		},
		getAccount(adds){
			if(this.props.getAccount){
				this.props.getAccount(adds);
			}
		},
		handleSummit: function(){
			let {receiveAddress,amount,password,addressError,amountError,passwordError} = this.state;
			let self = this;
			if(!receiveAddress){
				this.setState({addressError:"请输入接收地址"});
				return				
			}
			if(!isAddress(receiveAddress)){
				this.setState({addressError:"地址格式有误，请确认输入正确地址"});
				return					
			}
			if(!amount || amount == 0){
				this.setState({amountError:"请输入转账金额"});
				return
			}
			var pureAmount = Number(amount * 100000000);
			if(!pureAmount){
				this.setState({amountError:"金额必须为数字"});
				return
			}
			if(!password){
				this.setState({passwordError:"请输入密码"});
				return				
			}
			//充值：
		    let address = global.currentUser.wallets[0].address;
			let phaseSeed = global.currentUser.wallets[0].seed;
			let phaseKey = Logic.crypto.getRawSeed(phaseSeed, password);
			let seedHex = bip39.mnemonicToSeedHex(phaseKey, password);
			const keys = ebookchain.crypto.getKeys(seedHex);
	    	const adds = ebookchain.crypto.getAddress(keys.publicKey);
			console.log(seedHex);
	    	if(adds !== address){
	    		this.setState({passwordError: "您输入的密码有误"});
	    		return ;
	    	}
			if(adds == address){
				ebookchain.request.openTransaction(receiveAddress, pureAmount, seedHex, '')
				.then(data=>{
					console.log(data);
					if(!data.success){			
						self.setState({amountError:"您的余额不足"});
						return;					
					}
					self.setState({
					  	open: false,
				        receiveAddress: '',
				        amount: 0,
				        password: '',
				        addressError:'',
				        amountError:'',
				        passwordError:'',
				        fee: 0,		        
					});
					self.getAccount(address);
					self.timerh = setTimeout(function(){
				 		alert("转账成功");
					},500);
				}).catch(function(err){
					console.log(err);
				});				
			}else{
				self.setState({passwordError: "您输入的密码有误,请重新输入"});				
			}			
		},
		render: function () {
			var iconTitle =(
			        <div>
		                <img src="public/images/logo/ebook_black.png" alt="logo" />
		                <span>Ebookchain</span>
		            </div>
				);
		    const actions = [
		      <FlatButton
		        label="取消"
		        primary={true}
		        onTouchTap={this.handleRequestClose}
		      />,
		      <FlatButton
		        label="发送"
		        primary={true}
		        onTouchTap={this.handleSummit}
		      />,
		    ];
		    var disabled = global.currentUser.wallets[0].seed ? false : true;
		    return (
				<div>
					<FlatButton
						icon={<i className="material-icons">send</i>}
				        label="转账交易"
				        primary={true}
				        onTouchTap={this.handleTouchTap.bind(this)}
						disabled={ disabled }			        
				     />    
			        <Dialog
		            open={this.state.open}
		            contentClassName='accountModal'	            
		            title={iconTitle}
		            titleClassName='TransferTitle'
		            actions={actions}
		            onRequestClose={this.handleRequestClose}
		            bodyStyle={{padding:"0 50px 24px",borderBottom:"1px solid #ccc"}}
		            >
		            	<div className="DialogHeader text-center">
		            		<h3>发送 <b>Ebookcoin</b></h3>
		            		<h4>请输入转账地址及转账金额</h4>
		            	</div>
		            	<div className="DialogContent">
						    <TextField
						      hintText="请输入对方的地址"
						      fullWidth={true}							      
						      value={this.state.receiveAddress}
							  onChange={this.handleAddressChange}
							  errorText={this.state.addressError}							      
						    />
						    <TextField
						      hintText="转账金额"
						      fullWidth={true}							      
						      value={this.state.amount}
							  onChange={this.handleAmountChange}
							  errorText={this.state.amountError}     			      
						    />
						    <h4 className="text-right">费用: <b>10 </b>EBC</h4>
						    <TextField
						      hintText="请输入密码"
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
	                        	请确保您正在发送EBC给正确的地址，本操作无法撤消。
	                        </span>	            		
		            	</div>				            				        
		            </Dialog>
	            </div>	            
		    );
		}
	});