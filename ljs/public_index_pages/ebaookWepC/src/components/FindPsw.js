import React  from 'react';
import {Link} from "react-router-dom";
import TextField from 'material-ui/TextField';
import "../css/login.css";
import { FetchPost } from '../service/service';
import $ from 'jquery';

class findPSW extends React.Component{
  constructor(){
    super();
    this.state={
       email:'true',
       password:"true",
       isChecked:"false",
       isGoInfo:"false",
       submitStlye:"rgb(204, 204, 204)"
    }
    this.goLogin=this.goLogin.bind(this);
    this.goLoginChecked=this.goLoginChecked.bind(this);
  };

  componentDidMount(){
    $('#tf_email').attr('spellcheck', false)
  }

  //邮箱
  emailhandleInputChange(event){
    event.preventDefault();
    var emailReg=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

    var self = this;
    const email = event.target.name;
    const value=event.target.name==="1"?event.target.checked:event.target.value;
    self.setState({[email]:value},function(){
    if(!emailReg.test(this.state.email)){
        this.refs.email.state.errorText="请输入正确的邮箱格式"
        this.setState({submitStlye:"rgb(204, 204, 204)"})
          return;
        }else{
          this.refs.email.state.errorText=""
          this.setState({submitStlye:"#249cff"})
        }
    })
    
  };
  //密碼
  passwordhandleInputChange(event){
    event.preventDefault();
    var self = this;
    const password = event.target.name;
    // console.log(password);
    // console.log(event.target.checked);
    const value=event.target.name==="1"?event.target.checked:event.target.value;
    // console.log(event.target)
    self.setState({[password]:value},function(){
      // console.log(self.state.password)
      if(/^[\s]{0,}$/.test(self.state.password)){
       self.refs.password.state.errorText="密码错误"
       return;
     }
    })
     
  };
  
  //下次是否自动登录
  goLoginChecked(){
  var self = this;
   this.setState({isChecked:!self.state.isChecked},function(){
   });
};

//去登录
  goLogin(){
    var {email}=this.state;
     let data={email:email};
    FetchPost('/api/user/forgot/password/sendemail',data)
     .then(data => {
      if(data.success){
          window.location.href="/Reset?email="+escape(email); 
      }else{
         if(data.code === 2){
           alert(data.message);
         }
      }
    })
  };
//编辑时状态
  openEdit() {
    //  console.log(this.state);
  };
  render(){
    return(
          <div className="login">
            <div className="login_con">
            <div className="login_top">
              <h3></h3>
              <h4>找回密码</h4>
            </div>
            <div className="login_main">
           <TextField
                      floatingLabelText="邮箱"
                      floatingLabelStyle={{color:"#1d7fcf"}}
                      rows={1}
                      errorText=""
                      fullWidth="true"
                      multiLine="false"
                      underlineStyle={{border:" 1px solid #e4eaec"}}
                      underlineFocusStyle={{border:"1px solid #249cff"}}
                      floatingLabelStyle={{color:" #e4eaec"}}
                      floatingLabelShrinkStyle={{color:"#249cff",fontSize:"20px"}}
                      name="email"
                      ref="email"
                      id="tf_email"
                      onClick={this.openEdit.bind(this)}
                      onChange={this.emailhandleInputChange.bind(this)}
                      checked={this.state.email} 
                    /><br />
                     <p className="submit" style={{marginTop:"40px"}}>
                       <input type="submit" onClick={this.goLogin.bind(this)} value="点击找回密码" style={{backgroundColor:this.state.submitStlye}}/>
                    </p>
                    <p className="forgetPass" style={{cursor:"pointer"}}><Link to="/login">返回登录</Link></p>
              
            </div>
          </div>
          </div>
        
      )
  }

};

export default findPSW;