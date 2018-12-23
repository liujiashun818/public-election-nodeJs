import React from 'react';
import Footer from '../../components/public/Footer'
import netService from '../../library/resouresAddress.js';
import { FetchStandard } from '../../service/service';
const tabs = {
      1: "区块链技术",

      2: "亿书产品",

      3: "市场活动",

      4: "版权相关",

      5: "社区交流"

}
class UpdateCommunity extends React.Component {
      constructor(props) {
            super(props);
            this.state = {
                  data: {}
            };
            this.get = this.get.bind(this);
            this.update = this.update.bind(this);
            this.verify = this.verify.bind(this);
      }

      verify() {
            if (this.refs.textContent.value === "") {
                  alert("内容不能为空");
                  return;
            }
            if (this.refs.title.value === "") {
                  alert("标题不能为空");
                  return;
            }
      }

      componentWillMount() {
            this.get();
      }

      get() {
            let param = {
                  id: this.props.match.params.id
            }
            FetchStandard(netService.getAllListCom.get_topic_ContentId, "GET", param).then((data) => {
                  this.setState({ data: data.data.info });
                  this.refs.textContent.value = this.state.data.content.replace(/<\/div><div>/g,"\n");
                  this.refs.title.value = this.state.data.title;
            })
      }

      update() {
            this.verify();
            let param = {
                  topicId: this.props.match.params.id,
                  content: this.refs.textContent.value.replace(/\n/g,"<br/>"),
                  title: this.refs.title.value,
                  tab: this.refs.selectRef.value
            }
            FetchStandard(netService.getAllListCom.edit_topicEdit, "POST", param)
                  .then((data) => {
                        if (data.success) {
                              alert("修改成功");
                              window.location.href = "/detialListCom/"+this.props.match.params.id;
                        } else {
                              alert("修改失败");
                              window.location.reload()
                        }
                  })
      }

      render() {
            return <div>
                  <div className='publicTxt'>
                        <form id="publicTxtForm" encType="multipart/form-data">
                              <h3 className='titleH'>编辑</h3>
                              <div className='FaultnewFormtop1'>
                                    <p className='FaultnewFormtopList'>
                                          <label htmlFor="user">选择板块<b>*</b>
                                          </label>
                                          <select ref="selectRef" id="publicBankuai" className="selectBg">
                                                <option selected value={this.state.data.tab}>{tabs[this.state.data.tab]}</option>
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
                                                ref="title"
                                                className='FaultnewFormtopListTitle'
                                                name="userID"
                                                id='publicTxTtitle' />
                                    </p>
                              </div>
                              <div className='FaultnewFormtop2'>
                                    <label htmlFor="user" className='newFormPlable'>内容<b>*</b>
                                    </label>
                                    <textarea
                                          ref="textContent"
                                          className='textareaFaultNew'
                                          id='textareaFaultNew'
                                    ></textarea>
                              </div>
                              <div className='publicSubmit'>
                                    <button
                                          onClick={this.update}
                                          type="button"
                                          id='artcleBtn'>
                                          <a style={{ color: 'white' }}>保存</a>
                                    </button>
                              </div>
                        </form>
                  </div>
                  <div style={{
                        height: "145px"
                  }} />
                  <Footer />
            </div>;
      }
}

export default UpdateCommunity;
