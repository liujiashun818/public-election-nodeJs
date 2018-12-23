import React from 'react';
import ReactPaginate from 'react-paginate';
class GeneralPage extends React.Component {
    
    render() {
        return <div style={{textAlign:'right'}}><ReactPaginate
            initialPage={0}
            forcePage={this.props.forcePage}
            previousLabel={"上一页"}
            nextLabel={"下一页"}
            breakLabel={<a href = "" > ...</a>}
            breakClassName={"break-me"}
            pageCount={this.props.pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={4}
            onPageChange={this.props.handlePageClick}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"active"}/></div>;
    }
}

export default GeneralPage;
