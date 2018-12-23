import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Footer from "../public/Footer";
import $ from 'jquery';
import tool from '../../library/tool'
import DownloadSon from "./DownloadSon.js";
import DownloadSon1 from "./DownloadSon1.js";
import net from '../../library/interfaceAddress';

// import DownloadSon1 from "./DownloadSon1.js";

const dowloadContainer = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: "1"
}
const dowloadCenter = {
    display: "flex",
    flexDirection: "column",
    flex: "1"
}

const top = {
    display: "flex",
    flex: "1",
    backgroundColor: "#d5d5d5"
};
const below = {
    display: "flex",
    flex: "1",
    backgroundColor: "#d5d5d5"
}

const center = {
    display: "flex",
    flex: "1",
    backgroundColor: "white"
}


const dowloadFunction = {
    display: "flex",
    justifyContent: "center"
}

const address = {
    liunx: "http://osnw29ts5.bkt.clouddn.com/Ebooker_linux_Beta_v0.1.1.zip?download/Ebooker_linux_Beta_v0.1.1.zip",
    mac: "http://osnw29ts5.bkt.clouddn.com/Ebooker_mac_x64_Beta_v0.1.1.zip?download/Ebooker_mac_x64_Beta_v0.1.1.zip",
    win64: "http://otkngwosa.bkt.clouddn.com/client/Ebooker_win_x64_v1.0.2.exe",
    win32: "{http://otkngwosa.bkt.clouddn.com/client/Ebooker_win_x32_v1.0.2.exe}"
}

const button = {
    // margin: 12,
};

const footerStyle = {
    bottom: 0
}





const Center1 = {
    // marginLeft:"202px"
    margin: '0 auto',
}
const platform1 = {
    width: "960px",
    // height:"368px"
    marginBottom: '40px'
}

const Choice = {
    width: "160px",
    height: "34px",
    fontFamily: "Regular",
    fontSize: "18px",
    color: "#333333",
    paddingTop: '20px'
}

const selectionChart = {
    height: "228px",
    borderBottom: '2px solid #C7CBCF'
}

const selectGraph = {
    width: "272px",
    height: "216px",
    float: "left",
    paddingLeft: "78px"
}

const selectGraph1 = {
    width: "326px",
    height: "216",
    float: "left"
}

const selectGraph2 = {
    width: "362px",
    height: "216",
    float: "left"
}

const WindowDiagram = {
    marginTop: "52px",
    marginLeft: '32px'
}

const WindowWord = {
    fontSize: "20px",
    fontFamily: "Regular",
    color: '#044983',
    lineHeight: "68px",
    marginLeft: '20px'
}

const macGraph = {
    marginTop: '42px',
    marginLeft: "200px"
}

const mac = {
    fontSize: "20px",
    fontFamily: "Regular",
    color: '#c8cbd0',
    lineHeight: "80px",
    marginLeft: '219px'

}

const linuxGraph = {
    marginTop: '42px',
    marginLeft: "210px"
}

const linux = {
    fontSize: "20px",
    fontFamily: "Regular",
    color: '#c8cbd0',
    lineHeight: "70px",
    marginLeft: '220px',
    marginTop: '5px',
}



const Explain = {
    position: 'relative',
    marginTop: '12px',
    width: '798px',
}

const Name = {
    // fontFamily:'"Microsoft YaHei" ! important',
    position: 'relative',
    width: '108%',
    fontFamily: 'Aria',
    fontSize: '18px',
    color: '#044a84',
    marginLeft: '18px',
    // fontWeight:'bold'
}

const Edition = {
    display: 'inline-block',
    width: '50px',
    height: '24px',
    lineHeight: '24px',
    fontFamily: 'Regular',
    fontSize: '12px',
    marginLeft: '18px',
    marginTop: '9px',
    color: "#999"
}

const Edition2 = {
    display: 'inline-block',
    // width:'66px',
    height: '24px',
    lineHeight: '24px',
    fontFamily: 'Regular',
    fontSize: '12px',
    marginTop: '9px',
    paddingRight: '20px',
    color: "#999"
}

const Edition1 = {
    display: 'inline-block',
    width: '62px',
    height: '24px',
    lineHeight: '24px',
    fontFamily: 'Regular',
    fontSize: '12px',
    marginTop: '9px',
    color: "#999"
}

const Edition3 = {
    display: 'inline-block',
    width: '36px',
    height: '24px',
    lineHeight: '24px',
    fontFamily: 'Regular',
    fontSize: '12px',
    marginTop: '9px',
    color: '#999'
}

const Regulations = {
    display: 'inline-block',
    width: '592px',
    // height:'246px',
    marginTop: '20px',
    marginLeft: '18px'
}

const Regulations1 = {
    display: 'inline-block',
    width: '100%',
    height: '90px',
    paddingTop: '40px',
    textAlign: 'center',
}

const Title = {
    fontSize: '16px',
    fontFamily: 'Regular',
    color: '#333333'
}

const Title1 = {
    fontSize: '18px',
    fontFamily: 'Regular',
    color: '#044a84'
}

const Detailed = {
    fontSize: '14px',
    fontFamily: 'Regular',
    color: '#666',
    lineHeight: '30px'
}

const Detailed1 = {
    width: '100%',
    fontSize: '16px',
    fontFamily: 'Regular',
    color: '#333',
    lineHeight: '2em',
    margin: '0 auto',
    paddingBottom: '20px'
}

const Characteristic = {
    fontFamily: 'Regular',
    fontSize: '14px',
    lineHeight: '20px',
    color: "#666"
}

const alignment = {
    paddingLeft: '20px',
    verticalAlign: 'bottom'
}

const DownloadNow = {
    position: "absolute",
    right: '0',
    top: '34px',
    width: '210px',
    height: '70px',
    backgroundColor: '#034983',
    marginLeft: '30px',
    textDecoration: 'none'
}

const DownloadNow2 = {
    position: "absolute",
    right: '0',
    top: '122px',
    width: '210px',
    height: '70px',
    backgroundColor: '#034983',
    marginLeft: '30px',
    textDecoration: 'none'
}

const DownloadConnection = {
    display: 'inline-block',
    fontSize: '20px',
    fontFamily: 'Regular',
    marginLeft: '0',
    paddingTop: '20px',
    color: '#FFF',
}

const DownloadConnection1 = {
    display: 'inline-block',
    fontFamily: 'Regular',
    marginLeft: '0',
    color: '#FFF',
    fontSize:'26px',
    paddingTop:'14px'
}

const VersionMap = {
    width: '320px',
    height: '156px',
    // backgroundColor:'#555',
    float: 'left',
}

const SelectedCircle = {
    height: '2px',
    // width:'500px',
    backgroundColor: "#E6E6E6",
    marginTop: '20px',
    position: 'relative',
}

const VersionDiagramParent = {
    height: '170px',
}

const SelectedCircle1 = {
    position: 'absolute',
    top: '-22px',
    left: '112px'
}

const chart = {
    marginLeft: '150px',
    marginTop: '30px',
    cursor: "pointer"
}

const chart1 = {
    marginLeft: '120px',
    marginTop: '30px',
    cursor: "pointer"
}

const chart3 = {
    marginLeft: '94px',
    marginTop: '30px',
    cursor: "pointer"
}

const Characteristic3 = {
    fontSize: '12px',
    color: '#666'
}

const Characteristic4 = {
    fontSize: '16px',

}

const chart4 = {
    position: 'absolute',
    // top:'12px',
    left: '-62px',
}

const chart5 = {
    position: 'absolute',
    top: '-52px',
    left: '-62px',
}

const Small = {
    width: '6px',
    height: '6px',
    borderRadius: '6',
    backgroundColor: '#044a84',
    display: 'inline-block',
    marginRight: '15px',
}

const LogLine = {
    width: '880px',
    height: '2px',
    backgroundColor: '#e6e6e6',
    marginTop: '10px',
}

const UpdateDate = {
    color: '#ccc',
    position: 'absolute',
    top: '0px',
    right: '20px',
}

const versionPlatform = {
    windows:'win',
    mac:'mac',
    linux:'linux'
}
class Download extends React.Component {

    constructor(props) {
        super();
        this.state = {
            versionData:null,
            platform:versionPlatform.windows,
            logData:null,
        }
        this.handleRequstData = this.handleRequstData.bind(this);
    };
    componentDidMount() {
        this.handleRequstData('win');
    }
    //'`http://192.168.26.0:7070/api/desktop/getVersion?type=`'
    handleRequstData(ae){
        let self = this;
        fetch(net.getAllList.CLIENT_VERSION_LOG+`?type=`+ae).then(function (response) {
            return response.json();
        }).then(function (data) {
            self.setState({
                versionData: data.data[0],
                logData: data.data[1],
                platform:ae,
            });
        });
    }

    render() {
        let self = this;
        if(!this.state.versionData){
            return(<div></div>);
        }
        let versionData = this.state.versionData;
        let platform =  this.state.platform;
        let logData = this.state.logData;
        let winIcon = require('../../images/download/windows2.png');
        let macIcon = require('../../images/download/mac1.png');
        let linuxIcon = require('../../images/download/linux1.png');
        SelectedCircle1.left = '112px';        
        let platformTitle= 'Windows';
        if(platform == versionPlatform.mac){
            winIcon = require('../../images/download/windows1.png');
            macIcon = require('../../images/download/mac2.png');
            linuxIcon  = require('../../images/download/linux1.png');
            SelectedCircle1.left = '456px';
            platformTitle= 'Mac';
        } else if (platform == versionPlatform.linux){
            winIcon = require('../../images/download/windows1.png');
            macIcon = require('../../images/download/mac1.png');
            linuxIcon  = require('../../images/download/linux2.png');
            SelectedCircle1.left = '808px';
            platformTitle= 'Linux';
        }
        let newTime = new Date(versionData.time);
        let updateTime = newTime.getFullYear()+'.'+(newTime.getMonth()+1)+'.'+newTime.getDate();
        let logHtml = logData.map((item) => {
            let lognewTime = new Date(item.time);
            let logupdateTime = lognewTime.getFullYear()+'.'+(lognewTime.getMonth()+1)+'.'+lognewTime.getDate();
            let logs = [];
            if(item.dynamic){
                logs = item.dynamic.split('\n');
            }
            return (
                <div>
                <div id='details'>
                    <span style = {Name}>{item.title} </span>
                    <span style={UpdateDate}>{ logupdateTime} &nbsp;更新</span>
                </div>
                <div style={LogLine}></div>
                <div style={Regulations}></div>
                <div id='RegulationsLog1'>
                <DownloadSon1  tada={logs}></DownloadSon1>
                </div>
               </div>
            );
        });
        return (
            <div style={{}}>
                <div style={{ ...Center1, ...platform1 }}>
                    <div style={Regulations1}>
                        <p style={Title1}>亿书&nbsp;基于区块链的版权保护创作工具</p>
                    </div>
                    <p style={Detailed1}>亿书作为创新工具，立足于数字出版源头， 采用先进的区块链技术，为作者解决了版权注册难，保护难的问题；同时实现了版权的分割交易；为广大作者提供了一体化的解决方案和服务。
                    </p>
                    <a target="_blank" rel="noopener noreferrer" href="/ebook_client_help_document.pdf">帮助文档</a>
                    {/*图片开始*/}
                    <div style={VersionDiagramParent}>
                        <div style={VersionMap}>
                            <img id="selectGraph" style={chart3} src={winIcon} onClick={this.handleRequstData.bind(this,'win')}/>
                        </div>
                        <div style={VersionMap}>
                            <img id="mac" style={chart1} src={macIcon} onClick={this.handleRequstData.bind(this,'mac')}/>
                        </div>
                        <div style={VersionMap}>
                            <img id='linux' style={chart} src={linuxIcon} onClick={this.handleRequstData.bind(this,'linux')}/>
                        </div>
                    </div>
                    <div style={SelectedCircle}>
                        <img id='change' style={SelectedCircle1} src={require('../../images/download/Selected.png')} />
                    </div>
                    {/*图片结束*/}
                </div>

                {/*新版本开始*/}
                <div style={{ ...Center1, ...Explain }}>
                    <img style={chart4} src={require('../../images/download/newVersion.png')} />
                    <div style={Name} id='details'>
                        <b>
                        Ebooker &nbsp; For &nbsp; {platformTitle}
                        </b>
                    </div>
                    <div>
                        <span style={Edition}>版本号：</span>
                        <span id='Edition' style={Edition2}>{this.state.versionData.version}</span>
                        <span style={Edition3}>大小：</span>
                        <span id='Size' style={Edition2}>{this.state.versionData.size}</span>
                        <span style={Edition1}>更新日期：</span>
                        <span id='UpdateDate' style={Edition2}>{tool.formatDate(this.state.versionData.time)}</span>
                    </div>
                    <div style={Regulations}>
                        <div id='Regulations'>
                            <p style={Characteristic4}>最新动态</p>
                            <DownloadSon tada={this.state.versionData.dynamic} />
                        </div>
                
                    </div>
                    <div>     
                        {/*  */}
                        {this.state.versionData.url&&this.state.versionData.url.indexOf(',') > 0 ?
                            <div>
                                <a href={this.state.versionData.url.split(',')[0]} style={DownloadNow} id='DownloadNow32'>
                                    <img style={alignment} src={require('../../images/download/下载.png')} />&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span style={DownloadConnection}> 立即下载(32位)</span>
                                </a>
                                <a href={this.state.versionData.url.split(',')[1]} style={DownloadNow2} id='DownloadNow64'>
                                    <img style={alignment} id='alignment' src={require('../../images/download/下载.png')} />&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span style={DownloadConnection} id='ChangeWord'> 立即下载(64位)</span>
                                </a>
                            </div>
                            :
                            <div>
                                <a href={this.state.versionData.url} style={DownloadNow2} id='DownloadNow64'>
                                    <img style={alignment} id='alignment' src={require('../../images/download/下载.png')} />&nbsp;&nbsp;&nbsp;&nbsp;
                                    <span style={DownloadConnection1} id='ChangeWord'> 立即下载</span>
                                </a>
                            </div>
                        }
                    </div>
                </div>
                {/*新版本结束*/}
                {/*更新日志开始2*/}
                <div style={{ ...Center1, ...Explain }}>
                    <div style={{ marginTop: '184px' }}>
                        <img style={chart5} src={require('../../images/download/VersionLog.png')} />
                        {logHtml}
                    </div>
                </div>
            </div>
        );
    }
}
export default Download;