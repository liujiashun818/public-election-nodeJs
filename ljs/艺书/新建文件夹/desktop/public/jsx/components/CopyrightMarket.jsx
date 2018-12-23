
"use strict";
import React from 'react';
import ReactPaginate from 'react-paginate';
import { PageHeader } from './Wallet/PageHeader.jsx';
import CircularProgress from 'material-ui/CircularProgress';
import FlatButton from 'material-ui/FlatButton';
import { Link } from 'react-router';
import utils from '../../js/libs/utils.js';

const urlPath = utils.basePath();
var ebookchain = nodeRequire('js-sdk');

function getTm(tm) {
  var t = new Date(tm);
  return t.toLocaleString();
}

var CopyrightTable = React.createClass({
	getInitialState(){
		return{
			copyRights:[],
			pageCount: 0,
			perPage: 20,
			offset: 0,
			loaded: false,
		};
	},
	componentDidMount(){
		this.getCopyRights();
		this.getSellCopyRights();
	},	
	getCopyRights(){
		let {copyRights, perPage, offset} = this.state;
		let self = this;
		ebookchain.request.getArticlesCopyright(offset, perPage).then(data=>{
			if (data && data.success) {
				console.log("前20版权信息");
				console.log(data);
		    	self.setState({copyRights:data.articlesCopyright});
		    	self.setState({pageCount: Math.ceil(data.count/perPage)});
		    	self.setState({loaded:true});
			}
		});
	},
	getSellCopyRights(){
		ebookchain.request.sellMarket(0, 10).then(data=>{
			if (data && data.success) {
				console.log("出售的版权");
				console.log(data);
			}
		});
	},
	handlePageClick(data){
		this.setState({loaded: false});
		let selected = data.selected;
		let offset = Math.ceil(selected * this.state.perPage);
		this.setState({offset: offset}, () => {
		  this.getCopyRights();
		});
	},
	getShares(e){
		let assetId = e.target.id;
		console.log(assetId);
		ebookchain.request.shares(assetId, 0, 10).then(data=>{
			if (data) {
				console.log("获取该版权中出售的版权券");
			    console.log(data)
			}	
		})
	},
	render: function(){
		let {copyRights, loaded} = this.state;

		let tableBody = copyRights.map((item) => {
				return (
					<tr className="tablebody">
				        <td style={{color:"#00bcd4"}} id={item.assetId} onClick={this.getShares}>{item.root}</td>
				        <td style={{color:"#00bcd4"}}><Link to={urlPath + 'article/'+ item.assetId} > {item.assetId}</Link></td>
				        <td>{item.owner}</td>
				        <td>0</td>
				        <td>{getTm(item.created)}</td>
				        <td>{item.expired?"是":"否"}</td>			        		        																		
					</tr>
				);			
			});
		return(
			<div>			
				<div style={{margin:"20px 50px"}}>				
					<table className="table table-striped table-hover" style={{boxShadow: "1px 1px 5px 3px #ddd"}}>
						<thead>
							<tr className="header">
			                    <th>版权ID</th>
			                    <th>文章标题</th>
			                    <th>创作者</th>
			                    <th>出售版券</th>
			                    <th>注册日期</th>
			                    <th>是否过期</th>                    			
							</tr>
						</thead>
						<tbody>
							{tableBody}
						</tbody>
					</table>
					{!copyRights[0] && <div style={{marginTop:"80px",textAlign:"center"}}><CircularProgress size={60} thickness={7} /></div>	}
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
			</div>
		);
	}
});

module.exports.CopyrightMarket = React.createClass({
	render: function () {
	    return (
	    	<div className="containerwrap">
		    	<PageHeader pageName="版权出售列表" />
		    	<CopyrightTable />
	    	</div>
	    );
	}
});