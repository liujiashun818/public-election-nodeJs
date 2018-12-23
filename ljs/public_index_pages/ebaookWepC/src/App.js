// import React, {Component} from 'react';
// import {Route, Link} from 'react-router-dom';
import React from 'react';
import { Route } from 'react-router-dom';

import Home from './components/home/Home.js';
import Blogger from './components/blogger/Blogger.js';
import ipResource from './components/ipResource/Blogger';
import DetailPage from "./components/blogger/blogger-section/DetailPage.js";
import ipResourceDetailPage from './components/ipResource/blogger-section/DetailPage';
import Community from './components/community/Community.js';
import PublicTxt from './components/community/PublicTxt.js';
import DetialListCom from './components/community/DetialListCom.js';
import Market from './components/market/Market.js';
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import findPSW from "./components/FindPsw.js";
import MyCenter from "./components/myCenter/MyCenters";
import MyCenterEditor from './components/myCenter/MyCenterEditor';
import './css/App.css';
import Header from "./components/public/Header";
// import Footer from "./components/public/Footer";
import Download from './components/Download/Download';
import AboutUs from './components/AboutUs/AboutUs';
import updateCommunity from './components/community/updateCommunity'
import { FetchAuth } from './service/service';
import Footer from "./components/home/home-section/Footer";
import Reset from './components/mailbox/reset';
import NewPassword from './components/mailbox/NewPassword';
import VerifySuccess from './components/mailbox/VerifySuccess';
import Fail from './components/mailbox/Fail';
import ResetSuccessfully from './components/mailbox/ResetSuccessfully';
import RegisterActivation from './components/mailbox/RegisterActivation';

// let testactive = (hash) => {

//     var hasharr = window.location.hash.substr(2).split("/");
//     if (hasharr[0] === hash) {
//         return "active";
//     }
//     return "";
// }

class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      curUser: '',
    }
    this.getUserInfo = this.getUserInfo.bind(this);
    this.logout = this.logout.bind(this);
  };

  componentWillMount() {
    this.getUserInfo();
  };
  getUserInfo() {
    let self = this;
    let token = window.localStorage.token || window.sessionStorage.token;
    if (token) {
      FetchAuth('/api/user/info', token).then((res) => {
        if (res) 
        {
          self.setState({ curUser: res.data });
          window.sessionStorage.setItem('nickName', res.data.nickName);
          window.sessionStorage.setItem('avatar', res.data.avatar);
          window.sessionStorage.setItem('id', res.data.id);
        }
      })
      if (!window.sessionStorage.token) {
        window.sessionStorage.setItem('token', token);
      }
    }
  }

  logout() {
    this.setState({ curUser: '' });
    window.localStorage.clear();
    window.sessionStorage.clear();
    window.location.href="/";
  };

  render() {
    return (
      <div className="App">
        <Header curUser={this.state.curUser} logout={this.logout} />
        <div style={{ marginTop: '60px',minHeight:"100vh",marginBottom: '50px' }}>
          <Route exact path="/" component={Home} />
          <Route path="/blogger" component={Blogger} />
          <Route path="/ipresource" component={ipResource} />
          <Route path="/post/:id" component={DetailPage} />
          <Route path="/iprdetail/:id" component={ipResourceDetailPage} />
          <Route path="/community/" component={Community} />
          <Route path="/communitys/:id" component={DetialListCom} />
          <Route path="/detialListCom/:id" component={DetialListCom} />
          <Route path="/market" component={Market} />
          <Route path="/publicTxt" component={PublicTxt} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/FindPsw" component={findPSW} />
          <Route path="/download" component={Download} />
          <Route path="/AboutUs" component={AboutUs} />
          <Route path="/MyCenter/:id" component={MyCenter} />
          <Route path="/MyCenterEditor/:id" component={MyCenterEditor} />
          <Route path="/updateCommunity/:id" component={updateCommunity} />
          <Route path="/Reset" component={Reset} />
          <Route path="/NewPassword" component={NewPassword} />
          <Route path="/VerifySuccess" component={VerifySuccess} />
          <Route path="/Fail" component={Fail} />
          <Route path="/ResetSuccessfully" component={ResetSuccessfully} />
          <Route path="/RegisterActivation" component={RegisterActivation} />
        </div>
        <Footer />
      </div>

    );
  }
}

export default App;