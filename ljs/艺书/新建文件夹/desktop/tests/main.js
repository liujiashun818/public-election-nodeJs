"use strict";

var Promise = require('bluebird');
const fs = require('fs');
const path = require('path');
const {app, BrowserWindow, crashReporter} = require('electron');
var ipc = require('electron').ipcMain;
const electron = require('electron');
const Menu = electron.Menu;
const Tray = electron.Tray;

// fs.writeFile(path.resolve(__dirname, 'driver.js'),
// `"use strict";
// const blockchain = require('blockchain');
// `, 'utf8', function(err){
//   var dbpath = path.resolve(`${app.getPath('appData')}`, 'Ebookchain', 'db');
//   const child_process = require('child_process');
//   var driver = child_process.fork(path.resolve(__dirname, 'driver.js'), 
//     [dbpath]);
// });
var appIcon;
var mainWindow;
var currentUser = null;
var trayShowed = false;
// Report crashes to our server.
crashReporter.start({
  productName: 'YourName',
  companyName: 'YourCompany',
  submitURL: 'https://your-domain.com/url-to-submit',
  autoSubmit: true
});
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the javascript object is GCed.
// single instance
const shouldQuit = app.makeSingleInstance((commandLine, workingDirectory) => {
  // Someone tried to run a second instance, we should focus our window.
  if (mainWindow) {
    mainWindow.show();
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }
    mainWindow.focus();
  }
})

if (shouldQuit) {
  app.quit()
}
const xdesktop = require('xdesktop-main');
const xcommon = require('xdesktop-common');
// Quit when all windows are closed.
app.on('window-all-closed', function() {
  app.quit();
});

function restore() {
  if (mainWindow) {
    mainWindow.show();
    mainWindow.restore();
    mainWindow.focus();
    mainWindow.webContents.send('focusWindow');
  } else {
    app.quit();
  }
}

// 仅MAC
app.on('open-file', function(e) {
  // console.log('reopen');
  if(mainWindow) {
    mainWindow.show();
    mainWindow.focus();
  } else {
    openIt();
  }
});

// 仅MAC
// var appIsReady = false;
app.on('activate', function() {
  console.log('activate');
  if(mainWindow) {
    mainWindow.show();
  }
  else {
    // 有时, 重启电脑会出现这种情况
    // Cannot create BrowserWindow before app is ready
    // 很可能app.on('ready')还没有出现, 但是ready后肯定有mainWindow了
    // 所以, 这一段注释掉
    // openIt();
  }
});

// This method will be called when Electron has done everything
// initialization and ready for creating browser windows.
app.on('ready', function(){
  xdesktop.logic.protocol.init();
  xdesktop.ipc.setDelegates(
    [exec, quitapp, openurl, showtray]
  );
  openIt();
});

function removeEvents (win) {
  win.removeAllListeners('closed');
  win.removeAllListeners('focus');
  win.removeAllListeners('blur');
  win.removeAllListeners('close');
}

function close (e, force) {
  console.log('close:', force);
  if (mainWindow) {
    mainWindow.hide();
    e && e.preventDefault();
    mainWindow.webContents.send('closeWindow');
  } else {
    app.quit();
  }
}

function bindEvents (win) {
  // Emitted when the window is closed.
  win.on('closed', function() {
    console.log('closed');
    win = null;
  });

  win.on('focus', function() {
    console.log('focus');
    if(win && win.webContents)
      win.webContents.send('focusWindow');
  });
  win.on('blur', function() {
    console.log('blur');
    if(win && win.webContents)
      win.webContents.send('blurWindow');
  });
  
  // 以前的关闭是真关闭, 现是是假关闭了
  // 关闭,先保存数据
  win.on('close', function(e) {
    // windows支持tray, 点close就是隐藏
    if (process.platform.toLowerCase().indexOf('win') === 0) { // win32
      win.hide();
      e.preventDefault();
      return;
    }
    // mac 在docker下quit;
    // linux直接点x linux不支持Tray
    close(e, false);
  });

}

var openIt = async function(){
  try{
    var colus = xdesktop.db.users;
    var colg = xdesktop.db.g;
    await colg.loadDatabaseAsync();
    await colus.loadDatabaseAsync();
    var current = await colg.findOneAsync({ type : xcommon.constvar.currentman });
    if(current && current.userName && current.userId && current.wallets) {
      delete current._id;
      delete current.type;
      currentUser = current;
    }
    openWindow();
  }catch(e){
    console.error(e);
  }
}

function exec(event, m){
  if(m.params && typeof m.params === 'string') m.params = JSON.parse(m.params);
  //console.log(m);
  var handled = xdesktop.logic.msghandler.handler(event, m);
  if(!handled) {
    if(m.method === xcommon.ipc.userlogout) {
      xdesktop.db.loginout();
      currentUser = null;
      openWin(xcommon.constvar.signWin);
    }
    if(m.method === xcommon.ipc.requestUser){
      xdesktop.logic.msghandler.sendUserinfo(event, m, currentUser);
    }
  }
}

function quitapp(event, arg){
  console.log('get quit-app request');
    if (mainWindow) {
      mainWindow.destroy();
      setMainWin(null);
    } else {
      app.quit();
  }
}

function openWin(arg) {
  //console.log('openUrl', arg);
  var everWindow = mainWindow;
  removeEvents(everWindow);
  everWindow.close();
  var html = arg.html;
  var win2 = new BrowserWindow(arg);
  win2.loadURL('file://' + __dirname + '/' + html);
  if (html.indexOf('note.html') >= 0) {
    bindEvents(win2);
  }
  setMainWin(win2);
  // dev
  win2.webContents.openDevTools();
}

async function openurl(event, arg) {
  if(arg.html === 'note.html' && typeof arg.user === 'string'){
    currentUser = JSON.parse(arg.user);
    delete arg.user;
    try{
      xdesktop.db.initDB(['images'], currentUser.userId);
      await xdesktop.db.images.loadDatabaseAsync();
    }catch(e){
      console.error(e);
    }
  }
  openWin(arg);
}

function showtray(event, arg){
  if (trayShowed) {
    return;
  }
  trayShowed = true;

  if (process.platform == 'linux') {
    return;
  }

  appIcon = new Tray(__dirname + '/public/images/tray/' 
      + ( process.platform == 'darwin' ? 'trayTemplate.png' : 'tray.png'));
  var contextMenu = Menu.buildFromTemplate([
    {
      label: arg.Open, click: function () {
        restore();
      }
    },
    {
      label: arg.Close, click: function () {
        close(null, true);
      }
    },
  ]);
  appIcon.setToolTip('Ebook');

  appIcon.on('click', function (e) {
    restore();
    e.preventDefault();
  });
  appIcon.on('right-click', function () {
    appIcon.popUpContextMenu(contextMenu);
  });
}

async function openWindow() {
  var win = null;
  // Create the browser window.
  win = new BrowserWindow(xcommon.constvar.mainWin);
  var openUrl = `file://${__dirname}/zlist.html`;
  win.loadURL(openUrl);
  bindEvents(win);
    // dev
  win.webContents.openDevTools();
  setMainWin(win);
}

function setMainWin(w) {
  mainWindow = w;
  if(!w) return;
  //w.setMenu(null);
}
