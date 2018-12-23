"use strict";

import React from 'react';
import {Link } from 'react-router';
import utils from '../../js/libs/utils.js';
const urlPath = utils.basePath();

module.exports.Signin = React.createClass({
  render() {
    return (
      <div className={"sign-up-link"}>
        <Link to={urlPath + 'login.html'} className={"sign-in-button button stroked d3-button"}
            style={{ role:"button"}}>
          <span>登录</span></Link>
      </div>
    )
  }
});

module.exports.Join = React.createClass({
  render() {
    return (
      <div className={"sign-up-link"}>
        <Link to={urlPath + 'join.html'} className={"sign-in-button button stroked d3-button"}
            style={{ role:"button" }}>
          <span>创建</span></Link>
      </div>
    )
  }
});

module.exports.Navigation = React.createClass({
  handleOnclick(){
      utils.QuitApp();
  },
  render() {
    return (
      <div>
        {this.props.children}
        <div className="sign-close-Btn" onClick={this.handleOnclick.bind(this)}>
            <div className="close" ></div>
        </div>
        <div className="drag-region"></div>
      </div>
    )
  }
});
