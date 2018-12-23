import React from 'react';
import { Link } from 'react-router-dom';
const rightViewContainer = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    border: "1px solid gainsboro",
    backgroundColor: "white"
}
const style = {
    display: "flex",
    flexDirection: "row",
    paddingTop: "15px"
}

const indexStyle = [
    {
        fontSize: "14px",
        color: "#ff0b0b"
    },
    {
        fontSize: "14px",
        color: "#ff521d"
    },
    {
        fontSize: "14px",
        color: "#ff7e28"
    }
]

    
const defaultFontStyle = {
    color: "#333333",
    fontSize: "14px"
}
class RightView extends React.Component {
    render() {
        let list = this.props.data.map((obj, index) => {
            return<div key={'rightView'+index}>
                <div style={style}>
                    
                    <div style={{ paddingLeft: "15px", ...indexStyle[index] }}>{index + 1}. </div>
                    <div style={{ paddingLeft: "5px", ...defaultFontStyle }}>
                        <Link style={{color:"#333333", width: '200px', display: 'block',overflow: 'hidden',whiteSpace: 'nowrap',textOverflow: 'ellipsis'}} to={"/post/" + obj.articleId}>
                            {/* {obj.Title.length >= 12 ? 
                                obj.Title.substring(0,12)+'...'
                                : */}
                                {obj.Title}
                            {/* } */}
                        </Link>
                    </div>
                    <div style={{position:"absolute",right:"30px",...defaultFontStyle}}>{obj.hot}</div>
                </div>
            </div>
        })
        return (
            <div style={rightViewContainer}>
                <div style={{marginBottom:"15px"}}>
                    {list}
                </div>
            </div>
        );
    }
}
export default RightView;