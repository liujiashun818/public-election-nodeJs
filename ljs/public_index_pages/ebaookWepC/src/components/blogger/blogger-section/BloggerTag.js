import React  from 'react';

class BloggerTag extends React.Component {
    constructor(props) {
        super(props);
        this.state = { activeTag: "", flag: true };
        this.handlerTagClick = this.handlerTagClick.bind(this);
    }
   
    handlerTagClick(e) {
        if (this.props.handlerTagClick) {
            this.props.handlerTagClick(e);
        }
    }

    render() {
        let self = this;
        if (!this.props.obj) {
            return <div></div>;
        }
        let bloggerTager = this.props.obj.map((obj, index) => {
            return (
                <div key={index}>
                    {obj.tagId === self.props.tagId &&
                        <a className="tag" name={"" + obj.tagId} onClick={() => {
                            self.setState({flag:false})
                            self.handlerTagClick(obj.tagId)
                            }
                        }>
                        <span className="txt" style={{ backgroundColor: "#249cff", color: "white" }}>{obj.tagName}</span>
                        </a>
                    }
                    {obj.tagId !== self.props.tagId &&
                        <a className="tag" name={"" + obj.tagId} onClick={() => {
                                self.setState({flag:false})
                                self.handlerTagClick(obj.tagId)
                            }
                        }>
                            <span className="txt" style={{ backgroundColor: "white" }}>{obj.tagName}</span>
                        </a>
                    }
                    &nbsp;&nbsp;&nbsp;
                </div>
            )
        });
        return (<div style={{ display: "flex", flexFlow: "wrap", marginLeft: "20px" }}>
            {self.state.flag ?
                <a className="tag" name={"" + 0} onClick={() => {
                    self.setState({flag:false})
                    this.handlerTagClick(0)
                }
                }>
                    <span className="txt" style={{ backgroundColor: "#249cff", color: "white", marginRight: "12px" }}>全部</span>
                </a>
                :
                <a className="tag" name={"" + 0} onClick={() => {
                    self.setState({flag:true})
                    this.handlerTagClick(0)
                }
                }>
                    <span className="txt" style={{ backgroundColor: "white", marginRight: "12px" }}>全部</span>
                </a>
            }

            {bloggerTager}
        </div>);
    }
}
export default BloggerTag;