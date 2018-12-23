import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Footer from "../public/Footer";
import $ from 'jquery';
import "../../css/register.css";
import tool from '../../library/tool'
import { FetchPost,FetchGet } from '../../service/service';



const Frivolous ={
    width:'100%',
    height:'1000px',
    overflow: "hidden",
    backgroundColor:'#f8f8f8',
    marginBottom:'-50px'
}


const father = {
    width:'960px',
    // height:'400px',
    margin:' 60px auto',
    backgroundColor:'#ffffff',
}

const Center1 = {
    width:'500px',
    // height:'400px',
    margin:'0 auto',
    overflow:'hidden',
    marginBottom:"50px",
}

const Send1 = {
    marginTop:'20px',
    marginBottom:'0px',
}

const address = {
    color:'#0061b1'
}

const inquiry = {
    width:'500px',
    height:'150px',
    lineHeight: "150px",
    paddingLeft: "100px",
    textAlign: "center",
}



const inquiry2 = {
    marginLeft:'50px',
    color:'#ff6600',
    cursor:"pointer",
}

const goMailbox = {
    width:'110px',
    height:'30px',
    backgroundColor:'#ff6600',
    display: "inline-block",
    marginLeft: "144px",
    textDecoration:"none",
    textAlign:'center',
    lineHeight: "30px",
    color:'#ffffff'

}


class NewPassword extends React.Component {
 

    constructor() {
        super();
        // this.mail = this.mail.bind(this);
        this.state = {
          email: "ture",
          password: "true",
          passwordAgain: "true",
          isChecked: false,
          finished: false,
        }
        this.handleRegClick = this.handleRegClick.bind(this);
      };

      componentWillMount(){
        this.goAginSend();
      }

    goAginSend(){
      
      let persona2 = window.location.href;
      let personal2 = persona2.split('?')[1];
      let id2 = persona2.split('=')[2].split('&')[0];
      let token1 = persona2.split('=')[1].split('&')[0];
      let emai2 = persona2.split('=')[3];
      console.log(emai2);
         FetchGet(`/api/user/checkLinkTime?id=${id2}&token=${token1}`)
         .then(data => {
          if(!data.success){
             alert("链接已失效，请重新发送邮箱验证");
             window.location.href=`/login`;
          }
        });
      };

      
      mail(){
        let persona2 = window.location.href;
        let mail2 = persona2.split('@')[1].split('.')[0];
        window.open('mail.'+mail2+'.com')
      }

    emailhandleInputChange = (event) => {
        // console.log({userInput: event.target.value});
      
        event.preventDefault();
        var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        var self = this;
        const value = event.target.value;
        if (!value.trim()) {
            $('#Prompt').html("请输入邮箱").css({color:'red'});
          this.refs.email.checked = false;
          this.checkedForm();
          return;
        }
        if (!emailReg.test(value)) {
          $('#Prompt').html("邮箱格式不正确").css({color:'red'});
          this.refs.email.checked = false;
          this.checkedForm();
          return;
        }
        $('#Prompt').html("")
        this.refs.email.checked = true;
        this.checkedForm();
        self.setState({ email: value });
      };
      //密碼
      
          
      passwordhandleInputChange = (event) => {
        event.preventDefault();
        var self = this;
        var value = event.target.value;
        if (!value.trim()) {
            $('#Prompt1').html("请输入密码").css({color:'red'});
          this.refs.password.checked1 = false;
          this.checkedForm();
          return;
        }
        if (value.length < 6) {
            $('#Prompt1').html("密码太短,至少6个字符").css({color:'red'});
          this.refs.password.checked1 = false;
          this.checkedForm();
          return;
        }
        $('#Prompt1').html("");
        if (/^[\s]{0,}$/.test(value)) {
            $('#Prompt1').html("密码不符合规则").css({color:'red'});
          this.refs.password.checked1 = false;
          this.checkedForm();
          return;
        }
        $('#Prompt1').html("");
        this.refs.password.checked1 = true;
        this.checkedForm();
        self.setState({ password: value })
      };
    
      //驗證兩次密碼是否一致
      password2handleInputChange = (event) => {
        event.preventDefault();
        var self = this;
        const value = event.target.value;
        var password = this.refs.password.value;
        var confirmation = this.refs.password.value;
        var passwordAgain = this.refs.passwordAgain.value;
        if (passwordAgain !== password) {
            $('#Prompt2').html("密码不一致").css({color:'red'});
          this.refs.passwordAgain.checked2 = false;
          this.checkedForm();
          return;
        }
        $('#Prompt2').html('');
        this.refs.passwordAgain.checked2 = true;
        this.checkedForm();
        self.setState({ passwordAgain: value });
      };



      //点击发送ajax,注册
      handleRegClick = (e) => {
        
        let personal = window.location.href;
        let personal1 = personal.split('?')[1];
        let id1 = personal.split('=')[2]
        let token = personal.split('=')[1].split('&')[0];
        let Intercepting = personal.split('=')[3];
        // console.log(token)
        // console.log("personal1");
        // console.log(email);
        var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        let {  password, passwordAgain,confirmation} = this.state;
        let data = { password: password, confirmation:password};
    
        if ((!password.length > 5) || (!(password === passwordAgain))) {
          return;
        }
        FetchPost(`/api/user/forgot/password/email?id=${id1}&token=${token}`, data)
        .then(data => {

          if(data.success){
            // alert("重置密码成功");
            window.location.href='/ResetSuccessfully/='+Intercepting;
          }else{
            alert("重置密码失败");
          }
        })
      };

      checkedForm = () => {
        if ( this.refs.password.checked1 && this.refs.passwordAgain.checked2) {
          this.setState({ finished: true });
        } else {
          this.setState({ finished: false });
        }
      }
    
    render() {
        let self = this;
        let persona3 = window.location.href;
        let emai3 = persona3.split('=')[3];
        return (
            
            <div style = {Frivolous}>
                <div style = {father}>
                        <p style={{fontWeight:'700' ,color:'#333333',fontSize:'22px',textAlign:'center',height:'130px',lineHeight:'130px',borderBottom:'2px solid #ededed'}}>设置新密码</p>
                    <div style={Center1}>
                        <p style = {Send1}>请设置<span style={address}>{emai3}</span>的新密码，建议使用数字、字母、字符的组合密码，提高密码安全等级</p>
                            <div style={{ marginBottom: "50px"}}>
                                <form  name="myfrom" id="myform" method="get" action="b.php">
                                    {/* <input 
                                    ref="emailRef"
                                    type="text" 
                                    name="pwd" 
                                    placeholder="邮箱" 
                                    style={{width:'460px',height:'44px',marginTop:'20px'}}

                                    checked = 'false'
                                    value={this.state.userInput}
                                    ref="email"
                                    onChange={this.emailhandleInputChange.bind(this)}
                                     />
                                     <div id='Prompt'></div> */}



                                    <input 
                                    name="password" 
                                    placeholder="新密码" 
                                    style={{width:'460px',height:'44px',marginTop:'20px'}}

                                    checked1 = 'false'
                                    type="password"
                                    ref="password"
                                    onChange={this.passwordhandleInputChange.bind(this)}
                                    />
                                    <div id='Prompt1'></div>




                                    <input 
                                    name="passwordAgain" 
                                    placeholder="确认密码" 
                                    style={{width:'460px',height:'44px',marginTop:'20px'}}

                                    checked2 = 'false'
                                    ref="passwordAgain"
                                    type="password"
                                    onChange={this.password2handleInputChange.bind(this)}
                                    />
                                    <div id='Prompt2'></div>


                                </form>
                                {this.state.finished ?
                                    <p className="submit">
                                    <input type="submit" value="确     定" onClick={this.handleRegClick} style={{width:'460px',height:'44px',marginTop:'30px',fontSize:'18px',backgroundColor:'#0061b1',borderRadius:'5px'}}/>
                                    </p>
                                    : <p className="submit" style={{ position: "relative" }}>
                                    <input type="submit" value="确     定" style={{width:'460px',height:'44px',marginTop:'30px',border:"none",outline:'none',cursor:'pointer',fontSize:'18px',borderRadius:'5px'}}/>
                                    </p>
                                }
                            </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewPassword;