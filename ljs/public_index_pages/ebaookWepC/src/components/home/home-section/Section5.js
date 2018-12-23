/**
 * Created by Administrator on 2017/7/12.
 */
import React, {Component} from 'react';
import ico from'../../../images/ico.png';
class Section5 extends React.Component {
    render() {
        return(
            <div className="section fp-section fp-table" id="section8" style={{height: "374px"}} data-anchor="lastPage">
                <div className="fp-tableCell" style={{height: "374px"}}>
                    <div id="ember637" className="ember-view">
                        <div className="container">
                            <div className="text-center intro">
                                <h1>亿书对DPoS机制的改进</h1>
                                <p className="desc">DPoS机制仍是是目前最安全环保、运转高效的共识机制，亿书结合自己的特点，创新提出四点改进计划</p>
                            </div>


                            <div className="affa-tbl-pricing">
                                <div className="row">

                                    <div className="col-xs-12 col-sm-3 tbl-prc-col">
                                        <div className="tbl-prc-wrap">
                                            <div className="tbl-prc-header">
                                                <i className="glyphicon glyphicon-fire"></i>
                                                <h4>熔断机制</h4>
                                            </div>
                                            <div className="tbl-prc-price">
                                                <p>
                                                    增加反对投票功能，对于破坏节点的反对投票率达到一定数量，就会促发“熔断机制”，强制个别受托人节点降级，减少对网络的破坏可能性。</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xs-12 col-sm-3 tbl-prc-col">
                                        <div className="tbl-prc-wrap">
                                            <div className="tbl-prc-header">
                                                <i className="glyphicon glyphicon-link"></i>
                                                <h4>信用系统</h4>
                                            </div>
                                            <div className="tbl-prc-price">
                                                <p>
                                                    亿书，鼓励知识分享，节点和用户之间会有频繁交互，用户对节点用户的反馈与好评，将是该节点信用积累的一部分。亿书将充分利用这些信用信息，帮助社区用户遴选优良节点。</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xs-12 col-sm-3 tbl-prc-col">
                                        <div className="tbl-prc-wrap">
                                            <div className="tbl-prc-header">
                                                <i className="glyphicon glyphicon-fullscreen"></i>
                                                <h4>扩大规模</h4>
                                            </div>
                                            <div className="tbl-prc-price">
                                                <p>
                                                    101个受托人，仅仅是相对合理的经验数字。亿书，会进一步优化算法，提高网络遴选的性能，采取租赁、出售等方式，鼓励去中心化应用的开发者、出版商等第三方用户自建节点，从而更好的服务用户。</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-xs-12 col-sm-3 tbl-prc-col">
                                        <div className="tbl-prc-wrap">
                                            <div className="tbl-prc-header">
                                                <i className="glyphicon glyphicon-user"></i>
                                                <h4>实名认证</h4>
                                            </div>
                                            <div className="tbl-prc-price">
                                                <p>
                                                    匿名与安全是相对平衡的过程。亿书倡导提供公开、透明的服务，鼓励节点受托人实名认证，公开有关信息，接受大家监督，从而获得社区的广泛认可。对于长期表现良好的节点，亿书将给出名单列表，显示在用户帐号里。</p>
                                            </div>
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
export default Section5;
