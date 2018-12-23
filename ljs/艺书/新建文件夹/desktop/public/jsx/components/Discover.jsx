 "use strict";
import React from 'react';
import ReactPaginate from 'react-paginate';
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import CircularProgress from 'material-ui/CircularProgress';
import TextField from 'material-ui/TextField';
//import { SearchBar } from './Read/SearchBar.jsx';
import { ArticleList } from './Read/ArticleList.jsx';
import { SearchList } from './Read/SearchList.jsx';
import utils from '../../js/libs/utils.js';

var xdesktop = nodeRequire('xdesktop-render');
var ebookchain = nodeRequire('js-sdk');


function by(name){
    return function(o, p){
        var a, b;
        if(typeof o === "object" && typeof p === "object" && o && p) {
            a = o[name];
            b = p[name];
            if(a === b) {
                return 0;
            }
            if(typeof a === typeof b) {
                return a < b ? -1 : 1;
            }
            return typeof a < typeof b ? -1 : 1;
        }else{
            throw("error");
        }
    }
}

var AuthorContainer = React.createClass({
		render: function () {
			let {author}=this.props;
			let postNum = author.oarticles.length;
			return(
				<div className="authorContainer">
					<div style={{position:"absolute",top:"10px",left:"10px"}}>
						<Avatar size={40} color={"#fff"} src={author.avatar} />
					</div>
					<div style={{position:"absolute",top:"5px",left:"70px",lineHeight:"25px"}}>
						<div >{utils.hidename(author.nickname)}</div>
						<div style={{fontSize:"12px",color:"#888"}}>
							<span>文章 <b>{postNum}</b></span><span style={{marginLeft:"20px"}}>版权 <b>{postNum}</b></span>
						</div>
					</div>
				</div>
			);
		}
	});

module.exports.Discover = React.createClass({
		getInitialState:function(){
			return{
				articles:[],
				authorListData:[],
				isLoadingA: true,
				pageCount: 0,
				perPage: 10,
				offset: 0,
				authorNum: 0,
				pageCountA: 0,
				perPageA: 10,
				offsetA: 0,
				searchWords: '',
				showSearch: false,
			}
		},
		componentWillMount(){
			this.getArticles();
			this.getAuthors();
		},
		getArticles(){
			this.setState({isLoadingA: true});
			let {pageCount, perPage, offset}=this.state;
			let self = this;
			$.ajax({
		      headers: {
		        Authorization: global.currentUser.Authorization    //必须
		      },
		      url: xdesktop.tools.resolve('/api/oarticles?filter[include]=ousers&filter[limit]=' + perPage + '&filter[skip]='+ offset +'&filter[order]=CreatedTime DESC'),
		      type: 'GET',
		      success: function(res) {
				console.log(res);
				self.setState({articles: res});
				self.setState({isLoadingA: false});
		      },
		      error: function(err) {
		        console.error(err);
		      },
			});	
			$.ajax({
			      headers: {
			        Authorization: global.currentUser.Authorization    //必须
			      },
			      url: xdesktop.tools.resolve('/api/oarticles/count'),
			      type: 'GET',
			      success: function(res) {
					self.setState({pageCount: Math.ceil(res.count/perPage)});
			      },
			      error: function(err) {
			        console.error(err);
			      },
			});
		},
		getSearchArticles(){
			this.setState({isLoadingA: true});
			let { searchWords }=this.state;
			let self = this;
			$.ajax({
		      headers: {
		        Authorization: global.currentUser.Authorization    //必须
		      },
		      url: xdesktop.tools.resolve('/api/oarticles/findbytit/'+ searchWords),
		      type: 'GET',
		      success: function(arti) {
		      			console.log("arti1");
						console.log(arti);
						self.setState({
						articles: arti,
						showSearch: true,
						isLoadingA: false,
				});	
		      },
		      error: function(err) {
		        console.error(err);
		      },
			});	
		},
		handlePageClick(data){
			let selected = data.selected;
			let offset = Math.ceil(selected * this.state.perPage);
			this.setState({offset: offset}, () => {
			  this.getArticles();
			});
		},
		handlePageAClick(data){
			let selected = data.selected;
			let offsetA = Math.ceil(selected * this.state.perPageA);
			this.setState({offsetA: offsetA}, () => {
			  this.getAuthors();
			});
		},
		handleSearchChange: function(e){
			this.setState({	searchWords: this.refs.mySearchWords.input.value});
			console.log(this.state.searchWords);
		},
		//bug解决，如果输入空白字符，不执行搜索事件，
		//???执行过搜索事件，删除搜索字样，应该点击返回文章列表,未解决
		handleSearchClick(){
			let searchWords= this.state.searchWords;
			var pattern =  /^[\s]{0,}$/;
			console.log(pattern.test(searchWords));
			if(pattern.test(searchWords)){
				alert("请输入您要查询的信息");
				return;
			}else if(searchWords){
			    this.getSearchArticles();
			   
			}else{
				this.getArticles();
			};
		
		},

		getAuthors(){
			let {pageCountA, perPageA, offsetA}=this.state;
			let self = this;
			$.ajax({
			      headers: {
			        Authorization: global.currentUser.Authorization    //必须
			      },
			      url: xdesktop.tools.resolve('/api/ousers?filter[include]=oarticles&filter[limit]=' + perPageA + '&filter[skip]='+ offsetA +'&filter[order]=lastUpdated DESC'),
			      type: 'GET',
			      success: function(res) {
					console.log(res);
					//authors.sort(by("postNum")).reverse();
					self.setState({authorListData: res});
			      },
			      error: function(err) {
			        console.error(err);
			      },
			});
			$.ajax({
			      headers: {
			        Authorization: global.currentUser.Authorization    //必须
			      },
			      url: xdesktop.tools.resolve('/api/ousers/count'),
			      type: 'GET',
			      success: function(res) {
					self.setState({authorNum: res.count});
					let showcount = Math.ceil(res.count/perPageA);
					if(showcount > 5){
						showcount = 5;
					}
					self.setState({pageCountA: showcount});			
			      },
			      error: function(err) {
			        console.error(err);
			      },
			});					
		},
		render: function () {
			let { articles ,isLoadingA, authorListData, showSearch} = this.state;
			const authorList = authorListData.map((Item)=>{
				return <AuthorContainer author={Item}/>;
			});
		    return (
		    	<div className="containerwrap">
		    		<div className="postList" style={{backgroundColor:"#fff",position:"absolute",top:0, bottom:0, left:0, right:0, overflowY:"auto",overflowX:"hidden"}}>
						<div style={{height:"60px",margin:"30px auto",padding:"10px",textAlign:"center"}}>
							<h2 style={{display:"inline-block",marginRight:"20px",verticalAlign:"middle"}}>亿书</h2>
							<div style={{display:"inline-block"}}>
								<TextField
							      hintText="search"
								    value={this.state.searchWords}
						 		    onChange={this.handleSearchChange}
							      underlineShow = {false}
							      inputStyle={{border:"1px solid #2196F3",height:"40px",lineHeight:"40px",textIndent:"10px",verticalAlign:"baseline"}}
							      hintStyle={{height:"40px",lineHeight:"40px",textIndent:"10px",bottom:0}}
							      style={{height:"40px",width:"500px"}}
							      ref="mySearchWords"      
							    />
							</div>
							<div onClick={this.handleSearchClick} style={{display:"inline-block",backgroundColor:"#2196F3",color:"#fff", height:"40px",lineHeight:"40px",width:"100px",textAlign:"center",cursor:"pointer"}}>
								<i className="material-icons">search</i><span style={{marginLeft:"10px"}}>搜索</span>
							</div>
						</div>
						{/*<div style={{width:"70%",margin:"30px auto",textAlign:"center"}}>
					        <Chip style={{margin:10,display:"inline-block",backgroundColor:"#E3F2FD"}} >
					          <Avatar size={32} color={"#fff"} src="./public/images/4.jpg" />
					          历史
					        </Chip>
					        <Chip style={{margin:10,display:"inline-block",backgroundColor:"#E3F2FD"}} >
					          <Avatar size={32} color={"#fff"} src="./public/images/1.jpg" />
					          科学
					        </Chip>
					        <Chip style={{margin:10,display:"inline-block",backgroundColor:"#E3F2FD"}} >
					          <Avatar size={32} color={"#fff"} src="./public/images/7.jpg" />
					          教育
					        </Chip>
					        <Chip style={{margin:10,display:"inline-block",backgroundColor:"#E3F2FD"}} >
					          <Avatar size={32} color={"#fff"} src="./public/images/3.jpg" />
					          互联网
					        </Chip>
					        <Chip style={{margin:10,display:"inline-block",backgroundColor:"#E3F2FD"}} >
					          <Avatar size={32} color={"#fff"} src="./public/images/2.jpg" />
					          诗歌,散文
					        </Chip>
					        <Chip style={{margin:10,display:"inline-block",backgroundColor:"#E3F2FD"}} >
					          <Avatar size={32} color={"#fff"} src="./public/images/6.jpg" />
					          音乐,艺术
					        </Chip>						        						        						        						        						       
				        </div>	*/}   			
		    			<div className="container-fluid">
		    				<div className="row">
		    					{!showSearch
								?<div className="col-md-7 col-sm-7 col-xs-7 col-sm-offset-1 col-xs-offset-1 col-md-offset-1">		    		
									{isLoadingA
										?<div style={{marginTop:"80px",textAlign:"center"}}><CircularProgress size={60} thickness={7}/></div>
										:<ArticleList articles={articles} />
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
				    			:<div className="col-md-7 col-sm-7 col-xs-7 col-sm-offset-1 col-xs-offset-1 col-md-offset-1">
									{!isLoadingA &&	<SearchList articles={articles} /> }
				    			</div>}
				    			<div className="col-md-3 col-sm-3 col-xs-3 rankList">
			    					<div className="rankHeader">作者榜<span className="pull-right" style={{marginRight:"20px"}}>总数: {this.state.authorNum}</span></div>
			    					<div className="rankBody">
			    						{authorList}
			    						{this.state.pageCountA>1 &&
			    							<div className="text-center">
											  <ReactPaginate 
									           previousLabel={<i className="material-icons md-18">keyboard_arrow_left</i>}
							                   nextLabel={<i className="material-icons md-18">keyboard_arrow_right</i>}
							                   breakLabel={<a>...</a>}
							                   breakClassName={"break-me"}
							                   pageCount={this.state.pageCountA}
							                   marginPagesDisplayed={2}
							                   pageRangeDisplayed={5}
							                   onPageChange={this.handlePageAClick}
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
		    	</div>
		    );
		}
	});