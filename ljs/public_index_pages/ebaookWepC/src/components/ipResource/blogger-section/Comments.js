import React from 'react';
import './Comments.css';
import Comment from "./Comment";
import { FetchGet } from '../../../service/service';

class Comments extends React.Component {
    constructor(props) {
	    super(props);
	    this.state = {
	    	comments: [],
	    	commentsCount: 0,
	    	showLoader: true,
	    	limit: 3,
	    	hot: 0
	    }
	    this.handleHotClick = this.handleHotClick.bind(this);
		this.loadMore = this.loadMore.bind(this);
		this.getComments = this.getComments.bind(this);	
   };
   componentDidMount(){
   		this.getComments();
   };
   componentWillReceiveProps(){
   		this.getComments();
   };
   getComments(){
   	   let self = this;
   	   let postId = this.props.postId;
   	//    console.log("----------postId");
   	//    console.log(postId);
   	   let url = '/api/article/comments?articleId=' + postId + '&limit=' + this.state.limit + '&hot=' + this.state.hot;
   	//    console.log(url);
   	   FetchGet(url).then((res)=>{
   	   		// console.log("-----------comments");
   	   	    // console.log(res);
   	   	    self.setState({comments: res.data.commentsList, commentsCount: res.data.commentsCount});
   	   });
   };
   handleHotClick(e){
   		// console.log(e.target.name);
   	   if(e.target.name === 'hot'){
   	   	   this.setState({hot: 1}, function(){
   	   	   		this.getComments();
   	   	   });
   	   }else{
   	   		this.setState({hot: 0},function(){
   	   	   		this.getComments();
   	   	   });
   	   }
   };


   
   loadMore(){
   		let self = this;
   		let limit2 = this.state.limit + 5;
   		this.setState({limit: limit2},function(){
   			self.getComments();
   		});
		if(limit2 >= this.state.commentsCount){
			this.setState({showLoader: false});
		}	
   }
	render(){
		if(!this.state.comments){
			return <div></div>
		}
		let commentList = this.state.comments.map((comment, index)=>{
			return <Comment key={index} comment={comment} getComments={this.getComments}/>;
		});
		return(
			<div className="comment">
				<div className="reviewContent">
					<div className="reviewConTop">
						<h4>最新评论({this.state.commentsCount})</h4>
						<p className="sort">
							<a className={`${!this.state.hot?'checked':''}`} onClick={this.handleHotClick} name='time'>时间排序</a>
							<a className={`${this.state.hot?'checked':''}`} onClick={this.handleHotClick} name='hot'>热度排序</a>
						</p>
					</div>
					{commentList}
				</div>
				{this.state.showLoader ? 
					<div className="loadMore">
						<a onClick={this.loadMore}>加载更多</a>
					</div>
					:<div>已显示全部评论</div>		
				}
			</div>			
		);
	}
}


export default Comments;