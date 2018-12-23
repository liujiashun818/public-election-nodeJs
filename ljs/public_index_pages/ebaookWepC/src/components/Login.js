import React from 'react';
import {Link} from "react-router-dom";
import TextField from 'material-ui/TextField';
import "../css/login.css";
//import Rfname from "./../library/untils.js";
import {FetchPost} from '../service/service';
import $ from 'jquery';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      autoLogin: false, //下次自动登录
      finished: false
    }
  };

  componentDidMount(){
    $('#tf_email').attr('spellcheck', false)
  }

  //邮箱
  emailhandleInputChange = (event) => {
    event.preventDefault();
    // var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    var emailReg = /^[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?$/;
    const value = event.target.value;
    if (!value.trim()) {
      this.refs.email.state.errorText = "请输入邮箱";
      this.refs.email.state.checked = false;
      this.checkform();
      return;
    }
    if (!emailReg.test(value)) {
      this.refs.email.state.errorText = "邮箱格式不正确";
      this.refs.email.state.checked = false;
      this.checkform();
      return;
    }
    this.refs.email.state.errorText = "";
    this.refs.email.state.checked = true;
    this.checkform();
    this.setState({email: value});
  };

  //密碼
  passwordhandleInputChange = (event) => {
    event.preventDefault();
    var self = this;
    const value = event.target.value;
    if (!value.trim()) {
      this.refs.password.state.errorText = "请输入密码";
      this.refs.password.state.checked   = false;
      this.checkform();
      return;
    }
    if (value.length < 6) {
      this.refs.password.state.errorText = "密码太短，至少6个字符";
      this.refs.password.state.checked   = false;
      this.checkform();
      return;
    }
    this.refs.password.state.errorText = "";
    this.refs.password.state.checked   = true;
    this.checkform();
    self.setState({password: value});
  };

  //验证表单是否正确
  checkform = () => {
    // console.log("-------checkedForm");
    if (this.refs.email.state.checked && this.refs.password.state.checked) {
      this.setState({finished: true});
    } else {
      this.setState({finished: false});
      // console.log("------deny");
    }
  }

  //去登录
  goLogin = () => {
    let {email, password} = this.state;
    let data = {
      email: email,
      password: password
    };
    let self = this;
    FetchPost('/api/user/login', data).then(data => {
      // console.log(data);
      if (data.code !== 0) {
        alert(data.message)
        return;
      };
      if(data.message == '该用户被封禁'){
        alert("您已被封禁")
        return;
      };
      if (data.success) {
        window
          .sessionStorage
          .setItem('token', data.data.token);
        window
          .sessionStorage
          .setItem('nickName', data.data.nickname);
        window
        .sessionStorage
        .setItem('id',data.data.id);
        if (self.state.autoLogin) {
          window
            .localStorage
            .setItem('token', data.data.token);
          window
            .localStorage
            .setItem('id', data.data.id);
        };
        self.setState({autoLogin: false});
        // console.log("登录成功");
        self
          .props
          .history
          .push("/", null);
        window
          .location
          .reload();
      }
    })
  };
  //下次是否自动登录
  autoLogin = () => {
    this.setState({
      autoLogin: true
    }, function () {
      // console.log(self.state.autoLogin)
    });
  };
  openEdit = () => {
    // console.log(this.state);
  };
  render() {
    return (
      <div className="loginBig">
        <div className="login">
          <div className="login_con">
            <div className="login_top">
              <h3></h3>
              <h4>会员登录</h4>
            </div>
            <div className="login_main">
              <TextField
                floatingLabelText="邮箱"
                underlineStyle={{
                border: " 1px solid #e4eaec"
              }}
                underlineFocusStyle={{
                border: "1px solid #249cff"
              }}
                floatingLabelStyle={{
                color: " #e4eaec"
              }}
                floatingLabelShrinkStyle={{
                color: "#249cff",
                fontSize: "20px"
              }}
              id="tf_email"
              spellcheck="false"
                errorText=""
                fullWidth={true}
                ref="email"
                onChange={this
                .emailhandleInputChange
                .bind(this)}
                checked={false}/><br/>
              <TextField
                floatingLabelText="密码"
                underlineStyle={{
                border: " 1px solid #e4eaec"
              }}
                underlineFocusStyle={{
                border: "1px solid #249cff"
              }}
                floatingLabelStyle={{
                color: " #e4eaec"
              }}
                floatingLabelShrinkStyle={{
                color: "#249cff"
              }}
                type="password"
                errorText=""
                fullWidth={true}
                ref="password"
                onClick={this
                .openEdit
                .bind(this)}
                onChange={this
                .passwordhandleInputChange
                .bind(this)}
                checked={false}/><br/>
              <p
                className="forgetPass"
                style={{
                cursor: "pointer"
              }}>
                <Link to="/findPSW">忘记密码</Link>
              </p>
              {this.state.finished
                ? <p className="submit">
                    <input type="submit" value="登    录" onClick={this.goLogin}/>
                  </p>
                : <p className="submit">
                  <input
                    type="submit"
                    value="登    录"
                    style={{
                    backgroundColor: "#ccc"
                  }}/>
                </p>
                }

              <p className="autoLogin">
                <input type="checkbox" onClick={this.autoLogin}/>
                <span className="next">下次自动登录</span>
                <span className="new">
                  <Link
                    to="/register"
                    style={{
                    textDecoration: "none",
                    color: "#adb3cl"
                  }}>
                    <span >新用户注册</span>
                  </Link>
                </span>
              </p>
              {/* <p className="shortcutLogin">
                <span className="quick">快捷登录</span>
              </p>
              <p className="loginMethod">
                <span className="wchart"></span>
                <span className="QQ"></span>
                <span className="weibo"></span>
              </p> */}
            </div>
          </div>
        </div>
      </div>

    )
  }

};

export default Login;