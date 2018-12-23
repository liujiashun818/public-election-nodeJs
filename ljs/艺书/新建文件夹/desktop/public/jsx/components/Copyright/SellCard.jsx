"use strict";
import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import { Link } from 'react-router'; 
import { BuyModal } from './BuyModal.jsx';
import { ShareList } from './ShareList.jsx';
import utils from '../../../js/libs/utils.js';

const urlPath = utils.basePath();
const xdesktop = nodeRequire('xdesktop-render');

module.exports.SellCard = React.createClass({
	getInitialState(){
		return{
			article:{},
			loaded: false,
			open: false,
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
		      url: xdesktop.tools.resolve('/api/oarticles/' + share.assetId +'?filter[include]=ousers'),
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
		});
	},
	handleTouchTap: function() {
		this.setState({
		  open: true,
		});
	},	
	render(){
		let { share } = this.props;
		let { article } = this.state;
		const iconTitle =(
		        <div>
	                <img src="public/images/logo/ebook_black.png" alt="logo" />
	                <span>版券列表</span>
	            </div>
			);
		const standardActions = (
			<RaisedButton
			  label="关闭"
			  primary={true}
			  onTouchTap={this.handleRequestClose}
			/>
		);
		return(
			<div>
				{this.state.loaded &&
					<div className="sellcard">
						<div className="cardHeader" style={{textAlign:"center"}}>
							<div>
								<span style={{color: "#2196F3",cursor:"pointer"}} onClick={this.handleTouchTap}>{article.Extra.Root}</span>
							</div>							
							<div>
								<span style={{marginRight: "5px"}}>文章: </span>
								<span><Link to={urlPath + 'article/'+ share.assetId} > {article.Title.slice(0,5) + "..." }</Link></span>
							</div>
							<div>
								<span>作者: </span><span>{article.ousers.nickname}</span>
							</div>							
						</div>
						<div className="cardFooter">
							<div style={{fontSize:"12px",margin:"5px"}}>
								<div style={{float:"left"}}>
									<span>版券: </span><span>{share.sellNum}</span><span> EBS</span>
								</div>
								<div style={{float:"right"}}>
									<span>单价: </span><span>{(share.price/100000000/share.sellNum).toFixed(4)}</span><span> EBC/EBS</span>
								</div>
							</div>
							<div style={{fontSize:"36px",padding:"50px 5px 20px",color:"#FF9800"}}>{share.price/100000000}<span style={{fontSize:"20px"}}> EBC</span></div>
							<BuyModal share={share} article={article}/>
						</div>
				        <Dialog
			            open={this.state.open}
			            contentClassName='accountModal'           
			            title={ iconTitle }
			            titleClassName='TransferTitle'
			            onRequestClose={this.handleRequestClose}
			            autoScrollBodyContent={true}
			            actions= {standardActions}
			            bodyStyle={{padding:"0 20px 24px",borderBottom:"1px solid #ccc"}}
			            >
			            	<ShareList assetId={share.assetId}/>
			            </Dialog>
					</div>
				}
			</div>
	    );				    			
	}
});