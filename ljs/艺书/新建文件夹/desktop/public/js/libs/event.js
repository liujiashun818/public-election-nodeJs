nodeRequire('babel-polyfill');
const Promise = nodeRequire('bluebird');
const co = Promise.coroutine;
var xdesktop = nodeRequire('xdesktop-render');
const fs = nodeRequire("fs");

$.llevent.EventObject.on('ch-article', function(it) {
  var Logic = xdesktop.logic;
  Logic.saver.Save();
});

