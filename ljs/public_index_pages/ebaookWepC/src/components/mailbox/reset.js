import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Footer from "../public/Footer";
import $ from 'jquery';
import tool from '../../library/tool'
import { FetchPost } from '../../service/service';



const Frivolous ={
    width:'100%',
    height:'1000px',
    overflow: "hidden",
    backgroundColor:'#f8f8f8',
    marginBottom:'-50px'
}


const father = {
    width:'800px',
    height:'400px',
    margin:' 60px auto',
    backgroundColor:'#ffffff',
}

const Center1 = {
    width:'500px',
    height:'400px',
    margin:'0 auto',
    overflow:'hidden'
}

const Send1 = {
    marginTop:'100px',
    marginBottom:'50px',
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

const inquiry1 = {
    marginLeft:'-200px',
}

const inquiry2 = {
    marginLeft:'50px',
    color:'#0061b1',
    cursor:"pointer",
}

const goMailbox = {
    width:'110px',
    height:'30px',
    backgroundColor:'#0061b1',
    display: "inline-block",
    marginLeft: "144px",
    textDecoration:"none",
    textAlign:'center',
    lineHeight: "30px",
    color:'#ffffff'

}



class Reset extends React.Component {
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
                    <div style={Center1}>
                        <p style = {Send1}>密码重置邮件已发至你的邮箱：<span style={address}>{personal1}</span></p>
                        <p>请在24小时内登录你的邮箱接收邮件，链接激活后可重置密码</p>
                        <div style = {inquiry}>
                            <span style={inquiry1}>没收到？</span>
                                <span onClick={self.goAginSend.bind(self)} style={inquiry2}>重新发送</span>
                        </div>
                        <a style = {goMailbox} href={m} target='_blank'>登录邮箱</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default Reset;