"use strict";
import React from 'react';
import ReactPaginate from 'react-paginate';
import { PageHeader } from './Wallet/PageHeader.jsx';
import CircularProgress from 'material-ui/CircularProgress';

var ebookchain = nodeRequire('js-sdk');

function getStampTime(tm) {
  var otime = Date.UTC(2017, 1, 27, 10, 0, 0, 0)
  var t = new Date(tm*1000 + otime);
  return t.toLocaleString();
}

//------------表格------------------//
var TransTable = React.createClass({
	getInitialState(){
		return{
			transactions:[],
			pageCount: 0,
			perPage: 10,
			offset: 0,
			loaded: false,
		};
	},
	componentDidMount(){
		this.getTransactions();
	},
	getTransactions(){
		let {transactions, perPage, offset}= this.state;	
		let self=this;
		let address = global.currentUser.wallets[0].address ;
		if(address){
			ebookchain.request.getTransactionsByUser(address, offset, perPage).then(data=>{
				if (data && data.success) {
					console.log(data);
			    	self.setState({transactions:data.transactions});
			    	self.setState({pageCount: Math.ceil(data.count/perPage)});
			    	self.setState({loaded:true});
				}
			});
		}
	},
	handlePageClick(data){
		this.setState({loaded: false});
		let selected = data.selected;
		let offset = Math.ceil(selected * this.state.perPage);
		this.setState({offset: offset}, () => {
		  this.getTransactions();
		});
	},
	render: function(){
		let {transactions} = this.state;
		let tableBody = transactions.map((item) => {
				return (
					<tr className="tablebody">
						<td>{ item.state == 'apply' 
								? <i className="material-icons">done</i> 
								: <i className="material-icons">data_usage</i>
							}
							{ item.state }
						</td>					
						<td>{item.id}</td>
						<td>{item.height}</td>
						<td>
							{item.type == 0 && '转账'}
							{item.type == 2 && '授权委托'}
							{item.type == 3 && '投票'}
							{item.type == 7 && '注册版权'}
							{item.type == 9 && '出售版券'}
							{item.type == 10 && '购买版券'}
							{item.type == 11 && '停止出售'}
						</td>
						<td>{item.type == 0 && 
								<div>
									<div><span style={{display:"inline-block",width:"70px"}}>接收者 :</span><a href="#" >{item.asset.recipientId}</a></div>
									<div><span style={{display:"inline-block",width:"70px"}}>金额 :</span><span>{item.asset.amount/1000000000}</span> EBC</div>								
								</div>
							}
							{item.type == 7 && 
								<div>
									<div><span style={{display:"inline-block",width:"70px"}}>版权ID :</span><a href="#">{item.asset.root}</a></div>						
								</div>
							}
							{item.type == 9 && 
								<div>
									<div><span style={{display:"inline-block",width:"70px"}}>版券ID :</span><a href="#">{item.id}</a></div>
									<div><span style={{display:"inline-block",width:"70px"}}>出售版权 :</span><a href="#">{item.asset.assetId}</a></div>
									<div><span style={{display:"inline-block",width:"70px"}}>出售数量 :</span><span>{item.asset.num}</span></div>
									<div><span style={{display:"inline-block",width:"70px"}}>售价 :</span><span>{item.asset.price/1000000000}</span> EBC</div>								
								</div>
							}
							{item.type == 10 && 
								<div>
									<div><span style={{display:"inline-block",width:"70px"}}>版券ID :</span><a href="#">{item.asset.id}</a></div>
									<div><span style={{display:"inline-block",width:"70px"}}>金额 :</span><span>{item.asset.price/1000000000}</span> EBC</div>					
								</div>
							}
							{item.type == 11 && 
								<div>
									<div><span style={{display:"inline-block",width:"70px"}}>版券ID :</span><a href="#">{item.asset.id}</a></div>					
								</div>
							}																		
						</td>
						<td>{item.fee/1000000000}</td>		
						<td>{getStampTime(item.timestamp)}</td>																	
					</tr>
				);			
			});
		return(
			<div style={{margin:"20px 50px"}}>
				<table className="table table-striped table-hover" style={{boxShadow: "1px 1px 5px 3px #ddd",marginTop:10}}>
					<thead>
						<tr>
							<th>状态</th>
							<th>交易ID</th>
							<th>块高</th>
							<th>交易类型</th>
							<th>交易详情</th>
							<th>费用</th>
							<th>日期</th>
						</tr>
					</thead>
					<tbody>	{tableBody}	</tbody>
				</table>
				{ !transactions[0] && <div style={{marginTop:"80px",textAlign:"center"}}>无交易记录</div>}
				{this.state.pageCount>1 && 
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
			</div>
		);
	}
});

module.exports.Transaction = React.createClass({
		render: function () {
		    return (
		    	<div className="containerwrap">
			    	<PageHeader pageName="交易列表" />
			    	<TransTable />
			    </div>
		    );
		}
});
