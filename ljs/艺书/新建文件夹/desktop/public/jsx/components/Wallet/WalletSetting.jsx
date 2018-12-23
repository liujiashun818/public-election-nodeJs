"use strict";
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';

// const jsdk = nodeRequire('js-sdk');
// const ipc = nodeRequire('electron').ipcRenderer;
var xdesktop = nodeRequire('xdesktop-render');
var Logic = xdesktop.logic;

module.exports.WalletSetting = React.createClass({
    getInitialState: function(){
     return {
        open: false,
        curAddrees: '',
     }
    },
    componentDidMount(){
    	let adds = global.currentUser.wallets[0].address ;
    	this.setState({curAddrees: adds});
    },
	handleRequestClose: function() {
		this.setState({
	        open: false,
		});
	},
	handleTouchTap: function() {
      this.setState({
        open: true,
      });
	},
	setAddress: function(adds){
		console.log(adds);
		this.setState({curAddrees: adds});
	},
	// handlekeyChange(e){
	// 	this.setState({
	// 		phaseKey: e.target.value 
	// 	})
	// },
	getAccount(adds){
		if(this.props.getAccount){
			this.props.getAccount(adds);
		}
	},
	handleSummit(e){
		let adds = this.state.curAddrees;
		let self = this;
		Logic.crypto.setWallet(adds, function(){
			console.log("set success");
			self.getAccount(adds);
			self.setState({open: false});
		});
	},
	render: function () {
		let { userInfo }= this.props;
		let userid = global.currentUser.userId;
		let localWallets = Logic.crypto.getWalletsByUserId(userid);  //获取本地钱包
		console.log(localWallets);
		var on_wallets = [], off_wallets = [];
		userInfo.wallets.forEach(function(item){
			let exist = localWallets.includes(item.address);
			console.log(exist);
			if(exist){
				on_wallets.push(item);
			}else{
				off_wallets.push(item);
			}			
		});
		console.log(on_wallets);
		console.log(off_wallets);
		const iconTitle =(
		        <div>
	                <img src="public/images/logo/ebook_black.png" alt="logo" />
	                <span>设置钱包地址</span>
	                <i className="material-icons" style={{position:"absolute",top:"30px",right:"30px",cursor:"pointer"}} onClick={this.handleRequestClose}>clear</i>
	            </div>
			);
	    const actions = [
	      <div style={{float:"left",fontSize:"16px",marginLeft:"20px", lineHeight:"40px"}}>将 <span style={{margin:"0 5px",color:"#f1991b"}}>{this.state.curAddrees}</span> 设置为当前地址</div>,
	      <FlatButton
	        label="取消"
	        primary={true}
	        onTouchTap={this.handleRequestClose}
	      />,
	      <RaisedButton
	        label="确定"
	        primary={true}
	        onTouchTap={this.handleSummit}
	      />,
	    ];
	    console.log(userInfo);
	    const onWalletsList = on_wallets.map((item) =>{
	    	return (
				<RadioButton
	              onClick={this.setAddress.bind(this, item.address)}
	              label={item.address}
	              checked={this.state.curAddrees === item.address}
	            />
	    	);   		
	    });
	    const offWalletList = off_wallets.map((item) =>{
	    	return (
				<RadioButton
	              label={item.address}
	              disabled={true}
	            />	
	    	);    	
	    })
	    return (
			<div>
        	    <IconButton
			      tooltip="设置钱包地址"
			      tooltipPosition="top-right"
			      onTouchTap={this.handleTouchTap}
			      style={{float:"right"}}
			      iconStyle={{verticalAlign:"top",color:"#00bcd4"}}
			    >
			    	<i className="material-icons md-22">settings_applications</i>
			    </IconButton>
		        <Dialog
	            open={this.state.open}
	            contentClassName='accountModal'           
	            title={iconTitle}
	            titleClassName='TransferTitle'
	            actions={actions}
	            onRequestClose={this.handleRequestClose}
	            autoScrollBodyContent={true}
	            bodyStyle={{padding:"0 50px 24px",borderBottom:"1px solid #ccc"}}
	            >
	            	<div style={{marginTop:"20px",lineHeight:"30px"}}>
	            		<div style={{margin:"10px",textAlign:"center",color:"#f1991b"}}>
							当前钱包地址：{global.currentUser.wallets[0].address}
						</div>
						<h4>请从可用地址列表中选择一个作为当前地址, 不可用地址为已绑定但未导入私钥的钱包</h4>
						<br/>
				        <h3>可用钱包地址</h3>
				        <hr/>
				        <div>
							{ onWalletsList }
				        </div>
				        <br/>
				        <h3>不可用钱包地址</h3>
				        <hr/>
				        <div>
				        	{ offWalletList }
				        </div>
					</div>     				        
	            </Dialog>
            </div>	           
	    );
	}
});