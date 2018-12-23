"use strict";
import React from 'react';
// const jsdk = nodeRequire('js-sdk');
// const ipc = nodeRequire('electron').ipcRenderer;
var xdesktop = nodeRequire('xdesktop-render');
var Logic = xdesktop.logic;
module.exports.TextTips = React.createClass({
	render: function () {
	    return (
			<div>
			  提示:图片要小于100kb,推荐压缩图片地址:https://tinypng.com/
            </div>
	    );
	}
});
