import React from 'react';
import $ from 'jquery';
import netService from '../../library/resouresAddress.js';
import Footer from '../../components/public/Footer'
let testactive = (hash) => {
	var hasharr = window
		.location
		.hash
		.substr(2)
		.split("/");
	if (hasharr[0] === hash) {
		return "active";
	}
	return "";
}
class PublicTxt extends React.Component {
	constructor() {
		super()
		this.checkout = this.checkout.bind(this);
	}

	checkout() {
		if ($('#publicBankuai').val() === "请选择") {
			alert("请选择板块")
			return false;
		}
		if (!$('#publicTxTtitle').val()) {
			alert("标题不能为空");
			return false;
		}
		if (!$('#textareaFaultNew').val()) {
			alert("内容不能为空");
			return false;
		}
		return true;
	}

	sumbitTxt() {
		if (!this.checkout()) {
			return;
		}
		let text = $("#textareaFaultNew").val();
		if (text.length > 1000) {
			alert("内容长度不能超过1千字");
			return;
		}
		text = text.replace(/\n/g,"</div><div>");
		var sessionStorage = window.sessionStorage;
		let token = sessionStorage.token;
		$.ajax({
			type: 'POST',
			headers: {
				'Cache-Control': 'no-cache',
				"Authorization": token
			},
			//'http://192.168.27.166:7070/api/club/topic/add'  
			url: netService.getAllListCom.post_topicAdd,
			data: {
				tab: $('#publicBankuai').val(),
				title: $('#publicTxTtitle').val(),
				content:text
			},
			error: function () {
				console.log('未找到')
			},
			success: function (data) {
				setTimeout(window.location.reload(true), 10)
				if (data.success) {
					alert("发布成功");
					window.location.href = "/detialListCom/" + data.data;
				} else {
					alert("发布失败");
					window.history.go(-1);
				}
			}
		})
		//		}

	};
	render() {
		return (
			<div>
				<div className='publicTxt'>
					<form id="publicTxtForm" encType="multipart/form-data">
						<h3 className='titleH'>发帖</h3>
						<div className='FaultnewFormtop1'>
							<p className='FaultnewFormtopList'>
								<label htmlFor="user">选择板块<b>*</b>
								</label>
								<select id="publicBankuai" className="selectBg">
									<option >请选择</option>
									<option value="1">区块链技术</option>
									<option value="2">亿书产品</option>
									<option value="3">市场活动</option>
									<option value="4">版权相关</option>
									<option value="5">社区交流</option>
								</select>
							</p>
							<p className='FaultnewFormtopList'>
								<label htmlFor="user" className='newFormPlable'>标题<b>*</b>
								</label>
								<input
									type="text"
									className='FaultnewFormtopListTitle'
									name="userID"
									id='publicTxTtitle' />
							</p>
						</div>
						<div className='FaultnewFormtop2'>
							<label htmlFor="user" className='newFormPlable'>内容<b>*</b>
							</label>
							<textarea
								className='textareaFaultNew'
								id='textareaFaultNew'
								placeholder="限制字数一千字"
								wrap="hard"
								>
							</textarea>
						</div>
						<div className='publicSubmit'>
							<button
								type="button"
								style={{ color: "white" }}
								onClick={this
									.sumbitTxt
									.bind(this)}
								className={testactive("community")}
								id='artcleBtn'>
								发布
							</button>
						</div>
					</form>
				</div>
				<div style={{
					height: "145px"
				}} />
				{/* <Footer /> */}
			</div>
		);
	}
}
export default PublicTxt;