"use strict";

var xdesktop = nodeRequire('xdesktop-render');
var xcommon = nodeRequire('xdesktop-common');
const {ipcRenderer: ipc} = nodeRequire('electron');
import utils from '../js/libs/utils.js';
require('../js/libs/event.js');
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {blue500, blue50, blue300, white, darkBlack} from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
// ... 引入 react 组件
import { Navbar } from './components/Navbar.jsx';
import { Write } from './components/Write.jsx';
import { Discover } from './components/Discover.jsx';
import { MyArticle } from './components/MyArticle.jsx';
import { Article } from './components/Article.jsx';
import { ShareMarket } from './components/ShareMarket.jsx';
import { MyCopyright } from './components/MyCopyright.jsx';
import { MyShare } from './components/MyShare.jsx';
import { Account } from './components/Account.jsx';
import { BlockInfo } from './components/BlockInfo.jsx';
import { Transaction } from './components/Transaction.jsx';

const urlPath = utils.basePath();

injectTapEventPlugin();

var styles = {
  container: {
    textAlign: 'center',
  },
};

var muiTheme = getMuiTheme({  
	palette: {
	    primaryColor: blue500,
	    secondColor: blue50,
	    borderColor: blue300,	    
	    textColor1: white,
	    textColor2: darkBlack,
	 },
});

// 主页面路由
render((
	    <MuiThemeProvider muiTheme={muiTheme}>
		  <Router history={browserHistory}>
		  	<Route path={urlPath + 'guide.html'} component={Navbar} />
		    <Route path={urlPath + 'note.html'} component={Navbar}>
		      <IndexRoute component={Write}/>
		      <Route path={urlPath + 'write'} component={Write}/>
		      <Route path={urlPath + 'discover'} component={Discover} />
		      <Route path={urlPath + 'myArticle'} component={MyArticle}/>
		      <Route path={urlPath + 'article/:id'} component={Article}/>
		      <Route path={urlPath + 'shareMarket'} component={ShareMarket}/>
		      <Route path={urlPath + 'myCopyright'} component={MyCopyright}/>
		      <Route path={urlPath + 'myShare'} component={MyShare}/>
		      <Route path={urlPath + 'account'} component={Account}/>
		      <Route path={urlPath + 'myTransaction'} component={Transaction}/>
		      <Route path={urlPath + 'blockInfo'} component={BlockInfo}/>      
		    </Route>
		  </Router>
		</MuiThemeProvider>
  ),
  document.getElementById('root')
);