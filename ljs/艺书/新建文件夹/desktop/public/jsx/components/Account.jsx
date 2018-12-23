"use strict";
import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import { TransferModal } from './Wallet/TransferModal.jsx';
import { CreatWallet } from './Wallet/CreatWallet.jsx';
import { ImportWallet } from './Wallet/ImportWallet.jsx';
import { WalletSetting } from './Wallet/WalletSetting.jsx';
import { ChangAvatar } from './Wallet/changeAvatar.jsx'
const ipc = nodeRequire('electron').ipcRenderer;
var ebookchain = nodeRequire('js-sdk');
var xdesktop = nodeRequire('xdesktop-render');
var Logic = xdesktop.logic;

module.exports.Account = React.createClass({
    getInitialState: function(){
     return {
        balance: 0,
        userInfo: {},
        nickName:'',
        avaimg:'',
        nickNameError:'',
        open: false,
        openChangImg: false,
     };
    },
    componentDidMount(){
    	let adds = global.currentUser.wallets[0].address;
    	console.log(adds);
    	this.getUserInfo();
    	if(adds){
    		this.getAccount(adds);
    	}
    },
    componentWillUnmount(){
    	this.updateAccount && clearTimeout(this.updateAccount);
    },
    getAccount(adds){
    	let self = this;
    	ebookchain.request.getAccount(adds).then(data=>{
			self.setState({balance: data.account.balance/100000000});
			console.log(data);
		});
		//this.updateAccount && clearTimeout(this.updateAccount);
    	// this.updateAccount = setTimeout(function(){
	    // 	self.getAccount(adds);
	    // },1000);
    },
	getUserInfo(){
		let self = this;
		let userId = global.currentUser.userId;
		$.ajax({
		      headers: {
		        Authorization: global.currentUser.Authorization    //必须
		      },
		      url: xdesktop.tools.resolve('/api/ousers/'+ userId),
		      type: 'GET',
		      success: function(res) {
                    console.log("res ousersifo");
				    console.log(res);
			        self.setState({
			          userInfo: res,
			          avaimg: res.avatar
			        });
		      },
		      error: function(err) {
		        console.error(err);
		      },
		});
	},
	handleOpen() {
		this.setState({open: true});
	},
	handleClose() {
		this.setState({open: false});
	},
	handleNicknameChange(e){
		this.setState({nickName: e.target.value});
		this.setState({nickNameError:""});
	},
	checkNickname(){
		let self = this;
		let userId = global.currentUser.userId;
		let n_name = this.state.nickName;
		if(!n_name){
			this.setState({nickNameError:"请输入昵称"});
			return ;
		}
		self.setState({open:false});
		$.ajax({
	      headers: {
	        Authorization: global.currentUser.Authorization    //必须
	      },
	      url: xdesktop.tools.resolve('/api/ousers/'+ userId),
	      type: 'PUT',
	      data: {
	        nickname:  n_name,
	      },
	      success: function(res) {
	      	self.getUserInfo();
			    alert("昵称已更新")
	      },
	      error: function(err) {
	        console.error(err);
	      },
		});
	},
	handleImport(e){
		ipc.send('open-file-dialog');
	},
	handleDelete(e){
		let id = global.currentUser.userId;
		Logic.clear.clearPhase(id);
	},
	render(){
		let {balance, userInfo, nickName, nickNameError} = this.state;
	    const actions = [
	      <FlatButton
	        label="取消"
	        primary={true}
	        onTouchTap={this.handleClose}
	        style={{marginRight:"12px"}}
	      />,
	      <FlatButton
	        label="确定"
	        primary={true}
	        keyboardFocused={true}
	        onTouchTap={this.checkNickname}
	        style={{marginRight:"12px"}}
	      />,
	    ];
		return (
			<div className="containerwrap text-center" >
				<div style={{width:"420px",margin:"80px auto"}}>
				       <ChangAvatar key={ChangAvatar} avaimg={this.state.avaimg} getUserInfo={this.getUserInfo}  userInfo={this.state.userInfo}/>
					<div style={{width:"400px",textAlign: "left",margin:"10px"}}>
		                <h3 style={{margin:"10px",height:"50px",lineHeight:"50px",borderBottom:"1px solid #ccc"}}>
		                	<span style={{display:"inline-block",overflow:"hidden"}}>用户名:</span>
		                	<span style={{display:"inline-block",margin:"0 30px",overflow:"hidden",width:"210px",whiteSpace:"nowrap",textOverflow:"ellipsis"}}>
		                		{ userInfo.nickname }
							</span>
	                	    <IconButton
						      tooltip="修改昵称"
						      tooltipPosition="top-right"
						      onTouchTap={this.handleOpen}
						      style={{float:"right"}}
						      iconStyle={{verticalAlign:"top",color:"#00bcd4"}}
						    >
						    	<i className="material-icons md-18">border_color</i>
						    </IconButton>
		                </h3>
		                { global.currentUser.wallets[0].address &&
		                	<div>
				            	<h3 style={{margin:"10px",lineHeight:"50px",borderBottom:"1px solid #ccc"}}>
				            		<span>钱包地址: </span>
				            		<span style={{marginLeft:"10px"}}>
				            			{ global.currentUser.wallets[0].address }
				            		</span>
				            		<span style={{float:"right"}} >
						            	{userInfo.wallets && <WalletSetting getAccount = {this.getAccount} userInfo={this.state.userInfo}/>}
						            </span>
				            	</h3>
					            <div style={{margin:"10px",height:"50px",lineHeight:"50px", borderBottom:"1px solid #ccc"}}>
						            <div style={{float:"left",height:"50px",lineHeight:"50px"}}>
						            	<i className="material-icons" style={{verticalAlign:"middle",marginRight:"10px"}}>monetization_on</i>余额: <b>{balance}</b> EBC
						            </div>
						            <div style={{float:"right"}} >
						            	<TransferModal getAccount = {this.getAccount}/>
						            </div>
						        </div>
		                	</div>
		                }
		            </div>
					<div style={{margin:"30px"}}>
						<CreatWallet  getAccount = {this.getAccount}  getUserInfo={this.getUserInfo}/>
		            </div>
					<div style={{margin:"30px"}}>
						<ImportWallet getAccount = {this.getAccount}  getUserInfo={this.getUserInfo}/>
		            </div>
		        </div>
		        <Dialog
		          title="修改昵称"
		          actions={actions}
		          modal={false}
		          open={this.state.open}
		          onRequestClose={this.handleClose}
		          balance = {balance}
		        >
		          <TextField
        			hintText="请输入昵称"
        			onChange={this.handleNicknameChange}
        			errorText={nickNameError}
        			/>
		        </Dialog>
		    </div>
		);
	}
});
