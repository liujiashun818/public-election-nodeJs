"use strict";
import React from 'react';
import ReactPaginate from 'react-paginate';
import CircularProgress from 'material-ui/CircularProgress';
import { ArticleList } from './Read/ArticleList.jsx';

var ebookchain = nodeRequire('js-sdk');
var xdesktop = nodeRequire('xdesktop-render');

function getTm(tm) {
  var t = new Date(tm);
  return t.toLocaleDateString();
}

module.exports.MyArticle = React.createClass({
		getInitialState:function(){
			return{
				articles:[],
				isLoading: true,
				pageCount: 0,
				perPage: 10,
				offset: 0,				
			}
		},
		componentWillMount(){
			this.getMyArticles();
		},
		getMyArticles(){
			let {pageCount, perPage, offset}=this.state;
			let self = this;
			let userId = global.currentUser.userId;
			$.ajax({
			      headers: {
			        Authorization: global.currentUser.Authorization    //必须
			      },
			      url: xdesktop.tools.resolve('/api/ousers/'+ userId + '/oarticles?filter[include]=ousers&filter[limit]=' + perPage + '&filter[skip]='+ offset +'&filter[order]=CreatedTime DESC'),
			      type: 'GET',
			      success: function(res) {
					console.log(res);
					self.setState({articles: res});
					self.setState({isLoading: false});
			      },
			      error: function(err) {
			        console.error(err);
			      },
			      complete: function(){
			      }
			});
			$.ajax({
			      headers: {
			        Authorization: global.currentUser.Authorization    //必须
			      },
			      url: xdesktop.tools.resolve('/api/ousers/'+ userId + '/oarticles/count'),
			      type: 'GET',
			      success: function(res) {
					self.setState({pageCount: Math.ceil(res.count/perPage)});
			      },
			      error: function(err) {
			        console.error(err);
			      },
			});
		},
		handlePageClick(data){
			this.setState({loaded: false});
			let selected = data.selected;
			let offset = Math.ceil(selected * this.state.perPage);
			this.setState({offset: offset}, () => {
			  this.getMyArticles();
			});
		},
		render: function () {
			let { articles, isLoading } = this.state;
		    return (
		    	<div className="containerwrap">
		    		<div className="postList" style={{backgroundColor:"#fff",position:"absolute",top:0, bottom:0, left:0, right:0, overflowY:"auto",overflowX:"hidden"}}>	    			
		    			<div className="container">
		    				<div className="row">
								<div className="col-md-10 col-sm-10 col-xs-10 col-sm-offset-1 col-xs-offset-1 col-md-offset-1">	    		
									{isLoading && <div style={{marginTop:"80px",textAlign:"center"}}><CircularProgress size={60} thickness={7}/></div>}
									{articles[0]
									 ?<ArticleList articles={articles}/>
									 :<div style={{marginTop:"80px",textAlign:"center"}}>暂无版权</div>
									}
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
			    			</div>
		    			</div>
		    		</div>	
		    	</div>
		    );
		}
	});