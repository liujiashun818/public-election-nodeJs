import React, {
	Component
} from 'react';
import functionTop from '../../../images/index/functionTop.jpg';
// import functionBg from '../../../images/index/functionBg.png';
// import brief1Bg from '../../../images/index/brief1Bg.png';
// import functionBrief1 from '../../../images/index/icon2.jpg';
// import functionBrief2 from '../../../images/index/icon3.jpg';
// import functionBrief3 from '../../../images/index/icon4.jpg';
import brief from '../../../images/index/brief.jpg';
import $ from 'jquery';
class Section13 extends React.Component {
	componentDidMount() {
		$(document).ready(function () {
			$('.indexFunctionNav>div').click(function () {
				$(this).addClass('indexFunctionNavListHover').siblings().removeClass('indexFunctionNavListHover');
				$('#indexFunctionInerBox>div').eq($(this).index()).show().siblings().hide();
			})

		})
	}

	render() {
		return (
			<div className='indexFunction'>
				<div className='indexFunctionInerBox' id='indexFunctionInerBox'>
					<div className='indexFunctionIner' style={{ display: 'block' }}>
						<div>
							<div className='functionTitle'>
								Matrixchain
								</div>
							<div className='functionImgDiv'>
								<img src={brief} style={{ width: '593px', height: '292px' }} />
							</div>
							<div className='functionTxt'>
								矩阵链
								</div>
							<div className='functionContent'>
								矩阵链是一种具备灵活扩展能力的区块链程序，针对不同行业和应用场景通过自我复制，衍生出来的包含联盟链、私有链、公有链在内的多链态组合；一套代码，链链互访，至少三条以上完整的链；无主链、侧链区别，但是链有长短的差异。
								</div>
							<div style={{position: 'absolute'}}>
								<img src={functionTop} style={{opacity: 0.1,marginTop: '-246px'}} />
							</div>
						</div>
						{/* <header className='functionInerTop'>
							<article className='functionInerFlex'>
								<img className='functionInerLeftTopImg' src={functionTop} />
							</article>
							<aside className='functionInerFlex1'>
								<p className='functionTopTitle'>EBOOKCHAIN</p>
								<p className='functionTopTxt'>亿书作为创作工具，立足于数字出版源头，采用先进的区块链技术，为作者解决了版权注册难 ，保护难的问题；同时实现了版权的分割交易；为广大作者提供了一体化的解决方案和服务。</p>
							</aside>
						</header>
						<footer className='functionInerFooter'>
							<p className='functionInerFooterTitle'>Technology </p>
							<div className='functionInerImgBrief'>
								<div className='functionInerImgBriefLeft'>
									<img className='functionBriefImg' src={functionBrief1} />
								</div>
								<span className='functionInerImgBriefRight'>作者写作内容的版权信息将自动写入区块链中，并实现博客、电子书、自出版等功能。</span>
							</div>
							<div className='functionInerImgBrief'>
								<div className='functionInerImgBriefLeft'>
									<img className='functionBriefImg' src={functionBrief2} />
								</div>
								<span className='functionInerImgBriefRight'>亿书P2P网络，构建了版权保护协议，提供了代币(EBC)支付、分布式存储等功能</span>
							</div>
							<div className='functionInerImgBrief'>
								<div className='functionInerImgBriefLeft'>
									<img className='functionBriefImg' src={functionBrief3} />
								</div>
								<span className='functionInerImgBriefRight'>读者可以使用代币(EBC)购买、分享、评论和反馈阅读内容，并从中获得知识，甚至奖励。</span>
							</div>
						</footer> */}
					</div>
				</div>
			</div>
		);
	}
}
export default Section13;