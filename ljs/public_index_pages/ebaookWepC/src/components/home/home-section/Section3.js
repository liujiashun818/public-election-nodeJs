/**
 * Created by Administrator on 2017/7/12.
 */
import React, {Component} from 'react';
import ImgNodeJsDev from'../../../images/nodejs-dev.png';
import ImgBook from'../../../icons/book.png';
import ImgGitHub32 from'../../../icons/github-32x32.png';

class Section3 extends React.Component {
    render() {
        return(
            <div className="section fp-section fp-table" id="section3"
                 style={{height: "374px", backgroundColor: "rgb(27, 188, 155)"}} data-anchor="3rdPage">
                <div className="fp-tableCell" style={{height: "374px"}}>
                    <div id="ember619" className="ember-view">
                        <div className="intro">
                            <h1>亿书是一个完全开源的工程</h1>
                            <p className="desc">我们所开发的任何产品都是开  源的，任何人都可以克隆、开发、集成。非常欢迎喜欢加密货币、喜欢Nodejs技术的小伙伴加入我们。</p>
                        </div>
                        <div className="overlay"></div>
                        <div className="container">
                            <div id="row">
                                <div className="col-xs-12 col-md-4">
                                    <img src={ImgNodeJsDev} alt="open source" className="img-responsive"/>
                                </div>
                                <div className="col-xs-12 col-md-8 build-with-box">
                                    <div className="col-xs-12 col-md-10">
                                        <p className="desc">全球第一本从代码层面详细解读区块链开发的书籍，第一个以实际项目为例，与项目配套，可以作为详细开发文档的书籍。</p>
                                    </div>
                                    <div className="col-xs-12 col-md-12">
                                        <div className="col-xs-6 col-md-4 text-center">
                                            <a className="" target="_blank"
                                               href="http://bitcoin-on-nodejs.ebookchain.org"><img
                                                src={ImgBook} alt="node.js"/>
                                                电子书
                                            </a>
                                        </div>
                                        <div className="col-xs-6 col-md-4 text-center">
                                            <a className="" target="_blank"
                                               href="https://github.com/Ebookcoin/ebookcoin">
                                                <img src={ImgGitHub32} alt="ebookcoin"/>
                                                源码
                                            </a>
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
export default Section3;