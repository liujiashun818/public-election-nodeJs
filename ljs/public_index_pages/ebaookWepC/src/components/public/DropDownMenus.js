import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';

export default class DropDownMenus extends React.Component {
    constructor(props) {
        super(props);
        this.state = {value: 1};
    }

    handleChange = (event, index, value) => this.setState({value});

    handleOpenMenu = () => {
        this.setState({
          openMenu: true,
        });
    }

    handleOnRequestChange = (value) => {
        this.setState({
          openMenu: value,
        });
    }
    render() {
        return (
            <IconMenu
              iconButtonElement={<div>下载<i className="material-icons" style={{verticalAlign:"middle",marginLeft:"5px"}}>file_download</i></div>}
              open={this.state.openMenu}
              onRequestChange={this.handleOnRequestChange}
              style={{Height:"70px",lineHeight:"70px",width:"100px",cursor:"pointer",textAlign:"center"}}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
            >
                <MenuItem href="/download" value={2} primaryText="客户端下载"/>
                <MenuItem href="/ebookchain.pdf" value={3} primaryText="白皮书" />
                <MenuItem href="/greenpaper-pre.pdf" value={4} primaryText="绿皮书" />
            </IconMenu>
        );
    }
}
