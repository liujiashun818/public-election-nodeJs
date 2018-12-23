import React from 'react';
import $ from 'jquery';
import FooterComunity from '../public/Footer.js';
import './DetialListCom.css';
import ReactPaginate from 'react-paginate';
import netService from '../../library/resouresAddress.js';
import tool from '../../library/tool';
import norecord from '../../images/norecord.png';
// import { Editor } from 'react-draft-wysiwyg';
// import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import WangEditor from 'wangeditor';

var xss = require("xss");

const buttonStyle = {
	background: "#179BD7",
	width: "70px",
	height: "30px",
	lineHeight: "30px",
	borderRadius: "6px",
	display: "block",
	border: "none"
}

class DetialListCom extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			dataDetail: [],
			dataDetailReplyList: [],
			replyCountId: 0,
			dataDetailOther: [],
			pageCount: 0,
			replyAllDataList: [],
			currePage: 0,
			id: "",
			userId: "",
			userInfo: {},
			replyCountBtnId: "",
			view: "none",
			order: 0,
			contentDetail:null,
			commentContent:""
		}
		this.get_allDataContent = this
			.get_allDataContent
			.bind(this)
		this.get_replyAllData = this
			.get_replyAllData
			.bind(this)
		this.delFun = this.delFun.bind(this);
		this.replySure = this.replySure.bind(this);

		this.handleCommentChange = this.handleCommentChange.bind(this);
	};

	componentWillMount() {
		// 初始化排序
		this.setState({ id: this.props.match.params.id })
		this.get_replyAllData(this.props.match.params.id, 0, 1, 3, 0)
	};

	componentDidMount() {
		let self = this;
		let token = window.sessionStorage.token
		if (token) {
			fetch(netService.getAllListCom.get_authorinfo, {
				headers: {
					'Cache-Control': 'no-cache',
					"Authorization": token
				},
				type: 'GET'
			}).then(function (response) {
				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}
				return response.json();
			}).then(function (stories) {
				self.setState({ userInfo: stories.data })
				$("#detailComitImg").attr("src", stories.data.avatar);
			});
		}


		var _this = this
		// 热度排序
		$('#get_allDataTime').click(function () {
			_this.get_replyAllData(_this.state.id, 1, 0, 3, 0);
			$(this)
				.addClass('sectionBtn1')
				.siblings()
				.removeClass('sectionBtn1')

		});
		// 时间排序
		$('#get_allDataHot').click(function () {
			_this.get_replyAllData(_this.state.id, 0, 1, 3, 0)
			$(this)
				.addClass('sectionBtn1')
				.siblings()
				.removeClass('sectionBtn1')

		});
		this.get_allDataContent(this.props.match.params.id);

		this._createCommentEditor();
	};

	//回复

	replyCountBtn(e) {
		if (!window.sessionStorage.token) {
			window.location.pathname = '/login';
			return;
		}
		if (this.state.order === 1) {
			window.location.reload();
		}
		var id = e.target.id;
		window
			.localStorage
			.setItem('replyCountBtnId', id);
		window
			.sessionStorage
			.setItem('replyCountBtnId', id);
		this.setState({ replyCountBtnId: id });
		this.setState({ view: "block" });
	};
	//点赞
	detailFavoriteCom(e) {
		if (!window.sessionStorage.token) {
			window.location.pathname = '/login';
			return;
		}
		var replyCountBtnId = e.target.id;
		var self = this;
		let topicIdcom = self.state.id;
		let token = window.sessionStorage.token
		if (true) {
			$.ajax({
				type: 'POST',
				headers: {
					'Cache-Control': 'no-cache',
					"Authorization": token
				},
				//'http://192.168.27.166:7070/api/club/topic/reply/like'
				//
				url: netService.getAllListCom.post_topicReplyLike,
				data: {
					topicId: topicIdcom,
					replyId: replyCountBtnId
				},
				success: function (data) {
					if (data.code === 2) {
						alert('你已经点过赞了')
					}
					self.get_replyAllData(topicIdcom, 0, 0, 3, 0)
				},
				error: function () {
					alert('点过赞失败！')
				}
			})
		} else {
			alert('你已经点过赞了')
		}
	};
	replySure() {
		let obj = {
			//头像
			avatar: this.state.userInfo.avatar,
			//获取评论内容
			content: this.refs.textareaReplyTxt.value,
			//评论人
			nickName: this.state.userInfo.nickName
		}
		let replyCountBtnId = window.sessionStorage.replyCountBtnId;
		let topicIdcom = this.state.id;
		let token = window.sessionStorage.token
		var self = this
		if ($('#textareaReplyTxt').val() !== "" || null) {
			$.ajax({
				type: 'POST',
				headers: {
					'Cache-Control': 'no-cache',
					"Authorization": token
				},
				//http://192.168.27.166:7070/api/club/topic/reply
				//
				url: netService.getAllListCom.post_topicReply,
				data: {
					topicId: topicIdcom,
					content: self.refs.textareaReplyTxt.value,
					replyId: replyCountBtnId
				},
				error: function () {
					console.log('未找到')
				},
				success: function (data) {
					// alert("回复成功");
					self.setState({ view: "none" })
					self.refs.textareaReplyTxt.value = ""
					let list = self.state.replyAllDataList;
					list[list.length] = {
						avatar: obj.avatar,
						content: obj.content,
						nickName: obj.nickName,
						creatTime: tool.formatDate(new Date()),
						likeCount: 0
					}
					self.setState({ order: 1 });
					self.setState({ replyAllDataList: list });
				}
			})
		} else {
			alert('内容为空')
		}
	}
	get_allDataContent(topicIdcom) {
		var self = this;
		//get_topicContentId
		fetch(netService.getAllListCom.get_topicContentId + topicIdcom, { type: 'GET' }).then(function (response) {
			if (response.status >= 400) {
				throw new Error("Bad response from server");
			}
			return response.json();
		})
			.then(function (stories) {
				var dataDetail = stories.data.info;
				// console.log('data detail:',dataDetail);
				self.setState({ userId: dataDetail.authorId,contentDetail:dataDetail});
				$("#dataDetailAvatar").attr("src", dataDetail.avatar);
				$('#dataDetailTitle').html(dataDetail.title)
				$('#dataDetailNickName').html(dataDetail.nickName)
				$('#dataDetailTitle').attr("title", dataDetail.title)
				$('#dataDetailNickName').attr("title", dataDetail.nickName)
				$('#dataDetailReatTime').html(tool.formatDate(dataDetail.creatTime))
				let nameNav = '';
				switch (dataDetail.tab) {
					case 1:
						nameNav = "区块链技术";
						break;
					case 2:
						nameNav = "亿书产品";
						break;
					case 3:
						nameNav = "市场活动";
						break;
					case 4:
						nameNav = "版权相关";
						break;
					case 5:
						nameNav = "社区交流";
						break;
					default:
						nameNav = "";
						break;
				}
				$('#dataDetailTab').html(nameNav)
				$('#dataDetailContent').html(dataDetail.content)
				$('#dataDetailReplyCount').html(dataDetail.replyCount)
				$('#dataDetailLikeCount').html(dataDetail.likeCount)
				$('#dataDetailVisitCount').html(dataDetail.visitCount)
				$('#dataDetailContent > div').css({
					marginTop: "28px",
					wordWrap: "break-word", 
					textOverflow: 'ellipsis', 
					overflow: 'hidden', 
					width: '800px',
					fontSize:'16px',
					color:"#333", 
					textIndent: "35px",
					lineHeight: "2em",textAlign:'justify'
				})

			});
	};
	get_replyAllData(topicIdcom, hot, time, itemsPerPage, offset) {
		var self = this;
		fetch(netService.getAllListCom.get_topicReplystId + topicIdcom + "&hot=" + hot + "&time=" + time + "&itemsPerPage=" + itemsPerPage + "&offset=" + offset, { type: 'GET' }).then(function (response) {
			if (response.status >= 400) {
				throw new Error("Bad response from server");
			}
			return response.json();
		})
			.then(function (stories) {
				var replyAllDataList = stories.data.list;
				var pageCount = Math.ceil(stories.data.count / 3.0)
				$('#commitNumDetail').html(stories.data.count)
				self.setState({ pageCount: pageCount, replyAllDataList: replyAllDataList });
			});

	};
	putPublicSubmitDetial() {
		if (!window.sessionStorage.token) {
			window.location.pathname = '/login';
			return;
		}
		var self = this;
		var sessionStorage = window.sessionStorage;
		let token = sessionStorage.token
		let id = self.state.id;

		if (this.state.commentContent.trim() === "") {
			alert("评论内容不能为空");
			return;
		}

		var thisObj = this;
		
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
		
		$.ajax({
			type: 'POST',
			headers: {
				'Cache-Control': 'no-cache',
				"Authorization": token
			},
			//http://192.168.27.166:7070/api/club/topic/reply
			url: netService.getAllListCom.post_topicReply,
			data: {
				topicId: id,
				content: this.base64encode(xss(this.state.commentContent, options))
			},
			//replyId=id
			error: function () {
				console.log('未找到')
			},
			success: function (data) {
				// alert("已评论");
				self.get_replyAllData(id, 0, 1, 3, 0);
				// $('#putPublicSubmitDetialData').val('')
				thisObj.state.commentContent = "";
				// this.refs.commentRef.value = "";
				thisObj._editor.txt.clear();
				thisObj._editor.change();
			}
		})

	};

	base64encode(str){
		let buff = new Buffer(str);
		return buff.toString("base64");
	};
	base64decode(str){
		let buff = new Buffer(str, "base64");
		return buff.toString();
	};

	handlePageClickComit = (data) => {
		$('html,body').animate({
			scrollTop: 10
		}, 1000);
		let index = data.selected;
		this.setState({ currePage: index });
		let offset = Math.ceil(index * 3);
		this.get_replyAllData(this.state.id, 0, 0, 3, offset)
	};

	delFun() {
		if (!window.confirm("删除确认")) {
			return;
		}
		let id = this.state.id;
		let token = window.sessionStorage.token;
		$.ajax({
			type: 'delete',
			headers: {
				'Cache-Control': 'no-cache',
				"Authorization": token
			},
			url: netService.getAllListCom.delete_topicDelete,
			data: {
				topicId: id
			},
			error: function () {
				console.log('未找到')
			},
			success: function (data) {
				alert("删除成功");
				window.history.go(-1);
			}
		})
	}

	handleCommentChange(value) {
		// console.log(e.target.value);
		this.setState({ commentContent: value });
		// this.setState({ commentContent: e.target.value });
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

	render() {
		let { replyAllDataList ,contentDetail} = this.state
		let replyAllList = replyAllDataList;
		// console.log(this.state);

		var _this = this
		var detailReplyListComnt = replyAllList.map(function (replyAllDataList, index) {
			return (
				<div key={index}>
					<div className='sectionListContentHuiFu' key={replyAllDataList.id}>
						<div className='sectionTxtHuifu' id="sectionTxt">
							<div className='sectionTxtTop2Huifu'>
								<div className='sectionImgBoxHuifu'>
									<div className='sectionImgHuifu'>
										<a onClick={() => {
											window.location.href = "/myCenter/" + _this.state.userId
										}
										}>
											<img src={replyAllDataList.avatar} alt="" />
										</a>
									</div>
								</div>
								<ul className='sectionInfoHuifu'>
									{replyAllDataList.parentReply !== undefined && replyAllDataList.parentReply !== null ?
										<li>
											{replyAllDataList.nickName}
											&nbsp;&nbsp;回复&nbsp;&nbsp;
									 {replyAllDataList.parentReply.nickName}
										</li>
										:
										<li>{replyAllDataList.nickName}</li>
									}
									{_this.state.order === 1 && index === replyAllList.length - 1 ?
										<li>末楼&nbsp;&nbsp;
										{tool.formatDate(replyAllDataList.creatTime)}
										</li>
										:
										<li>{replyAllDataList.height}楼&nbsp;&nbsp;
										{tool.formatDate(replyAllDataList.creatTime)}
										</li>
									}
								</ul>
							</div>
							<div className='sectionTxtMid2Huifu' style={{ wordwrap: "break-word", marginLeft: "80px" }} dangerouslySetInnerHTML={{ __html:_this.base64decode(replyAllDataList.content)}}></div>
							<div className='sectionTxtbottom2Huifu'>
								<ul className='sectionInfoHuifu' id='sectionInfoClick'>
									<li>
										<i
											className="material-icons"
											id={replyAllDataList.id}
											onClick={_this
												.detailFavoriteCom
												.bind(_this)}>favorite_border</i>
										<span>{replyAllDataList.likeCount}人赞</span>
									</li>
									{/*{replyAllDataList.replyCount}*/}
									{/* <li className='replyCountBtnHuifu'
										id={replyAllDataList.id}
										onClick={_this
											.replyCountBtn
											.bind(_this)}
									>
										<i className="material-icons"
											id={replyAllDataList.id}
											onClick={_this
												.replyCountBtn
												.bind(_this)}>chat_bubble_outline</i>
										回复
								</li> */}
								</ul>
							</div>
						</div>
					</div>
					{replyAllDataList.id == _this.state.replyCountBtnId &&
						<div className='textareaReolyBox' style={{ display: _this.state.view }}>
							{/*<textarea ref="textareaReplyTxt" className='textareaReoly' id='textareaReplyTxt'></textarea>*/}
							{/* <Editor
							  toolbarClassName="toolbarClassName"
							  wrapperClassName="wrapperClassName"
							  editorClassName="editorClassName"
							  onEditorStateChange={this.onEditorStateChange}
							/> */}
							<div className='publicSubmitReoly'>
								<span className='sectionBtnReoly'>
									<button
										type="button"
										className='sectionBtn1Reoly'
										id='listCounTReplySure'
										onClick={
											_this.replySure
										}
									>回复
								</button>
									<button
										type="button"
										className='sectionBtn1Reoly'
										id='listCounTReolyCancel'
										onClick={
											() => {
												_this.setState({ view: "none" })
											}
										}>
										取消
								</button>
								</span>
							</div>
						</div>
					}
				</div>
			);
		});
		// console.log('data aaaa:',contentDetail);
		let ebcValue =1;
		 if (contentDetail && contentDetail.creatTime && contentDetail.content){
		  ebcValue = window.EXC.estimate(new Date(contentDetail.creatTime),contentDetail.content.length,contentDetail.visitCount,1,contentDetail.replyCount,0);
		 }
		return (
			<div>
				<div id="DetialListCom">
					<div className='comCenter'>
						<div className='section'>
							<div className='sectionList'>
								<div className='sectionListContent'>
									<div>
										<div className='sectionImgBox'>
											<div className='sectionImg'>
												<a onClick={() => {
													window.location.href = "/myCenter/" + _this.state.userId
												}
												}>
													<img id='dataDetailAvatar' alt="" />
												</a>
											</div>
										</div>
										<div className='sectionTxt' id="sectionTxt">
											<div className='sectionTxtTop'>
												<div className='sectionTxtTopNav'>
													<h4 className='sectionTitle' id='dataDetailTitle'></h4>
													<div className='change'>
														<span className = "value1"></span>
														<span className='n1'  title="价值评估"><img className='PurseMap' src={require('../../images/GeneralList/wallet22.png')} alt=""/>{ebcValue}EBC</span>
													</div>
													{
														(this.state.userId == window.sessionStorage.id) &&
														<div>
															<span style={{ display: "flex", justifyContent: "flex-end" }}>
																<button type="button" style={buttonStyle} id='artcleBtn' className="active" onClick={_this.delFun}>
																	<a style={{ color: 'white' }}>删除</a>
																</button>
																&nbsp;&nbsp;&nbsp;
														<button type="button" style={buttonStyle} id='artcleBtn' className="active" onClick={
																	() => {
																		window.location.href = "/updateCommunity/" + _this.state.id
																	}
																}><a style={{ color: 'white' }}>编辑</a>
																</button>
															</span>
														</div>
													}
													<div className='sectionTxtbottom'>
														<ul className='sectionInfoLeft'>
															<li id='dataDetailNickName' style={{ cursor: 'default', width: '80px' }}></li>
															<li id='dataDetailReatTime' style={{ cursor: 'default' }}></li>
															<li style={{ cursor: 'default' }}>来自:<a id='dataDetailTab' style={{ color: "#666666", textDecoration: "none", cursor: 'default' }}></a>
															</li>
														</ul>
														<ul className='sectionInfoRight' style={{float: 'left'}}>
															<li>
																回复:<span id='dataDetailReplyCount'></span>
															</li>
															<li style={{marginLeft:'0px'}}>浏览量:<span id='dataDetailVisitCount'></span>
															</li>
														</ul>
													</div>
												</div>

											</div>

										</div>
									</div>
								</div>
								<div id='dataDetailContent'
									style={{ 
									marginBottom: "20px",
									wordWrap: "break-word", 
									textOverflow: 'ellipsis', 
									overflow: 'hidden', 
									width: '800px',
									fontSize:'16px',
									color:"#333", 
									textIndent: "35px",
    								lineHeight: "2em",textAlign:'justify'
									}}>
								</div>

								{window.sessionStorage.token ?
									<div className='detailLangue' style={{height: 'auto'}}>
										<div className='FaultnewFormtop2' style={{height: 'auto'}}>
											<h5 className='commitNum'>
												<span className='commitNumtics'>网友评论:文明上网积极发言
														</span>共<a id='commitNumDetail'></a>条评论
																									</h5>
											{/* <label htmlFor="user" className='newFormPlable' id='newFormPlable'><img id='detailComitImg'/></label> */}
											{/* <textarea className='textareaFaultNew' id='putPublicSubmitDetialData'></textarea> */}

											<div id="comment_editor" style={{height: '150px', marginRight: '20px'}}></div>
										</div>
										<div className='publicSubmit' style={{margin: '0px', height: '50px'}}>
											<span className='sectionBtn' style={{margin: '0px'}}>
												<button               
													type="button"
													className='sectionBtn1'
													style={{margin: '0 20px 0 0'}}
													onClick={this
														.putPublicSubmitDetial        
														.bind(_this)}>发布评论</button>
												{/*<button type="button" className='sectionBtn1'>取消</button>*/}
											</span>
										</div>
									</div>
									:
										<div className="reviewBottom" style={{height: '38px', border: '1px solid gray'}}>
											<div style={{ float: "left", lineHeight: '36px', marginLeft: "5px" }}>请 <a onClick={
													() => {
														window.location.pathname = "/login"
													}
												}>登录</a> 后发表评论</div>
										</div>	
								}

								<div className='comdetialList' style={{marginTop: 0}}>
									<h5 className='comdetialListTitle'>
										最新评论
                                            <span className='sectionBtnNav'>
											<button type="button" className='' id='get_allDataTime'>热度排序</button>
											<button type="button" className='sectionBtn1' id='get_allDataHot'>时间排序</button>
										</span>
									</h5>
									{detailReplyListComnt.length > 0 ?
										detailReplyListComnt
										:
										<div style={{
											borderBottom: "solid 1px #e5e5e5"
										}}>
											<img src={norecord} alt="" style={{
												width: "109px",
												marginLeft: "250px"
											}} />
											<span>
												暂无评论
                                    				</span>
										</div>
									}
									{detailReplyListComnt.length > 0 &&
										<footer className='pageCommunityNum' style={{ marginTop: "130px", textAlign: 'right' }}>
											<ReactPaginate
												previousLabel={"上一页"}
												nextLabel={"下一页"}
												breakLabel={< a href="" > ...</a>}
												breakClassName={"break-me"}
												pageCount={this.state.pageCount}
												marginPagesDisplayed={2}
												pageRangeDisplayed={5}
												onPageChange={this.handlePageClickComit}
												containerClassName={"pagination"}
												subContainerClassName={"pages pagination"}
												activeClassName={"active"} />
										</footer>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* <div className='footerCommunity'>
					<FooterComunity />
				</div> */}
			</div>
		);
	}
}
export default DetialListCom;