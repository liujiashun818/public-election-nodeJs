import React from 'react';
import './Reply.css';
import { FetchPost } from '../../../service/service';

class Reply extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			likeCount: 0,
			showReply: false,
			replyContent: ''
		}
		this.handleLikeClick = this
			.handleLikeClick
			.bind(this);
		this.handleOpenReplyClick = this
			.handleOpenReplyClick
			.bind(this);
		this.handleReplyClick = this
			.handleReplyClick
			.bind(this);
		this.handleReplyChange = this
			.handleReplyChange
			.bind(this);
		this.handleReportClick = this
			.handleReportClick
			.bind(this);
	};
	componentDidMount() {
		// console.log("--------------Reply");
		let { reply } = this.props;
		this.setState({ likeCount: reply.likeAmount })
	};
	handleLikeClick() {
		// console.log("--------------like");
		let self = this;
		if (!window.sessionStorage.token) {
			window.location.pathname = '/login';
			return;
		}
		let data = {
			replyId: this.props.reply.id,
			articleId: this.props.reply.articleId
		}
		FetchPost('/api/article/comment/reply/like', data, window.sessionStorage.token).then((res) => {
			// console.log(res);
			// console.log("------已点赞");
			if (res.code === 2) {
				alert(res.message);
			} else {
				self.setState({ likeCount: res.data });
			}
		})
	};
	handleOpenReplyClick() {
		// console.log("--------------open reply");
		if (!this.state.showReply) {
			this.setState({ showReply: true })
		} else {
			this.setState({ showReply: false })
		}
	};
	handleReplyChange(e) {
		// console.log(e.target.value);
		this.setState({ replyContent: e.target.value });
	};
	handleReplyClick() {
		// console.log("--------------reply");
		let self = this;
		if (!window.sessionStorage.token) {
			window.location.pathname = '/login';
			return;
		}
		let url = '/api/article/comment/reply';
		let data = {
			commentId: this.props.reply.commentId,
			articleId: this.props.reply.articleId,
			toUserId: this.props.reply.userId,
			toNickName: this.props.reply.nickName,
			comment: this.state.replyContent,
			toReplyId: this.props.reply.id
		}
		// console.log(data);
		FetchPost(url, data, window.sessionStorage.token).then((res) => {
			// console.log(res);
			// console.log("------已回复");
			self
				.props
				.getReplyNodes();
		});
		this.setState({ showReply: false });
		this.state.replyContent = "";
	};
	handleReportClick() {
		// console.log("-------------report");
	};
	render() {
		let { reply } = this.props;
		return (
			<div className="reviewCon">
				<div className="top">
					<div className="portrait">
						<a href="" target="_blank" className="avatar">
							<img alt="avatar" src={reply.avatar} />
						</a>
						<div className="info">
							<a href="" target="_blank" className="name">{reply.nickName}</a>
							<span
								style={{
									margin: "0 10px",
									fontSize: "12px"
								}}>回复</span>
							<a href="" target="_blank" className="name">{reply.toNickName}</a>
							<div className="meta">10分钟前</div>
						</div>
					</div>
					{/* {reply.userId == } */}
					{/* <div className="report" onClick={this.handleReportClick}>
							<i className="material-icons" style={{verticalAlign:"middle",marginRight:"5px"}}>assistant_photo</i>举报
						</div> */}
				</div>
				<p
					className="commentContent"
					style={{
						marginLeft: "44px"
					}}>{reply.comment}</p>
				<div className="interaction">
					<span className="addlike" onClick={this.handleLikeClick}>
						<i
							className="material-icons md-18"
							style={{
								verticalAlign: "middle",
								marginRight: "5px"
							}}>favorite_border</i>
						{this.state.likeCount}人赞
																				</span>
					<span className="restore" onClick={this.handleOpenReplyClick}>
						<i
							className="material-icons md-18"
							style={{
								verticalAlign: "middle",
								marginRight: "5px"
							}}>chat_bubble_outline</i>
						回复
																				</span>
				</div>
				{this.state.showReply && <div className="review commentRely">
					<textarea
						className="goReview"
						placeholder="请在此输入评论内容"
						onChange={this.handleReplyChange}></textarea>
					<div className="reviewBottom">
						<span className="nickname">昵称</span>
						<span className="reviewInfo" onClick={this.handleReplyClick}>回复</span>
					</div>
				</div>
				}
			</div>
		)
	}
}

export default Reply;