import React, {
	Component
} from 'react';
import Dialog from 'material-ui/Dialog';
import copy from 'copy-to-clipboard';
import banner from '../../../images/index/banner.jpg';
import zhibo from '../../../images/index/zhibo.jpg';
import indextop from '../../../images/index/indextop.jpg';
import indextop1 from '../../../images/index/indextop1.jpg';
// import indextop2 from '../../../images/index/indexBrief7.jpg';
// import indextop3 from '../../../images/index/indexBrief8.jpg';
// import indextop4 from '../../../images/index/indexBrief6.jpg';
import forward from '../../../images/index/forward.png';
import './sectionIndexAll.css';
import $ from 'jquery';
class Section11 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			open: true,
			ebc: '?'
		};
	}
	componentDidMount() {
		window.onresize = resize;
		function resize() {
			let width = document.body.clientWidth;
			// let len = $('#indexNavImgBox').children().length;
			let offset = parseInt($('#indexNavImgBox').css('left').replace('px', ''), 10);
			// console.log('oWidth:'+oWidth)
			// console.log('offset:'+offset)
			let oIndex = offset / oWidth;
			// console.log('oIndex:'+oIndex)
			offset = width * oIndex;
			// console.log('offset:'+offset)
			oWidth = width;
			$('#indexNavImgBox').children().each((index, element) => {
				$(element).width(width);
				// console.log($(element).width());
			})
			$('#indexNavImgBox').width(width * len);
			// let img = $('#indexNavImgBox').children().first();
			// let oWidth = $(img).width();
			// console.log('index:'+index)
			// console.log('oWidth:'+oWidth)
			// // console.log('offset:'+offset)
			// console.log('index:'+index)
			// console.log('width:'+width)
			// console.log('offset:'+offset)
			$('#indexNavImgBox').css('left', offset);
		}

		$('#indexMengbanLeftMore').hover(function () {
			$('#indexMengbanLeftMoreionc').stop().fadeIn(600);
		}, function () {
			$('#indexMengbanLeftMoreionc').stop().fadeOut(600);
		});
		$('#indexMengbanRightMore').hover(function () {
			$('#indexMengbanRightMoreionc').stop().fadeIn(600);
		}, function () {
			$('#indexMengbanRightMoreionc').stop().fadeOut(600);
		})
		$('#indexMengbanLeftMoreionc').on("click", function () {//左箭头
			let indexNavImgBox = $("#indexNavImgBox");
			let oWidth = document.body.clientWidth;
			if (indexNavImgBox.is(':animated')) {
				return;
			}
			if (index == 0) {
				index = len;
			} else {
				index -= 1;
			}
			animate(+oWidth);
			if (index === 1||index === 4) {
				$('#d_titleZ').show();
				$('#d_titleZ').siblings().hide();
			}
			else if (index === 2) {
				$('#d_titleC').show();
				$('#d_titleC').siblings().hide();
			}
			else if (index === 3) {
				$('#d_titleE').show();
				$('#d_titleE').siblings().hide();
			}
		})
		//		$('#indexMengbanLeftMoreionc').click(function(){
		//			$('#indexNavImgTop1').stop().fadeOut()
		//			$('#indexNavImgTop2').stop().fadeIn()
		//		});
		//		$('#indexMengbanRightMoreionc').click(function(){
		//			$('#indexNavImgTop1').stop().fadeOut()
		//			$('#indexNavImgTop1').stop().fadeIn()
		//		})
		// let width = document.body.clientWidth;
		resize();
		let indexNavImgBox = $("#indexNavImgBox");
		let indexMengbanRightMoreionc = $("#indexMengbanRightMoreionc");
		let indexMengbanLeftMoreionc = $("#indexMengbanLeftMoreionc");
		let len = indexNavImgBox.children().length;
		let oWidth = parseInt(document.body.clientWidth);
		let index = 1;
		let interval = 3000;
		// let timer = null;          
		indexNavImgBox.css('left', 0);

		function animate(offset) {
			let len = indexNavImgBox.children().length;
			// console.log(indexNavImgBox.css('left').replace('px', ''))
			if (offset > 0 && parseInt(indexNavImgBox.css('left').replace('px', ''), 10) >= 0) {
				indexNavImgBox.css('left', -(oWidth * (len - 1)));
			}
			var newLeft = parseInt(indexNavImgBox.css('left')) + offset;
			indexNavImgBox.animate({
				'left': newLeft + 'px'
			}, function () {
				// console.log('newLeft:'+newLeft);
				// if (newLeft >= 0) {
				// 	indexNavImgBox.css('left', -oWidth * len);
				// }
				if (newLeft <= -oWidth * (len - 1)) {
					indexNavImgBox.css('left', 0);
					index = 1;
				}
				if (index === 1||index === 4) {
					$('#d_titleZ').show();
					$('#d_titleZ').siblings().hide();
				}
				else if (index === 2) {
					$('#d_titleC').show();
					$('#d_titleC').siblings().hide();
				}
				else if (index === 3) {
					$('#d_titleE').show();
					$('#d_titleE').siblings().hide();
				}
			});
		}
		let self = this
		function autoplay() {
			// if(window.location.pathname !== '/'){
			// 	console.log('stop')
			// 	stop();
			// return;}
			self.timer = setTimeout(function () {
				indexMengbanRightMoreionc.trigger('click');
				autoplay();
			}, interval);
			// console.log('autoplay')
		}

		function stop() {
			clearInterval(self.timer);
		}
		indexNavImgBox.on('mouseover', function () {
			stop();
		});
		indexNavImgBox.on('mouseout', function () {
			autoplay;
		});
		indexMengbanRightMoreionc.on('click', function () {
			let indexNavImgBox = $("#indexNavImgBox");
			let oWidth = document.body.clientWidth;
			// 	console.log($('#test').width())
			// console.log("oWidth")
			// console.log(indexNavImgBox.css('width'))
			// console.log(oWidth)
			if (indexNavImgBox.is(':animated')) {
				return;
			}
			if (index == len) {
				index = 1;
			} else {
				index += 1;
			}
			animate(-oWidth);
			// console.log(index)
			if (index === 1||index === 4) {
				$('#d_titleZ').show();
				$('#d_titleZ').siblings().hide();
			}
			else if (index === 2) {
				$('#d_titleC').show();
				$('#d_titleC').siblings().hide();
			}
			else if (index === 3) {
				$('#d_titleE').show();
				$('#d_titleE').siblings().hide();
			}
		});

		autoplay();
	}

	componentWillUnmount() {
		if (this.timer) clearInterval(this.timer)
		this.timer = null
		window.onresize = null
		// console.log(this.timer)
	}

	render() {
		return (
			<div className="screen">
				<div className='indexNavImg'>
					<div className='indexNavImgBox' id='indexNavImgBox'>
						<div id='test' style={{ float: 'left', height: '400px', backgroundImage: 'url(' + banner + ')', backgroundRepeat: 'no-repeat', margin: "0 auto" }} >
							<div style={{width:"100%",height: "100%"}}>
								</div>
						</div>
						<div id='test' style={{ float: 'left', height: '400px', backgroundImage: 'url(' + indextop + ')', backgroundRepeat: 'no-repeat', margin: "0 auto" }} />
						<div id='test' style={{ float: 'left', height: '400px', backgroundImage: 'url(' + indextop1 + ')', backgroundRepeat: 'no-repeat', margin: "0 auto" }} />
						{/* <div id='test' style={{ float: 'left', height: '400px', backgroundImage: 'url(' + banner + ')', backgroundRepeat: 'no-repeat', margin: "0 auto" }} >
							<div style={{width:"100%",height: "100%"}} onClick={()=>{this.setState({open:true})}}>
								</div>
						</div> */}
						{/* <img alt="1" className='indexNavImgTop' id='indexNavImgTop1' src={indextop} />
					<img alt="2" className='indexNavImgTop' id='indexNavImgTop2' src={indextop1} />
					<img alt="3" className='indexNavImgTop' id='indexNavImgTop3' src={indextop2} />
					<img alt="4" className='indexNavImgTop' id='indexNavImgTop4' src={indextop3} />
					<img alt="1" className='indexNavImgTop' id='indexNavImgTop1' src={indextop} /> */}
					</div>
					<div className='indexNavImgindexNavMengbanLeft'>
						<div className='indexMengbanLeftMore' id='indexMengbanLeftMore'>
							<div className='indexMengbanLeftMoreionc' id='indexMengbanLeftMoreionc'>
								<img src={forward} style={{ transform: 'rotate(180deg)', height: '47px', width: '19px' }} />
							</div>
						</div>
						<div id='d_titleE' style={{ display: 'none' }}>
							<div className='indexNavImgMengbanRightTitleE'>Blockchain</div>
							<div className='indexNavImgMengbanRightTxtE'>
								Change We Can Believe In！
                    		</div>
						</div>
						<div id='d_titleC' style={{ display: 'none' }}>
							<div className='indexNavImgMengbanRightTitleC' >亿生生是中国第一家国产区块链研发公司</div>
							<div className='indexNavImgMengbanRightTxtC'>
								矩阵链：版权、金融、医疗、大数据、保险、征信、知识产权、物流、物联网等行业应用。
                    		</div>
						</div>
						<div id='d_titleZ'>
							<div className='indexNavImgMengbanRightTitleC' >直播分享</div>
							<div className='indexNavImgMengbanRightTxtC'>
								<p>1.新功能讲解 / 客户端&官网 / 工程师 赖双青</p>
								<p>2.节点技术说明 / 工程师 刘星星</p>             
								<p>3.推广大使的心路历程 / 福建“亿叔” 颜兴</p>
                    		</div>
						</div>
					</div>
					<div className='indexNavImgindexNavMengbanRight'>
						<div className='indexMengbanRightMore' id='indexMengbanRightMore'>
							<div className='indexMengbanRightMoreionc' id='indexMengbanRightMoreionc'>
								<img src={forward} style={{ height: '47px', width: '19px' }} />
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
export default Section11;