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
    width:'960px',
    height:'500px',
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
    textAlign: 'center',
}
const Send2 = {
    marginBottom:'50px',
    textAlign: 'center',
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



class Fail extends React.Component {
    render() {
        let Intercepting = window.location.href.split('=')[1];
        console.log(Intercepting);
        return (
            <div style = {Frivolous}>
                <div style = {father}>
                    <div style={Center1}>
                        <p style = {Send1}>电子邮箱验证失败</p>
                        <div style = {Send2}>
                            <img src={require('../../images/MailboxValidation/fail.png')} alt=""/>
                        </div>
                        <p style = {Send1}>您的电子邮箱<span style={address}>{Intercepting}</span>验证失败</p>
                    </div>
                </div>
            </div>
        );
    }
}

export default Fail;