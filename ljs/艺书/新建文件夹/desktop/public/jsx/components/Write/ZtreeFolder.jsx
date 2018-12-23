"use strict";

import React from 'react';

let curMenu = null, zTree_Menu = null;
module.exports.ZtreeFolder = React.createClass({

  componentDidMount(){
    this.renderZtreeDom();
  },
  componentDidUpdate(){
    this.renderZtreeDom();
  },
  // componentWillUnmount(){
  //   this.ztreeObj.destory();
  // },
  renderZtreeDom(){
  	let zNodes = this.props.zNodes;
  	let treeObj = $(this.refs.ztree);
    let ztreeObj = this.ztreeObj =$.fn.zTree.init(this.getTreeDom(),this.props.zSetting,this.props.zNodes);
    zTree_Menu = $.fn.zTree.getZTreeObj("ztree_0");
    console.log(zTree_Menu);
    //curMenu = zTree_Menu.getNodes()[0].children[0].children[0];
    //zTree_Menu.selectNode(curMenu);
	if(zNodes.length) {
	    curMenu = zTree_Menu.getNodes()[0];
		zTree_Menu.selectNode(curMenu);
	}
    // 鼠标悬浮显示switch图标
    treeObj.hover(function () {
      if (!treeObj.hasClass("showIcon")) {
        treeObj.addClass("showIcon");
      }
    }, function() {
      treeObj.removeClass("showIcon");
    });
    return treeObj;
  },
  getTreeDom(){
    return $(this.refs.ztree);
  },
  getTreeObj(){
    return this.ztreeObj;
  },
  render(){
    return (
      <div className="ztree" ref="ztree" id="ztree_0"></div>
    )
  }
});