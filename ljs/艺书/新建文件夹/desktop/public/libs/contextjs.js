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
					$sub = $('<li class="dropdown-submenu"><a tabindex="-1" href="' + data[i].href + '"><i class="material-icons md-20">' + data[i].icon + '</i>' + data[i].text + '</a></li>');
				} else {
					$sub = $('<li><a tabindex="-1" href="' + data[i].href + '"'+linkTarget+'><i class="material-icons">' + data[i].icon + '</i>' + data[i].text + '</a></li>');
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