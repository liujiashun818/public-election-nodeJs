"use strict";

import React from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';

var xdesktop = nodeRequire('xdesktop-render');

module.exports.Setting = React.createClass({
	handleCheckClick(){
		if(this.props.handleCheckClick){
			this.props.handleCheckClick();
		}
	},
	handleOpenAbout(){
		if(this.props.handleOpenAbout){
			this.props.handleOpenAbout();
		}
	},
	handleOpenSuggest(){
		if(this.props.handleOpenSuggest){
			this.props.handleOpenSuggest();
		}		
	},
	handleLogoutClick(){
		xdesktop.logic.sign.logout();
	},
	render(){
		return (
		  <IconMenu
		    iconButtonElement={<IconButton><i className="material-icons md-20">settings</i></IconButton>}
		    anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
		    targetOrigin={{horizontal: 'left', vertical: 'top'}}
		  >
			<MenuItem primaryText="关于亿书" onTouchTap = {this.handleOpenAbout}/>
			<MenuItem primaryText="反馈建议" onTouchTap = {this.handleOpenSuggest}/>
			<MenuItem 
			  primaryText="版本检查" 
			  onTouchTap = {this.handleCheckClick}
			/>			
			<MenuItem 
			  primaryText="注销登入"
			  onTouchTap = {this.handleLogoutClick}
			/>
		  </IconMenu>
		);
	}
});

