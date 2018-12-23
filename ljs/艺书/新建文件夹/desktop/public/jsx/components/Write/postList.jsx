require('../../../css/style/zlist/styles.css');
require('../../../css/style/zlist/context.standalone.css');

nodeRequire('babel-polyfill');
import React from 'react';
import { render } from 'react-dom';
const Promise = nodeRequire('bluebird');
const co = Promise.coroutine;
const jsdk = nodeRequire('js-sdk');
var xdesktop = nodeRequire('xdesktop-render');
var Db = xdesktop.db;
var Logic = xdesktop.logic;
var Tools = xdesktop.tools;


var InitPopMenu = false;

//生成右键菜单
function InitPop(){
  if(!InitPopMenu){
		Context.init();
		Context.attach('.arlist-item', [
			{text: '删除',
			icon: 'delete_forever',
			action: function(e){
				e.preventDefault();
				if(currentId) {
					DelArticle(currentId);
					currentId = undefined;
				}
			}}
		]);
		InitPopMenu = true;
	}
}

//删除文章
function DelArticle(_id) {
	var hco = co(function* () {
		yield Db.DeleteArticleAsync(_id);
		var it = $($('#arlist').children(`div[name='${_id}']`)[0]);
	  it.remove();
  });
  hco().catch(function(e){
    console.error(e);
  });
}

//获取当地时间
function getTm(tm) {
  var t = new Date(tm);
  return t.toLocaleDateString();
}

//获取内容摘要
function getContent(c) {
  console.log(c);
  return c.substr(0, 200);
}

module.exports.PostList = React.createClass({
  render() {
    let { arlist, currentPost} = this.props;
    console.log("currentPost:");
    console.log(this.props.currentPost);
    console.log(arlist);
    let postlist = arlist.map((item) => {
        return (
          <div className="arlist-item arbox" name={item._id}>
              <div className="arleft"></div>
              <div className="arblock arright">
                <p className="ardate">{getTm(item.UpdatedTime)}</p>
                <p className="artitle">{item.Title}</p>
                {item.Content && <p className="ardesc">{getContent(item.Content)}</p>}
              </div>
          </div>
        );      
      });
    return (
        <div className={"arlist-container"}  id="postList">
          <button className={"article-new-button d3-button"} label="新建">文章列表</button>
          <div id="arlist" className={"arlist arbox artext-shadow"}>
            {postlist}
          </div>
        </div>
    );
  },
  componentWillMount(){
    InitPop();
  },
});
