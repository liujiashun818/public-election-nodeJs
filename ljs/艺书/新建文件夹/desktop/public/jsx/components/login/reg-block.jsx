"use strict";

nodeRequire('babel-polyfill');
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import utils from '../../../js/libs/utils.js';
const Promise = nodeRequire('bluebird');
const co = Promise.coroutine;
const jsdk = nodeRequire('js-sdk');
const ipc = nodeRequire('electron').ipcRenderer;
var xdesktop = nodeRequire('xdesktop-render');
var xcommon = nodeRequire('xdesktop-common');


import Moblogo from './logo.jsx';
import Aboutus from './about.jsx';

var RegBlock = React.createClass({
  render(){
    return (
      <div className={"launch-splash"}>
        <div className={"foreground"}>
          <h1 className={"splash-header"}>
            <Moblogo/>
          </h1>
            <div className={"splash-forms"}>
              <p className={"step-title"}>创建您的账户</p>
              <div className={"sign-up-field"}>
                <input className={"text-input"} type="username" placeholder="邮箱" aria-label="邮箱"
                maxlength="64" autoFocus="autofocus" autoCapitalize="off" 
                onChange={this.handleEmailChange}
                autoCorrect="off" autoComplete="off"/>
                { this.state.emailError }
              </div>
              <div className={"sign-up-field"}>
                <input className={"first-input text-input"} type="password" placeholder="密码" aria-label="密码"
                onClick={this.handleClickInput}
                onChange={this.handlePassChange}
                maxlength="512" autoCapitalize="off" autoCorrect="off" autoComplete="off"/>
                { this.state.f_passError }
              </div>
              <div className={"sign-up-field"}>
                <input className={"second-input text-input"} type="password" placeholder="重复输入密码" aria-label="重复输入密码"
                onChange={this.handlePass2Change}
                maxlength="512" autoCapitalize="off" autoCorrect="off" autoComplete="off"/>
                { this.state.s_passError }
              </div>
              { this.state.tips }
              <div>
                <button className={"sign-up-button d3-button"} label="创建" onClick={this.handleRegClick}>
                  创建账户
                </button>
              </div>
              <div className={"policy"}>
                如果继续, 则表示您已同意接受
                <a style={{cursor:'pointer'}}>服务条款</a>
              </div>
            </div>
        </div>
        <Aboutus/>
      </div>
    )
  },
  getInitialState(){
    return{
      email: '',
      emailError: '',
      f_password: '', //登入密码
      f_passError: '',
      s_password: '', //登入重复密码
      s_passError: '',
      tips: '',
    }
  },

  //step1 - create account
  clickLaw(e){
    utils.openExternal('https://github.com/Ebookcoin/client/blob/9306d56f6b23c2d5dd31a28667c9a2f6b0d28b2a/README.md');
  },
  handleClickInput(e){
    this.setState({
      f_passError: <div className="hint">密码至少6个字符</div>
    });
  },
  handleEmailChange(e){
    this.setState({
      email:e.target.value,
      emailError: '',
    });
  },
  handlePassChange(e){
    this.setState({
      f_password:e.target.value,
      f_passError: '',
    });
  },
  handlePass2Change(e){
    this.setState({
      s_password:e.target.value,
      s_passError: '',
    });
  },  
  handleRegClick(e){
    let { email, f_password, s_password} = this.state;
    let self = this;
    if(!email){
      this.setState({emailError: <div className="sign-up-error">不能为空</div>});
      return ;
    }else if(utils.Rfname.test(email)){
      this.setState({emailError: <div className="sign-up-error">不能含特殊字符</div>});
      return ;
    }else{
      if(!utils.Remail.test(email)){
        // Email 格式不对
        this.setState({emailError: <div className="sign-up-error">邮箱格式不正确</div>});
        return ;
      }
    }
    if(!(f_password.length > 5)){
      this.setState({s_passError: <div className="sign-up-error">密码太短了</div>}); 
      return ;
    }else if(!(f_password == s_password)){
      this.setState({s_passError: <div className="sign-up-error">两次密码不一致</div>}); 
      return ;
    }
    if(f_password == s_password){
      var hco = co(function* () {
        var request = $.ajax({
            url: xdesktop.tools.resolve('/api/ousers'),
            type: 'POST',
            data: {
              email: email,
              password: f_password,
              nickname: email,
            }
          });
          request.done(function(data){
            self.setState({tips: <p className="show-tips">邮件发送完毕,请至邮箱激活账户</p>});
          });
          request.fail( function(jqXHR, textStatus ){
            var msg = JSON.parse(jqXHR.responseText);
            if(msg.error.message.indexOf('Email already exists') >=0 ){
              self.setState({tips: <p className="show-tips">此邮箱已存在</p>});
            }
          });
          request.always(function(){
          });
      });
      hco().then(function() {
      }).catch(function(e){
        console.error(e);
      });
    }
  }
});

module.exports = RegBlock;