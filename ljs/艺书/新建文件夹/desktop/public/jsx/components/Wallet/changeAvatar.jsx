"use strict";
import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import TextField from 'material-ui/TextField';

import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
//import TextTips from './TextTips.jsx';
// const jsdk = nodeRequire('js-sdk');
// const ipc = nodeRequire('electron').ipcRenderer;
var xdesktop = nodeRequire('xdesktop-render');
var Logic = xdesktop.logic;
module.exports.ChangAvatar = React.createClass({
    getInitialState: function(){
     return {
        openChangImg: false,
        userInfo:{},
        imgFileBase64:'',
        avaimg:''
     }
    },
    componentDidMount(){
//  	let adds = global.currentUser.wallets[0].address ;
//  	this.setState({curAddrees: adds});
    },
	handleRequestClose: function() {
		this.setState({
	        openChangImg: false,
		});
	},
		changeAvatar:function(){
		 this.setState({
		        openChangImg: true,
		      });
	       },
	FileUpload_onclick:function (){
            var file = $("#imgid")[0].files[0];
            var reader = new FileReader();
		    var imgFile;
		    this.setState({openChangImg: true,});
		    let self = this;
		    reader.onload=function(e){
		        imgFile = e.target.result;
		        console.log('imgFile');
		        console.log(imgFile);
			     self.setState({imgFileBase64:imgFile});
		        $("#imgContent").attr('src', imgFile);
		    };
		    reader.readAsDataURL(file);
       },
       //确定
	sureSubmit:function(){
		let imgFileBase64 = this.state.imgFileBase64;
		console.log("imgFileBase64")
		console.log(imgFileBase64)
		let self = this;
		let userId = global.currentUser.userId;
		if(imgFileBase64 ==''||undefined||null){
			alert('没有选择图片');
			return ;
		}
		this.setState({openChangImg:false});
			$.ajax({
	      headers: {
	        Authorization: global.currentUser.Authorization    //必须
	      },
	      url: "http://47.93.235.234:8080/api/user/avatar",
	      type: 'POST',
	      data: {
	        file:imgFileBase64,
	        userId:userId
	      },
	      success: function(res) {
          console.log("res");
          console.log(res.data.url);
			 self.setState({avaimg:res.data.url});
			   self.getUserInfo()
	      },
	      error: function(err) {
		 self.setState({imgFileBase64:''});
	        console.error(err);
	      },
		});
    this.setState({imgFileBase64:''});
	},
	getUserInfo(){
		let self = this;
		let userId = global.currentUser.userId;
		$.ajax({
		      headers: {
		        Authorization: global.currentUser.Authorization    //必须
		      },
		      url: xdesktop.tools.resolve('/api/ousers/'+ userId),
		      type: 'GET',
		      success: function(res){
				    $("#accountImgid").attr('src',res.avatar); 
		      },
		      error: function(err) {
		        console.error(err);
		      },
		});
	},
	render: function () {
    let {avaimg} = this.state;

		  const styles = {
			  button: {
			    margin: 12,
			  },
			  button2:{
			  	backgroundColor:'gray',
			    color:'black',
			  },
			  exampleImageInput: {
			    cursor: 'pointer',
			    position: 'absolute',
			    top: 0,
			    bottom: 0,
			    right: 0,
			    left: 0,
			    width: '100%',
			    opacity: 0,
			  },
			  topTitles:{
			  	width:'100%',
			  	height:50,
			  },
			  buttonCancel:{
			  	marginRight:14,
			  },
			  buttonclikUginle:{
			  	width:'300',
			  	height:'40',
			  	fontSize:'12',
			  	color:'rgb(0, 188, 212)',
			  	cursor:'auto',
			  	textTransform:'lowercase',
			  	position:'absolute',
			  	left:0,
			  },
			};
		const iconTitle =(
		        <div>
	               		<div style={styles.topTitles}>
						    <RaisedButton
						      label="选择本地图像"
						      labelPosition="before"
						      style={styles.button}
						      containerElement="label"
						    >
						      <input type="file" id='imgid' name="pic" onChange={this.FileUpload_onclick} accept="image/*" style={styles.exampleImageInput} />
						    </RaisedButton>
						  { /*  <RaisedButton
						      label=" "
						      secondary={false}
						      style={styles.button2}
						      style={styles.button}
						    />*/}
	                    </div>

	                <i className="material-icons" style={{position:"absolute",top:"30px",right:"30px",cursor:"pointer"}} onClick={this.handleRequestClose}>clear</i>
	            </div>
			);
	    const actions = [
	     <FlatButton
	        labelStyle={styles.buttonclikUginle}
	        disableTouchRipple={true}
	        disabled={true}
	        hoverColor='white'
	        children={<div>提示:图片要小于50kb;推荐压缩图片地址: <input type="text" style={{border:'0',outline:'none'}} value="https://tinypng.com/" /></div>}
	      />,
	      <FlatButton
	        label="取消"
	        primary={true}
	        style={styles.buttonCancel}
	        onTouchTap={this.handleRequestClose}
	      />,
	      <RaisedButton
	        label="确定"
	        primary={true}
	        onTouchTap={this.sureSubmit}
	      />,
	    ];
	    return (
			<div>
			        <div style={{margin:"30px auto",width:"80px",height:"80px",borderRadius:"40px",overflow:"hidden"}}>
		                <img id='accountImgid' src={this.props.avaimg} onClick={this.changeAvatar} alt="Account" width="80px" height="80px"/>
		            </div>
              <Dialog
	            open={this.state.openChangImg}
	            contentClassName='accountModal'
	            title={iconTitle}
	            titleClassName='TransferTitleChange'
	            textAlign="left"
	            actions={actions}
	            textTransform='lowercase'
	            onRequestClose={this.handleRequestClose}
	            autoScrollBodyContent={true}
	            bodyStyle={{padding:"0 50px 24px",borderBottom:"1px solid #ccc"}}>
	            	<div style={{marginTop:"20px",lineHeight:"30px", width:"100%",height:'100%'}}>
	            		<div style={{margin:"10px auto",textAlign:"center",color:"#f1991b",border:'2px solid powderblue',width:'50%',height:'100%'}}>
		                   <img id='imgContent' src={this.props.userInfo.avatar} alt="Account" width="100%" height="100%"/>
						</div>
					</div>
	            </Dialog>
            </div>
	    );
	}
});
