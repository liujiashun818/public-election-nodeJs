import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Footer from "../public/Footer";
import "./AboutUs.css";
import $ from 'jquery';




class AboutUs extends React.Component {
    componentDidMount() {
      $("#company").on('click', function () {
        $("#company").css({color:'#50c4ff'})
        $("#company1").css({color:'#333333'})
        $("#company2").css({color:'#333333'})
        $("#company3").css({color:'#333333'})
        $("#company4").css({color:'#333333'})
        $("#company5").css({color:'#333333'})
         $("#classificationRight").show();
         $("#classificationRight1").hide();
         $("#classificationRight2").hide();
         $("#classificationRight3").hide();
         $("#classificationRight4").hide();
         $("#classificationRight5").hide();
     })
     $("#company1").on('click', function () {
        $("#company").css({color:'#333333'})
        $("#company1").css({color:'#50c4ff'})
        $("#company2").css({color:'#333333'})
        $("#company3").css({color:'#333333'})
        $("#company4").css({color:'#333333'})
        $("#company5").css({color:'#333333'})
        $("#classificationRight").hide();
        $("#classificationRight1").show();
        $("#classificationRight2").hide();
        $("#classificationRight3").hide();
        $("#classificationRight4").hide();
        $("#classificationRight5").hide();
    })
    $("#company2").on('click', function () {
        $("#company").css({color:'#333333'})
        $("#company1").css({color:'#333333'})
        $("#company2").css({color:'#50c4ff'})
        $("#company3").css({color:'#333333'})
        $("#company4").css({color:'#333333'})
        $("#company5").css({color:'#333333'})
       $("#classificationRight").hide();
       $("#classificationRight1").hide();
       $("#classificationRight2").show();
       $("#classificationRight3").hide();
       $("#classificationRight4").hide();
       $("#classificationRight5").hide();
   })
   $("#company3").on('click', function () {
    $("#company").css({color:'#333333'})
    $("#company1").css({color:'#333333'})
    $("#company2").css({color:'#333333'})
    $("#company3").css({color:'#50c4ff'})
    $("#company4").css({color:'#333333'})
    $("#company5").css({color:'#333333'})
      $("#classificationRight").hide();
      $("#classificationRight1").hide();
      $("#classificationRight2").hide();
      $("#classificationRight3").show();
      $("#classificationRight4").hide();
      $("#classificationRight5").hide();
  })
  $("#company4").on('click', function () {
    $("#company").css({color:'#333333'})
    $("#company1").css({color:'#333333'})
    $("#company2").css({color:'#333333'})
    $("#company3").css({color:'#333333'})
    $("#company4").css({color:'#50c4ff'})
    $("#company5").css({color:'#333333'})
     $("#classificationRight").hide();
     $("#classificationRight1").hide();
     $("#classificationRight2").hide();
     $("#classificationRight3").hide();
     $("#classificationRight4").show();
     $("#classificationRight5").hide();
 })
 $("#company5").on('click', function () {
    $("#company").css({color:'#333333'})
    $("#company1").css({color:'#333333'})
    $("#company2").css({color:'#333333'})
    $("#company3").css({color:'#333333'})
    $("#company4").css({color:'#333333'})
    $("#company5").css({color:'#50c4ff'})
    $("#classificationRight").hide();
    $("#classificationRight1").hide();
    $("#classificationRight2").hide();
    $("#classificationRight3").hide();
    $("#classificationRight4").hide();
    $("#classificationRight5").show();
})
      
    }
     render() {
         return (
             <div>
                 <div className = 'ClearFloat'></div>
                 <div className='about'>
                     <div className='headlines'>关于我们</div>
                     <div className='classification'>
                         <div className='classificationLeft'>
                             <a className = 'company company1' id='company'>公司介绍</a>
                             <a className = 'company' id='company1'>产品介绍</a>
                             <a className = 'company' id='company2'>技术特点</a>
                             <a className = 'company' id='company3'>战略布局</a>
                             <a className = 'company' id='company4'>团队介绍</a>
                             <a className = 'company' id='company5'>企业荣誉</a>
                         </div>
                         <div style={{width:'894px', display:"inline-block"}}>
                            <div className='classificationRight' id='classificationRight'>
                                <span className='Title'>
                                    <img src={require("../../images/AboutUs/company.jpg")} width="838" height="214" alt="111"/>
                                </span>
                                <span className='Title'>亿生生简介</span><br/>
                                <span className='content1'>北京亿生生网络科技有限公司（简称亿生生，亿书母公司），是国内第一家国产区块链研发公司，也是一家专注于区块链研发、服务和咨询的技术驱动型高科技公司。</span>
                                <span className='content1'>亿生生拥有完全自主知识产权和国产化的区块链产品和技术，具备强大的底层技术开发能力，专注于开发国有底层区块链技术，从底层链搭建开始，到应用层开发都保持了独立性和拓展性，并拥有完善的技术文档和开发教程。如果说一般区块链公司只是做了个应用APP，而亿生生不仅做了APP，还开发了IOS或安卓操作系统，充分展现出雄厚的技术实力。</span>
                                <span className='content1'>矩阵链——面向未来的区块链架构，亿生生着力打造矩阵链底层生态，从而完成和各行业及行业间融合。目前生态系统已建立在矩阵链上的合作伙伴有医疗、知识产权、征信、保险、大数据和物联网等行业。</span>
                            </div>
                            <div className='classificationRight' id='classificationRight1' style={{display: "none"}}>
                                <span className='Title'>产品介绍</span><br/>
                                <span className='content1'>亿书，是该公司核心产品之一，目标是构建基于区块链版权保护和交易平台的生态系统。以服务人类知识创新为目标，以版权保护为核心，鼓励人类知识创作与分享，围绕文娱产业进而实现聚合知识创作、知识付费、数字出版等在内的全经济生态。</span>
                                <span className='content1'>亿书，是一个基于区块链自带版权保护的文字创作工具，也是国内第一款面向C端用户的区块链落地应用。从源头开始记录了人类思维的每一次发现，是继语言传播、文字传播、印刷传播、电子传播、网络传播之后的第六次传播革命：价值传播。</span>
                            </div>
                            <div className='classificationRight' id='classificationRight2' style={{display: "none"}}>
                                <span className='Title'>技术特点</span><br/>
                                <span className='content1'>矩阵链——面向未来的区块链架构，亿生生着力打造矩阵链底层生态，从而完成和各行业及行业间融合。目前生态系统已建立在矩阵链上的合作伙伴有医疗、知识产权、征信、保险、大数据和物联网等行业。</span>
                                <span className='content1'>矩阵链就是由一种具备灵活扩展能力的区块链程序，针对不同行业和应用场景通过自我复制，衍生出来的包含联盟链、私有链、公有链在内的多条链的组合。</span>
                            </div>
                            <div className='classificationRight' id='classificationRight3' style={{display: "none"}}>
                                <span className='Title'>战略布局，合作共赢服务未来</span><br/>
                                <span className='content1'>目前，亿生生科技已经在多领域率先实现了区块链技术与行业应用的战略布局：</span>
                                <span className='content1'>与国家重点数字富媒体实验室达成合作，积极探索实现知识变现的途径，帮助内容拥有者进行版权资产化，进而轻松实现知识直销和付费。</span>
                                <span className='content1'>与科学技术文献出版社达成战略合作，该出版机构的众多核心IP将在亿书链上注册。把大量宝贵的纸质内容数字化，盘活沉睡资源，获得更多收益。</span>
                                <span className='content1'>与很多作家、读书协会、作家协会、高等院校等达成合作意向，届时免费为他们提供技术支持，帮助他们做好版权保护，实现知识营销。</span>
                            </div>
                            <div className='classificationRight' id='classificationRight4' style={{display: "none"}}>
                                <span className='Title1'>团队介绍</span><br/>
                                <span className='content1'>公司团队秉持“专业、高效、开放、自由”的管理理念，基于区块链搭建协作管理平台，管理科学、协作高效，团队规模不断扩大，技术实力与日俱增。目前拥有一线互联网公司技术精英，有国内顶尖的密码学专家，有写过技术专著的技术大V，技术优势互补、年龄梯次合理。</span>
                                <span className='content1'>在互联网快速发展的今天，大量优秀的内容被盗版，创作者的劳动价值被各大平台严重剥削，积极性受到严重打击，尽管国家出台各种政策鼓励创作、打击盗版，但收效甚微，亿书站在这个知识为王时代的前沿，用行动保证价值回归，让创作者得到尊重，为人类创作注入无穷动力。</span>
                            </div>
                            <div className='classificationRight' id='classificationRight5' style={{display: "none"}}>
                                <div className='Title Title2'>企业荣誉</div><br/>
                                <span className='content1 content2'>
                                    <img src={require("../../images/AboutUs/About01.jpg")} width="368" height="214" alt="111"/>
                                </span>
                                <span className='content1 content2'>
                                    <img src={require("../../images/AboutUs/About02.jpg")} width="368" height="214" alt="111"/>
                                </span>
                                <span className='content1 content2'>
                                    <img src={require("../../images/AboutUs/About03.jpg")} width="368" height="214" alt="111"/>
                                </span>
                                <span className='content1 content2'>
                                    <img src={require("../../images/AboutUs/About04.jpg")} width="368" height="214" alt="111"/>
                                </span>
                            </div>
                        </div>
                     </div>
                 </div>
             </div>
         );
     }
 }
 export default AboutUs;