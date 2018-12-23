import React from 'react';
import "../css/register.css";
import { Link } from "react-router-dom";
import TextField from 'material-ui/TextField';
import { FetchPost } from '../service/service'

class Register extends React.Component {

  constructor() {
    super();
    this.state = {
      username: "true",
      email: "ture",
      password: "true",
      passwordAgain: "true",
      isChecked: false,
      finished: false,
    }
    this.handleRegClick = this.handleRegClick.bind(this);
    this.changeChecked = this.changeChecked.bind(this);
  };

  //用戶名
  usernamehandleInputChange = (event) => {
    this.refs.username.state.checked = false;
    const value = event.target.value;
    // console.log(value);
    if (!value.trim()) {
      this.refs.username.state.errorText = '请输入用户名';
      this.checkedForm();
      return;
    } else {
      if (value.length > 12) {
        this.refs.username.state.errorText = '用户名过长';
        this.refs.username.state.checked = false;
        this.checkedForm();
        return;
      }
      this.refs.username.state.errorText = '';
      this.refs.username.state.checked = true;
      this.checkedForm();
      this.setState({ username: value }, function () {
        // console.log("this.refs.username.state.checked");
        // console.log(this.refs.username.state.checked);
      });
    }
  };

  //郵箱
  emailhandleInputChange = (event) => {
    event.preventDefault();
    var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    var self = this;
    const value = event.target.value;


    if (!value.trim()) {
      this.refs.email.state.errorText = "请输入邮箱";
      this.refs.email.state.checked = false;
      this.checkedForm();
      return;
    }
    if (!emailReg.test(value)) {
      this.refs.email.state.errorText = "邮箱格式不正确";
      this.refs.email.state.checked = false;
      this.checkedForm();
      return;
    }
    this.refs.email.state.checked = true;
    this.refs.email.state.errorText = "";
    this.checkedForm();
    self.setState({ email: value });
  };
  //密碼
  passwordhandleInputChange = (event) => {
    event.preventDefault();
    var self = this;
    const value = event.target.value;
    if (!value.trim()) {
      this.refs.password.state.errorText = "请输入密码";
      this.refs.password.state.checked = false;
      this.checkedForm();
      return;
    }
    if (value.length < 6) {
      this.refs.password.state.errorText = "密码太短,至少6个字符";
      this.refs.password.state.checked = false;
      this.checkedForm();
      return;
    }
    if (/^[\s]{0,}$/.test(value)) {
      self.refs.password.state.errorText = "密码不符合规则"
      this.refs.password.state.checked = false;
      this.checkedForm();
      return;
    }
    this.refs.password.state.errorText = "";
    this.refs.password.state.checked = true;
    this.checkedForm();
    self.setState({ password: value })
  };

  //驗證兩次密碼是否一致
  password2handleInputChange = (event) => {
    event.preventDefault();
    var self = this;
    const value = event.target.value;
    // console.log(value);
    // console.log(this.state.password);
    if (value !== this.state.password) {
      this.refs.passwordAgain.state.errorText = "密码不一致";
      this.refs.passwordAgain.state.checked = false;
      this.checkedForm();
      return;
    }
    this.refs.passwordAgain.state.errorText = "";
    this.refs.passwordAgain.state.checked = true;
    this.checkedForm();
    self.setState({ passwordAgain: value });
  };
  //点击发送ajax,注册
  handleRegClick = (e) => {
    // console.log("register");
    var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
    let { email, username, password, passwordAgain } = this.state;
    let data = { email: email, password: password, nickName: username };

    if (!email || (!emailReg.test(email)) || (!password.length > 5) || (!(password === passwordAgain))) {
      return;
    }
    FetchPost('/api/user/register', data)
      .then(data => {
        // console.log(data)
        // console.log(data.message)
        if (data.message === "用户已经存在") {
          alert("邮箱已经注册过，请重新填写");
          return;
        }
        if (data.success && data.message !== "用户已经存在") {
          let email3 = document.getElementById('nn').value;
          this.props.history.push("/login", null)
          window.location.href='/RegisterActivation?email='+escape(email3); //跳转去激活
        }
      })
  };
  // 获得用户协议状态
  changeChecked = () => {
    var self = this;
    self.setState({ isChecked: !self.state.isChecked }, function () {
      self.checkedForm();
    });
  };
  checkedForm = () => {
    // console.log("-------checkedForm");
    // console.log(this.state.isChecked);
    if (this.refs.username.state.checked && this.refs.email.state.checked && this.refs.password.state.checked && this.refs.passwordAgain.state.checked && this.state.isChecked) {
      this.setState({ finished: true });
    } else {
      this.setState({ finished: false });
      // console.log("------deny");
    }
  }


  render() {
    return (
      <section className="register">
        <div style={{ "width": "100%", height: "100%" }}>
          <div className="register_con">
            <div className="register_top">
              <h3></h3>
              <h4>注册会员</h4>
            </div>
            <div className="register_main">

              <TextField
                floatingLabelText="用户名"
                floatingLabelStyle={{ color: "#e4eaec" }}
                floatingLabelShrinkStyle={{ color: "#249cff", fontSize: "20px" }}
                underlineStyle={{ border: " 1px solid #e4eaec" }}
                underlineFocusStyle={{ border: "1px solid #249cff" }}
                errorText=""
                fullWidth={true}
                ref="username"
                onChange={this.usernamehandleInputChange}
                checked={false}
              /><br />
              <TextField
                id = 'nn'
                floatingLabelText="邮箱"
                floatingLabelStyle={{ color: "#e4eaec" }}
                floatingLabelShrinkStyle={{ color: "#249cff", fontSize: "20px" }}
                underlineStyle={{ border: " 1px solid #e4eaec" }}
                underlineFocusStyle={{ border: "1px solid #249cff" }}
                errorText=""
                fullWidth={true}
                ref="email"
                onChange={this.emailhandleInputChange.bind(this)}
                checked={false}
              /><br />
              <TextField
                floatingLabelText="密码"
                floatingLabelStyle={{ color: "#e4eaec" }}
                floatingLabelShrinkStyle={{ color: "#249cff", fontSize: "20px" }}
                underlineStyle={{ border: " 1px solid #e4eaec" }}
                underlineFocusStyle={{ border: "1px solid #249cff" }}
                type="password"
                errorText=""
                fullWidth={true}
                ref="password"
                onChange={this.passwordhandleInputChange.bind(this)}
                checked={false}
              /><br />
              <TextField
                floatingLabelText="再次确认密码"
                floatingLabelStyle={{ color: " #e4eaec" }}
                floatingLabelShrinkStyle={{ color: "#249cff", fontSize: "20px" }}
                underlineStyle={{ border: " 1px solid #e4eaec" }}
                underlineFocusStyle={{ border: "1px solid #249cff" }}
                ref="passwordAgain"
                type="password"
                errorText=""
                fullWidth={true}
                onChange={this.password2handleInputChange.bind(this)}
                checked={false}
              /><br />
              <p className="agreement">
                <label><input type="checkbox" onClick={this.changeChecked} /></label><span>我已阅读并接受<a target='_blank' href="/agreement.pdf">用户协议</a></span>
              </p>
              {this.state.finished ?
                <p className="submit">
                  <input type="submit" value="注    册" onClick={this.handleRegClick} />
                </p>
                : <p className="submit" style={{ position: "relative" }}>
                  <input type="submit" value="注     册" style={{ backgroundColor: "#ccc" }} />
                </p>
              }
              <p className="goLogin">已有账号，去<Link to="/login" style={{ textDecoration: "none", color: "#adb3cl" }}><span >登录</span></Link></p>
            </div>
          </div>
        </div>
      </section>
    )
  }
};


export default Register;