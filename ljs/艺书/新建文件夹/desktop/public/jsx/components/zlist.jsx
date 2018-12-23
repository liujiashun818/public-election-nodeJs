require('../../css/style/zlist/styles.css');
require('../../css/style/zlist/context.standalone.css');
nodeRequire('babel-polyfill');
import React from 'react';
import { render } from 'react-dom';
import utils from '../../js/libs/utils.js';
const Promise = nodeRequire('bluebird');
const co = Promise.coroutine;
const jsdk = nodeRequire('js-sdk');
var xdesktop = nodeRequire('xdesktop-render');
var Db = xdesktop.db;
var Logic = xdesktop.logic;
var Tools = xdesktop.tools;
var clickcolor = '#c1deec';
var nw_content = '新建文章'
var InitPopMenu = false;
var currentId = undefined;

//列表右键菜单代码
var Context = (function () {
	var options = {
		fadeSpeed: 100,
		filter: function ($obj) {
		},
		preventDoubleContext: true,
		compress: true
	};
	function initialize(opts) {
		options = $.extend({}, options, opts);
		$(document).on('click', 'html', function () {
			$('.dropdown-context').fadeOut(options.fadeSpeed, function(){
				$('.dropdown-context').css({display:''}).find('.drop-left').removeClass('drop-left');
			});
		});
		if(options.preventDoubleContext){
			$(document).on('contextmenu', '.dropdown-context', function (e) {
				e.preventDefault();
			});
		}
		$(document).on('mouseenter', '.dropdown-submenu', function(){
			var $sub = $(this).find('.dropdown-context-sub:first'),
				subWidth = $sub.width(),
				subLeft = $sub.offset().left,
				collision = (subWidth+subLeft) > window.innerWidth;
			if(collision){
				$sub.addClass('drop-left');
			}
		});
	}
	function updateOptions(opts){
		options = $.extend({}, options, opts);
	}
	function buildMenu(data, id, subMenu) {
		var subClass = (subMenu) ? 'dropdown-context-sub' : '',
			compressed = options.compress ? 'compressed-context' : '',
			$sub,
			$menu = $(`<ul class="dropdown-menu dropdown-context ${subClass} ${compressed}" id="dropdown${id}"></ul>`);
      var i = 0, linkTarget = '';
        for(i; i<data.length; i++) {
        	if (typeof data[i].divider !== 'undefined') {
				$menu.append('<li class="divider"></li>');
			} else if (typeof data[i].header !== 'undefined') {
				$menu.append('<li class="znav-header">' + data[i].header + '</li>');
			} else {
				if (typeof data[i].href == 'undefined') {
					data[i].href = '#';
				}
				if (typeof data[i].target !== 'undefined') {
					linkTarget = ' target="'+data[i].target+'"';
				}
				if (typeof data[i].subMenu !== 'undefined') {
					$sub = $('<li class="dropdown-submenu"><a tabindex="-1" href="' + data[i].href + '">' + data[i].text + '</a></li>');
				} else {
					$sub = $('<li><a tabindex="-1" href="' + data[i].href + '"'+linkTarget+'>' + data[i].text + '</a></li>');
				}
				if (typeof data[i].action !== 'undefined') {
					var actiond = new Date(),
						actionID = 'event-' + actiond.getTime() * Math.floor(Math.random()*100000),
						eventAction = data[i].action;
					$sub.find('a').attr('id', actionID);
					$('#' + actionID).addClass('context-event');
					$(document).on('click', '#' + actionID, eventAction);
				}
				$menu.append($sub);
				if (typeof data[i].subMenu != 'undefined') {
					var subMenuData = buildMenu(data[i].subMenu, id, true);
					$menu.find('li:last').append(subMenuData);
				}
			}
			if (typeof options.filter == 'function') {
				options.filter($menu.find('li:last'));
			}
		}
		return $menu;
	}

	function addContext(selector, data) {
		var d = new Date(),
			id = d.getTime();
		id = '' + id;
		var $menu = buildMenu(data, id);
		$('body').append($menu);
		$(document).on('contextmenu', selector, function (e) {
			currentId = $(e.currentTarget).attr('name');
			e.preventDefault();
			e.stopPropagation();
			$('.dropdown-context:not(.dropdown-context-sub)').hide();
			var $dd = $('#dropdown' + id);
			$dd.css({
						top: e.pageY + 10,
						left: e.pageX - 13
		  }).fadeIn(options.fadeSpeed);
		});
	}
	function destroyContext(selector) {
		$(document).off('contextmenu', selector).off('click', '.context-event');
	}
	return {
		init: initialize,
		settings: updateOptions,
		attach: addContext,
		destroy: destroyContext
	};
})();

//初始化右键菜单
function InitPop(){
  if(!InitPopMenu){
		InitPopMenu = true;
		Context.init();
		Context.attach('.arlist-item', [
			{text: '删除click', action: function(e){
				e.preventDefault();
				if(currentId) {
					DelArticle(currentId);
					currentId = undefined;
				}
			}}
		]);
		// 注册事件
		$.llevent.EventObject.on('nw-article', function(nw_doc) {
			// 将此文章设置为当选状态
			if($('#arlist').length === 0){
				return;
			}
			var nw_element = $('#arlist').children('div.arlist-item:first-child');
			if(nw_element.attr('name') == nw_doc.Id) {
			}else {
				$('#arlist').prepend(divIt(nw_doc._id, nw_doc.Img,
					nw_doc.UpdatedTime, nw_doc.Title, nw_doc.Content));
				$('#arlist').children('.arlist-item').css('background', '');
				$('#arlist').children('div.arlist-item:first-child').css('background', clickcolor);
			}
		});
		$.llevent.EventObject.on('click-zlist-item', function(it) {
			// 置为选择状态，设置 editor
			it = $(it);
			var parent = it.parent('#arlist');
			parent.children('.arlist-item').css('background', '');
			it.css('background', clickcolor);
			var hco = co(function* () {
				var articleId = it.attr('name');
				var i = yield Db.GetOneArticleAsync(articleId);
				Logic.editor.editorSet(i._id, i.Title, i.Content);
			});
			hco().catch(function(e){
				console.error(e);
			});
		});
		$.llevent.EventObject.on('ch-article', function(it) {
			var element = $('#arlist').children(`div[name=${Logic.editor.getArticleId()}]`);
			if(it.Title){
				element.find('p.artitle').text('标题:' + it.Title);
			}
			if(it.Content) {
				element.find('p.ardesc').text('内容:' + it.Content);
			}
			element.find('p.ardate').text(new Date().toLocaleDateString());
		});
	}
}

//删除文章，如果列表为空，再增加一篇文章
function DelArticle(_id) {
  var hco = co(function* () {
    var it = $($('#arlist').children(`div[name='${_id}']`)[0]);
		var next = it.next(`div.arlist-item`);
		var prev = it.prev(`div.arlist-item`);
		var RealNext = undefined;
		var Id, Title, Content;
		if(next.length > 0) {
			RealNext = next;
		}else if(prev.length > 0) {
			RealNext = prev;
		}else {
		  //创建一个新的
			var nw_doc = yield Db.CreateArticleAsync({
		        ArticlebookId: Logic.editor.getArticleBookId(),
		        Title: '无标题',
		        Content: nw_content,
		        Extra: {
		          isMarkdown:false,
		          articleId:'',
		        },
      		});
			Logic.saver.Save();
			Id = nw_doc._id;
			Title = nw_doc.Title;
			Content = nw_doc.Content;
			$('#arlist').prepend(divIt(nw_doc._id, nw_doc.Img,
					nw_doc.UpdatedTime, nw_doc.Title, nw_doc.Content));
			$('#arlist').children('div.arlist-item:first-child').css('background', clickcolor);
		}
		if(RealNext){
			var al_doc = yield Db.GetOneArticleAsync(RealNext.attr('name'));
			Id = al_doc._id;
			Title = al_doc.Title;
			Content = al_doc.Content;
			$('#arlist').children('.arlist-item').css('background', '');
		  RealNext.css('background', clickcolor);
		}
		Logic.editor.editorSetNoSave(Id, Title, Content);
    it.remove();
		yield Db.DeleteArticleAsync(_id);
  });
  hco().catch(function(e){
    console.error(e);
  });
}
function pickImg(img) {
  var def = 'data:image/png;base64,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';
  return img? img: def;
}
function getTm(tm) {
  var t = new Date(tm);
  return t.toLocaleDateString();
}

//点击创建文章，插入文章列表
function InsertOne(){
	var ArticlebookId = Logic.editor.getArticleBookId();
	/*
	初始化未完毕返回  	*/
	if(!ArticlebookId) return;
  var hco = co(function* () {
    var i = yield Db.CreateArticleAsync({
      ArticlebookId: ArticlebookId,
      Title: '无标题',
      Content: nw_content
    });
    var it = divIt(i._id, i.Img, i.UpdatedTime, i.Title, i.Content);
    $('#arlist').prepend(it);
		Logic.editor.editorSet(i._id, i.Title, i.Content);
		$('#arlist').children('.arlist-item').css('background', '');
		$('#arlist').children('div.arlist-item:first-child').css('background', clickcolor);
  });
  hco().catch(function(e){
    console.error(e);
  });
}

function divIt(id, Img, time, title, content) {
	return `<div class="arlist-item arbox" name="${id}"
			onclick="$.llevent.EventObject.fireEvent('click-zlist-item', this);">
		  <div class="arimg arleft">
				<img src="${pickImg(Img)}" alt="" title=""/>
			</div>
			<div class="arblock arright">
				<p class="ardate">${getTm(time)}</p>
				<p class="artitle">标题:${title}</p>
				<p class="ardesc">内容:${utils.Summary(content)}</p>
			</div>
		</div>`;
}
function Append(nodes) {
  $('#arlist').empty();
  var html = ``;
  for(var i of nodes) {
    var it = divIt(i._id, i.Img, i.UpdatedTime, i.Title, i.Content);
    html += it;
  }
  $('#arlist').append(html);
	var currentArticle = Logic.editor.editorGet();
	if(currentArticle.Id){
		$('#arlist').children(`div[name=${currentArticle.Id}]`).css('background', clickcolor);
	}else $('#arlist').children('div.arlist-item:first-child').css('background', clickcolor);
}

// <button className={"article-new-button d3-button"} label="新建"
          //    onClick={this.BtnClick.bind(this)}>新建文章</button>

var Zlist = React.createClass({
  render() {
    var me = this
    setImmediate(function(){
      Append(me.state.zNodes)
    });
    return (
        <div className={"arlist-container"}>
          <div id="arlist" className={"arlist arbox artext-shadow"}>
          </div>
      </div>
    );
  },
  BtnClick(){
    InsertOne();
  },
  getInitialState() {
    InitPop();
    return { zNodes: [] };
  },
	componentDidMount(){
		var me = this;
    var hco = co(function* () {
			yield Logic.init.initGlobalAsync();
			return yield Db.GetArticlesByBookIdAsync(Logic.editor.getArticleBookId(), 0, 65535);
		});
		hco().then(function(list) {
			me.setState({ zNodes: list });
		}).catch(function(e){
			console.error(e);
		});
	}
});
module.exports = Zlist;

// TODO del

// render(
//     <Zlist>
//     </Zlist>,
//     $('div.zcontent_wrap')[0]
// );
