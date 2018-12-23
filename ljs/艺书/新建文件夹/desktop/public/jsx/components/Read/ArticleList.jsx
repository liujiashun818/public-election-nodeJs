"use strict";
import React from 'react';
import Avatar from 'material-ui/Avatar';
import { Link } from 'react-router'; 
import utils from '../../../js/libs/utils.js';
const urlPath = utils.basePath();

var xdesktop = nodeRequire('xdesktop-render');

function getTm(tm) {
  var t = new Date(tm);
  return t.toLocaleString();
}

function abstract(c) {
	var cont = utils.Summary(c).substr(0,120) + '...';
	return cont;
}

module.exports.ArticleList = React.createClass({
	render(){
		let { articles } = this.props;
		console.log(articles)
		const postList = articles.map((post)=>{
			return(
				<div className="postContainer">
					<div className="postAvatar">
						<div className="pull-left">
							<Avatar size={32} color={"#fff"} src={post.ousers.avatar} />
							<span className="postAuthor">{utils.hidename(post.ousers.nickname)}</span>
							<span style={{color:"#999"}}>{getTm(post.CreatedTime)}</span>
						</div>
						<div className="pull-right" style={{color:"#999",marginRight:"20px"}}>
							<i className="material-icons md-20">visibility</i><span>{post.View}</span>
							<span><i className="material-icons md-20">favorite</i><span>{post.likeCount}</span></span>
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