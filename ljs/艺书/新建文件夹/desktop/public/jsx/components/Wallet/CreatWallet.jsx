"use strict";
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';

var xdesktop = nodeRequire('xdesktop-render');
var Logic = xdesktop.logic;
var Db = xdesktop.db;
var ebookchain = nodeRequire('js-sdk');
var bip39 = nodeRequire('bip39');
const jsdk = nodeRequire('js-sdk');
const ipc = nodeRequire('electron').ipcRenderer;

const isAddress = (address) => {
  const rule = /^[0-9]{1,21}[E|e]$/g
  if (!address || !rule.test(address)) {
    return false
  }
  return true
}

module.exports.CreatWallet = React.createClass({
	    getInitialState: function(){
	     return {
	        open: false,
	        stepIndex: 0,
			f_phasePass: '', // 主密码
			f_phaseError: '',
			s_phasePass: '', // 重复主密码
			s_phaseError: '',
			phaseKey: '',  // 主密钥
			v_phaseKey: '', // 验证主密钥
			v_phasePass: '', // 验证主密码
			v_phaseError: '',
			address: '',
			addsError: '',
			disc: ''
	     }
	    },
		handleRequestClose: function() {
			this.setState({
			  	open: false,
		        stepIndex: 0,
				f_phasePass: '', // 主密码
				f_phaseError: '',
				s_phasePass: '', // 重复主密码
				s_phaseError: '',
				phaseKey: '',  // 主密钥
				v_phaseKey: '', // 验证主密钥
				v_phasePass: '', // 验证主密码
				v_phaseError: '',
				address: '',
				addsError: '',
			});
		},
		handleTouchTap: function() {
          this.setState({
            open: true,
          });
		},
		handleNext(){
		    const {stepIndex} = this.state;
		    if (stepIndex < 2) {
		      this.setState({stepIndex: stepIndex + 1});
		    }
		},
		handlePrev(){
			const {stepIndex} = this.state;
			if (stepIndex > 0) {
			  this.setState({stepIndex: stepIndex - 1});
			}
		},

		// 第一步 生成主密钥
		handlePhaseChange(e){
		    this.setState({
		      f_phasePass:e.target.value,
		      f_phaseError: '',
		    });
		},
		handlePhase2Change(e){
		    this.setState({
		      s_phasePass:e.target.value,
		      s_phaseError: '',
		    });
		},
		handleCreatePhase(e){
		    let {f_phasePass, s_phasePass, s_phaseError} = this.state;
		    if(!(f_phasePass.length > 7)){
		       this.setState({f_phaseError: '密码太短了,不能小于8个字符'});
		       return ;
		    }
		    if(f_phasePass !== s_phasePass){
		      this.setState({s_phaseError:  '两次密码不一致'});
		      return ;
		    }
		    const mnemonic = bip39.generateMnemonic();
		    const seedHex = bip39.mnemonicToSeedHex(mnemonic, f_phasePass);
		    const keys = jsdk.crypto.getKeys(seedHex);
		    const address = jsdk.crypto.getAddress(keys.publicKey);
		    this.setState({
		      phaseKey: mnemonic,
		      address: address,
		    })
		},
		handleRecreate(e){
			this.setState({
		      phaseKey: '',
		      address: '',
		      f_phasePass: '',
		      s_phasePass: '',
			});
		},
		handleSavePhase(e){
		    let { phaseKey } = this.state;
		    ipc.send('save-dialog', phaseKey);
		},

		// 第二步 - 验证地址
		handleVkeyChange(e){
		    this.setState({
		      v_phaseKey: e.target.value,
		    })    
		},
		handleVpassChange(e){
		    this.setState({
		      v_phasePass: e.target.value,
		    })    
		},
		handleVerify(){
		    let {f_phasePass, phaseKey, v_phaseKey, v_phasePass, v_phaseError, address} = this.state;
		    const seedHex = bip39.mnemonicToSeedHex(v_phaseKey, v_phasePass);
		    const keys = jsdk.crypto.getKeys(seedHex);
		    const adds = jsdk.crypto.getAddress(keys.publicKey);
		    if(adds !== address){
		      this.setState({v_phaseError: <div className="show-tips">验证失败，请重新输入</div>}); 
		      return ;
		    }
		    if(adds == address){
		      this.handleNext();
		    }
		},
		handleDiscChange(e){
		    this.setState({
		      disc: e.target.value,
		    })
		},
		handleSummit: function(){
			let { address, disc ,phaseKey, f_phasePass} = this.state;
			let self = this;
			let userId = global.currentUser.userId;
			let _wallet = {address: address, discription: disc};
			console.log(_wallet);
			let phaseSeed = Logic.crypto.encryption(phaseKey, f_phasePass)
			Logic.crypto.saveWallet(phaseSeed, address, disc, function(){
				console.log("钱包地址已创建");
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
		getStepContent(stepIndex) {
			switch (stepIndex) {
			  case 0:
			    return (
			    	<div>
				    	{this.state.phaseKey
				    	  ? <div>          
		                        <div>
			                        <span>主密钥 </span>					            
						        </div>
						        <div style={{textAlign:'left',marginTop:"10px",border:"1px solid #ccc",padding:"10px",color:'#FF9800'}}>
			                       { this.state.phaseKey }
		                        </div>
		                        <FlatButton
					              label="保存主密钥"
					              style={{margin: 12}}
					              primary={true}
					              onClick={this.handleSavePhase}
					            />
								<div style={{color:'#f44336',textAlign:'left',margin:"10px 0"}}>		            	
			                       	重要提示 ！请牢记您的主密钥 ( 黄色单词组 ) 和主密码 , 本系统无备份，丢失后无法找回          		
				            	</div>
				            	<div style={{marginTop:'10px'}}>
						            <FlatButton
						              label="重新生成主密钥"
						              style={{marginTop: 12}}
						              primary={true}
						              onClick={this.handleRecreate}
						            />
						            <RaisedButton
						              label="下一步 验证主密钥"
						              style={{margin: 12}}
						              primary={true}
						              onClick={this.handleNext}
						            />
					            </div>			      				                	
				          	</div>
				          : <div style={{paddingTop:"30px"}}>
					          	<div style={{position:"relative"}}>
									<span style={{position:"absolute",top:"10px"}}><i className="material-icons">lock_outline</i></span>
						            <TextField 
						              hintText="请输入主密码（至少8个字符）"
						              style={{textIndent:"30px"}}
						              type="password"
						              value={this.state.f_phasePass}
						              onChange={this.handlePhaseChange}
						              errorText={this.state.f_phaseError}
						              errorStyle={{textAlign:"left"}}
						            />
					          	</div>
					          	<div style={{position:"relative"}}>
					          		<span style={{position:"absolute",top:"10px"}}><i className="material-icons">lock_outline</i></span>
						            <TextField 
						              hintText="请重复输入主密码"
						              style={{textIndent:"30px"}}
						              type="password"
						              value={this.state.s_phasePass}
						              onChange={this.handlePhase2Change}
						              errorText={this.state.s_phaseError}
						              errorStyle={{textAlign:"left"}}
						            />
					            </div>
					            <RaisedButton
					              icon={<i className="material-icons">vpn_key</i>}
					              label="生成主密钥"
					              style={{margin:"12px 30px"}}
					              primary={true}
					              onClick={this.handleCreatePhase}
					            />
				          	</div>
				        }
		          	</div>
                );
			  case 1:
			    return (
			    	<div style={{margin:"20px"}}>
			          	<div style={{position:"relative"}}>
							<span style={{position:"absolute",top:"12px"}}>主密钥：</span>
				            <TextField 
				              hintText="12个英文单词"
				              style={{textIndent:"70px"}}
				              value={this.state.v_phaseKey}
				              onChange={this.handleVkeyChange}
				              errorStyle={{textAlign:"left"}}
				              fullWidth={true}
				            />
			          	</div>			    	            
			          	<div style={{position:"relative"}}>
							<span style={{position:"absolute",top:"12px"}}>主密码：</span>
				            <TextField 
				              hintText="请输入您的主密码"
				              style={{textIndent:"70px"}}
							  type="password"
				              value={this.state.v_phasePass}
				              onChange={this.handleVpassChange}
				              errorText={this.state.v_phaseError}
				              errorStyle={{textAlign:"left"}}
				              fullWidth={true}
				            />
			          	</div>
			          	<div style={{marginTop:"20px"}}>
				            <FlatButton
				              icon={<i className="material-icons">keyboard_backspace</i>}
				              label="上一步"
				              style={{margin:"12px 30px"}}
				              primary={true}
				              onClick={this.handlePrev}
				            />			      
				            <RaisedButton
				              icon={<i className="material-icons">vpn_key</i>}
				              label="验证密钥"
				              style={{margin:"12px 30px"}}
				              primary={true}
				              onClick={this.handleVerify}
				            />
			            </div>
		            </div>
			    );
			  case 2:
			    return (
			    	<div style={{margin:"0 20px",lineHeight:"30px"}}>
			    		<p>验证成功,以下为您创建的钱包地址</p>
			    		<p style={{fontSize:"30px",color:"#FF9800",margin:"20px 0",border:"1px solid #FF9800",padding:"10px"}}>{this.state.address}</p>
			          	<div>
				            <TextField
				              floatingLabelText="钱包地址备注"
				              hintText="请填写备注信息"
				              value={this.state.disc}
				              onChange={this.handleDiscChange}
				              errorStyle={{textAlign:"left"}}
				              fullWidth={true}
				            />
			          	</div>
			    		<div>
			    		<span>点击确定, 将地址绑定到本账户的钱包中</span>
			            <RaisedButton
			              label="确定"
			              style={{margin:"12px 30px"}}
			              primary={true}
			              onClick={this.handleSummit}
			            />
			            </div>
			    	</div>		            		    	
			    );
			  default:
			    return '';
			}
		},
		render: function () {``
			const {stepIndex} = this.state;
			const iconTitle =(
			        <div>
		                <img src="public/images/logo/ebook_black.png" alt="logo" />
		                <span>创建钱包地址</span>
		                <i className="material-icons" style={{position:"absolute",top:"30px",right:"30px",cursor:"pointer"}} onClick={this.handleRequestClose}>clear</i>
		            </div>
				);
		    return (
				<div>
					<RaisedButton
					  icon={<i className="material-icons">lightbulb_outline</i>}
				      label="创建钱包地址"
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
		            	<div className="text-center">
							<div style={{width: '100%', maxWidth: 700, margin: 'auto'}}>
						        <Stepper linear={false} activeStep={stepIndex}>
						          <Step>
						            <StepLabel>
						              生成主密钥
						            </StepLabel>
						          </Step>
						          <Step>
						            <StepLabel>
						              验证主密钥
						            </StepLabel>
						          </Step>
						          <Step>
						            <StepLabel>
						              绑定地址
						            </StepLabel>
						          </Step>
						        </Stepper>
						        <div style={{margin: '0 20px',height:"240px"}}>
						          <p>{this.getStepContent(stepIndex)}</p>
						        </div>
							</div>
						</div>			            				        
		            </Dialog>
	            </div>	            
		    );
		}
	});