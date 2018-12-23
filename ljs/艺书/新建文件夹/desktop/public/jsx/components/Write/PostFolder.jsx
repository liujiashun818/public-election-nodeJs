"use strict";

nodeRequire('babel-polyfill');

import React from 'react';
import TextField from 'material-ui/TextField';
import { ZtreeFolder } from './ZtreeFolder.jsx';
//import { ContextMenu } from './ContextMenu.jsx';


const Promise = nodeRequire('bluebird');
const co = Promise.coroutine;
const jsdk = nodeRequire('js-sdk');
var xdesktop = nodeRequire('xdesktop-render');
var Db = xdesktop.db;
var Logic = xdesktop.logic;
var Tools = xdesktop.tools;

// json数据
const initialNodes =[
  {name: "文件夹", children: [
    {name: "图书", 
      children: [
        {name: "小学数学",
          children: [
            { name: '小学一年级' },
            { name: '小学二年级' },
            { name: '小学三年级' },
            { name: '小学四年级' },
            { name: '小学五年级' },
            { name: '小学六年级' }
          ]
        },
        {name: "小学语文",
          children: [
            { name: '小学一年级' },
            { name: '小学二年级' },
            { name: '小学三年级' },
            { name: '小学四年级' },
            { name: '小学五年级' },
            { name: '小学六年级' }
          ]
        }
      ]
    },
    {name: "绘画"}
  ]}
];

const zSetting= {
	  data: {
	    simpleData: {
	      enable: true
	    }
	  },
	  edit: {
	    drag:{
	      isCopy: false,
	      isMove: true,
	      prev: true,
	      inner: true,
	      next: true
	    },
	    enable: true,
	    removeTitle: '删除此项',
	    renameTitle: '重命名'
	  },	  	
      // edit: {
      //   enable: true,
      //   showRemoveBtn: false,
      //   showRenameBtn: false
      // },
      view: {
        showLine: false,
        showIcon: false,
        selectedMulti: false,
        dblClickExpand: false,
        addDiyDom: addDiyDom,
        addHoverDom: addHoverDom,
        removeHoverDom: removeHoverDom,
        selectedMulti: false
      },
	  callback: {
	    beforeClick: beforeClick,
	    onDrop: zTreeOnDrop,
	    onRename: zTreeOnRename,
	    onRemove: zTreeOnRemove,
	    beforeRemove: zTreeBeforeRemove
	  },
};

function addDiyDom(treeId, treeNode) {
  let spaceWidth = 5;
  let switchObj = $("#" + treeNode.tId + "_switch"),
  icoObj = $("#" + treeNode.tId + "_ico");
  switchObj.remove();
  icoObj.before(switchObj);

  // if(!this.isAllNotebookId(treeNode.NotebookId) && !this.isTrashNotebookId(treeNode.NotebookId)) {
  //   icoObj.after($('<span class="subFoldernumber right-align" id="numberNotes_' + treeNode.NotebookId + '">' + (treeNode.NumberNotes || 0) + '</span>'));
  //   icoObj.after($('<i class="material-icons md-16 right-align folder-setting" title="setting">settings</i>'));
  // }
  if (treeNode.level > 1) {
    let spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level)+ "px'></span>";
    switchObj.before(spaceStr);
  }
}

var bookcount = 0;
function addHoverDom(treeId, treeNode) {
    var sObj = $("#" + treeNode.tId + "_remove");
    if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
    var addStr = "<i class='material-icons md-16' style='vertical-align: middle' id='addBtn_" + treeNode.tId
        + "' title='新增' onfocus='this.blur();'>add</i>";
    sObj.after(addStr);
    var btn = $("#addBtn_"+treeNode.tId);
    bookcount++;
    if (btn) btn.bind("click", function(){
        var treeObj = $.fn.zTree.getZTreeObj("ztree_0");
        treeObj.addNodes(treeNode, {name:"new node"+ bookcount, _id:'xxxx'+ bookcount, CreatedTime: new Date().getTime()});
        var nodes = treeObj.getNodes();
        Db.SaveArticlebookLists(Tools.pullout(nodes));
        return false;
    });
}

function removeHoverDom(treeId, treeNode) {
    $("#addBtn_"+treeNode.tId).unbind().remove();
}

//展开文件夹
function beforeClick(treeId, treeNode) {
  if (treeNode.level == 0 ) {
    var zTree = $.fn.zTree.getZTreeObj("ztree_0");
    zTree.expandNode(treeNode);
    return false;
  }
  return true;
}

//点击获取文章列表
// function zTreeOnClick(event, treeId, treeNode) {
//   var node = {
//     _id: treeNode._id,
//     treeId: treeNode.tId,
//     CreatedTime: treeNode.CreatedTime,
//     name: treeNode.name
//   };
//   console.log(node);
// }

//拖拽
function zTreeOnDrop(event, treeId, treeNodes, targetNode, moveType) {
  var treeObj = $.fn.zTree.getZTreeObj("ztree_0");
  var nodes = treeObj.getNodes();
  Db.SaveArticlebookLists(Tools.pullout(nodes));
}

//增加笔记本
// function zTreeAdd(event, treeId, treeNode) {
//   var treeObj = $.fn.zTree.getZTreeObj("ztree_0");
//   var isParent = event.data.isParent;  
//   var nodes = treeObj.getNodes();
//   Db.SaveArticlebookLists(Tools.pullout(nodes));
// }

//重命名
function zTreeOnRename(event, treeId, treeNode, isCancel) {
  var treeObj = $.fn.zTree.getZTreeObj("ztree_0");
  var nodes = treeObj.getNodes();
  Db.SaveArticlebookLists(Tools.pullout(nodes));
}

//删除
function zTreeOnRemove(event, treeId, treeNode) {
  var treeObj = $.fn.zTree.getZTreeObj("ztree_0");
  var nodes = treeObj.getNodes();
  Db.SaveArticlebookLists(Tools.pullout(nodes));
	Db.DeleteArticlebooks(Tools.collect([treeNode]));
}

//确认删除
function zTreeBeforeRemove(treeId, treeNode) {
	return confirm('确定要删除吗');
}

// ---------------------右键菜单----------------//
//
// function zTreeOnRightClick(event, treeId, treeNode){
// 	console.log("finish rightClick:"+treeNode.tId);
// 	if (!treeNode && event.target.tagName.toLowerCase() != "button" && $(event.target).parents("a").length == 0) {
// 		zTree.cancelSelectedNode();
// 		showRMenu("root", event.clientX, event.clientY);
// 	} else if (treeNode && !treeNode.noR) {
// 		zTree.selectNode(treeNode);
// 		showRMenu("node", event.clientX, event.clientY);
// 	}	
// }

// function showRMenu(type, x, y) {
// 	$("#rMenu ul").show();
// 	rMenu.css({"top":y+"px", "left":x+"px", "visibility":"visible"});
// 	$("body").bind("mousedown", onBodyMouseDown);
// }

// function hideRMenu() {
// 	if (rMenu) rMenu.css({"visibility": "hidden"});
// 	$("body").unbind("mousedown", onBodyMouseDown);
// }

// function onBodyMouseDown(event){
// 	var rMenu = $("#rMenu");
// 	if (!(event.target.id == "rMenu" || $(event.target).parents("#rMenu").length>0)) {
// 		rMenu.css({"visibility" : "hidden"});
// 	}
// }

// var zTree, rMenu;
// $(document).ready(function(){
// 	$.fn.zTree.init($("#ztree_0"), setting, zNodes);
// 	zTree = $.fn.zTree.getZTreeObj("ztree_0");
// 	rMenu = $("#rMenu");
// });


module.exports.PostFolder = React.createClass({
  getInitialState() {
  	return{
  		zNodes: initialNodes,
  		searchText: false,
  		contextMenu: false,
  		zTree: {},
      curFolder: {},
  	}
  },
  componentWillMount(){ 
  	this.getNodes();
  },
  componentWillUpdate(){
  },
  getNodes(){
    var me = this;
    var hco = co(function* () {
      return yield Db.GetArticlebookListsAsync();
    });
    hco().then(function(list) {
      me.setState({ zNodes: list });
    }).catch(function(e){
      console.error(e);
    });
  },
  handleChange(e){
  	console.log(e.target.value);
  	this.setState({searchText: e.target.value})
  },
  handleAddClick(){
  	console.log("add folder");
    var treeObj = $.fn.zTree.getZTreeObj("ztree_0");
        treeObj.addNodes(null, {name:"new book"+ bookcount, _id:'xxxx'+ bookcount, CreatedTime: new Date().getTime()});
        var nodes = treeObj.getNodes();
        Db.SaveArticlebookLists(nodes); 
  },
  getTreeSetting(){
  	//zSetting.callback.onRightClick = this.zTreeOnRightClick;
    zSetting.callback.onClick = this.handleSelectBookId;
    return zSetting ;
  },
  handleSelectBookId(event, treeId, treeNode){
    if(this.props.selectBookId){
      this.props.selectBookId(event, treeId, treeNode);
    }
  },
  render(){
  	console.log(this.state.zTree);
    return(
			<div id="postFolder">
				<div className="folderHeader">
					<i className="material-icons md-18 md-light">folder_open</i>
					<span>Book Folder</span>
					<i className="material-icons md-18 md-light" title="新增文件夹" onClick={this.handleAddClick} >add</i>
				</div>
				<TextField
				id="searchPostFolder"
				style={{width:"80%"}}
				hintText="Search"
				hintStyle={{color:"#888",fontSize:"14px"}}
				onChange={this.handleChange}
				/>
				<div className="folderBody">
					{this.state.searchText
						?<ZtreeFolder zNodes={this.state.zNodes} zSetting={this.getTreeSetting()} ref="ztree"/>
						:<ZtreeFolder zNodes={this.state.zNodes} zSetting={this.getTreeSetting()} ref="ztree"/>}
				</div>
			</div>
    );
  } 
});
