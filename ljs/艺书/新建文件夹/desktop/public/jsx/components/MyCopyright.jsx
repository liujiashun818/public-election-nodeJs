"use strict";
import React from 'react';
import ReactPaginate from 'react-paginate';
import CircularProgress from 'material-ui/CircularProgress';
import { CopyrightBlock } from './Copyright/CopyrightBlock.jsx';

var ebookchain = nodeRequire('js-sdk');


module.exports.MyCopyright= React.createClass({
	getInitialState:function(){
		return{
			articles:[],
			loaded: false,
			pageCount: 0,
			perPage: 12,
			offset: 0,
		}
	},
	componentDidMount(){
		this.getArticles();
	},
	getArticles(){
		let self = this;
		this.setState({loaded: false});
		let {pageCount, perPage, offset} = this.state ;
		let adds = global.currentUser.wallets[0].address;
		ebookchain.request.getMyCopyright( adds, offset, perPage).then(data=>{
			if (data && data.success) {
			  console.log(data);
			  self.setState({
			  	pageCount: Math.ceil(data.count/perPage),
			  	articles: data.articlesCopyright,
			  	loaded: true
			  });
			}
		}).catch(function(err){
			console.log(err);
		});
	},
	handlePageClick(data){
		console.log(data);
		let selected = data.selected;
		let offset = Math.ceil(selected * this.state.perPage);
		this.setState({offset: offset}, () => {
		  console.log(this.state.offset);
		  this.getArticles();
		});
	},
	render(){
	    let { articles, loaded }= this.state;
	    console.log(articles);
		const copyRightList = articles.map((article)=>{
				return(
					<div className="col-xs-6 col-sm-4 col-md-4">
						<CopyrightBlock aCopyright={article}/>
					</div>
			    );
			});
		return (
			<div className="containerwrap" style={{backgroundColor:"#CCC"}}>
				<div className="container" style={{marginTop:"20px"}}>				
						<div>
						 <div className="row">{copyRightList}</div>
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
						{!loaded &&
						 <div style={{marginTop:"80px",textAlign:"center"}}><CircularProgress size={60} thickness={7} /></div>
						}	
				</div>
			</div>
		);
	}
});