import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Footer from "../public/Footer";
import $ from 'jquery';
import tool from '../../library/tool'
import { FetchPost } from '../../service/service';
import { FetchGet } from '../../service/service';



const Frivolous ={
    width:'100%',
    height:'1000px',
    overflow: "hidden",
    backgroundColor:'#f8f8f8',
    marginBottom:'-50px'
}


const father = {
    width:'900px',
    height:'500px',
    margin:' 60px auto',
    backgroundColor:'#ffffff',
    paddingLeft:'200px',
    paddingTop:'66px'
}

const Center1 = {
    // width:'500px',
    height:'100%',
    margin:'0 auto',
    overflow:'hidden',
    display: 'inline-block',
    float: 'left',
}

const Send1 = {
    marginTop:'20px',
    fontSize:'18px',
}

const address = {
    color:'#0061b1'
}

const inquiry = {
    width:'500px',
    height:'150px',
    // lineHeight: "150px",
    // paddingLeft: "100px",
    // textAlign: "center",
}


const inquiry2 = {
    color:'#0061b1',
    cursor:"pointer",
}

const goMailbox = {
    width:'110px',
    height:'30px',
    backgroundColor:'#0061b1',
    display: "inline-block",
    margin: "30px 0",
    textDecoration:"none",
    textAlign:'center',
    lineHeight: "30px",
    color:'#ffffff'

}

const activation = {
    fontSize: '24px',
    color:'#0061b1'
}



class RegisterActivation extends React.Component {
    constructor(props) {
        super(props);
        this.mail = this.mail.bind(this);
        this.state = {
             email: null,
            
        }
    }

    goAginSend(){
        // console.log('this state:',this.state);
        var {email}=this.state;
         let data={email:email};
        FetchPost('/api/user/forgot/password/sendemail',data)
         .then(data => {
          if(data.success){
             alert("发送成功")
          }
        });
      };



      handleRegClick = (e) => {
        let persona2 = window.location.href;
        let email2 = persona2.split('=')[1];
        // let mail2 = personal2.split('@')[0]
        // console.log(personal2);
        var emailReg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
        // let { email, username, password, passwordAgain } = this.state;
        // let data = { email: email, password: 'password', nickName: 'username' };
        let { email } = this.state;
        let data = { email: email2 };// 重新发送还需要发参数吗？还是再给我一个不需要传参数的接口
        FetchGet('/api/user/active/email/send?email='+email2)
          .then(data => {
            // console.log(data)
            // console.log(data.message)
            if (data.message === "用户已经存在") {
              alert("邮箱已经注册过，请重新填写");
              return;
            }else{
                alert("发送成功")
            }
          })
      };





      ReRegistration(){
        window.location.href='/Register'
      };

      mail(){
        let persona2 = window.location.href;
        let mail2 = persona2.split('@')[1].split('.')[0];
        window.open('mail.'+mail2+'.com')
      }
    
    render() {
        let personal = window.location.href;
        let personal1 = personal.split('=')[1];
        let mail = personal.split('@')[1].split('.')[0];
        let persona2 = window.location.href;
        let mail2 = persona2.split('@')[1].split('.')[0];
        let m = 'http://mail.'+mail2+'.com';
        let self = this;
        // console.log(mail)
        if(!self.state.email){
            self.setState({email:personal1});
        }
        // alert(personal1);
        return (
            
            <div style = {Frivolous}>
                <div style = {father}>
                    <div style={{width:'90px',height:'100%',display:'inline-block',float: 'left'}}>
                        <img src={require('../../images/MailboxValidation/fs.png')} alt="" />
                    </div>
                    <div style={Center1}>
                        <p style={activation}>请激活帐号</p>
                        <p style = {Send1}>激活邮件已发到：<span style={address}>{personal1}</span>邮箱</p>
                        <p style={{fontSize:'18px'}}>请在24小时内登录邮箱完成激活。</p>
                        <a style = {goMailbox} href={m} target='_blank'>去激活</a>
                        <div style = {inquiry}>
                            <p>没收到验证邮件</p>
                            <p>1.尝试到广告邮件、垃圾邮件目录里找找看</p>
                            <span>2.邮箱未收到激活邮件，请再次发送激活邮件</span><span onClick={self.handleRegClick.bind(self)} style={inquiry2}>重新发送</span><br/>
                            <span style={{lineHeight:'36px'}}>3.如果重发激活邮件仍没收到，请更换邮箱</span><span onClick={self.ReRegistration.bind(self)} style={inquiry2}>重新注册</span>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterActivation;