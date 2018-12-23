import React from 'react';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import {ProveModal} from './ProveModal.jsx';

module.exports.ProveButton = React.createClass({
    getInitialState: function(){
     return {
        open: false,
        assetId:''
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
		  assetId:this.props.assetId
		});
	},
	render(){
		var standardActions = (
			<RaisedButton
			  label="关闭"
			  primary={true}
			  onTouchTap={this.handleRequestClose}
			/>
		);
		return(
			<div style={{display:"inline-block"}}>
				<RaisedButton
					icon={<i className="material-icons">search</i>}
			        label="取证"
			        primary={true}
			        onTouchTap={this.handleTouchTap}
			     />
		        <Dialog
	            open={this.state.open}
	            contentClassName='accountModal'	            
	            title="播放"
	            titleClassName='TransferTitle'
	            onRequestClose={this.handleRequestClose}
	            actions={standardActions}
	            bodyStyle={{padding:"0 50px 24px",borderBottom:"1px solid #ccc"}}
	            autoScrollBodyContent={true}
	            >   
	            	<ProveModal localId={this.props.localId} assetId={this.props.assetId}/>
	            </Dialog>
            </div>			
		);
	}
});
	          