import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import { ShareList } from './ShareList.jsx';

module.exports.ShareButton = React.createClass({
    getInitialState: function(){
     return {
        open: false,
      }
    },
	handleRequestClose: function() {
		this.setState({
		  	open: false,
		});
	},
	handleTouchTap: function() {
		this.setState({
		  open: true,
		});
	},
	render(){
		let { aCopyright }=this.props;
		const iconTitle =(
		        <div>
	                <img src="public/images/logo/ebook_black.png" alt="logo" />
	                <span>版券列表</span>
	            </div>
			);
		const standardActions = (
			<RaisedButton
			  label="关闭"
			  primary={true}
			  onTouchTap={this.handleRequestClose}
			/>
		);
		return(
			<div style={{display:"inline-block"}}>
				<RaisedButton
					icon={<i className="material-icons">receipt</i>}
			        label="版券"
			        primary={true}
			        onTouchTap={this.handleTouchTap}
			     />
		        <Dialog
	            open={this.state.open}
	            contentClassName='accountModal'           
	            title={ iconTitle }
	            titleClassName='TransferTitle'
	            onRequestClose={this.handleRequestClose}
	            autoScrollBodyContent={true}
	            actions= {standardActions}
	            bodyStyle={{padding:"0 20px 24px",borderBottom:"1px solid #ccc"}}
	            >
	            	<ShareList assetId={aCopyright.assetId}/>
	            </Dialog>
            </div>
		);
	}
});