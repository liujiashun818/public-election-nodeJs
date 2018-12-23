/**
 * Created by Administrator on 2017/7/12.
 */
import React, {Component} from 'react';
import imgWork from'../../../images/ebookchain-how-to-work.png';
import imgWriter from'../../../images/writer.png';
import ebookchain72 from'../../../images/ebookchain-72x72.png';
import imgReader from'../../../images/reader.png';

class Section2 extends React.Component {
    render() {
        return(
            <div className="section fp-section fp-table" id="section2"
                 style={{height: "374px",backGroundColor:"rgb(75, 191, 195)"}}>
                <div className="fp-tableCell" style={{height: "374px"}}>
                    <div id="ember610" className="ember-view">
                        <div className="container-fluid">
                            <div className="intro">
                                <h1 id="title" className="animate-box">写作/协作就是这么简单</h1>
                                <p className="desc animate-box" id="content">给知识明码标价，让写作简单便捷。</p>
                            </div>
                            <div className="row">
                                <div className="col-xs-12 col-md-12">
                                    <img src={imgWork} alt="example"
                                         className="img-responsive"/>
                                </div>
                            </div>
                            <div className="row wow-footer">
                                <div className="col-xs-12 col-md-12">
                                    <div className="col-xs-12 col-md-4">
                                        <img src={imgWriter} alt="example" className="img-responsive"/>
                                        <h4>作者</h4>
                                        <p>作者写作内容的版权信息将自动写入区块链中，并实现博客、电子书、自出版等功能</p>
                                    </div>
                                    <div className="col-xs-12 col-md-4">
                                        <img src={ebookchain72} alt="example" className="img-responsive"/>
                                        <h4>亿书</h4>
                                        <p>亿书P2P网络，构建了版权保护协议，提供了代币(EBC)支付、分布式存储等功能</p>
                                    </div>
                                    <div className="col-xs-12 col-md-4">
                                        <img src={imgReader} alt="example" className="img-responsive"/>
                                        <h4>读者</h4>
                                        <p>读者可以使用代币(EBC)购买、分享、评论和反馈阅读内容，并从中获得知识，甚至奖励</p>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-md-12">
                                    <div className="col-md-4 col-sm-4 col-xs-6 text-center wow animated zoomIn">
                                        <div className="service-item">
                                            <div className="service-icon">
                                                <i className="glyphicon glyphicon-edit"></i>
                                            </div>
                                            <h3><b>确权注册</b><br/>便利性</h3>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-4 col-xs-6 text-center wow animated zoomIn">
                                        <div className="service-item">
                                            <div className="service-icon">
                                                <i className="glyphicon glyphicon-edit"></i>
                                            </div>
                                            <h3><b>资源获取</b><br/>便利性</h3>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-4 col-xs-6 text-center wow animated zoomIn">
                                        <div className="service-item">
                                            <div className="service-icon">
                                                <i className="glyphicon glyphicon-edit"></i>
                                            </div>
                                            <h3><b>协调创作</b><br/>便利性</h3>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xs-12 col-md-12">
                                    <div className="col-md-4 col-sm-4 col-xs-6 text-center wow animated zoomIn">
                                        <div className="service-item">
                                            <div className="service-icon">
                                                <i className="glyphicon glyphicon-edit"></i>
                                            </div>
                                            <h3><b>博客管理</b><br/>便利性</h3>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-4 col-xs-6 text-center wow animated zoomIn">
                                        <div className="service-item">
                                            <div className="service-icon">
                                                <i className="glyphicon glyphicon-edit"></i>
                                            </div>
                                            <h3><b>出版发行</b><br/>便利性</h3>
                                        </div>
                                    </div>
                                    <div className="col-md-4 col-sm-4 col-xs-6 text-center wow animated zoomIn">
                                        <div className="service-item">
                                            <div className="service-icon">
                                                <i className="glyphicon glyphicon-edit"></i>
                                            </div>
                                            <h3><b>调查取证</b><br/>便利性</h3>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Section2;