"use strict";

require('../css/style/login.css');
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import utils from '../js/libs/utils.js';
//加载组件
import RegBlock from './components/login/reg-block.jsx';
import SignBlock from './components/login/sign-block.jsx';
import { Signin, Join, Navigation } from './components/reg-button.jsx';
const urlPath = utils.basePath();

const Middle = React.createClass({
  render() {
    if(this.state.reg)
      return (<RegBlock/>);
    else{
      return ( <SignBlock/> );
    }
  },
  componentWillMount(){
    if('login.html' == utils.fileName())
      ;
    else{
      this.state.reg = false;
    }
  },
  componentDidMount(){
    browserHistory.listen((location) => {
      if(utils.fileName() == 'login.html'){
        this.setState({ reg: false });
      }else if(utils.fileName() == 'join.html'){
        this.setState({ reg: true });
      }else{
        console.error('router-3');
      }
    });
  },
  componentWillUnmount(){
  },
  getInitialState() {
    return { reg:false };
  },
}); 

render((
  <Router history={browserHistory}>
    <Route path={urlPath + 'login.html'} component={Navigation}>
      <IndexRoute component={Join}/>
      <Route path={urlPath + 'login.html'} component={Join}/>
      <Route path={urlPath + 'join.html'} component={Signin}/>
    </Route>
  </Router>
  ),
  $('#top-right-sign')[0]
);

render(
    <Middle>
    </Middle>,
    $('#middle-body')[0]
);
