import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

var xdesktop = nodeRequire('xdesktop-render');
var Logic = xdesktop.logic;
var ebookchain = nodeRequire('js-sdk');

module.exports.SoldModal = React.createClass({
    getInitialState: function(){
      return {
        open: false,
        receiveAddress: '',
        password: '',
        shareNum: 0,
        sharePrice: 0,
        addressError:'',
        passwordError:'',
		shareNumError: '',
		sharePriceError: '',
      }
    },
	handleRequestClose: function() {
		this.setState({
		  	open: false,
	        receiveAddress: '',
	        password: '',
	        shareNum: 0,
	        sharePrice: 0,
	        addressError:'',
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
	handleAddressChange: function(e){
		this.setState({addressError:""});
		this.setState({	receiveAddress: e.target.value });
	},
	handlePasswordChange: function(e){
		this.setState({passwordError:""});
		this.setState({	password: e.target.value});
	},
	handleShareNumChange: function(e){
		this.setState({shareNumError:""});
		this.setState({	shareNum: e.target.value});
	},
	handleSharePriceChange: function(e){
		this.setState({sharePriceError:""});
		this.setState({	sharePrice: e.target.value});
	},
	handleSummit: function(){
		let {receiveAddress, password, sharePrice, shareNum, addressError, passwordError, shareNumError, sharePriceError} = this.state;
		if(!shareNum){
			this.setState({shareNumError:"请输入出售版券数量"});
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
		console.log(receiveAddress);			
		console.log(password);
		let assetId = this.props.article.assetId;
		let seed = window.currentUser.wallets[0].seed;
		let rawSeed = Logic.crypto.getRawSeed(seed, password);
		console.log(rawSeed);
		if(!rawSeed){
			this.setState({passwordError: "您输入的密码有误,请重新输入"});
			return;	
		}
		if(receiveAddress && rawSeed){
			ebookchain.request.assetTransfer(assetId,receiveAddress,rawSeed, '')
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
		 		alert("版权已转移到"+receiveAddress);
			},500);				
		}
		if(!receiveAddress && rawSeed){
			ebookchain.request.sellCopyright(assetId,shareNum,sharePrice,null,rawSeed, '')
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
		 		alert("版权已上架");
			},500);			
		}					
	},
	render(){
		var iconTitle =(
		        <div>
	                <img src="public/images/logo/ebook_black.png" alt="logo" />
	                <span>转移版权</span>
	            </div>
			);
	    const actions = [
	      <FlatButton
	        label="取消"
	        primary={true}
	        style={{ margin: 12 }}
	        onTouchTap={this.handleRequestClose}
	      />,
	      <FlatButton
	        label="发送"
	        primary={true}
	        style={{ margin: 12 }}
	        onTouchTap={this.handleSummit}
	      />,
	    ];
	    let {article}=this.props;
		return(
			<div style={{display:"inline-block"}}>
				<RaisedButton
					icon={<i className="material-icons">receipt</i>}
			        label="版券"
			        primary={true}
			        disable={true}
			        onTouchTap={this.handleTouchTap}
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
		            	<div style={{margin:"50px 0"}}>
		            		<h3 style={{margin:"20px 0"}}>转移的版权ID为:<b className="pull-right">{article.root}</b></h3>
		            		<h3 style={{margin:"20px 0"}}>对应的文章ID:<b className="pull-right">{article.assetId}</b></h3>
		            	</div>
					    <TextField
					      hintText="请输入销售版券数量"
					      fullWidth={true}							      
					      value={this.state.shareNum}
						  onChange={this.handleShareNumChange}
						  errorText={this.state.shareNumError}							      
					    />
					    <TextField
					      hintText="请输入版券价格"
					      fullWidth={true}							      
					      value={this.state.sharePrice}
						  onChange={this.handleSharePriceChange}
						  errorText={this.state.sharePriceError}							      
					    />
					    <TextField
					      hintText="请输入对方的地址"
					      fullWidth={true}							      
					      value={this.state.receiveAddress}
						  onChange={this.handleAddressChange}
						  errorText={this.state.addressError}							      
					    />
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
	                    	请确保您正在发送给正确的地址，本操作无法撤消。
	                    </span>
	            	</div>
	            </Dialog>
            </div>			
		);
	}
});