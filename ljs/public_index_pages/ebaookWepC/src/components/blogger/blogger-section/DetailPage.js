import React from 'react';
import "./Detailpage.css";
import Comments from "./Comments";
import Dialog from 'material-ui/Dialog';
import { FetchGet, FetchPost, FetchStandard } from '../../../service/service';
import tool from '../../../library/tool';
import net from '../../../library/interfaceAddress';
import norecord from '../../../images/norecord.png';
// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
// import { EditorState } from 'draft-js';
// import { convertFromRaw } from 'draft-js';

import WangEditor from 'wangeditor';

var xss = require("xss");

class DetailPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			post: {},
			open: false,
			openState: false,
			isLike: false,
			isStar: false,
			likeCount: 0,
			starCount: 0,
			article: {},
			commentContent: '',
			copyrightData: {},
			contentState: {},
		}
		this.handleLikeClick = this.handleLikeClick.bind(this);
		this.handleStarClick = this.handleStarClick.bind(this);
		this.handleUnstarClick = this.handleUnstarClick.bind(this);
		this.handleUnlikeClick = this.handleUnlikeClick.bind(this);
		this.handleCommentChange = this.handleCommentChange.bind(this);
		this.handleComment = this.handleComment.bind(this);
		this.getCopyright = this.getCopyright.bind(this);
	};

	componentDidMount() {
		this.getPost();

		this._createCommentEditor();

		if (window.sessionStorage.token) {
			this.getStates();
		}
	};

	_createCommentEditor(){
		var commentEl = document.getElementById("comment_editor");
		if (commentEl != null) {
			clearTimeout(this._createTimer);

			this._editor = new WangEditor(commentEl);
			this._editor.customConfig.menus = [
				'head',
				'bold',
				'italic',
				'underline',
				'strikeThrough',
				'foreColor',
				'backColor',
				'link',
				'justify',
				'emoticon'
			];
			this._editor.customConfig.zIndex = 100;
			this._editor.customConfig.onchange = this.handleCommentChange;
			this._editor.create();

			var commentHeight = commentEl.offsetHeight;
			if (commentHeight < 0) {
				commentHeight = 150;
			}
			for (var i = 0; i < commentEl.childNodes.length; i++) {
				var childEl = commentEl.childNodes[i];
				
				console.log("wxm comment child: " + commentEl.offsetHeight);

				if (childEl.nodeType == 1){
					if (childEl.className == "w-e-text-container") {
						childEl.style.height = (commentHeight - 50) + "px";
						break;
					}
				}
			}
		} else {
			var thisObj = this;
			this._createTimer = setTimeout(()=>{thisObj._createCommentEditor();}, 100);
		}
	};
	getPost() {
		let self = this;
		let url = '/api/article?articleId=' + this.props.match.params.id;
		FetchGet(url).then((res) => {
			// console.log(res);
			self.setState({
				post: res.data,
				likeCount: res.data.likeAmount,
				starCount: res.data.starAmount
			});
			self.getCopyright();
		});
	};
	getStates() {
		let self = this;
		// console.log("getStatus");
		let url = '/api/article/isstates';
		let data = {
			articleId: this.props.match.params.id,
		}
		// console.log("FetchPost");
		FetchPost(url, data, window.sessionStorage.token).then((res) => {
			// console.log("---------log isLike");
			// console.log(res);
			self.setState({
				isLike: res.data.isLike,
				isStar: res.data.isStar
			});
		});
	};
	handleStarClick() {
		let self = this;
		if (!window.sessionStorage.token) {
			window.location.pathname = '/login';
			return;
		}
		let data = {
			articleId: this.props.match.params.id
		}
		FetchPost('/api/article/star', data, window.sessionStorage.token).then((res) => {
			// console.log(res);
			// console.log("已收藏");
			self.setState({
				starCount: res.data.starCount
			}, function () {
				self.getStates();
			});
		})
	};
	handleUnstarClick() {
		let self = this;
		let data = {
			articleId: this.props.match.params.id
		}
		FetchPost('/api/article/unstar', data, window.sessionStorage.token).then((res) => {
			// console.log(res);
			// console.log("已取消收藏");
			self.setState({
				starCount: res.data.starCount
			}, function () {
				self.getStates();
			});
		})
	};
	handleLikeClick() {
		let self = this;
		if (!window.sessionStorage.token) {
			window.location.pathname = '/login';
			return;
		}
		let data = {
			articleId: this.props.match.params.id
		}
		FetchPost('/api/article/like', data, window.sessionStorage.token).then((res) => {
			// console.log(res);
			// console.log("已点赞");
			self.setState({
				likeCount: res.data.likeCount
			}, function () {
				self.getStates();
				this.getPost();
			});
		})
	};
	handleUnlikeClick() {
		let self = this;
		let data = {
			articleId: this.props.match.params.id
		}
		FetchPost('/api/article/unlike', data, window.sessionStorage.token).then((res) => {
			// console.log(res);
			// console.log("已取消喜欢");
			self.setState({
				likeCount: res.data.likeCount
			}, function () {
				self.getStates();
				this.getPost();
			});
		})
	};
	handleCommentChange(value) {
		// console.log(e.target.value);
		this.setState({ commentContent: value });
		// this.setState({ commentContent: e.target.value });
	};

	base64encode(str){
		let buff = new Buffer(str);
		return buff.toString("base64");
	};
	base64decode(str){
		let buff = new Buffer(str, "base64");
		return buff.toString();
	};

	handleComment() {
		let self = this;
		if (!window.sessionStorage.token) {
			window.location.pathname = '/login';
			return;
		}
		if (this.state.commentContent.trim() === "") {
			alert("评论内容不能为空");
			return;
		}

		console.log("wxm  评论内容: " + this.state.commentContent);

		var options = {
			whiteList: {
				p: ["id", "style", "class", "align"],
				br: ["id", "style", "class"],
				div: ["id", "style", "class"],
				span: ["id", "style", "class"],
				a: ["id", "style", "class", "href", "target"],
				font: ["color"],
				h1: [],
				h2: [],
				h3: [],
				h4: [],
				h5: [],
				b: [],
				i: [],
				u: [],
				strike: [],
				table: ["width", "cellspacing", "cellpadding", "border"],
				tbody: [],
				tr: [],
				th: [],
				td: []
			}
		};

		let url = '/api/article/comment';
		let data = {
			articleId: this.props.match.params.id,
			comment: this.base64encode(xss(this.state.commentContent, options))
		}
		FetchPost(url, data, window.sessionStorage.token).then((res) => {
			self.getPost();
			if (self.refs.comments) {
				self.refs.comments.getComments()
			}
		})
		this.state.commentContent = "";
		// this.refs.commentRef.value = "";
		this._editor.txt.clear();
		this._editor.change();
	}

	skipMyCenters() {
		window.location.href = "/myCenter/" + window.sessionStorage.id;
	}

	getCopyright() {
		let params = { assetId:this.state.post.id }
		FetchStandard(net.getAllList.BOGGER_COPYRIGHT, "GET", params).then((res) => {
			if (res.article) {
				this.setState({ openState: true })
				this.setState({article:res.article})
			} else {
				this.setState({ openState: false })
			}
		});
	};

	render() {
		console.log('编辑器的值')
		console.log(this.state.contentState)
		let { post } = this.state;
		if (!post.id) {
			return <div></div>;
		};
		// console.log(post);
		let tags = post.tagsArray.map((tag, index) => {
			return (<span key={index} className="classifyInfo">{tag}</span>);
		});
		// console.log(post);
		 let ebcValue = 1;
            if(post.CreatedTime && post.Content) {
				ebcValue = window.EXC.estimate(new Date(post.CreatedTime),post.Content.length,post.View,post.likeAmount,post.commentAmount,0);
		   }
		// console.log(this.state.isLike);
		// console.log(this.state.isStar);
		return (
			<div style={{paddingTop: '20px'}}>
				<div className="detailPage" style={{ width: "900px"}}>
					<div className="detailInfo">
						<div className="top">
							<h3 className="title">{post.Title}
								<div className='change'>
									<span className = "value1"></span>
									<span className='n1' title="价值评估"><img style={{marginTop:'-7px'}} className='PurseMap' src={require('../../../images/GeneralList/wallet22.png')} alt="" />{ebcValue}EBC</span>
								</div>
							</h3>
							<h4 style={{ fontSize: "16px",color: "#999" }}>
									作者:{post.user.nickName}&nbsp;&nbsp;&nbsp;&nbsp;
									时间:{tool.formatDate(post.CreatedTime)}&nbsp;&nbsp;&nbsp;&nbsp;
									浏览:({post.View})&nbsp;&nbsp;&nbsp;&nbsp;
									回复:({post.commentAmount})&nbsp;&nbsp;&nbsp;&nbsp;
									点赞:({post.likeAmount})&nbsp;&nbsp;&nbsp;&nbsp;
							</h4>
							{this.state.openState &&
								<span className="idInfo">版权号:&nbsp;<a onClick={()=>{this.setState({open:true})}} style={{ color: "#249cff" }}>{post.copyrightId}</a></span>
							}
						</div>
						<div className="main">
							{/* <div className="author">
									<div style = {{display:"inline-block"}}>
                                        <img alt="avatar" width="48px" height="48px" style={{borderRadius:"24px",verticalAlign:"bottom"}} src={post.user.avatar}/>
                                    </div>
									<div className="autorName" style = {{display:"inline-block"}}>
										<div>{post.user.nickName}</div>
										<div>
											<div className="autorInfo">
												<span>{post.PublishedAt}</span>
												<span>{post.View}</span>
												<span>{post.commentAmount}</span>
												<span>{post.likeAmount}</span>
											</div>
										</div>
									</div>
								</div> */}
							{/* <div className="imgInfo">
								<p className="photo">
									<img src={post.Headimg} />
								</p>
								<span className="intro">图片介绍</span>
							</div> */}
							<article dangerouslySetInnerHTML={{ __html: post.Content }}></article>
							<div className="classify">
								<div className="left" >
									{tags}
								</div>
								<p className="right">
									<span className="copyright" style={{ marginRight: "50px" }}>著作权归作者所有</span>
								</p>
							</div>
							{/* <div className="money">
													<div className="left">
														<span>点赞一小步，支持一大步</span>
														 <p>打赏支持</p>
													</div>
													<div className="right">
														 <span>点击进入交易市场购买</span>
														 <p>购买</p>
													</div>
												</div> */}
							<div className="interaction">
								<div className="info" style={{ marginLeft: "224px" }}>
									{this.state.isLike ?

										<div className="like" onClick={this.handleUnlikeClick}>
											取消点赞
													<span className="vline">|</span>
											{this.state.likeCount}
										</div>

										: <div className="like" onClick={this.handleLikeClick}>
											<i className="material-icons" style={{ verticalAlign: "middle", marginRight: "5px" }}>favorite_border</i>
											赞
													<span className="vline">|</span>
											{this.state.likeCount}
										</div>
									}
									{/* {this.state.isStar?
											<div className="collect" onClick={this.handleUnstarClick}>
												已收藏
												<span className="vline">
													|
												</span>
												{this.state.starCount}
											</div>										
											:<div className="collect" onClick={this.handleStarClick}>
												<i className="material-icons" style={{verticalAlign:"middle",marginRight:"5px"}}>star_border</i>
												收藏
												<span className="vline">
													|
												</span>
												{this.state.starCount}
											</div>
										} */}
								</div>
								{/* <div className="share">
														<span>朋友圈</span>
														<span>新浪</span>
														<span>空降</span>
													</div> */}
							</div>
							<div className="review" style={{width: '100%'}}>
								<div className="revievTop">
									<h4>网友评论</h4>
									<span>文明上网理性发言</span>
								</div>
								
								{/* <textarea ref="commentRef" className="goReview" placeholder="请在此输入评论内容" onChange={this.handleCommentChange}></textarea> */}
								{/* <Editor
										wrapperClassName="demo-wrapper"
										editorClassName="demo-editor"
										onContentStateChange={this.onContentStateChange}
										toolbar={{
											inline: { inDropdown: true },
											list: { inDropdown: true },
											textAlign: { inDropdown: true },
											link: { inDropdown: true },
											history: { inDropdown: true },
										}}
								/>
								<div style={{height: '100px'}}></div> */}
								
								{window.sessionStorage.token ?
									<div id="comment_editor" style={{height: '150px'}}></div>										
									:
									<div></div>
								}
								
								<div className="reviewBottom" style={{height: '50px', width: '100%', border: 'none'}}>
									{window.sessionStorage.token ?
									<div>
										{/* <div className="portrait" style={{marginTop: '5px', marginLeft: '3px'}}>
											<a onClick={this.skipMyCenters.bind(this)} className="avatar">
												<img alt="avatar" src={window.sessionStorage.avatar} />
											</a>
											<span className="nickname">昵称:{window.sessionStorage.nickName}</span>
										</div> */}
										<span className="reviewInfo" style={{height: '27px', lineHeight: '27px'}} onClick={this.handleComment}>发表评论</span>
										</div>
										: <div style={{ float: "left", lineHeight: '36px', marginTop: '5px', marginLeft: "5px" }}>请 <a onClick={
											() => {
												window.location.pathname = "/login"
											}
										}>登录</a> 后发表评论</div>
									}
									
								</div>
							</div>
							{post.commentAmount > 0 ?
								<Comments ref="comments" postId={post.id} />
								:
								<div>
									<img src={norecord} alt="" style={{
										width: "109px",
										marginLeft: "250px",
										marginTop: "16px"
									}} />
									<span>暂无评论</span>
								</div>
							}
						</div>
					</div>
				</div>
				<Dialog
					title={<div style={{ backgroundColor: "#249cff", lineHeight: "0px" }}>
						<span style={{ color: "white", fontSize: "16px" }}>版权信息</span>
						<a style={{ float: "right" }} onClick={() => { this.setState({ open: false }) }}>
							<i className="material-icons" style={{
								backgroundColor: "white",
								borderRadius: "15px",
								color: "rgb(36, 156, 255)",
								marginTop: "-10px"
							}}>
								cancel
									</i>
						</a>
					</div>}
					modal={false}
					open={this.state.open}
					onRequestClose={() => {
						this.setState({ open: false })
					}
					}
					autoScrollBodyContent={true}>
					<div style={{
						marginLeft: "150px",
						marginTop: "10px",
						lineHeight: 2
					}}>
						<div style={{ marginLeft: "15px" }}>块高   &nbsp;   :&nbsp; {this.state.article.height}</div>
						<div style={{ marginLeft: "0px" }}>文章ID &nbsp;   :&nbsp; {this.state.article.assetId}</div>
						<div style={{ marginLeft: "15px" }}>作者   &nbsp;   :&nbsp; {post.user.nickName}</div>
						<div style={{ marginLeft: "-17px" }}>注册时间 &nbsp;  :&nbsp; {tool.formatDate(this.state.article.created)}</div>
						<div style={{ marginLeft: "-17px" }}>发布时间 &nbsp;  :&nbsp; {tool.formatDate(post.CreatedTime)}</div>
						<div>版权ID &nbsp;   :&nbsp; {this.state.article.root}</div>
						<div>交易ID &nbsp;   :&nbsp; {this.state.article.trs}</div>
					</div>
				</Dialog>
			</div>
		)
	}
};

export default DetailPage;