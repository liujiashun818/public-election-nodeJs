/**
 * Created by Administrator on 2017/7/12.
 */
import React, {Component} from 'react';
class Section4 extends React.Component {
    render() {
        return(
            <div className="section fp-section fp-table" id="section4"
                 style={{height: "374px",backgroundColor: "whitesmoke"}} data-anchor="4thpage">
                <div className="fp-tableCell" style={{height: "374px"}}>
                    <div id="ember628" className="ember-view">
                        <div className="row animate-box fadeIn">
                            <div className="text-center intro">
                                <h1>亿书，让每一次创作都有迹可循</h1>
                                <p className="desc">亿书实现版权保护的三个层次</p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 text-center fadeInDown">
                                <div className="services">
          <span className="icon">
            <i className="icon-write"></i>
          </span>
                                    <div className="desc">
                                        <h3>记录创作时间段</h3>
                                        <p>通过亿书客户端，记录内容创作时的全部过程，由单一时间戳汇成时间段</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 text-center fadeInDown">
                                <div className="services">
          <span className="icon">
            <i className="icon-follow"></i>
          </span>
                                    <div className="desc">
                                        <h3>追踪流通全环节</h3>
                                        <p>流通过程中的取证是版权保护的重要环节，亿书会在文档分享、交易等过程中，记录下全部痕迹，并可轻松追溯它的全过程，直至源头.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 text-center fadeInDown">
                                <div className="services">
          <span className="icon">
            <i className="icon-social"></i>
          </span>
                                    <div className="desc">
                                        <h3>社区共识人员参与</h3>
                                        <p>亿书基于智能合约，优化奖惩规则，通过代币，鼓励人们举报和反馈，让授权成为人们自觉行为，让盗版无所遁形.</p>
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
export default Section4;
