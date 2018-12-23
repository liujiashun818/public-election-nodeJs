"use strict";
import React from 'react';
import ReactPaginate from 'react-paginate';
import CircularProgress from 'material-ui/CircularProgress';
import { SharePannel } from './Copyright/SharePannel.jsx';
import { MySellCard } from './Copyright/MySellCard.jsx';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';

var ebookchain = nodeRequire('js-sdk');
var xdesktop = nodeRequire('xdesktop-render');

module.exports.MyShare= React.createClass({
	getInitialState:function(){
		return{
			loaded: false,
			myShareData:[],
			pageCount: 0,
			perPage: 10,
			offset: 0,
			mySellData:[],
			pageCountS: 0,
			perPageS: 12,
			offsetS: 0,
			showShare: true,			
		}
	},
	componentDidMount(){
		this.getMyShares();
	},
	getMyShares(){
		this.setState({loaded: false});
		let self = this;
		let {pageCount, perPage, offset} = this.state ;
		let adds = global.currentUser.wallets[0].address;
		ebookchain.request.myShares(adds, offset, perPage).then(data=>{
			if (data && data.success) {
			  console.log("我的版权券 by address");
			  console.log(data);
			  self.setState({pageCount: Math.ceil(data.count/perPage)});
			  self.setState({myShareData: data.shares});
			  self.setState({loaded:true});
			}
		}).catch(function(err){
			console.log(err);
		});
	},
	getMySells(){
		this.setState({loaded: false});
		let self = this;
		let {pageCountS, perPageS, offsetS} = this.state ;
		let adds = global.currentUser.wallets[0].address;
		ebookchain.request.mySell(adds, offsetS, perPageS).then(data=>{
			if (data && data.success) {
			  console.log("我的版权券 by address");
			  console.log(data);
			  self.setState({pageCountS: Math.ceil(data.count/perPageS)});
			  self.setState({mySellData: data.mySell});
			  self.setState({loaded:true});
			}
		}).catch(function(err){
			console.log(err);
		});
	},
	handleShareClick(){
		this.setState({showShare: true});
		this.getMyShares();
	},
	handleSellClick(){
		this.setState({showShare: false});
		this.getMySells();	
	},
	handlePageClick(data){
		//this.setState({loaded: false});
		let selected = data.selected;
		let offset = Math.ceil(selected * this.state.perPage);
		this.setState({offset: offset}, () => {
		  this.getMyShares();
		});
	},
	handleSellPageClick(data){
		//this.setState({loaded: false});
		let selected = data.selected;
		console.log(selected);
		let offsetS = Math.ceil(selected * this.state.perPageS);
		this.setState({offsetS: offsetS}, () => {
		  this.getMySells();
		});
	},
	render(){
	    let { myShareData, mySellData, showShare }= this.state;
	    console.log(myShareData);
		let myShareList = myShareData.map((item)=>{
				return(
					<SharePannel share = {item} getMyShares={this.getMyShares}/>
			    );
			});
		let mySellList = mySellData.map((item)=>{
				return(
						<div className="col-xs-6 col-sm-4 col-md-3">
							<MySellCard mySell = {item} getMySells={this.getMySells} />
						</div>
			    );
			});
		return (
			<div className="containerwrap" style={{padding:"30px 30px 0"}}>
				<div >
			      <FlatButton
			        label="全部版券"
			        onTouchTap={this.handleShareClick}
			        style={{marginRight:"12px"}}
			      />
			      <FlatButton
			        label="销售中的版券"
			        keyboardFocused={true}
			        onTouchTap={this.handleSellClick}
			        style={{marginRight:"12px"}}
			      />
				</div>
				<hr />
				<div className="shareContainer">
						{!this.state.loaded && <div style={{position:"absolute",top:"0",left:"0",right:"0",bottom:"0",marginTop:"150px",textAlign:"center"}}><CircularProgress size={60} thickness={7} /></div>}
						{showShare
						 ?<div>
						 	{ myShareList }
							{this.state.pageCount>1 && 
								<div className="text-center">
								  <ReactPaginate 
						           previousLabel={<i className="material-icons md-18">keyboard_arrow_left</i>}
				                   nextLabel={<i className="material-icons md-18">keyboard_arrow_right</i>}
				                   breakLabel={<a>...</a>}
				                   breakClassName={"break-me"}
				                   pageCount={this.state.pageCount}
				                   marginPagesDisplayed={2}
				                   pageRangeDisplayed={5}
				                   onPageChange={this.handlePageClick}
				                   containerClassName={"pagination"}
				                   subContainerClassName={"pages pagination"}
				                   activeClassName={"active"}
				                  />
				                </div>
			            	}						 	
						  </div>
						 :<div>
							<div className="row">{ mySellList }</div>
							{this.state.pageCountS>1 && 
								<div className="text-center">
								  <ReactPaginate 
						           previousLabel={<i className="material-icons md-18">keyboard_arrow_left</i>}
				                   nextLabel={<i className="material-icons md-18">keyboard_arrow_right</i>}
				                   breakLabel={<a>...</a>}
				                   breakClassName={"break-me"}
				                   pageCount={this.state.pageCountS}
				                   marginPagesDisplayed={2}
				                   pageRangeDisplayed={5}
				                   onPageChange={this.handleSellPageClick}
				                   containerClassName={"pagination"}
				                   subContainerClassName={"pages pagination"}
				                   activeClassName={"active"}
				                  />
				                </div>
			            	}
						 </div>
						}	
				</div>
			</div>
		);
	}
});