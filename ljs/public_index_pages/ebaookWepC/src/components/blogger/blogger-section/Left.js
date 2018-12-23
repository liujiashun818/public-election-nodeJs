import React from 'react';
import { Link } from 'react-router-dom';
import tool from '../../../library/tool';
import { FetchGet } from '../../../service/service';
const minFont = {
    fontSize: "12px",
    color: "#999999"
}
const content = {
    fontSize: "14px",
    color: "#666666"
}

const below = {
    display: "flex",
    justifyContent: "space-between"
}

const largeArry = [
    {
        borderBottom: "1px solid #e5e5e5",
        marginBottom: "15px",
        marginTop: "20px"
    },
    {
        marginBottom: "5px"
    },
    {
        marginBottom: "10px"
    },
    {
        marginBottom: "15px",
        lineHeight: "1.6"
    }
]

class Left extends React.Component {

    viewRequestEvent(e) {
        FetchGet('/api/article/view?articleId=' + e);
    }

    render() {
        if (!this.props.data) {
            return <div></div>;
        }
        let leftList = this.props.data.map((obj, index) => {
            let ebcValue = 1;
            if(obj.CreatedTime && obj.Content) {
                 ebcValue = window.EXC.estimate(new Date(obj.CreatedTime), obj.Content.length, obj.View, obj.likeAmount, obj.commentAmount, 0);
            }
            return (
                <div key={'left' + index} style={largeArry[0]}>
                    <div>
                        <div style={largeArry[1]}>
                            <Link to={"/post/" + obj.id} style={{ fontSize: "16px", color: "#333333", fontWeight: "bold" }} onClick={this.viewRequestEvent.bind(this, obj.id)}>{obj.Title}
                                <div className='change'>
                                    <span className = "value1"></span>
                                    <span className='n1' title="价值评估"><img style={{marginTop: "-7px"}} className='PurseMap' src={require('../../../images/GeneralList/wallet22.png')} alt="" />{ebcValue}EBC</span>
                                </div>
                            </Link>
                        </div>
                        <div style={largeArry[2]}>
                            <span style={minFont}>{tool.formatDate(obj.CreatedTime)}
                            </span>
                            <span style={{ marginLeft: "15px", ...minFont }}>来自:&nbsp;&nbsp;{obj.nickName}</span>
                        </div>
                        <div style={{ content, ...largeArry[3] }}>
                            {obj.Brief ?
                                obj.Brief + "..."
                                :
                                obj.Brief
                            }
                        </div>
                        <div style={below}>
                            {obj.tagsStr ?
                                <span style={{ marginBottom: "15px", ...minFont }}>标签：{obj.tagsStr}</span>
                                :
                                <span style={{ marginBottom: "15px", ...minFont }}></span>
                            }
                            <span style={minFont}>
                                浏览量：({obj.View})&nbsp;&nbsp;&nbsp;
                                赞：({obj.likeAmount})&nbsp;&nbsp;&nbsp;
                                回复：({obj.commentAmount})
                            </span>
                        </div>
                    </div>
                </div>
            );
        });
        return (
            <div id="project-leftList" className="leftList" style={{ marginTop: "20px" }}>
                {leftList}
            </div>
        );
    }
}
export default Left;



