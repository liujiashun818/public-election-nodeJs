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

module.exports.MySellCard = React.createClass({
	getInitialState(){
		return{
			article:{},
			loaded: false,			
			open: false,
	        password: '',
	        passwordError:'',
		}
	},
	componentDidMount(){
		this.getArticle(this.props.mySell);
	},
    componentWillReceiveProps(nextProps) {
    	if(this.props.mySell !== nextProps.mySell){
    		this.getArticle(nextProps.mySell);		
    	}
    },
	getArticle(mySell){
		let self = this;
		$.ajax({
		      headers: {
		        Authorization: window.currentUser.Authorization    //必须
		      },
		      url: xdesktop.tools.resolve('/api/oarticles/' + mySell.assetId),
		      type: 'Get',
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
		this.setState({
		  open: true,
		});
	},
	handleSummit: function(){
		let { password, passwordError} = this.state;
		let { mySell } = this.props;
		let self=this;
		if(!password){
			this.setState({passwordError:"请输入密码"});
			return				
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
			console.log(mySell.id);
			ebookchain.request.stopSell(mySell.id, seedHex).then(data =>{
				if (data && data.success) {
				    console.log(data);
				    this.setState({ open: false });
				    alert("版券已下架");
				}
			}).catch(function(err){
				console.log(err);
			});	
		}
		if(this.props.getMySells){
			this.props.getMySells();
		}
	},
	render(){
		let { mySell } = this.props;
		let { article } = this.state;
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
					<div className="sellcard">
						<div className="cardHeader">
							<div>
								<span>版权ID: </span><span>{article.Extra.Root}</span>
							</div>
							<div>
								<span style={{marginRight: "5px"}}>文章: </span>
								<span style={{color: "#e3f2fd"}}><Link to={urlPath + 'article/'+ mySell.assetId} > {article.Title.slice(0,5) + "..." }</Link></span>
							</div>
						</div>
						<div className="cardFooter">
							<div style={{fontSize:"12px",margin:"5px"}}>
								<div style={{float:"left"}}>
									<span>版券: </span><span>{mySell.sellNum}</span><span> EBS</span>
								</div>
								<div style={{float:"right"}}>
									<span>单价: </span><span>{(mySell.price/mySell.sellNum/100000000).toFixed(4)}</span><span> EBC/EBS</span>
								</div>
							</div>
							<div style={{fontSize:"36px",padding:"50px 5px 20px",color:"#FF9800"}}>{mySell.price/100000000}<span style={{fontSize:"20px"}}> EBC</span></div>
							<RaisedButton
						      label="下架"
						      primary={true}
						      onTouchTap={this.handleTouchTap}
						      style={{width:"70%"}}
						      disabled = {disabled}
						    />
						</div>
						<Dialog
			            open={this.state.open}
			            onRequestClose={this.handleRequestClose}
			            actions= {actions}
			            modal={false}
			            > 
			            	<p>确定下架该版券?</p>
						    <TextField
						      floatingLabelText="请输入密码"
						      type="password"
						      fullWidth={true}
						      value={this.state.password}
							  onChange={this.handlePasswordChange}
							  errorText={this.state.passwordError}				      			      
						    />				       
			            </Dialog>
					</div>
				}
			</div>
	    );				    			
	}
});