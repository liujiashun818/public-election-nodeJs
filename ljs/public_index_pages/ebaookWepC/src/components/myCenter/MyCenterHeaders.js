import React from 'react';
import netService from '../../library/interfaceAddress';
import { FetchStandard } from '../../service/service';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
import { Link } from 'react-router-dom';
const myCenterHeaderContainer = {
    display: "flex",
    flexDirection: "row"
}
const buttonStyle = {
    background: "#249cff",
    width: "60px",
    height: "25px",
    borderRadius: "6px",
    border: "none",
    marginLeft: "300px",
    textAlign: "center"
}
const button = {
    margin: 12,
};

const avatar = {
    width: "50px",
    height: "50px",
    top: "20px",
    left: "2px"
}

const style = [
    {    
        fontSize: "14px",
        color: "#666"
    }
]
class MyCenterHeaders extends React.Component {
    constructor() {
        super();
        this.state = { data: {} }
    }

    componentDidMount() {
        this.getUserInfo();
    }

    getUserInfo() {
        let params = { userId: this.props.userId }
        FetchStandard(netService.getAllList.MYCENTER_TOPINFO, "GET", params).then((res) => {
            if (res.code === "ER_BAD_FIELD_ERROR") {
                window.location.pathname = '/login';
                return;
            }
            this.setState({ data: res.data });
        });
    }

    // go(){
    //     window.sessionStorage.clear()
    //     window.location.href="/"
    // }

    render() {
        return (
            <div>
                <div style={myCenterHeaderContainer}>
                    <div>
                        <ListItem
                            disabled={true}
                            leftAvatar={
                                <Avatar style={avatar} src={this.state.data.avatar} />
                            }>
                            {this.state.data.nickName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                            {this.props.userId === window.sessionStorage.id &&
                                <Link to={"/MyCenterEditor/" + this.props.userId} style={{ color: "#249cff",textDecoration:"none"}}>
                                    编辑 &nbsp;&nbsp;
                                 </Link>
                            }
                            {/* {
                                this.props.userId === window.sessionStorage.id &&
                                <a onClick={this.go.bind(this)} style={{ color: "#ff2d2d",textDecoration:"none"}}>
                                    退出
                                </a>
                            } */}
                            {this.props.userId === window.sessionStorage.id &&
                                <button type="button" style={buttonStyle} onClick={
                                    () => {
                                        window.location.href = "/PublicTxt"
                                    }
                                }>
                                    <a style={{ color: "white",fontSize:"14px" }}>发帖</a>
                                </button>
                            }
                        </ListItem>
                    </div>
                </div>
                <div style={{ marginLeft: "72px", marginTop: "-15px" }}>
                    <ul>
                        <li style={{ ...style[0],marginBottom: "20px" }}>
                            {this.state.data.signature}
                        </li>
                        <div>
                            <li style={style[0]}>帖子数&nbsp;:&nbsp;{this.state.data.topicsCount}&nbsp;&nbsp;&nbsp;&nbsp;
                                回复数&nbsp;:&nbsp;{this.state.data.replysCount}
                            </li>
                        </div>
                    </ul>
                </div>
            </div>
        );
    }
}
export default MyCenterHeaders;
