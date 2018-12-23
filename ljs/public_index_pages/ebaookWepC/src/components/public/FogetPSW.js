import React  from 'react';
import {Link} from "react-router-dom";
import TextField from 'material-ui/TextField';
import "../css/login.css";
import Rfname from "./../library/untils.js";
import { FetchPost } from '../service/service'

class forgetPSW extends React.Component{
	constructor(){
		super();
		this.state={
			 email:'true',
			 password:"true",
			 isChecked:"false"
		}
		this.goLogin=this.goLogin.bind(this);
		this.goLoginChecked=this.goLoginChecked.bind(this);
	};
	//邮箱
	emailhandleInputChange(event){
    event.preventDefault();
    var emailReg=/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;

    var self = this;
    const email = event.target.name;
    const value=event.target.name=="1"?event.target.checked:event.target.value;
    // console.log(event.target)
    self.setState({[email]:value},function(){
    //   console.log(self.state.email)

    if(emailReg.test(this.state.email)){
     this.refs.email.state.errorText="正确的邮箱形式"
       return;
    }else{
        this.refs.email.state.errorText="This field is require"
     }
    })
    
  };
	openEdit() {
 		//  console.log(this.state);
	}
	render(){
		let focusStyle={
			color:"black",
			border:"1px solid #eeeeee",
			backgroundColor:"#fff"
		};
		return(
				<section >
					<div className="login">
						<div className="login_con">
						<div className="login_top">
							<h3></h3>
							<h4>找回密码</h4>
						</div>
						<div className="login_main">
					 <TextField
                     floatingLabelText="email"
                      floatingLabelStyle={{color:"#1d7fcf"}}
                      rows={1}
                      errorText=""
                      fullWidth="true"
                      multiLine="false"
                      errorText=""
                      underlineStyle={{border:" 1px solid #e4eaec"}}
                      underlineFocusStyle={{border:"1px solid #249cff"}}
                      floatingLabelStyle={{color:" #e4eaec"}}
                      floatingLabelShrinkStyle={{color:"#249cff",fontSize:"20px"}}
                      name="email"
                      ref="email"
                      onClick={this.openEdit.bind(this)}
                      onChange={this.emailhandleInputChange.bind(this)}
                      checked={this.state.email} 
                    /><br />
			       
			              
			              <p className="submit">
								<input type="submit" value="登录" onClick={this.goLogin}/>
						   </p>
						
						</div>
					</div>
					</div>
			</section>			
			)
	}

};

export default forgetPSW;