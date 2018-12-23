import React, {Component} from 'react';
// import indexfooter1 from '../../../images/index/indexfooter1.png';
// import indexfooter2 from '../../../images/index/indexfooter2.png';
// import indexfooter3 from '../../../images/index/indexfooter3.png';
// import indexfooter4 from '../../../images/index/indexfooter4.png';
import weixin from '../../../images/index/weixin.jpg';
import weibo from '../../../images/index/weibo.jpg';
class Footer extends React.Component {
    render() {
        return(
            <div className='indexFooter'>
		            <div className='indexFooterInner'>
		              	<div className='indexFooterInnerList'>
		              	    <p className='indexFooterInnerListP'>相关文档</p>
		              	    <ul className='indexFooterInnerListUl'>
		              	      <li><a target="_blank"  rel="noopener noreferrer" href="/ebookchain.pdf">白皮书</a></li>
		              	      <li><a target="_blank"  rel="noopener noreferrer" href="/greenpaper-pre.pdf">绿皮书</a></li>
		              	      {/* <li><a target="_blank"  rel="noopener noreferrer" href="/ico.pdf">ICO细则</a></li> */}
		              	      {/* <li><a target="_blank"  rel="noopener noreferrer" href="http://chainclub.org/topic/17/faq-热点问题">FAQ</a></li> */}
		              	      <li><a target="_blank" rel="noopener noreferrer" href="http://bitcoin-on-nodejs.ebookchain.org/">Node.js区块链开发</a></li>
		              	    </ul>
		              	</div>
		              	<div className='indexFooterInnerList'>
		              	    <p className='indexFooterInnerListP'>资源链接</p>
		              	    <ul className='indexFooterInnerListUl'>
		              	      {/* <li><a target="_blank" rel="noopener noreferrer" href="/download">亿书客户端</a></li> */}
		              	      <li><a target="_blank" rel="noopener noreferrer" href="http://market.ebookchain.org/">MARKET</a></li>
		              	    </ul>
		              	</div>
		              	<div className='indexFooterInnerList indexFooterInnerList3'>
		              	    <p className='indexFooterInnerListP'>联系我们</p>
		              	    <ul className='indexFooterInnerListUl'>
		              	      <li > 地址：北京市朝阳区麦子店街39号部落方舟3楼</li>
		              	      <li> 邮箱：商务合作 <a href="mailto:operation@ebookchain.org">operation@ebookchain.org</a> 技术支持 <a href="mailto:support@ebookchain.org">support@ebookchain.org</a><br/>
								<span className="Delivery">简历投递</span>：<a href="mailto:hr@ebookchain.org">hr@ebookchain.org</a>
								</li>
		              	      <li> 电话：0086-010-65063310  工作日: 9:30 - 18:30</li>
								<li> QQ官方交流群：185046161 产品反馈群：650862316</li>
		              	    </ul>
		              	</div>
		              	<div className='indexFooterInnerList4'>
		              	    <p><a href="/AboutUs" style={{color: 'white',display: "inline-block",fontSize: "14px"}} className='indexFooterInnerListP'>关于我们</a></p>
		              	    {/* <div className='indexFooterMoreOne'>
			              	    <span className='indexFooterMoreOneBox'> <img className='indexFooterMoreOneBoximg' src={indexfooter2}/></span>
			              	    <span className='indexFooterMoreOneBox'> <img className='indexFooterMoreOneBoximg' src={indexfooter3}/></span>
			              	    <span className='indexFooterMoreOneBox'> <img className='indexFooterMoreOneBoximg' src={indexfooter4}/></span>
		              	    </div> */}
		              	    <div className='indexFooterMoreTwo'>
		              	     <span className='sWeixin'> <img className='imgWeixin' src={weixin}/><div className='txtWeixin'>官方微信</div></span>
		              	     <span className='sWeibo'> <img className='imgWeibo' src={weibo}/><div className='txtWeibo'>官方微博</div></span>
		              	    </div>
		              	</div>
		            </div>
		            <footer className='indexFooterBottom'> 版权© Ebookchain.org 域名备案号：
		              	      <a target="_blank"  rel="noopener noreferrer" href="http://www.miitbeian.gov.cn/publish/query/indexFirst.action">京ICP备17046686号</a></footer>
            </div>
        );
    }
}
export default Footer;