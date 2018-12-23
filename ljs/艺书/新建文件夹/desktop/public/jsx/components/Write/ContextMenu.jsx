"use strict";
import React from 'react';

module.exports.ContextMenu= React.createClass({
	getInitialState(){
		return{
			showCotextMenu: false,
		}
	},
	handleRenameClick(){
	  this.props.hideRMenu;
	  let zTree = this.props.zTree;		
	  let nodes = zTree.getSelectedNodes();
	  zTree.editName(nodes);
	  Db.SaveArticlebookLists(Tools.pullout(nodes));
	  console.log("rename"+)
	},
	handleDelClick(){
		this.props.hideRMenu;
		let ztree = this.props.zTree;
		var nodes = zTree.getSelectedNodes();
		if (nodes && nodes.length>0) {
			if (nodes[0].children && nodes[0].children.length > 0) {
				var msg = "If you delete this node will be deleted along with sub-nodes. \n\nPlease confirm!";
				if (confirm(msg)==true){
					zTree.removeNode(nodes[0]);
				}
			} else {
				zTree.removeNode(nodes[0]);
			}
		}
	},
	handleAddClick(){
		this.props.hideRMenu;
		let ztree = this.props.zTree;
		var newNode = { name:"newNode "};
		if (zTree.getSelectedNodes()[0]) {
			zTree.addNodes(zTree.getSelectedNodes()[0], newNode);
		} else {
			zTree.addNodes(null, newNode);
		}
	},
	render(){
		return ( 
			<ul>
				<li id="m_rename" onclick={this.handleRenameClick}><i className="material-icons">border_color</i>重命名</li>
				<li id="m_delete" onclick={this.handleDelClick}><i className="material-icons">delete_forever</i>删除</li>
				<li id="m_add" onclick={this.handleAddClick}><i className="material-icons">add</i>新增</li>				
			</ul>
		)
	}
});