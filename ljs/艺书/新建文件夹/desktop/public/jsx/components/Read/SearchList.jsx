"use strict";
import React from 'react';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router'; 
import utils from '../../../js/libs/utils.js';
const urlPath = utils.basePath();
function getTm(tm) {
  var t = new Date(tm);
  return t.toLocaleString();
}
function abstract(c) {
	var cont = utils.Summary(c).substr(0,120) + '...';
	return cont;
}
module.exports.SearchList = React.createClass({
	render(){
		let { articles } = this.props;
		const postList = articles.map((post)=>{
			return(
				<div className="postContainer">
					<div className="postAvatar">
						<div className="pull-left">
							<Avatar size={32} color={"#fff"} src={post.userInfo.avatar} />
							<span className="postAuthor">{post.userInfo.nickname}</span>
							<span style={{color:"#999"}}>{getTm(post.CreatedTime)}</span>
						</div>							
					</div>
					<h3  style={{fontWeight:"bold"}} ><Link to={urlPath + 'article/'+ post.id} > {post.Title}</Link></h3>
					<div className="postAbstract" >{abstract(post.Content)}</div>
				</div>
			);
		});
		return (
			<div className="ebookBody" style={{backgroundColor:"#fff"}}>
				{postList}
			</div>		
		);					    			
	}
});