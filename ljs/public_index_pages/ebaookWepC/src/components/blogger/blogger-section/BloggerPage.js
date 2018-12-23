import React, { Component } from 'react';
import $ from 'jquery';
import './left.css';
import ReactPaginate from 'react-paginate';
import netService from '../../../library/interfaceAddress';
import Left from "./Left";
class BloggerPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            offset: 0,
            all: 1,
            tagId: 0
        }
    }

    loadCommentsFromServer(tagId, all) {
        $.ajax({
            url: netService.getAllList.BOGGER_PAGE,
            data: { itemsPerPage: 5, offset: this.state.offset, all: all, tagId: tagId },
            dataType: 'json',
            type: 'GET',
            success: (result) => {
                this.setState({ data: result.data.list, pageCount: Math.ceil(result.data.count / 5.0) });
            }, error: (xhr, status, err) => {
                console.error(this.props.url, status, err.toString());
            }
        });
    }

    componentDidMount() {
        this.loadCommentsFromServer();
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        let offset = Math.ceil(selected * 5);

        this.setState({ offset: offset }, () => {
            this.loadCommentsFromServer();
        });
    };
    handlerTagClick(tagId) {
        this.loadCommentsFromServer(tagId, 0);
    }
    render() {
        return (
            <div id="blogger_left_Id" className="col-md-8 col-sm-8" style={{ width: '660px' }}>
                <Left data={this.state.data} />
                <ReactPaginate previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={<a href="">...</a>}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"} />
            </div>
        );
    }
}
export default BloggerPage;