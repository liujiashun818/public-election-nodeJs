import React, {
	Component
} from 'react';
// import indexGenManger from '../../../images/index/indexGenManger.png';
import indexNews0 from '../../../images/index/indexNews0.jpg';
import indexNews1 from '../../../images/index/indexNews1.jpg';
import indexNews2 from '../../../images/index/indexNews2.jpg';
import indexNewsLogo from '../../../images/index/newlogo.png'
import $ from 'jquery';
import netService from '../../../library/interfaceAddress';
class Section15 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			bloggerData: [],
		}
	}
	loadBloggersFromServer() {
		let self = this;
		$.ajax({
			url: netService.getAllList.BOGGER_PAGE,
			data: { itemsPerPage: 8, offset: 0, all: 1, tagId: 0 },
			dataType: 'json',
			type: 'GET',
			success: (result) => {
				if (result.success) {
					let datas = [result.data.list[0], result.data.list[1]];
					self.setState({ bloggerData: datas });
				}
			}, error: (xhr, status, err) => {
				console.error(this.props.url, status, err.toString());
			}
		});
	}
	componentDidMount() {
		this.loadBloggersFromServer();
		$('.indexNewsMainImg').mousedown(function () {
			if ($('#indexNewsMainImgSrcMenB').css('height').replace('px', '') === '0')
				$('#indexNewsMainImgSrcMenB').animate({
					height: "260px"
				}, 600)
			else {
				$('#indexNewsMainImgSrcMenB').animate({
					height: "0px"
				}, 600)
			}
		});

	};
	render() {
		let data = this.state.bloggerData;
		function createNew(item) {
			if (!item) {
				return;
			}
			let newTime = new Date(item.CreatedTime);
			let publishTime = newTime.getFullYear() + '年' + (newTime.getMonth() + 1) + '月' + newTime.getDay() + '日';
			let url = window.location.origin + '/post/' + item.id;
			let imgSrc = item.Content;
			if (imgSrc) {
				let imgIdxStart = imgSrc.indexOf('\<img');
				if (imgIdxStart > 0) {
					imgSrc = imgSrc.substr(imgIdxStart);
					let imgIdxEnd = imgSrc.indexOf('</img>') > 0 ? imgSrc.indexOf('</img>') + 6 : -1;
					if (imgIdxEnd === -1)
						imgIdxEnd = imgSrc.indexOf('/>') > 0 ? imgSrc.indexOf('/>') + 2 : -1;
					imgSrc = imgSrc.substr(0, imgIdxEnd);
					let imgSrcIdxStart = imgSrc.indexOf('src="') + 5;
					if (imgSrcIdxStart < 5)
						imgSrc = null;
					else {
						imgSrc = imgSrc.substr(imgSrcIdxStart);
						if (imgSrcIdxStart > 0) {
							let imgSrcIdxEnd = imgSrc.indexOf('"');
							imgSrc = imgSrc.substr(0, imgSrcIdxEnd) + '?imageView/1/h/110/w/160';
							// console.log(imgSrc);
						}
					}
				}
				else
					imgSrc = null;
			}
			imgSrc = imgSrc === null ? indexNewsLogo : imgSrc;
			return (
				<aside className='indexNewsImgTxt'>
					<div className='indexNewsImgBox'>
						<a href={url}>
							<img className='indexNewsImgSize' src={imgSrc} />
						</a>
					</div>
					<div className='indexNewsImgRightbrief'>
						<a href={url}>
							<p className='indexNewsImgRightTxt'> {item.Title}</p>
						</a>
						<footer className='indexNewRightbottom'> {publishTime}</footer>
					</div>
				</aside>
			);
		};
		return (
			<div className='indexNews'>

				<div className='indexNewsInner'>
					<p className='indexBriefInnerTitle'>新闻</p>
					<div className='indexNewsContent'>
						<div className='indexNewsMainImg'>
							<div className='indexNewsMainImgBox'>
								<img className='indexNewsMainImgSrc' src={indexNews0} />

							</div>
							<footer className='indexNewsMainBtnBox'>
								<span className='indexNewsMainBtnBoxSpan'></span>
								{/* <span className='indexNewsMainBtn'> 更多</span> */}
							</footer>
							<div className='indexNewsMainImgSrcMenB' id='indexNewsMainImgSrcMenB'>
								<h6 className='indexNewsMainImgSrcMenTitle'> 欢迎加入亿书</h6>
								<div className='indexNewsMainImgSrcMenTxt'>
									亿生生是一家区块链研发、服务和咨询的技术驱动型高科技公司。拥有不依赖于比特币、以太坊等第三方平台，完全自主知识产权和国产化的区块链产品和技术。欢迎对区块链感兴趣的小伙伴共同探索未来！
									    </div>
							</div>
						</div>
						<div className='indexNewsMainRight'>
							{createNew(data[0])}
							<div className="Line"></div>
							{createNew(data[1])}
						</div>

					</div>
				</div>
			</div>
		);
	}
}
export default Section15;