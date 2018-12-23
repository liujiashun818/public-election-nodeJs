import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'material-ui/Avatar';
import ListItem from 'material-ui/List/ListItem';
const tabs = {
    1: "区块链技术",

    2: "亿书产品",

    3: "市场活动",

    4: "版权相关",

    5: "社区交流"

}
const contentStyle = {
    display: "flex",
    flexDirection: "column",
    marginTop: "10px"
}

const minFont = {
    fontSize: "12px",
    color: "#999999"
}
const special = {
    height: "100px",
    display: "flex",
    justifyContent: "center"
}

const rootStyle = {
    borderBottom: "solid 1px #e5e5e5"
}
class List extends React.Component {
	base64decode(str){
        let buff = new Buffer(str, "base64");
        console.log(buff.toString())
		return buff.toString();
	};

    render() {
        let reply  = this.props.reply
        let result = this.props.data.map(function (obj, index) {
            return (
                <div style={rootStyle}>
                    {obj.status === 0 &&
                        <ListItem
                            disabled={true}
                            leftAvatar={<Avatar style={{ width: "50px", height: "50px", top: "26px", left: "3px" }} src={obj.avatar} />}>
                            <span>
                                {reply?
                                    <Link to={"/communitys/" + obj.topicId} >
                                        <a style={{ fontSize: "16px", color: "#333333" }}>
                                            {obj.title.length > 100 && obj.title.substring(0, 30) + "...."}
                                            {obj.title.length < 100 && obj.title}
                                        </a>
                                    </Link>
                                    :
                                    <Link to={"/communitys/" + obj.id} >
                                        <a style={{ fontSize: "16px", color: "#333333" }}>
                                            {obj.title.length > 100 && obj.title.substring(0, 30) + "...."}
                                            {obj.title.length < 100 && obj.title}
                                        </a>
                                    </Link>
                                }
                            </span>
                            <div style={contentStyle}>
                                <div style={{ fontSize: "16px", color: "#666666", marginBottom: "10px" }} 
                                dangerouslySetInnerHTML={{ __html: this.base64decode(obj.content.replace(/<br\/>/g, "").replace(/<br/g, ""))}}>
                                </div>
                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                    <div>
                                        <span>
                                            <a href="javascript:void(0)" style={{...minFont,textDecoration: "none" , cursor:"default" }}>昵称&nbsp;:&nbsp;{obj.nickName}</a>
                                        </span>
                                        <span style={{ marginLeft: "10px" }}>
                                            <a href="javascript:void(0)" style={{...minFont, textDecoration: "none" , cursor:"default" }}>来自&nbsp;:&nbsp;{tabs[obj.tab]}</a>
                                        </span>
                                    </div>

                                    <div>
                                        <span>
                                            <a href="javascript:void(0)" style={{ ...minFont, textDecoration: "none" , cursor:"default" }} >浏览量:({obj.visitCount})</a>
                                        </span>&nbsp;
                                <span>
                                            <a href="javascript:void(0)" style={{ ...minFont, textDecoration: "none" , cursor:"default" }}>赞:({obj.likeCount})</a>
                                        </span>&nbsp; 
                                <span>
                                            <a href="javascript:void(0)" style={{ ...minFont, textDecoration: "none" , cursor:"default" }}>回复:({obj.replyCount})</a>
                                        </span>&nbsp;
                                </div>
                                </div>
                            </div>
                        </ListItem>
                    }
                    {obj.status === 1 &&
                        <div style={special}>
                            <span style={{ lineHeight: 6 }}>
                                已被作者删除
                            </span>
                        </div>
                    }
                    {obj.status === 2 &&
                        <div style={special}>
                            <span style={{ lineHeight: 6 }}>
                                已被管理员删除
                            </span>
                        </div>
                    }
                </div>
            );
        },this);
        return <div style={{ borderTop: "1px solid #249cff" }}>{result}</div>

    }
}
export default List;
