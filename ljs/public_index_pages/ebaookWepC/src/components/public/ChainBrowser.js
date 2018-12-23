import React from 'react';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';

export default class ChainBrowser extends React.Component {
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
              iconButtonElement={<div>区块链浏览器</div>}
              open={this.state.openMenu}
              onRequestChange={this.handleOnRequestChange}
              style={{Height:"70px",lineHeight:"70px",width:"140px",cursor:"pointer",textAlign:"center"}}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'top'}}
            >
                <MenuItem href="http://testnet.ebookchain.net/" value={2} primaryText="测试网络浏览器"/>
                <MenuItem href="/" value={3} primaryText="主网浏览器（预计8月底上线）" />
            </IconMenu>
        );
    }
}