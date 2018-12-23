"use strict";
import React from 'react';
import ReactPaginate from 'react-paginate';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { Link } from 'react-router';
import { SellCard } from './Copyright/SellCard.jsx';
import utils from '../../js/libs/utils.js';

const urlPath = utils.basePath();
const xdesktop = nodeRequire('xdesktop-render');
var Logic = xdesktop.logic;
var ebookchain = nodeRequire('js-sdk');

module.exports.ShareMarket= React.createClass({
	getInitialState:function(){
		return{
			loaded: false,
			sellShareData:[],
			pageCount: 0,
			perPage: 12,
			offset: 0,
			order: 'height',
		}
	},
	componentDidMount(){
		this.getSellShares(this.state.order);
	},
	getSellShares(order){
		this.setState({loaded: false});
		let self = this;
		let {pageCount, perPage, offset} = this.state ;
		ebookchain.request.sellMarket(offset, perPage, order).then(data=>{
			if (data && data.success) {
			  console.log("版券市场");
			  console.log(data);
			  self.setState({
			  	pageCount: Math.ceil(data.count/perPage),
			  	sellShareData: data.allSell,
			  	loaded:true
			  });
			}
		}).catch(function(err){
			console.log(err);
		});
	},
	handlePageClick(data){
		let selected = data.selected;
		let { order } = this.state;
		let offset = Math.ceil(selected * this.state.perPage);
		this.setState({offset: offset}, () => {
		  this.getSellShares(order);
		});
	},
	handleTimeClick(){
		this.setState({ order: 'height'}, () => {
		  this.getSellShares(this.state.order);
		});
	},
	handlePriceClick(){
		this.setState({ order: 'price'}, () => {
		  this.getSellShares(this.state.order);
		});
	},
	render(){
	    let { sellShareData }= this.state;
	    console.log(this.state.pageCount);
		let sellShareList = sellShareData.map((item)=>{
				return(
					<div className="col-xs-6 col-sm-4 col-md-3">
						<SellCard share = {item} />
					</div>
			    );
			});
		return (
			<div className="containerwrap" style={{padding:"30px 30px 0"}}>
				<div >
				  <span style={{marginRight:"10px"}}>排序 <i className="material-icons">sort</i></span>
			      <FlatButton
			        label="按时间"
			        onTouchTap={this.handleTimeClick}
			        style={{marginRight:"12px"}}
			      />
			      <FlatButton
			        label="按售价"
			        onTouchTap={this.handlePriceClick}
			        style={{marginRight:"12px"}}
			      /> 
				</div>
				<hr />
				<div className="shareContainer">						
						<div>
						 	<div className="row">
						 		{ sellShareList }
						 	</div>
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
				        { !this.state.loaded && 
				        	<div style={{position:"absolute",top:"0",left:"0",right:"0",bottom:"0",marginTop:"150px",textAlign:"center"}}><CircularProgress size={60} thickness={7} /></div>
						}	
				</div>
			</div>
		);
	}
});