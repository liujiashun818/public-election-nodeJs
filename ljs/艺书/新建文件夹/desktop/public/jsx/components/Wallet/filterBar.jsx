"use strict";
import React from 'react';
import TextField from 'material-ui/TextField';

var ebookchain = nodeRequire('js-sdk');

module.exports.FilterBar = React.createClass({
		getInitialState(){
			return{
				searchWords: '',
			};
		},
		componentWillReceiveProps(a,b){
			console.log("我是子组件我收到了父组件的改变");
	          if(!this.props.isBlocks){
				this.refs.myTextInput.input.value = "";
			    this.setState({searchWords:this.refs.myTextInput.input.value});
			   }else{
			    this.setState({searchWords:this.refs.myTextInput.input.value});
			   }
			 console.log(this.refs.myTextInput.input.value,"");
			 console.log(this.props.isBlocks);
		},
		handleSearchChange: function(e){
			this.setState({	searchWords: this.refs.myTextInput.input.value });
		},
	    handleSearchClick: function(){
			if(this.state.searchWords==''){
				alert("请输入您的区块Id");
				return;
			};
			if(this.state.searchWords){
			     if(isNaN(this.state.searchWords)){
					 alert("请您输入数字");
					 return;
				 }
			     this.props.getFilterInfo(this.state.searchWords);
			};
		},
		render: function () {
		    return (
				<div style={{height:"60px",margin:"15px auto",padding:"5px",textAlign:"center",position:'absolute', top:"50px",left:"50%" ,marginLeft:"-300px"}}>
				<div style={{display:"inline-block"}}>
					<TextField
				      hintText="请输入您的区块ID 以查询您的个人区块信息"
					  onChange={this.handleSearchChange.bind(this)}
				      underlineShow = {false}
				      inputStyle={{border:"1px solid #2196F3",height:"40px",lineHeight:"40px",textIndent:"10px",verticalAlign:"baseline"}}
				      hintStyle={{height:"40px",lineHeight:"40px",textIndent:"10px",bottom:0}}
				      style={{height:"40px",width:"500px"}}
					  ref="myTextInput"      
				    />
				</div>
				<div  onClick={this.handleSearchClick} style={{display:"inline-block",backgroundColor:"#2196F3",color:"#fff", height:"40px",lineHeight:"40px",width:"100px",textAlign:"center",cursor:"pointer"}}>
					<i className="material-icons">search</i><span style={{marginLeft:"10px"}}>搜索</span>
				</div>
			</div>
		    );
		}
	});