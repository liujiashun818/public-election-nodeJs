"use strict";

import React from 'react';


module.exports.ReportBox = React.createClass({
	getInitialState(){
		return{
			reportcontent : true,
			reportCon:"在此输入您要举报的内容",
			isBlur:true ,
		};
	},
	handleInputChange(event){
		var self = this;
		const value=event.target.type==="textarea"?event.target.checked:event.target.value;
		const name = event.target.name;
		self.setState({
			[name]:value
		});
		
		self.setState({reportCon:event.target.value});
		
		
		console.log(event.target);
		console.log(event.target.value);
		console.log(event.target.name);
		console.log(event.target.checked);
	},
	//点击确认发送举报
	handleInputConfirm(){
		var self = this;
		if( /^[\s]{0,}$/.test(self.state.reportCon)){
			alert("请输入您要举报的内容");
			return;
		};
		if(this.state.isBlur){
			alert("请输入您要举报的内容");
		};
		if(!self.state.isBlur){
		this.props.getReportContent(self.state.reportCon);
		this.props.reportContent()
	};
	},
	
	emptyInfo:function(){
		console.log(this.state);
		console.log("wo执行了，获得焦点");
		if(this.state.isBlur){
			this.setState({reportCon:""});
			this.setState({isBlur:false});
		};
	},
	//点击取消举报
	handleAbolish(){
		this.props.setChildRen({showReport:false});
	},
	render(){
		var textAreaStyle = {
              width:"300px",
              height:"300px",
              resize:"none", 
              border:"none",
              outline:"none",
              backgroundColor: "#e3f2fd",
              color:"#666"
       };
		return(
			<div style={{width:"300px",height:"400px",textAlign:"left",boder:"1px solid #2196f3"}}>
				<h3  style={{width:"100%",height:"30px",backgroundColor:"#2196f3",color:"snow", lineHeight:"30px",textIndent:"10px"}}>举报</h3>
				<div style={{width:"100%",height:"auto",paddingBottom:"20px",backgroundColor:"#e3f2fd"}}>
				   <form>
				   		<label>
					   		 <textarea style={textAreaStyle} name="reportcontent" value={this.state.reportCon } onFocus={this.emptyInfo} checked={this.state.reportcontent} onChange={this.handleInputChange}>
						
							</textarea>
				   		</label>
				   </form>
					<p style={{textAlign:"right",marginBottom:"10px"}}><span onClick={this.handleAbolish} style={{cursor:"pointer"}}>取消</span ><span style={{marginLeft:"10px", cursor:"pointer"}} onClick={this.handleInputConfirm} >确认</span></p>
				</div>
				
			</div>
		)
	},
});
