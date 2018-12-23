const fs = nodeRequire("fs");
const {shell: Shell, ipcRenderer } = nodeRequire('electron');
var Export = {};
module.exports = Export;
const app = nodeRequire('electron').remote.app;
Export.GLOBALNUM = '';
Export.Remail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
Export.Rfname = /\\|\/|\:|\*|\?|\||\<|\>|\"|\!/;
var xcommon = nodeRequire('xdesktop-common');

Export.getUrlVars = function(val) {
  var vars = [], hash;
  var hashes = val.slice(val.indexOf('?') + 1).split('&');
  for(var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split('=');
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
  }
  return vars;
}

Export.relativePath = function(path) {
  var len = path.length;
  if(len <= 0) return path;
  if(path[len - 1] == '/') return path.substring(0, len - 1);
  return path;
}

Export.removeFN = function(path) {
  var len = path.length;
  var i = len - 1;
  for(; i >=0; --i){
    if(path[i] == '/') break;
  }
  return path.substring(0, i + 1);
}

Export.getFN = function(path) {
  var len = path.length;
  var i = len - 1;
  for(; i >=0; --i){
    if(path[i] == '/') break;
  }
  return path.substring(i + 1, len);
}

Export.openExternal = function(url) {
  Shell.openExternal(url);
}

Export.openMainWin = function(file, Ismac, User){
  ipcRenderer.send('openUrl', {html: file, user: JSON.stringify(User), width: 1050, height: 595, 
        frame: false,
        transparent: false
  });
}

Export.QuitApp = function(){
  ipcRenderer.send('quit-app', {});
}

Export.regularTime = function(){
  var d = new Date();
  var year = '' + d.getFullYear();
  var month = d.getMonth();
  var month = (month +1) > 9 ? ( '' + (month + 1)) : ( '0' + (month +1) )
  var day =   d.getDate();
  var hours = d.getHours();
  var mins =  d.getMinutes();
  var secs = d.getSeconds();
  var mise = d.getMilliseconds();
  day = day > 9 ? ('' + day) : ('0' + day);
  hours = hours > 9 ? ( '' + hours ) : ( '0' + hours );
  mins = mins > 9 ? ('' + mins) : ('0' + mins);
  return  ('(Local)' + year + '-' + month + '-'
    + day + '-' + hours + '-' + mins + '-' + secs + '-' + mise);
}

Export.randomString = function(len) {
　len = len || 32;
  if ( len > 128) len = 128;
　var $chars = 'JKTWXYZMNPQRSaCDABEFGHbcdefhijkmnprstwxyz2345678oOLl9gqVvUuI1';
　var maxPos = $chars.length;
　var pwd = '';
  var i = 0;
　for (i = 0; i < len; ++i) {
　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　}
　return pwd;
}

Export.isMac = function() {
	return process.platform == 'darwin';
}

Export.basePath = function(){
  return Export.removeFN(document.location.pathname);
}

Export.fileName = function(){
  return Export.getFN(document.location.pathname);
}

/*
获取文章摘要*/
Export.Summary = function(c) {
  c = c.replace(/<\/?[^>]*>/g,'')
  c =  c.substr(0, 400);
  c = c.replace(/\s+/g, '')
	c = c.replace(/&nbsp;/g,'	');
	c = c.replace(/&quot;/g,'"');
	c = c.replace(/&amp;/g,'&');
	c = c.replace(/&ldquo;/g,'“');
	c = c.replace(/&rdquo;/g,'”');
	c = c.replace(/&lt;/g,'<');
	c = c.replace(/&hellip;/g,'…');
	c = c.replace(/&gt;/g,'>');
	c = c.replace(/&mdash;/g,'—');
	c = c.replace(/&cent;/g,'￠');
	c = c.replace(/&pound;/g,'￡');
	c = c.replace(/&curren;/g,'¤');
	c = c.replace(/&yen;/g,'￥');
	c = c.replace(/&brvbar;/g,'|');
	c = c.replace(/&sect;/g,'§');
	c = c.replace(/&uml;/g,'¨');
	c = c.replace(/&copy;/g,'©');
	c = c.replace(/&shy;/g,'/x7f');
	c = c.replace(/&reg;/g,'®');
	c = c.replace(/&macr;/g,'ˉ');
	c = c.replace(/&plusmn;/g,'±');
	c = c.replace(/&mu;/g,'μ');
	c = c.replace(/&plusmn;/g,'±');
	c = c.replace(/&divide;/g,'÷');
	c = c.replace(/&times;/g,'×');
  c = c.replace(/\s+/g, '');
	c = c.replace(/&nbsp;/g,'');   
  return c;
}

// 隐藏用户邮件信息
Export.hidename = function(name){
  if(name.indexOf("@") > 0){
      name = name.replace(name.substr(2, name.indexOf("@")-3),"*****");
      console.log(name);
    };
    return name ;
}
