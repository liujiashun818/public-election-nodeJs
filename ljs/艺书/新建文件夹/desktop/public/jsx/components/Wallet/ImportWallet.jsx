"use strict";
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
const jsdk = nodeRequire('js-sdk');
const ipc = nodeRequire('electron').ipcRenderer;
var xdesktop = nodeRequire('xdesktop-render');
var Logic = xdesktop.logic;


module.exports.ImportWallet = React.createClass({
    getInitialState: function(){
     return {
        open: false,
        phaseKey: '',
        phasePass: '',
        phaseError: '',
        seed: '',
        address: '',
        disc: '',
     }
    },
	handleRequestClose: function() {
		this.setState({
	        open: false,
	        phaseKey: '',
	        phasePass: '',
	        phaseError: '',
	        seed: '',
	        address: '',
	        disc: '',
		});
	},
	handleTouchTap: function() {
      this.setState({
        open: true,
      });
	},
	handlekeyChange(e){
		this.setState({
			phaseKey: e.target.value 
		})
	},
	handlePassChange(e){
		this.setState({
			phasePass: e.target.value 
		})
	},
	handleDiscChange(e){
		this.setState({
			disc: e.target.value 
		})		
	},
	handleAddsClick(e){
		let { phaseKey, phasePass} = this.state;
		let adds = Logic.crypto.getAddress(phaseKey, phasePass);
		console.log(adds);
		this.setState({
			address: adds
		});
	},
	handleImportKey(e){
		let self = this;
		ipc.send('open-file-dialog');
		// 注册事件
    	$.llevent.EventObject.on('get-content', function(content) {
			// 置为选择状态，设置 editor
			console.log("seedData");
			console.log(content);
			self.setState({phaseKey: content});
		});
	},
	handleImportAddress(e){
		let { phaseKey, address, disc, phasePass} = this.state;
		let self = this;
		let userId = global.currentUser.userId;
		let _wallet = {address: address, discription: disc};
		let phaseSeed = Logic.crypto.encryption(phaseKey, phasePass)
		console.log(_wallet);
		Logic.crypto.saveWallet(phaseSeed, address, disc, function(){
			console.log("钱包地址已导入");
			if(global.currentUser.wallets[0].address){
				self.getAccount(global.currentUser.wallets[0].address);
				self.getUserInfo();						
			}
			self.handleRequestClose();				
		});
		$.ajax({
		      headers: {
		        Authorization: global.currentUser.Authorization    //必须
		      },
		      url: xdesktop.tools.resolve('/api/ousers/'+ userId +'/createWallet'),
		      type: 'PUT',
		      data: {
		        wallet:  _wallet,
		      },
		      success: function(res) {
				console.log(res);
		      },
		      error: function(err) {
		        console.error(err);
		      },
		});
	},
	getAccount(adds){
		if(this.props.getAccount){
			this.props.getAccount(adds);
		}
	},
	getUserInfo(){
		if(this.props.getUserInfo){
			this.props.getUserInfo();
		}
	},
	render: function () {
		const iconTitle =(
		        <div>
	                <img src="public/images/logo/ebook_black.png" alt="logo" />
	                <span>导入钱包地址</span>
	                <i className="material-icons" style={{position:"absolute",top:"30px",right:"30px",cursor:"pointer"}} onClick={this.handleRequestClose}>clear</i>
	            </div>
			);
	    return (
			<div>
				<RaisedButton
				  icon={<i className="material-icons">keyboard_tab</i>}
			      label="导入钱包地址"
			      primary={true}
			      onTouchTap={this.handleTouchTap.bind(this)}
			      fullWidth={true}
			    />
		        <Dialog
	            open={this.state.open}
	            contentClassName='accountModal'	            
	            title={iconTitle}
	            titleClassName='TransferTitle'
	            onRequestClose={this.handleRequestClose}
	            bodyStyle={{padding:"0 50px 24px",borderBottom:"1px solid #ccc"}}
	            >
					<div style={{margin:"20px"}}>
			          	<div style={{position:"relative"}}>
				            <TextField 
						      floatingLabelText="主密钥"
						      multiLine={true}		            
				              hintText="12个英文单词"
				              value={this.state.phaseKey}
				              onChange={this.handlekeyChange}
				              errorStyle={{textAlign:"left"}}
				              fullWidth={true}
				            />			           
			          	</div>
			            <RaisedButton
			              label="导入主密钥"
			              primary={true}
			              onClick={this.handleImportKey}
			            />			          	
			          	<div style={{position:"relative"}}>
				            <TextField 
				              floatingLabelText="主密码"
				              hintText="请输入您的主密码"
							  type="password"
				              value={this.state.phasePass}
				              onChange={this.handlePassChange}
				              errorText={this.state.phaseError}
				              errorStyle={{textAlign:"left"}}
				              fullWidth={true}
				            />
			          	</div>
			          	<div style={{position:"relative"}}>
				            <TextField 
				              floatingLabelText="备注"
				              hintText="请输入该地址的备注信息"
				              value={this.state.disc}
				              onChange={this.handleDiscChange}
				              fullWidth={true}
				            />
			          	</div>
			          	{this.state.address
			          		?<div style={{marginTop:"20px"}}>
			          			<div>您要导入的钱包地址为： {this.state.address}, 备注：{this.state.disc}</div>
			          			<div>是否确定导入？</div>		      
					            <RaisedButton
					              label="确定导入"
					              style={{margin:"12px 30px",textAlign:"center"}}
					              primary={true}
					              onClick={this.handleImportAddress}
					            />
				            </div>
				          	:<div style={{marginTop:"20px",textAlign:"center"}}>	      
					            <RaisedButton
					              icon={<i className="material-icons">bubble_chart</i>}
					              label="生成地址"
					              style={{margin:"12px 30px"}}
					              primary={true}
					              onClick={this.handleAddsClick}
					            />
				            </div>
			          	}			            
		            </div>			            				        
	            </Dialog>
            </div>	           
	    );
	}
});