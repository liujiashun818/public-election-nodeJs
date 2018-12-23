/**
 * Created by Administrator on 2017/7/12.
 */
import React, {Component} from 'react';
import imgLogoBanner from '../../images/logo-banner.png';
import imgChainclub from '../../images/chainclub.jpg';
import imgWx from '../../icons/wx.png';
import imgdoc from '../../icons/doc.png';
import imgLink from '../../icons/link.png';
import imgContact from '../../icons/contact.png';
import './footerComunity.css'
class FooterComunity extends React.Component {
    render() {
        return (
            <div className="footerComunity"> 
                <div className="innerTop">
	                        <div className="SqfootLeft">
	                           {/* <div className="logo_banner"><img src={imgLogoBanner} style={{alt:"logo"}} /></div>
	                            <div style={{marker:"weixin"}}  className="weixin">
	                                <img src={imgWx} alt="logo"/>
	                                <div style={{marker:"weixin-detail"}}  className="prcode">
	                                    <img src={imgChainclub} alt="logo"/>
	                                    <div>微信公众号<br/>chainclub</div>
	                                </div>
	                            </div>*/}
	                        </div>
                        
                        <div className="SqfootPagetxt">
{/*                            <dl>
                                <dt><img src={imgdoc} alt="Ebookchain"/>文档</dt>
                                <dd><a target="_blank" href="/ebookchain.pdf">白皮书</a></dd>
                                <dd><a target="_blank" href="/greenpaper-pre.pdf">绿皮书</a></dd>
                                <dd><a target="_blank" href="/ico.pdf">ICO细则</a></dd>
                                <dd><a target="_blank" href="http://chainclub.org/topic/17/faq-热点问题">FAQ</a>
                                </dd>
                                <dd><a target="_blank" href="http://bitcoin-on-nodejs.ebookchain.org/">node.js区块链开发</a>
                                </dd>
                            </dl>*/}
                        </div>
                        
                        <div className="SqfootLink">
                            {/*<dl>
                                <dt><img src={imgLink} alt="Ebookchain"/>资源链接</dt>
                                <dd><a target="_blank" href="https://github.com/Ebookchain/ebookchain.org">亿书官网</a>
                                </dd>
                                <dd><a target="_blank" href="https://github.com/Ebookcoin/ebookcoin">亿书</a>
                                </dd>
                                <dd><a target="_blank" href="http://chainclub.org/">区块链俱乐部</a></dd>
                            </dl>*/}
                        </div>
                        
                        <div className="SqfootRight">
                           {/* <dl>
                                <dt><img src={imgContact} style={{alt:"Ebookchain"}} />联系</dt>
                                <dd>微博</dd>
                                <dd><a target="_blank" href="http://weibo.com/ebookchain">ebookchain</a>
                                </dd>
                                <dd>官方QQ群：</dd>
                                <dd>
                                    <a target="_blank" title="加入亿书官方QQ群"
                                       href="http://shang.qq.com/wpa/qunwpa?idkey=3c8dd274a6366176ccc886e831b3aaeb4d917e48afb0c53a2eafdba500c49933">
                                        185046161
                                    </a>
                                    <a target="_blank" title="加入亿书开源社区会员群"
                                       href="http://shang.qq.com/wpa/qunwpa?idkey=3c8dd274a6366176ccc886e831b3aaeb4d917e48afb0c53a2eafdba500c49933">
                                        185046488
                                    </a>
                                </dd>
                                <dd>邮箱</dd>
                                <dd>
                                    <a target="_blank" href="mailto:support@ebookchain.org">support@ebookchain.org</a>
                                </dd>
                            </dl>*/}
                        </div>
                        
                        
                    </div>
                    
                    <div className="innerBottom">
                        <hr/>
                        <div className="">Copyright &copy; 2017 Ebookchain. All rights reserved.</div>
                    </div>
                    
            </div>
        );
    }
}
export default FooterComunity;