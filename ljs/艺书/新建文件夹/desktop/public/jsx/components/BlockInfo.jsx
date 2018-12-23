"use strict";
import React from 'react';
import ReactPaginate from 'react-paginate';
import { PageHeader } from './Wallet/PageHeader.jsx';
import { FilterBar } from './Wallet/FilterBar.jsx';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';

var ebookchain = nodeRequire('js-sdk');

function getStampTime(tm) {
  var otime = Date.UTC(2017, 1, 27, 10, 0, 0, 0)
  var t = new Date(tm*1000 + otime);
  return t.toLocaleString();
}


//-------------- blockInfo页面 -------------------------//
var BlockTable = React.createClass({
	getInitialState(){
		return{
			blocks:[],
			curBlock:"",
			pageCount: 0,
			perPage: 20,
			offset: 0,
			loaded: false,
			showFilter:false,   //显示一个条目
			isBlocks:true,     // 是不是块，多个条目
		};
	},
	componentDidMount(){
		this.getBlocks();
	},
		
	componentWillUnmount(){
		this.updatetimer && clearTimeout(this.updatetimer);
	},	
	
	getBlocks(){
		this.updatetimer && clearTimeout(this.updatetimer);
		let {blocks, perPage, offset} = this.state;
		let self=this;
		self.setState({loaded:false});
		self.setState({isBlocks:true});
		ebookchain.request.getBlocks(offset, perPage).then(data=>{
			if (data && data.success) {
				console.log(data);
		    	self.setState({blocks:data.blocks});
		    	self.setState({pageCount: Math.ceil(data.count/perPage)});
		    	self.setState({loaded:true});
			    self.setState({showFilter:false});
				
			}
		});
		if(self.state.showFilter){
			return;
		};
		if(!self.state.showFilter&&self.state.isBlocks ){
		    self.updatetimer = setTimeout(function(){
		        self.getBlocks();
		    	console.log("Blocks Updated");
		    },10000);
		};
	},
	// 重新获得所有区块信息
	newGetAllBlocks:function(event){
		var self = this;
		self.getBlocks();

	},
	//得到filterbar内容
   getFilterInfo(id){
   	        console.log(this.state.showFilter);
   			if(this.state.showFilter){
   				return;
   			};
			let {curBlock} = this.state;
			let self = this;
			self.setState({loaded:false});
			self.setState({isBlocks:false});//第一次输入id的时候，定时器还是在运行中，所以会出现输入id之后，输入框为空的内容
			console.log(curBlock);
			ebookchain.request.getBlock(id).then(data=>{
				if(data&&data.success&&data.block==null){
					alert("您输入的区块ID不存在");
					return;
				};
				if(data&&data.success&&data.block!=null){
					self.setState({curBlock:data.block});
					self.setState({showFilter:true});
					self.setState({loaded:true});
					self.setState({isBlocks:false});
					console.log(self.state.curBlock);
				};
			});
		},
	handlePageClick(data){
		this.setState({loaded: false});
		let selected = data.selected;
		let offset = Math.ceil(selected * this.state.perPage);
		this.updatetimer && clearTimeout(this.updatetimer);
		this.setState({offset: offset}, () => {
		  this.getBlocks();
		});
	},
	
	openBlock(e){
		let {curBlock} = this.state;
		let self = this;
		console.log(e.target.text);	
		ebookchain.request.getBlock(e.target.text).then(data=>{
			if (data && data.success) {
		    	self.setState({curBlock:data.block});
		    	console.log(data);
			}
		});
	},
   
	render: function(){
		let {blocks, curBlock, loaded} = this.state;
		let tableBody = blocks.map((item) => {
				return (
					<tr className="tablebody">
				        <td ><a style={{color:"#00bcd4"}} href="#" data-toggle="modal" data-target="#blockModal" onClick={this.openBlock}>{item.id}</a></td>
				        <td>{item.height}</td>
				        <td>{getStampTime(item.timestamp)}</td>
				        <td>{item.numberOfTransactions}</td>
				        <td>{item.generator}</td>
				        <td>{item.totalAmount/100000000}</td>
				        <td>{item.reward/100000000}</td>																			
					</tr>
				);			
			});
		if(this.state.showFilter){
			let  self = this;
			var  filterBody = function(){
				return(
					<tr className="tablebody">
				        <td ><a style={{color:"#00bcd4"}} href="#" data-toggle="modal" data-target="#blockModal" onClick={self.openBlock}>{curBlock.id}</a></td>
				        <td>{curBlock.height}</td>
				        <td>{getStampTime(curBlock.timestamp)}</td>
				        <td>{curBlock.numberOfTransactions}</td>
				        <td>{curBlock.generator}</td>
				        <td>{curBlock.totalAmount/100000000}</td>
				        <td>{curBlock.reward/100000000}</td>																			
					</tr>)
				
			 }();
		};
		return(
			<div>			
				<div style={{margin:"20px 50px"}}>	
					<FilterBar isBlocks={this.state.isBlocks} getFilterInfo={this.getFilterInfo} />			
					<table className="table table-striped table-hover" style={{boxShadow: "1px 1px 5px 3px #ddd",position:"relative"}}>
						<thead>
							<tr className="header">
			                    <th>区块ID</th>
			                    <th>块高</th>
			                    <th>日期</th>
			                    <th>交易</th>
			                    <th>产生节点</th>
			                    <th>总额</th>
			                    <th>奖励</th>			
							</tr>
						</thead>
						{this.state.showFilter
						?
						<tbody>
							{!loaded && <div style={{position:"absolute",top:"0",left:"0",right:"0",bottom:"0",backgroundColor:"rgba(0,0,0,0.05)",marginTop:"150px",textAlign:"center"}}><CircularProgress size={60} thickness={7} /></div>}
							{filterBody}
						</tbody>
						:
						<tbody>
							{!loaded && <div style={{position:"absolute",top:"0",left:"0",right:"0",bottom:"0",backgroundColor:"rgba(0,0,0,0.05)",marginTop:"150px",textAlign:"center"}}><CircularProgress size={60} thickness={7} /></div>}
							{tableBody}
						</tbody>
						}
					</table>
					{this.state.showFilter
					?
					<div onClick={this.newGetAllBlocks} style={{color:"#fff",height:"40px",width:"170px",backgroundColor:"#2196F3" ,padding:"0px 10px",cursor:"pointer",borderRadius:"20px",color:"#fff",fontSize:"14px",lineHeight:"40px",verticalAlign:"baseline",textAlign:"center"}}>
				    	点击查看全部区块信息
				    </div>
					:				
			        <ReactPaginate 
			           previousLabel={"previous"}
                       nextLabel={"next"}
                       breakLabel={<a>...</a>}
                       breakClassName={"break-me"}
                       pageCount={this.state.pageCount}
                       marginPagesDisplayed={2}
                       pageRangeDisplayed={5}
                       onPageChange={this.handlePageClick}
                       containerClassName={"pagination"}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"}
                    />}
					<BlockModal  curBlock={curBlock}/>
				</div>
			</div>
		);
	}
});
var BlockModal = React.createClass({
	render: function(){
		let {curBlock} = this.props;
    	let transactionList = [];
    	if(curBlock){
			transactionList = curBlock.transactions.map((transaction)=>{
			    return (
					    <tr>
					        <td>{transaction.id}</td>
					        <td>{transaction.sender}</td>
					        <td>{transaction.type}</td>
					        <td>{transaction.asset.amount/100000000}</td>
					        <td>{transaction.fee/100000000}</td>
					        <td>{transaction.asset.recipientId}</td>
					        <td>{transaction.timestamp}</td>
					    </tr>
			    );
			});
    	}
		return(
			<div  stype={{position:'relative'}} className="modal fade bs-example-modal-lg" id="blockModal" tabindex="-1" role="dialog">
				
			  <div className="modal-dialog modal-lg" style={{width:800}} role="document">
			    <div className="modal-content">
					
			      <div className="modal-header">
			        <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
			        <div className="modal-title text-center">
				            <h3>Block #{curBlock.height}</h3>
				            <h4>ID: {curBlock.id}</h4>
			        </div>
			      </div>
			      <div className="modal-body">
				    <div className="row">
				        <div className="col-md-6">
				            <div className="col-md-5 text-left"><strong>Height</strong></div>
				            <div className="col-md-7">{curBlock.height}</div>
				        </div>
				        <div className="col-md-6">
				            <div className="col-md-5 text-left"><strong>Timestamp</strong></div>
				            <div className="col-md-7">{curBlock.timestamp}</div>
				        </div>
				        <div className="col-md-6">
				            <div className="col-md-5 text-left"><strong>Previous Block</strong></div>
				            <div className="col-md-7">{curBlock.previousBlock}</div>
				        </div>
				        <div className="col-md-6">
				            <div className="col-md-5 text-left"><strong>Next Block</strong></div>
				            <div className="col-md-7"> </div>
				        </div>
				        <div className="col-md-6">
				            <div className="col-md-5 text-left"><strong>Transactions</strong></div>
				            <div className="col-md-7">{curBlock.numberOfTransactions}</div>
				        </div>
				        <div className="col-md-6">
				            <div className="col-md-5 text-left"><strong>Size</strong></div>
				            <div className="col-md-7">{curBlock.payloadLength}</div>
				        </div>
				        <div className="col-md-6">
				            <div className="col-md-5 text-left"><strong>totalAmount</strong></div>
				            <div className="col-md-7">{curBlock.totalAmount/100000000}</div>
				        </div>
				        <div className="col-md-6">
				            <div className="col-md-5 text-left"><strong>totalFee</strong></div>
				            <div className="col-md-7">{curBlock.totalFee/100000000}</div>
				        </div>
				    </div>
				    <div className="row">
				        <div className="col-md-12" style={{marginTop:30}}>
				            <h3 className="text-center">Transactions </h3>
				            <table className="table table-hover">
				                <thead>
				                    <tr>
				                        <th>Id</th>
				                        <th>SenderId</th>
				                        <th>Type</th>
				                        <th>Amount</th>
				                        <th>Fee</th>
				                        <th>RecipientId</th>
				                        <th>Timestamp</th>
				                    </tr>
				                </thead>
				                <tbody>
				                	{transactionList}
				                </tbody>
				            </table>
				        </div>
				    </div>
			      </div>
			      <div className="modal-footer">
			        <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
			        <button type="button" className="btn btn-primary">Save changes</button>
			      </div>
			    </div>
			  </div>
			</div>
		);
	}
})
var BlockInfo = React.createClass({
	
		render: function () {
		    return (
		    	<div className="containerwrap">
			    	<PageHeader pageName="区块列表" />
			    	<BlockTable  />
		    	</div>
		    );
		}
	});

module.exports.BlockInfo = BlockInfo;