import React from 'react';
import RightView from "./RightView";
import netService from '../../../library/interfaceAddress';
import BloggerTag from "./BloggerTag";
import './right.css';
import norecord from '../../../images/norecord.png'
class Right extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            tagResult: []
        };
        this.getBloggerTag = this
            .getBloggerTag
            .bind(this);
        this.handlerTagClick = this
            .handlerTagClick
            .bind(this);
    }

    componentWillMount() {
        this.netConnectAddress(netService.getAllList.BOGGER_HOT);
        this.getBloggerTag();
    }

    handlerTagClick(tagId, all) {
        this
            .props
            .handlerTagClick(tagId, all);
    }

    netConnectAddress(param) {
        let self = this;
        fetch(param + "?itemsPerPage=5&offset=0").then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
            .then(function (isData) {
                self.setState({ posts: isData.data.list });
            });
    }

    getBloggerTag() {
        let _this = this;
        fetch(netService.getAllList.BOGGER_TAG).then(function (response) {
            if (response.status >= 400) {
                throw new Error("Bad response from server");
            }
            return response.json();
        })
            .then(function (result) {
                _this.setState({ tagResult: result.data });
            });
    }

    render() {
        return (
            <div style={{ display: "flex", flexDirection: "column", marginTop: "20px" }}>
                {/*<span style={{ fontSize: "16px", marginLeft: "25px", color: "#ff4e4e" }}>热门</span>*/}
                {/*<div style={{ borderBottom: "2px solid #249cff", marginTop: "10px", marginLeft: "20px" }}>*/}
                {/*</div>*/}
                {/*{this.state.posts.length <= 0 ?*/}
                    {/*<div>*/}
                        {/*<img alt='未找到图片' src={norecord} style={{*/}
                            {/*width: "91px",*/}
                            {/*marginLeft: "61px",*/}
                            {/*marginTop: "10px"*/}
                        {/*}} />*/}
                        {/*<span>暂无热门记录</span>*/}
                    {/*</div>*/}
                    {/*:*/}
                    {/*<div style={{ marginLeft: "20px" }}>*/}
                        {/*<RightView data={this.state.posts} />*/}
                    {/*</div>*/}
                {/*}*/}
                <span style={{ fontSize: "16px", color: "#333333", marginLeft: "20px", marginTop: "20px" }}>标签</span>
                <div style={{ marginTop: "10px", borderBottom: "2px solid #249cff", marginBottom: "16px", width: "280px", marginLeft: "20px" }}>
                </div>
                {this.state.posts.length <= 0 ?
                    <div>
                        <img alt='未找到图片' src={norecord} style={{
                            width: "91px",
                            marginLeft: "61px",
                            marginTop: "10px"
                        }} />
                        <span>暂无标签记录</span>
                    </div>
                    :
                    <div className="hidden-xs margin-bottom-20">
                        <BloggerTag
                            key="bloggerId_2"
                            obj={this.state.tagResult}
                            handlerTagClick={this.handlerTagClick}
                            all={this.props.all}
                            tagId={this.props.tagId}
                        />
                    </div>
                }

            </div >
        );
    }
}
export default Right;