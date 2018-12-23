import React from 'react';
import { FetchStandard } from "../../service/service";
import netService from '../../library/interfaceAddress';
import List from './List';
import GeneralPage from '../General/GeneralPage';
import norecord from '../../images/norecord.png';
import RefreshIndicator from 'material-ui/RefreshIndicator';
const myCenterListContainer = {
    display: "flex",
    flexDirection: "column ",
    width: "640px",
    marginTop: "30px"
}
const style = {
    container: {
        position: 'relative',
    },
    refresh: {
        display: 'inline-block',
        position: 'relative',
    },
};

const options = {
    width: "90px",
    textAlign: "center"
}

const a = {
    textDecoration: "none",
    color: "#333333"
}

class MyCenterLists extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            offset: 0,
            status: "hide",
            reply: false,
        }
        this.get = this.get.bind(this);
        this.contentHandle = this.contentHandle.bind(this);
        this.topicFun = this.topicFun.bind(this);
        this.replyFun = this.replyFun.bind(this);
    }

    componentDidMount() {
        this.get(netService.getAllList.MYCENTER_TOPIC);
    }

    contentHandle(val) {
        for (let key in val) {
            if (val[key].content.length > 28) {
                val[key].content = val[key].content;
            }
        }
        return val;
    }

    get(address) {
        let param =
            {
                itemsPerPage: 5,
                offset: this.state.offset,
                userId: this.props.userId
            }
        this.setState({ address: address });
        FetchStandard(address, "GET", param).then((res) => {
            if (res.code === "ER_BAD_FIELD_ERROR") {
                window.location.pathname = '/login';
                return;
            }
            this.setState({
                data: this.contentHandle(res.data.list),
                pageCount: Math.ceil(res.data.count / 5.0),
                status: "hide"
            });
        })
    }

    topicFun() {
        this.setState({ offset: 0 })
        this.refs.replyRef.className = ""
        this.refs.topicRef.className = "myCenterActive"
        this.get(netService.getAllList.MYCENTER_TOPIC)
    }

    replyFun() {
        this.setState({ offset: 0, reply: true })
        this.refs.topicRef.className = ""
        this.refs.replyRef.className = "myCenterActive"
        this.get(netService.getAllList.MYCENTER_RPLYC)
    }


    handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * 5);
        this.state.offset = offset

        this.get(this.state.address);
    }
    render() {
        this.state.status = "loading"
        return (
            <div style={myCenterListContainer}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <div ref="topicRef" className="myCenterActive" style={options}>
                        <span onClick={this.topicFun}><a style={a}>发帖</a></span>
                    </div>
                    <span style={{ width: "100px" }}></span>
                    <div ref="replyRef" className="" style={options}>
                        <span onClick={this.replyFun}><a style={a}>回帖</a></span>
                    </div>
                </div>
                {
                    this.state.data.length <= 0 ?
                        <div style={{
                            borderTop: "solid 1px #e5e5e5",
                            borderBottom: "solid 1px #e5e5e5"
                        }}>
                            <img src={norecord} alt="" style={{
                                width: "109px",
                                marginLeft: "250px"
                            }} />
                            <span>
                                暂无记录
                        </span>
                        </div>
                        :
                        <div>
                            <List data={this.state.data} reply={this.state.reply} />
                            <GeneralPage pageCount={this.state.pageCount} handlePageClick={this.handlePageClick} />
                        </div>
                }

            </div>
        );
    }
}
export default MyCenterLists;