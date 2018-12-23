import React, {Component} from 'react';
import indexGenManger from '../../../images/index/indexGenManger.jpg';
class Section14 extends React.Component {
    render() {
        return(
            <div className='indexGeneralManger'>
              <div className='indexGeneralMangerInner'>
               		<p className='indexBriefInnerTitle'>区块链技术布道者</p>
					<div className='indexGeneralContent'>
							<div className='indexGeneralMainImg'>
								<div className ='indexGeneralMainImgBox'>
								  <img  className='indexGeneralMainImgSrc' src={indexGenManger}/>
								</div>
								<footer className='indexGeneralMainBtnBox'>
									<a target="_blank"  rel="noopener noreferrer" href="https://item.jd.com/12206128.html">
								    <span className='indexGeneralMainBtn'> 了解更多</span></a>
								</footer>
							</div>
							<div className='indexGeneralMainRight'> 
									<aside className='indexGeneralMainImgTxt'>
											<div className='indexGeneralLeftOne'>
												<p className='indexGeneralMainImgTitle'>CEO 朱志文 区块链技术布道者 </p>
												<p className='indexGeneralMainTitleList'>中国区块链俱乐部主创成员 </p>
												<p className='indexGeneralMainTitleList'>中国区块链技术社区代表人物 </p>
												<p className='indexGeneralMainTitleList'>《Node.js区块链开发》作者 </p>
												<p className='indexGeneralMainTitleList'>CSDN区块链知识库创建者、特邀编辑和知名博客专家。 </p>
											</div>
											<div className='indexGeneralLeftOne'>
												<p className='indexGeneralMainImgTitle'>Node.js区块链开发 </p>
												<p className='indexGeneralMainTitleList'>第一本国内区块链开发教材   </p>
												<p className='indexGeneralMainTitleList'>第一本从代码深度完整讲述区块链开发书籍    </p>
												<p className='indexGeneralMainTitleList'>第一本区块链开源产品实践书籍，通过工程思维讲解工程实践，真正的体现编程技术工具价值。 </p>
											</div>
									</aside>
							</div>
							
						</div>
					


              </div>

            </div>
        );
    }
}
export default Section14;