import React, {
	Component
} from 'react';
// import indexBrief from '../../../images/index/indexBrief.png';
import case1 from '../../../images/index/case.jpg';
import icon from '../../../images/index/icon.png';
import icon2 from '../../../images/index/icon2.jpg';
import icon3 from '../../../images/index/icon3.jpg';
import icon4 from '../../../images/index/icon4.jpg';
import $ from 'jquery';
class Section12 extends React.Component {
	componentDidMount() {
		$(document).ready(function () {
			$('#briefInnerTabBox>div').click(function () {
				$(this).addClass('briefInnerTabListBoder').siblings().removeClass('briefInnerTabListBoder');
				$('#briefInnerTabImgBox>div').eq($(this).index()).show().siblings().hide();
			})
		})
	}
	render() {
		return (
			<div className='indexBrief'>
				<div className='indexBriefInner'>
					<p className='indexBriefInnerTitle'>明星产品 亿书</p>
					<div className='briefInnerTab'>
						<p className='briefInnerTabTxt'>亿书是亿生生在知识产权领域的重磅产品，国内第一个面向C端用户的区块链落地应用。<br/>
							亿书初心：让有知识的人富起来！</p>
						<span className='indexGeneralMainBtn' style={{marginTop: '-20px'}}><a target='_blank' href='/download'>下载</a></span>
					</div>
					<div className='briefInnerTabImgBox' id='briefInnerTabImgBox'>
						<div className='' style={{ display: 'block',width: '569px',float: 'left'}}>
							<div className='imgBtn'>
								<span>
									<img src={icon2} style={{width:'55px',height:'62px',marginLeft:'100px',marginTop:'22px'}}/>
									<label style={{marginLeft:'55px'}}>版权保护</label>
									</span>
							</div>
							<div className='imgBtn'>
								<span>
									<img src={icon3} style={{width:'61px',height:'61px',marginLeft:'100px',marginTop:'22px'}}/>
									<label style={{marginLeft:'50px'}}>知识付费</label>
									</span>
							</div>
							<div className='imgBtn'>
								<span>
									<img src={icon4} style={{width:'57px',height:'59px',marginLeft:'100px',marginTop:'22px'}}/>
									<label style={{marginLeft:'54px'}}>协同创作</label>
									</span>
							</div>
							<div className='imgBtn'>
								<span>
									<img src={icon} style={{width:'63px',height:'44px',marginLeft:'100px',marginTop:'14px'}}/>
									<label style={{marginLeft:'48px', marginTop: '35px'}}>价值传播</label>
									</span>
							</div>
						</div>
						<div className='briefInnerTabImgBoxList' style={{ display: 'block' }}>
							<img className='briefInnerTabImg' src={case1} />
						</div>
					</div>

				</div>
			</div>
		);
	}
}
export default Section12;