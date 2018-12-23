import React from 'react';
import './Comment.css';
import { FetchGet, FetchPost } from '../../../service/service';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import Reply from "./Reply";
import tool from '../../../library/tool';
const reportStyle = {
	display: "flex",
	flexDirection:"column",
	paddingTop: '30px',
}
const titleStyle = {
    fontSize: '20px',
	backgroundColor: '#249cff',
	paddingTop: '5px',
	paddingBottom: '5px',
	color: '#FFFFFF',
	borderRadius: '5px 5px 0px 0px',
}
const closeStyle = {
    transform: 'rotate(45deg)',
    fontSize: '25px',
    border: '2px solid',
    borderRadius: '18px',
    padding: '0px',
    margin: '5px auto',
    lineHeight: '16px',
    height: '24px',
    textAlign: 'center',
    width: '24px',
    display: 'block',    
    float: 'right',
}
const style = {
  margin: 12,
}
const checkValue = {
	r1:"",
	r2:"",
	r3:"",
	r4:"",
	r5:""
};
class Comment extends React.Component {
    constructor(props) {
	    super(props);
	    this.state = {
	    	likeCount: 0,
	    	replyCount: 0,
	    	showReply: false,
	    	replyContent: '',
	    	replyData: [],
			open: false,
			reportOpen:false,
			timeDifference:"",
			checkd0:"",		
			checkd1:"",		
			checkd2:"",		
			checkd3:"",		
			checkd4:""		
	    }
	    this.handleLikeClick = this.handleLikeClick.bind(this);
	    this.handleOpenReplyClick = this.handleOpenReplyClick.bind(this);
	    this.handleReplyClick = this.handleReplyClick.bind(this);
	    this.handleReplyChange = this.handleReplyChange.bind(this);
	    this.handleReportClick = this.handleReportClick.bind(this);
		this.getReplyNodes = this.getReplyNodes.bind(this);
		this.reportSubmit = this.reportSubmit.bind(this);
		this.select = this.select.bind(this);
		this.handleReportClose = this.handleReportClose.bind(this);	
	
   };
   componentDidMount(){
		// console.log("--------------comment");   
		let { comment } = this.props;
		let timeDifference = tool.desendMinutes(comment.time);  
   		this.setState({
   			likeCount: comment.likeAmount,
			replyCount: comment.replyAmount,
			timeDifference : timeDifference
   		})
   };
	   componentWillReceiveProps(newProps){
   		this.setState({
   			likeCount: newProps.comment.likeAmount,
			replyCount: newProps.comment.replyAmount,
   		})   };
   getReplyNodes(){
		let self = this;
		let replyUrl = '/api/article/comments/sun?commentId=' + this.props.comment.id;
		FetchGet(replyUrl).then((res)=>{
			// console.log("------------reply data");
			// console.log( res);
			self.setState({
				replyData: res.data,
				replyCount: res.data.length
			});
		});
   };
	handleOpenReview = () => {
		this.setState({open: true});
		this.getReplyNodes(this.state.commentId);
	};

	handleClose = () => {
		this.setState({open: false});
	};
   handleLikeClick(){
   		// console.log("--------------like");
   		let self = this;
   		if(!window.sessionStorage.token){
   			window.location.pathname = '/login';
   			return ;
	    }
   		let data = {
   			commentId: this.props.comment.id,
   			articleId: this.props.comment.articleId
   		}
   		FetchPost('/api/article/comment/like', data, window.sessionStorage.token).then((res)=>{
   			// console.log(res);
   			// console.log("------已点赞");
   			if(res.code === 2){
   				alert(res.message);
   			}else{
	   			self.setState({
	   				likeCount: res.data.like
	   			});   				
   			}
   		})
   };
   handleOpenReplyClick(){
   		// console.log("--------------open reply");
   		if(!this.state.showReply){
   			this.setState({showReply: true})
   		}else{
   			this.setState({showReply: false})
   		}
   };
   handleReplyChange(e){
   		this.setState({replyContent: e.target.value});
   };
   handleReplyClick(){
		
   		// console.log("--------------reply");
   		let self = this;
   		if(!window.sessionStorage.token){
   			window.location.pathname = '/login';
   			return ;
		}
		if(this.state.replyContent.trim() === ""){
			alert("回复内容不能为空");
			return;
		}
   		let url = '/api/article/comment/reply';
   		let data = {
   			commentId: this.props.comment.id,
   			articleId: this.props.comment.articleId,
   			toUserId: this.props.comment.userId,
   			toNickName: this.props.comment.nickName,
   			comment: this.state.replyContent
		   }
   		// console.log(data);
   		FetchPost(url, data, window.sessionStorage.token).then((res)=>{
   			// console.log(res);
   			// console.log("------已回复");
   			if(res.code === 2){
   				alert(res.message);
   			}else{
   				self.setState({replyCount: res.data});		
   			}
		   })
		this.setState({showReply:false});
		this.props.getComments();
		// this.setState({replyContent:''});
   };
   
   handleReportClick(){
	if(!window.sessionStorage.token){
	window.location.pathname = '/login';
	return ;
	}
	this.setState({reportOpen:true});
   };
   
   handleReportClose(){
	 this.setState({reportOpen:false});
   }

   reportSubmit(){
	 let data = { 
		title:"", 
		content:this.refs.describe.value,
		commentId:this.props.comment.id
	};  
	for (var r in checkValue) {
		if (checkValue[r] !== "") {
			data.title += checkValue[r]+",";
		  }
	   }
	data.title = data.title.substring(0,data.title.lastIndexOf(","));      	   
	FetchPost("/api/comment/reportall",data,window.sessionStorage.token).then((res)=>{
		if(res.code === 0){
			if(res.success){
				alert("感谢你对我们的关心和支持。您所举报的内容，我们会安排专人进行核实");
				window.location.reload();
			}else{
				alert("提交失败");
				window.location.reload();
			}
		}else{
				alert("已经举报此内容，请您耐心等待，我们会安排专人进行核实");
				window.location.reload();	
		}
	 });	
   }

   select(e){
	 switch(e){
		 case 0:{
			 if(checkValue.r1 === ""){
				this.setState({checkd0:"checked"});
				checkValue.r1 = "色情淫秽";
			 }else{
				this.setState({checkd0:""});
				checkValue.r1 = "";
			 } 
			 break;
		 }
		case 1:{
			if(checkValue.r2 === ""){
				this.setState({checkd1:"checked"});
				checkValue.r2 = "骚扰谩骂";
			 }else{
				this.setState({checkd1:""});
				checkValue.r2 = "";
			 } 
			 break;
		}	 
		case 2:{
			if(checkValue.r3 === ""){
				this.setState({checkd2:"checked"});
				checkValue.r3 = "广告欺诈";
			 }else{
				this.setState({checkd2:""});
				checkValue.r3 = "";
			 } 
			 break;
		}	 
		case 3:{
			if(checkValue.r4 === ""){
				this.setState({checkd3:"checked"});
				checkValue.r4 = "反动";
			 }else{
				this.setState({checkd3:""});
				checkValue.r4 = "";
			 } 
			 break;
		}	 
		case 4:{
			if(checkValue.r5 === ""){
				this.setState({checkd4:"checked"});
				checkValue.r5 = "其他";
			 }else{
				this.setState({checkd4:""});
				checkValue.r5 = "";
			 } 
			 break;
		}
		default:
			break;	 
	 }
   }
	
	render(){
		let {comment} = this.props;
		let replyList = [];
		if(this.state.replyData[0]){
			replyList = this.state.replyData.map((reply)=>{
				// console.log("----------reply");
				return (
					<Reply reply = {reply} getReplyNodes={this.getReplyNodes}/>
				)
			});	
		}
		return(
			<div className="comment">
				<div className="reviewCon">
					<div className="top">
						<div className="portrait" onClick={()=>{
								window.location.href = "/myCenter/"+comment.userId;
							}}>
							<a className="avatar">
								<img alt="avatar" src={comment.avatar}/>
							</a>
							<div className = "info">
								<a  className="name">{comment.nickName}</a>
								<div className="meta">{this.state.timeDifference}</div>
							</div>
						</div>
				
						<div className="report" onClick={this.handleReportClick}>
							<i className="material-icons" style={{verticalAlign:"middle",marginRight:"5px"}}>assistant_photo</i>
							<span>举报</span>
							{/*<div className="reportForm">
								<textarea placeholder="请输入举报理由"></textarea>
								<div style={{}}></div>
							</div>*/}
						</div>
					</div> 
					<div className="commentContent" style={{marginLeft:"44px",marginTop:"10px",marginBottom:"10px",wordWrap:"break-word"}}>{comment.comment}</div>
					<div className="interaction">
						<span className="addlike" onClick={this.handleLikeClick}>
							<i className="material-icons md-18" style={{verticalAlign:"middle",marginRight:"5px"}}>favorite_border</i>
							{this.state.likeCount}人赞
						</span>
						<span className="restore" onClick={this.handleOpenReplyClick}>
							<i className="material-icons md-18" style={{verticalAlign:"middle",marginRight:"5px"}}>chat_bubble_outline</i>
							回复
						</span>
						{this.state.replyCount > 0 &&
							<span className="Rreply" onClick={this.handleOpenReview}>
								查看回复({this.state.replyCount})
							</span>							
						}
					</div>
					{this.state.showReply &&
						<div className="review commentRely">
							<textarea className="goReview" placeholder="请在此输入评论内容" onChange={this.handleReplyChange}></textarea>
							<div className="reviewBottom">
								<span className="nickname">昵称</span>
								<span className="reviewInfo" onClick={this.handleReplyClick}>回复</span>
							</div>
						</div>
					}			
				</div>
		        <Dialog
		          title={<div>查看回复 ({this.state.replyCount})<div style={{marginLeft:"644px",marginTop:"-68px"}}>
					  <RaisedButton label="关闭" onClick={this.handleClose} primary={true} style={style}/></div></div>}
		          modal={false}
		          open={this.state.open}
		          onRequestClose={this.handleClose}
		          autoScrollBodyContent={true}
		        >
		           		<div className="replyContainer">{replyList}</div>
		        </Dialog>
		        
				 {/* <RaisedButton label="关闭" onClick={this.handleReportClose} primary={true} style={style}/></div></div> */}
				<Dialog
		          title={<div><span>举报</span>
					  <span onClick={this.handleReportClose} style={closeStyle}>
					  +
					  </span></div>}
					  titleStyle={titleStyle}
				 overlayStyle={{backgroundColor: 'inherit'}}
		          modal={false}
		          open={this.state.reportOpen}
		          onRequestClose={this.handleClose}
		          autoScrollBodyContent={true}
		        >	
					<div>
						<div style={reportStyle}>
							<ul>
								<li>您为什么要举报此信息?</li>
								<br/>
								<li><input type="radio" checked={this.state.checkd0} onClick={()=>{
									this.select(0)
								}}/>色情淫秽&nbsp;&nbsp;&nbsp;
									<input type="radio"  checked={this.state.checkd1} onClick={()=>{
									this.select(1);
								}}/>骚扰谩骂&nbsp;&nbsp;&nbsp;
									<input type="radio"  checked={this.state.checkd2} onClick={()=>{
									this.select(2);
								}}/>广告欺诈&nbsp;&nbsp;&nbsp;
								</li>
								<br/>	
								<li>
									<input type="radio"  checked={this.state.checkd3} onClick={()=>{
									this.select(3);	
								}}/>反动&nbsp;&nbsp;&nbsp;
									<input type="radio"  checked={this.state.checkd4} onClick={()=>{
									this.select(4);
								}}/>其他&nbsp;&nbsp;&nbsp;
								</li>
								<br/>
								<li>
									举报说明(可选):
								</li>
								<li>
									<input ref="describe" style={{marginTop:"11px",width:"300px"}} type="text" placeholder="描述恶意行为"/>
								</li>
							</ul>
							<div>
								<input style={{width:"65px"}} type="button" value="取消" onClick={this.handleReportClose}/>
								&nbsp;&nbsp;&nbsp;&nbsp;
								<input style={{width:"65px"}} type="button" value="提交" onClick={this.reportSubmit}/>
							</div>
						</div>
					</div>
		        </Dialog>
			</div>		
		);
	}
}


export default Comment;