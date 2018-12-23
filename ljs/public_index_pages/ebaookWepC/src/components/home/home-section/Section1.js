import React, { Component } from 'react';
import ico from '../../../images/ico.png';
class Section1 extends React.Component {
    render() {
        return (
            <div className="section  fp-section fp-table active fp-completely" id="section1"
                style={{ height: "736px", backgroundColor: "rgb(79, 127, 155)" }}>
                <div className="fpTableCell">
                    <div id="ember601" className="ember-view">
                        <div className="banner">
                            <div className="content">
                                <div className="text0">24小时内</div>
                                <div className="text1">2000</div>
                                <div className="text2">人参与</div>
                                <div className="imgContainer">
                                    <img src={ico} style={{ width: "100%", height: "100%", alt: "ico" }} />
                                </div>
                                <div className="text3">ICO已于北京时间2017-7-1 21:00:00 结束</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
export default Section1;
