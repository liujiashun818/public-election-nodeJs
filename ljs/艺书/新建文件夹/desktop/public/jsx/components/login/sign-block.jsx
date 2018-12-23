"use strict";

nodeRequire('babel-polyfill');
import React from 'react';
import { render } from 'react-dom';
import { Router, Route, Link, browserHistory, IndexRoute } from 'react-router';
import utils from '../../../js/libs/utils.js';
import Moblogo from './logo.jsx';
import Aboutus from './about.jsx';
const Promise = nodeRequire('bluebird');
const co = Promise.coroutine;
const jsdk = nodeRequire('js-sdk');
var fs = nodeRequire('fs');
var nacl_factory = nodeRequire("js-nacl");
var nacl_instance = null;
nacl_factory.instantiate((nacl) => {
    nacl_instance = nacl;
});
var xdesktop = nodeRequire('xdesktop-render');
var xcommon = nodeRequire('xdesktop-common');
var Logic = xdesktop.logic;

// 登录界面
var SignBlock = React.createClass({
	  getInitialState(){
		    return{
		      email: '',
		      emailError: '',
		      pwd: '',
		      pwdError: '',
		      tips: '',
		      resetPwd: false,
		    }
		  },
  render() {
		let {tips, resetPwd, pwdError, cacheNum, pwd, emailError} = this.state;
   return (
     <div className={"launch-splash"}>
      <div className={"foreground"}>
        <h1 className={"splash-header"}>
        <Moblogo/>
        </h1>
        {this.state.resetPwd
          ?<div className={"splash-forms"}>
            <span className={"count-connect"}>重置密码</span>
            <div className={"sign-up-field"}>
              <input className={"text-input"} type="email" name="user_email" placeholder="注册邮箱" aria-label="注册邮箱"
              onChange={this.handleEmailChange}
              onKeyDown={this.handleResetKeyDown}
              maxLength="64" autoCapitalize="off"
              autoCorrect="off" autoComplete="off" autoFocus="autofocus"/>
            </div>
            { this.state.tips }

<input className={"signin-button d3-button"} onClick={this.resetClick} type="button" id="clickRetMima" value="重置密码"/>

            <button className={"step-title d3-button"} label="创建" onClick={this.handleUnresetClick}>
              登录
            </button>
          </div>
        :<div className={"splash-forms"}>
            <span className={"count-connect"}>输入登录信息</span>
            <div className={"sign-up-field"}>
              <input className={"text-input"} type="username" placeholder="登录名" aria-label="登录名"
              onChange={this.handleEmailChange}
              onKeyDown={this.handleKeyDown}
              maxLength="64" autoCapitalize="off"
              autoCorrect="off" autoComplete="off" autoFocus="autofocus"/>
              { this.state.emailError }
            </div>
            <div className={"sign-up-field"}>
              <input className={"text-input"} type="password"
                  onChange={this.handlePwdChange}
                  onKeyDown={this.handleKeyDown}
                  placeholder="密码" aria-label="密码" maxLength="512" autoCapitalize="off" autoCorrect="off" autoComplete="off"/>
              { this.state.pwdError }
            </div>
            { this.state.tips }
            <button className={"signin-button d3-button"}
                onClick={this.handleLoginClick}
                label="登录">登录</button>
            <button className={"step-title d3-button"} label="创建" onClick={this.handleResetClick}>
              忘记密码
            </button>
          </div>
        }
      </div>
      <Aboutus/>
    </div>
    )
  },
  handleEmailChange(e){
    this.setState({
      email: e.target.value,
      emailError: '',
      tips: ''
    });
  },
  handlePwdChange(e){
    this.setState({
      pwd: e.target.value,
      pwdError: '',
      tips: ''
    });
  },
  handleKeyDown(e){
    if(e.keyCode == 13){
      e.returnValue = false;
      e.cancel = true;
      this.handleLoginClick();
    }
  },
  handleResetKeyDown(e){
    if(e.keyCode == 13){
      e.returnValue = false;
      e.cancel = true;
//    this.resetClick(e);
    }
  },
  handleResetClick(e){
    this.setState({resetPwd: true});
  },
  handleUnresetClick(e){
    this.setState({
    	resetPwd: false,
         tips:''
    });
//  $('#emportYOu').css({"display":"none"})
//	$('#erroYOu').css({"display":"none"})
  },
  resetClick:function(){
  	/*刘家顺 ，修改邮箱 多次点击没有*/
    let {email, tips}= this.state ;
    var szReg=/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+/;
    if(!email){
        this.setState({tips: <div id='emportYOu' className="show-tips">请输入注册邮箱</div>})
    }else if(!szReg.test(email)){
    console.log("szReg.test(email");
    console.log(szReg.test(email));
      this.setState({tips: <div id='erroYOu' className="show-tips">邮箱格式不正确</div>})
    }else {
          var count = 30;
          var countdown = setInterval(CountDown, 1000);
          function CountDown() {
              $("#clickRetMima").css({"color":"white","background-color":"gray"});
              $("#clickRetMima").attr("disabled", true);
              $("#clickRetMima").val("重置密码 " + count + "s");
              if (count == 0) {
                  $("#clickRetMima").val("重置密码").removeAttr("disabled");
                    $("#clickRetMima").css({"color":"white","background-color":"rgb(0, 153, 204)"});
                  clearInterval(countdown);
              }
              count--;
          }

        let self = this;
        var hco = co(function* () {
        var request = $.ajax({
            url: xdesktop.tools.resolve('/request-password-reset'),
		      type: "POST",
		      data: {
		        email: email
		      },
          });
          request.done(function(data){
                console.log('已发送邮件');
		       });
          request.fail(function(err){
              console.log(err);
		      self.setState({tips: <div className="show-tips">{err}</div>});
          });
      });
      hco().then(function(data){
        self.setState({tips: <div className="show-tips" style={{color:"#09c"}}> 邮件发送完毕,请至邮箱重置密码</div>});
      }).catch(function(e){
          console.error(e);
         self.setState({tips: <div className="show-tips">{err}</div>});
      });
    }

  },
  handleLoginClick(e){
//	$('#emportYOu').css({"display":"none"})
//	$('#erroYOu').css({"display":"none"})
    var {email, pwd, emailError, pwdError ,tips}= this.state ;
    let self = this;
    if(!email){
      self.setState({emailError: <div className="sign-up-error">不能为空</div>})
      return ;
    }else if(utils.Rfname.test(email)){
      self.setState({emailError: <div className="sign-up-error">不能含特殊字符</div>})
      return ;
    }
    if(!pwd){
      self.setState({pwdError: <div className="sign-up-error">密码不能为空</div>})
      return ;
    }
    var hco = co(function* () {
      var Args = {};
      var fname = '';
      var privatePath;
      var request = $.ajax({
        url: xdesktop.tools.resolve('/api/ousers/login'),
        type: "POST",
        data: {
          password: pwd,
          email: email
        }
      });
      request.done(function(data){
        console.log(data);
        Args.userId = data.userId;
        Args.Authorization = data.id;
        Args.wallets = [];
        $.ajax({
          headers: {
            Authorization: data.id
          },
          url: xdesktop.tools.resolve('/api/ousers/'+ data.userId),
          type: 'GET',
          success: function(res) {
            if(!res.emailVerified){
              self.setState({tips: <p className="show-tips" >请先完成邮箱验证</p>})
              return;
            }
            let walletList = Logic.crypto.getWalletsByUserId(data.userId);
            console.log(walletList);
            var item = {
              address: null,
              seed: null
            }
            if(walletList[0]){
              let curWallet = Logic.crypto.getLocalWallet(data.userId, walletList[0]);
              item.address = curWallet.address;
              item.seed = curWallet.phaseSeed;
              item.discription = curWallet.discription;
            }
            console.log(item);
            Args.wallets.push(item);
            xdesktop.ipc.send(xcommon.ipc.startuser, Args);
            utils.openMainWin('note.html', utils.isMac(), Args);
          },
          error: function(err) {
            console.error(err);
          }
        });
      });
      request.fail( function(jqXHR, textStatus ) {
        var msg = JSON.parse(jqXHR.responseText);
        var r = <p className="show-tips" >{msg.error.message}</p>;
        self.setState({tips: r});
      });
    });
    hco().then(function() {
      }).catch(function(e){
        console.error(e);
    });
  }
});

module.exports = SignBlock;
