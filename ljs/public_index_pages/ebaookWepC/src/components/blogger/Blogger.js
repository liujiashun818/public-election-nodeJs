import React from 'react';
/*import Left from "./blogger-section/Left";*/
import Right from "./blogger-section/Right";
import Footer from "../public/Footer.js";
import './blogger.css';
import netService from '../../library/interfaceAddress';
import $ from 'jquery';
import ReactPaginate from 'react-paginate';
import Left from "./blogger-section/Left";
import norecord from '../../images/norecord.png';
class Blogger extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            offset: 0,
            all: 1,
            tagId: 0
        }
        this.handlePageClick = this.handlePageClick.bind(this);
        this.handlerTagClick = this.handlerTagClick.bind(this);
        this.loadCommentsFromServer = this.loadCommentsFromServer.bind(this);
    }

    loadCommentsFromServer(tagId, all) {
        $.ajax({
            url: netService.getAllList.BOGGER_PAGE,
            data: { itemsPerPage: 8, offset: this.state.offset, all: all, tagId: tagId },
            dataType: 'json',
            type: 'GET',
            success: (result) => {
                this.setState({ data: result.data.list, pageCount: Math.ceil(result.data.count / 8.0) });
            }, error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    componentDidMount() {
        this.loadCommentsFromServer(this.state.tagId, this.state.all);
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * 5);
        this.setState({ offset: offset }, () => {
            this.loadCommentsFromServer(this.state.tagId, this.state.all);
        });
    };

    handlerTagClick(tagIdparam) {
        if (tagIdparam === 0) {
            
            this.setState({ tagId: 0, all: 1 });
            this.loadCommentsFromServer(0, 1);
            return;   
        }

        if (tagIdparam === this.state.tagId) {
            this.setState({ tagId: 0, all: 1 });
            this.loadCommentsFromServer(0, 1);
        } else {
            this.setState({ tagId: tagIdparam, all: 0 });
            this.loadCommentsFromServer(tagIdparam, 0);
        }
    }

    render() {
        return (
            <div id="blogWrapper" className="container" style={{ backgroundColor: "white" }}>
                <div id="blogger_section_Id" style={{ minHeight: "100vh", backgroundColor: "white" }}>
                    <div id="blogger_container_Id" className="container">
                        <div id="blogger_row_Id" className="row" style={{ backgroundColor: "white" }}>
                            <div id="blogger_left_Id" className="col-md-8 col-sm-8" style={{ width: '660px',    padding: '0px' }}>
                                {this.state.data.length <= 0 ?
                                    <div style={{
                                        borderTop: "solid 1px #e5e5e5",
                                        borderBottom: "solid 1px #e5e5e5"
                                    }}>
                                        <img alt='未找到图片' src={norecord} style={{
                                            width: "109px",
                                            marginLeft: "250px"
                                        }} />
                                        <span>
                                            暂无博客记录
                                    </span>
                                    </div>
                                    :
                                    <div>
                                        <Left data={this.state.data} />
                                        <div style={{ float: "Right" }}>
                                            <ReactPaginate previousLabel={"上一页"}
                                                nextLabel={"下一页"}
                                                breakLabel={<a href="">...</a>}
                                                breakClassName={"break-me"}
                                                pageCount={this.state.pageCount}
                                                marginPagesDisplayed={2}
                                                pageRangeDisplayed={8}
                                                onPageChange={this.handlePageClick}
                                                containerClassName={"pagination"}
                                                subContainerClassName={"pages pagination"}
                                                activeClassName={"active"} />
                                        </div>
                                    </div>
                                }
                            </div>
                            <Right key="rightId" handlerTagClick={this.handlerTagClick} all={this.state.all} tagId={this.state.tagId} />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Blogger;