/**
 * Created by Administrator on 2017/7/12.
 */
import React, {Component} from 'react';
import imgLogos from'../../../images/logos/8btc.svg';
import imgCnodeJs from'../../../images/logos/cnodejs.svg';
import imgGhost from'../../../images/logos/ghost.png';
import imgNodebb from'../../../images/logos/nodebb.png';
import imgMpwang from'../../../images/logos/mpwang.png';
import imgBiviews from'../../../images/logos/biviews.png';
import imgUbuntu from'../../../images/logos/ubuntu.png';
import imgCsdn from'../../../images/logos/csdn.png';
import Footer from "../../public/Footer";
class Section7 extends React.Component {
    render() {
        return(
            <div className="section fp-section fp-table" id="partner" style={{height: "374px"}}>
                <div className="fp-tableCell" style={{height: "374px"}}>
                    <div className="intro">
                        <h1>合作伙伴</h1>
                        <p className="desc">我们为世界上著名的开源产品或社区提供支持，欢迎您访问或使用他们。</p>
                    </div>
                    <div className="row partners">
                        <div className="col-md-3 col-xs-6">
                            <a href="http://8btc.com">
                                <img className="img-responsive" alt="国内最大比特币社区" title="国内最大比特币社区"
                                     src={imgLogos}/>
                            </a>
                        </div>
                        <div className="col-md-3 col-xs-6">
                            <a href="https://cnodejs.org/">
                                <img className="img-responsive" alt="CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究"
                                     title="CNode 社区为国内最专业的 Node.js 开源技术社区，致力于 Node.js 的技术研究"
                                     src={imgCnodeJs}/>
                            </a>
                        </div>
                        <div className="col-md-3 col-xs-6">
                            <a href="https://ghost.org/">
                                <img className="img-responsive" alt="Just a blogging platform"
                                     title="Just a blogging platform" src={imgGhost}/>
                            </a>
                        </div>
                        <div className="col-md-3 col-xs-6">
                            <a href="https://nodebb.com/">
                                <img className="img-responsive"
                                     alt="Node.js based forum software built for the modern web"
                                     title="Node.js based forum software built for the modern web"
                                     src={imgNodebb} style={{backgroundColor: "gray"}}/>
                            </a>
                        </div>
                        <div className="col-md-3 col-xs-6">
                            <a href="https://csdn.net/">
                                <img className="img-responsive" alt="中国最大的IT社区和服务平台" title="中国最大的IT社区和服务平台"
                                     src={imgCsdn} style={{backgroundColor:"#ccc"}}/>
                            </a>
                        </div>
                        <div className="col-md-3 col-xs-6">
                            <a href="http://mpwang.cn/">
                                <img className="img-responsive" alt="用照片记录生活面貌" title="用照片记录生活面貌"
                                     src={imgMpwang} style={{backgroundColor:"#393a4c"}}/>
                            </a>
                        </div>
                        <div className="col-md-3 col-xs-6">
                            <a href="https://www.biviews.com/">
                                <img className="img-responsive" alt="区块链行业的经济学人" title="区块链行业的经济学人"
                                     src={imgBiviews}/>
                            </a>
                        </div>
                        <div className="col-md-3 col-xs-6">
                            <a href="https://www.ubuntu.com/">
                                <img className="img-responsive" alt="Ubuntu is an open source software platform"
                                     title="Ubuntu is an open source software platform"
                                     src={imgUbuntu} />
                            </a>
                        </div>
                    </div>
                    {/* <Footer/> */}
                </div>
            </div>
        );
    }
}
export default Section7;
