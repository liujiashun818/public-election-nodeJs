import React from 'react';
import './community.css';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import netService from '../../library/resouresAddress.js';
import GeneralList from '../General/GeneralList';
import GeneralPage from '../General/GeneralPage';
import Footer from '../public/Footer'
import norecord from '../../images/norecord.png'
let testactive = (hash) => {
	var hasharr = window.location.hash.substr(2).split("/");
	if (hasharr[0] === hash) {
		return "active";
	}
	return "";
}
class Community extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			pageCount: 0,
			data: [],
			dataHot: [],
			dataPublic: [],
			dataWait: [],
			index: 0,
			navIndex: 0,
			currentPage: 0,
			offset: 0,
			hotDisplay: "block",
			noticeDisplay: "block",
			solveDisplay: "block",
			topDisplay: "block",
			screenOut: "",
			pageState: "off",
			address: "",
			type: 0,
			userData: {}
		}
		this.get_More = this.get_More.bind(this);
		this.hotMoreFun = this.hotMoreFun.bind(this);
		this.noticeMoreFun = this.noticeMoreFun.bind(this);
		this.solveMoreFun = this.solveMoreFun.bind(this);
		this.MoreHandlePageClick = this.MoreHandlePageClick.bind(this)
	};

	componentWillMount() {
		//全部列表
		var self = this
		var index = this.state.index;
		var navIndex = this.state.navIndex;

		this.get_allDataNav(index, navIndex)
		//热门话题
		//netService.getAllListCom.get_topicData
		//http://192.168.27.166:7070/api/club/topic/hot
		fetch(netService.getAllListCom.get_topicData, {
			type: 'GET',
		}).then(function (response) {
			if (response.status >= 400) {
				throw new Error("Bad response from server");
			}
			return response.json();
		}).then(function (stories) {
			var dataHot = stories.data
			if (dataHot.length <= 0) {
				return;
			}
			self.setState({ dataHot: dataHot });
			if(dataHot&&dataHot.length > 0)
			{
				for (var i = 0; i < dataHot.length; i++) 
				{
					$('#HotTopicTitle'+i).html(dataHot[i].title)
					$('#HotTopicVisit'+i).html(dataHot[i].visitCount)
				}
				// $('#HotTopicTitle0').html(dataHot[0].title)
				// $('#HotTopicTitle1').html(dataHot[1].title)
				// $('#HotTopicTitle2').html(dataHot[2].title)
				// $('#HotTopicTitle3').html(dataHot[3].title)
				// $('#HotTopicTitle4').html(dataHot[4].title)
				// $('#HotTopicVisit0').html(dataHot[0].visitCount)
				// $('#HotTopicVisit1').html(dataHot[1].visitCount)
				// $('#HotTopicVisit2').html(dataHot[2].visitCount)
				// $('#HotTopicVisit3').html(dataHot[3].visitCount)
				// $('#HotTopicVisit4').html(dataHot[4].visitCount)
			}
		});
		//公告
		//http://192.168.27.166:7070/api/club/topic/public
		//get_topicPublicData
		// fetch(netService.getAllListCom.get_topicPublicData, {
		// 	type: 'GET',
		// }).then(function (response) {
		// 	if (response.status >= 400) {
		// 		throw new Error("Bad response from server");
		// 	}
		// 	return response.json();
		// }).then(function (stories) {
		// 	var dataPublic = stories.data
		// 	if (dataPublic.length <= 0) {
		// 		return;
		// 	}
		// 	self.setState({ dataPublic: dataPublic });
		// 	if(dataPublic&&dataPublic.length > 0)
		// 	{
		// 		for (var i = 0; i < dataPublic.length; i++) 
		// 		{
		// 			$('#publicTitle'+i).html(dataPublic[i].title)
		// 			$('#publicVisit'+i).html(dataPublic[i].visitCount)
		// 		}
		// 	// $('#publicTitle0').html(dataPublic[0].title)
		// 	// $('#publicTitle1').html(dataPublic[1].title)
		// 	// $('#publicTitle2').html(dataPublic[2].title)
		// 	// $('#publicTitle3').html(dataPublic[3].title)
		// 	// $('#publicTitle4').html(dataPublic[4].title)
		// 	// $('#publicVisit0').html(dataPublic[0].visitCount)
		// 	// $('#publicVisit1').html(dataPublic[1].visitCount)
		// 	// $('#publicVisit2').html(dataPublic[2].visitCount)
		// 	// $('#publicVisit3').html(dataPublic[3].visitCount)
		// 	// $('#publicVisit4').html(dataPublic[4].visitCount)
		// 	}
		// });
		//等待解决
		//netService.getAllListCom.get_topicPublicData
		//http://192.168.27.166:7070/api/club/topic/wait
		// fetch(netService.getAllListCom.get_waitData, {
		// 	type: 'GET',
		// }).then(function (response) {
		// 	if (response.status >= 400) {
		// 		throw new Error("Bad response from server");
		// 	}
		// 	return response.json();
		// }).then(function (stories) {
		// 	var dataWait = stories.data
		// 	if (dataWait.length <= 0) {
		// 		return;
		// 	}
		// 	self.setState({ dataWait: dataWait });
		// 	if(dataWait&&dataWait.length > 0)
		// 	{
		// 		for (var i = 0; i < dataWait.length; i++) 
		// 			{
		// 				$('#waitTitle'+i).html(dataWait[i].title)
		// 				$('#waitVisit'+i).html(dataWait[i].visitCount)
		// 			}
		// 	// $('#waitTitle0').html(dataWait[0].title)
		// 	// $('#waitTitle1').html(dataWait[1].title)
		// 	// $('#waitTitle2').html(dataWait[2].title)
		// 	// $('#waitTitle3').html(dataWait[3].title)
		// 	// $('#waitTitle4').html(dataWait[4].title)
		// 	// $('#waitVisit0').html(dataWait[0].visitCount)
		// 	// $('#waitVisit1').html(dataWait[1].visitCount)
		// 	// $('#waitVisit2').html(dataWait[2].visitCount)
		// 	// $('#waitVisit3').html(dataWait[3].visitCount)
		// 	// $('#waitVisit4').html(dataWait[4].visitCount)
		// 	}
		// });
	};
	get_allDataNav(index, navIndex) {
		var self = this;
		fetch(netService.getAllListCom.get_itemsPerPageDataFen + "&offset=" + index + "&tab=" + navIndex, {
			type: 'GET',
		}).then(function (response) {
			if (response.status >= 400) {
				throw new Error("Bad response from server");
			}
			return response.json();
		}).then(function (stories) {
			var data = stories.data.list
			var dataNew = []
			for (var i = 0; i < data.length; i++) {
				let nameNav = '';
				switch (data[i].tab) {
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
				dataNew.push({
					authorId1: data[i].authorId,
					avatar: data[i].avatar,
					content: data[i].content,
					creatTime: data[i].creatTime,
					id: data[i].id,
					likeCount: data[i].likeCount,
					nickName: data[i].nickName,
					replyCount: data[i].replyCount,
					tab: nameNav,
					title: data[i].title,
					visitCount: data[i].visitCount,
					replyList: data[i].replyList
				})
			}
			var pageCount = Math.ceil(stories.data.count / 9);

			self.setState({
				data: dataNew,
				pageCount: pageCount
			});
		});
	}
	
	componentDidMount() {
		let _this = this
		$("#sectionListClick>li").click(function (e) {
			if (_this.state.topDisplay === "none") {
				return;
			}
			$(this).addClass('sectionliColor').siblings().removeClass('sectionliColor')
			let navIndex = $(this).index();
			_this.setState({ navIndex: navIndex });
			let index = _this.state.index
			let self = _this
			self.setState({ currentPage: index });
			fetch(netService.getAllListCom.get_itemsPerPageDataFen + "&offset=" + index + "&tab=" + navIndex, {
				type: 'GET',
			}).then(function (response) {
				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}
				return response.json();
			}).then(function (stories) {
				var data = stories.data.list
				var pageCount = Math.ceil(stories.data.count / 9);
				var dataNew = []
				for (var i = 0; i < data.length; i++) {
					let nameNav = '';
					switch (data[i].tab) {
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
					dataNew.push({
						authorId1: data[i].authorId,
						avatar: data[i].avatar,
						content: data[i].content,
						creatTime: data[i].creatTime,
						id: data[i].id,
						likeCount: data[i].likeCount,
						nickName: data[i].nickName,
						replyCount: data[i].replyCount,
						tab: nameNav,
						title: data[i].title,
						visitCount: data[i].visitCount,
						replyList: data[i].replyList
					})
				}
				self.setState({
					data: dataNew,
					pageCount: pageCount
				});
			});

		})
		let token = window.sessionStorage.token;

		if (token) {
			//http://192.168.27.166:7070/api/club/authorinfo
			fetch(netService.getAllListCom.get_authorinfo, {
				headers: {
					'Cache-Control': 'no-cache',
					"Authorization": token
				},
				type: 'GET',
			}).then(function (response) {
				if (response.status >= 400) {
					throw new Error("Bad response from server");
				}
				return response.json();
			}).then(function (stories) {
				_this.setState({ userData: stories.data })
				$("#reponseimageId").attr("src", stories.data.avatar);
				$('#reponsePutNum').html(stories.data.topicCount)
				$('#artcleName').html(stories.data.nickName)
				$('#reponselistNum').html(stories.data.repyCount)
			});
		} else {
			$('.artcleLogIn').css({ 'display': 'none' })
		}

	};

	detialListCom(e) {
		var topicIdcom = e.target.id
		window.localStorage.setItem('topicIdcom', topicIdcom);
	};
	handlePageClick = (data) => {
		let index = Math.ceil(data.selected * 9);
		var navIndex = this.state.navIndex;
		this.setState({ currentPage: data.selected });
		this.get_allDataNav(index, navIndex)
	};

	hotMoreFun() {
		this.setState({
			pageState: 'on',
			address: netService.getAllListCom.get_Left,
			type: 0,
			hotDisplay: "none",
			noticeDisplay: "block",
			solveDisplay: "block",
			topDisplay: "none",
			screenOut: '热门'
		})
		this.get_More(netService.getAllListCom.get_Left, 0);
	}

	noticeMoreFun() {
		this.setState({
			pageState: 'on',
			address: netService.getAllListCom.get_Left,
			type: 1,
			noticeDisplay: "none",
			hotDisplay: "block",
			solveDisplay: "block",
			topDisplay: "none",
			screenOut: '公告'
		})
		this.get_More(netService.getAllListCom.get_Left, 1);
	}

	solveMoreFun() {
		this.setState({
			pageState: 'on',
			address: netService.getAllListCom.get_Left,
			type: 2,
			solveDisplay: "none",
			hotDisplay: "block",
			noticeDisplay: "block",
			topDisplay: "none",
			screenOut: '等待解决'
		})
		this.get_More(netService.getAllListCom.get_Left, 2);
	}

	get_More(address, type) {
		$.ajax({
			url: address,
			data: { itemsPerPage: 9, offset: this.state.offset, type: type },
			dataType: 'json',
			type: 'GET',
			success: (stories) => {
				var data = stories.data.list
				var dataNew = []
				for (var i = 0; i < data.length; i++) {
					let nameNav = '';
					switch (data[i].tab) {
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
					dataNew.push({
						authorId1: data[i].authorId,
						avatar: data[i].avatar,
						content: data[i].content,
						creatTime: data[i].creatTime,
						id: data[i].id,
						likeCount: data[i].likeCount,
						nickName: data[i].nickName,
						replyCount: data[i].replyCount,
						tab: nameNav,
						title: data[i].title,
						visitCount: data[i].visitCount,
						replyList: data[i].replyList
					})
				}
				var pageCount = Math.ceil(stories.data.count / 9);
				this.setState({
					data: dataNew,
					pageCount: pageCount
				})
			}, error: (xhr, status, err) => {
				console.error(this.props.url, status, err.toString());
			}
		});
	}

	MoreHandlePageClick = (data) => {
		let selected = data.selected;
		let offset = Math.ceil(selected * 9);
		this.setState({ offset: offset }, () => {
			this.get_More(this.state.address, this.state.type);
		});
	};

	render() {
		let { data, dataHot, dataPublic, dataWait, pageCount, currentPage } = this.state
		return (
			<div id="Community" style={{ background: "white" }}>
				<div className='comCenter'>
					<div className='section'>
						<div className='sectionList'>
							{this.state.topDisplay === 'none' ?
								<div className='sectionListTop'>
									<ul id='sectionListClick'>
										<li className='sectionli sectionliColor'>{this.state.screenOut}</li>
									</ul>
								</div>
								:
								<div className='sectionListTop'>
									<ul id='sectionListClick'>
										<li className='sectionli sectionliColor'>全部</li>
										<li className='sectionli'>区块链技术</li>
										<li className='sectionli'>亿书产品</li>
										<li className='sectionli'>市场活动</li>
										<li className='sectionli'>版权相关</li>
										<li className='sectionli'>社区交流</li>
									</ul>
								</div>
							}
							{data.length <= 0 ?
								<div style={{
									borderBottom: "solid 1px #e5e5e5"
								}}>
									<img alt='未找到图片' src={norecord} style={{
										width: "109px",
										marginLeft: "250px"
									}} />
									<span>
										暂无记录
                                    </span>
								</div>
								:
								<GeneralList data={data} count={this.state.currentPage} />
							}
							{this.state.pageState === 'off' && data.length > 0 &&
								<GeneralPage forcePage={currentPage} pageCount={pageCount} handlePageClick={this.handlePageClick} />
							}
							{this.state.pageState !== 'off' && data.length > 0 &&
								<GeneralPage forcePage={currentPage} pageCount={pageCount} handlePageClick={this.MoreHandlePageClick} />
							}
						</div>
						<article>
							{
								this.state.userData &&
								<div className='artcleLogIn'>
									<form action="" method="get" className="widget_search">
										<div className='artcleLonInTop'>
											<div className='artcleImg'><img id='reponseimageId' alt="" /></div>
											<div className='artcleRight'>
												<div className='artcleRightInfo'>
													<div className='artcleName' id='artcleName'></div>
												<button type="button" style={{ color: "white" }} className={testactive("publicTxt")} id='artcleBtn' onClick={
													() => {
														window.location.href = "/publicTxt"
													}
												}>
													发布
											</button>
													<ul className='artcleNameList'>
														<li className='artcleNameListLeft'>
															<span>发帖&nbsp;:&nbsp;
															<a id='reponsePutNum'></a>
															</span>
														</li>
														<li><span>回复&nbsp;:&nbsp;<a id='reponselistNum'></a></span></li>
													</ul>
												</div>
											</div>
										</div>
									</form>
								</div>
							}
							<div className='sheQuHotTic' style={{ display: this.state.hotDisplay }}>
								<hr className='lineHrHot'></hr>
								<div className='sheQuHotTicMid'>
									<p className=''>
										<span className='hotTicTopTxtHodred'>热门话题</span>
										{dataHot.length > 0 &&
											<span className='hotTicMore'><a target="_blank" onClick={this.hotMoreFun}>更多</a></span>
										}
									</p>
									{dataHot.length <= 0 ?
										<div>
											<img alt='未找到图片' src={norecord} style={{
												width: "100px",
											}} />
											<span>
												暂无话题记录
                                   			 </span>
										</div>
										:
										<div className='sheQuHotTicMidListBox' key={dataHot.id}>
											<div className='sheQuHotTicMidList'>
												{dataHot && dataHot.length > 0 &&
													<Link to={"/communitys/" + dataHot[0].id} >
														<div className='sheQuHotTicMidListLine' style={{display: 'inline'}}><span className='sheQuHotTicMidListLine1'>1. </span><span id='HotTopicTitle0'></span></div>
														<span className='sheQuHotNum' id='HotTopicVisit0'></span></Link>
												}
											</div>
											<div className='sheQuHotTicMidList'>
												{dataHot && dataHot.length > 1 &&
													<Link to={"/communitys/" + dataHot[1].id} >
														<div className='sheQuHotTicMidListLine'><span className='sheQuHotTicMidListLine2'>2. </span><span id='HotTopicTitle1'></span></div>
														<span className='sheQuHotNum' id='HotTopicVisit1'></span>
													</Link>
												}
											</div>
											<div className='sheQuHotTicMidList'>
												{dataHot && dataHot.length > 2 &&
													<Link to={"/communitys/" + dataHot[2].id} >
														<div className='sheQuHotTicMidListLine'><span className='sheQuHotTicMidListLine3'>3. </span><span id='HotTopicTitle2'></span></div>
														<span className='sheQuHotNum' id='HotTopicVisit2'></span>
													</Link>
												}
											</div>
											<div className='sheQuHotTicMidList'>
												{dataHot && dataHot.length > 3 &&
													<Link to={"/communitys/" + dataHot[3].id} >
														<div className='sheQuHotTicMidListLine'><span>4. </span><span id='HotTopicTitle3'></span></div>
														<span className='sheQuHotNum' id='HotTopicVisit3'></span>
													</Link>
												}
											</div>
											<div className='sheQuHotTicMidList'>
												{dataHot && dataHot.length > 4 &&
													<Link to={"/communitys/" + dataHot[4].id} >
														<div className='sheQuHotTicMidListLine'><span>5. </span><span id='HotTopicTitle4'></span></div>
														<span className='sheQuHotNum' id='HotTopicVisit4'></span>
													</Link>
												}
											</div>
										</div>
									}

								</div>
							</div>
							<div className='sheQuHotTic' style={{ display: 'none' }}>
								<hr className='lineHrHot'></hr>

								<div className='sheQuHotTicMid'>
									<p className=''>
										<span className='hotTicTopTxt'>社区公告</span>
										{dataPublic.length > 0 &&
											<span className='hotTicMore'><a onClick={this.noticeMoreFun}>更多</a></span>
										}
									</p>
									{dataPublic.length <= 0 ?
										<div>
											<img alt='未找到图片' src={norecord} style={{
												width: "100px",
											}} />
											<span>
												暂无话题记录
                                   			 </span>
										</div>
										:
										<div className='sheQuHotTicMidListBox' key={dataHot.id}>
											<div className='sheQuHotTicMidList'>
												{dataPublic && dataPublic.length > 0 &&
													<Link to={"/communitys/" + dataPublic[0].id} >
														<div className='sheQuHotTicMidListLine'><span>1. </span><span id='publicTitle0'></span></div>
														<span className='sheQuHotNum' id='publicVisit0'></span>
													</Link>
												}
											</div>
											<div className='sheQuHotTicMidList'>
												{dataPublic && dataPublic.length > 1 &&
													<Link to={"/communitys/" + dataPublic[1].id} >
														<div className='sheQuHotTicMidListLine'><span>2. </span><span id='publicTitle1'></span></div>
														<span className='sheQuHotNum' id='publicVisit1'></span>
													</Link>
												}
											</div>
											<div className='sheQuHotTicMidList'>
												{dataPublic && dataPublic.length > 2 &&
													<Link to={"/communitys/" + dataPublic[2].id} >
														<div className='sheQuHotTicMidListLine'><span>3. </span><span id='publicTitle2'></span></div>
														<span className='sheQuHotNum' id='publicVisit2'></span>
													</Link>
												}
											</div>
											<div className='sheQuHotTicMidList'>
												{dataPublic && dataPublic.length > 3 &&
													<Link to={"/communitys/" + dataPublic[3].id} >
														<div className='sheQuHotTicMidListLine'><span>4. </span><span id='publicTitle3'></span></div>
														<span className='sheQuHotNum' id='publicVisit3'></span>
													</Link>
												}
											</div>
											<div className='sheQuHotTicMidList'>
												{dataPublic && dataPublic.length > 4 &&
													<Link to={"/communitys/" + dataPublic[4].id} >
														<div className='sheQuHotTicMidListLine'><span>5. </span><span id='publicTitle4'></span></div>
														<span className='sheQuHotNum' id='publicVisit4'></span>
													</Link>
												}
											</div>
										</div>
									}
								</div>
							</div>
							{/* <div className='sheQuHotTic' style={{ display: this.state.solveDisplay }}>
								<hr className='lineHrHot'></hr>

								<div className='sheQuHotTicMid'>
									<p className=''>
										<span className='hotTicTopTxt'>等待解决</span>
										{dataWait.length > 0 &&
											<span className='hotTicMore'><a onClick={this.solveMoreFun}>更多</a></span>
										}
									</p>
									{
										dataWait.length <= 0 ?
											<div>
												<img alt='未找到图片' src={norecord} style={{
													width: "100px",
												}} />
												<span>
													暂无话题记录
                                   			 </span>
											</div>
											:
											<div className='sheQuHotTicMidListBox' key={dataHot.id}>
												<div className='sheQuHotTicMidList'>
													{dataWait && dataWait.length > 0 &&
														<Link to={"/communitys/" + dataWait[0].id} >
															<div className='sheQuHotTicMidListLine'><span>1. </span><span id='waitTitle0'></span></div>
															<span className='sheQuHotNum' id='waitVisit0'></span>
														</Link>
													}
												</div>
												<div className='sheQuHotTicMidList'>
													{dataWait && dataWait.length > 1 &&
														<Link to={"/communitys/" + dataWait[1].id} >
															<div className='sheQuHotTicMidListLine'><span>2. </span><span id='waitTitle1'></span></div>
															<span className='sheQuHotNum' id='waitVisit1'></span>
														</Link>
													}
												</div>
												<div className='sheQuHotTicMidList'>
													{dataWait && dataWait.length > 2 &&
														<Link to={"/communitys/" + dataWait[2].id} >
															<div className='sheQuHotTicMidListLine'><span>3. </span><span id='waitTitle2'></span></div>
															<span className='sheQuHotNum' id='waitVisit2'></span>
														</Link>
													}
												</div>
												<div className='sheQuHotTicMidList'>
													{dataWait && dataWait.length > 3 &&
														<Link to={"/communitys/" + dataWait[3].id} >
															<div className='sheQuHotTicMidListLine'><span>4. </span><span id='waitTitle3'></span></div>
															<span className='sheQuHotNum' id='waitVisit3'></span>
														</Link>
													}
												</div>
												<div className='sheQuHotTicMidList'>
													{dataWait && dataWait.length > 4 &&
														<Link to={"/communitys/" + dataWait[4].id} >
															<div className='sheQuHotTicMidListLine'><span>5. </span><span id='waitTitle4'></span></div>
															<span className='sheQuHotNum' id='waitVisit4'></span>
														</Link>
													}
												</div>
											</div>
									}
								</div>
							</div> */}
						</article>
					</div>
				</div>
			</div>
		)
	}
}

export default Community;
