import React from 'react';
import {Link} from 'react-router-dom';
import tool from '../../library/tool'
const sectionListContent ={
    borderBottom: "1px solid #e5e5e5",
    backgroundColor: "white"
}
class GeneralList extends React.Component {

    render() {
        let result = this
            .props
            .data
            .map((obj,index) => { 
                let ebcValue =1;
                 if (obj && obj.creatTime && obj.content){
                  ebcValue = window.EXC.estimate(new Date(obj.creatTime),obj.content.length,obj.visitCount,1,obj.replyCount,0);
                 }

                return (
                    <div key={obj.id} className='sectionListContent' style={sectionListContent}>
                        <div className='sectionImgBox' key={obj.id}>
                            <div className='sectionImg'>
                                <img src={obj.avatar} alt="" />
                            </div>
                        </div>
                        <div className='sectionTxt' id="sectionTxt" style={{float:"left"}}>
                            <div className='sectionTxtTop'>
                                <div className='sectionTxtTopNav'>
                                    <Link to={"/detialListCom/"+obj.id}>
                                        <h3 className='sectionTitle' id={obj.id} title={obj.title}>{obj.title}</h3>
                                        <div className='change'>
                                            <span className = "value1"></span>
                                            <span className='n1' title="价值评估"><img className='PurseMap' src={require('../../images/GeneralList/wallet22.png')} alt="" />{ebcValue}EBC</span>
                                        </div>
                                    </Link>                                   
                                    {/* {(index <= 4&&this.props.count === 0)&&
                                    <span className='sectionBtn'>
                                        <button type="button" disabled="disabled" className='sectionBtn1'>置顶</button>
                                    </span>
                                    } */}
                                </div>
                            </div>
                            <div className='sectionTxtMid' style={{wordBreak:"break-all"}} title={obj.content.replace(/<br\/>/g,"")}>
                                {obj.content.replace(/<[^>]*?>/gi, "")}
                            </div>
                            <div className='sectionTxtbottom' style={{fontSize: "12px",color:"#999999"}}>
                                <ul className='sectionInfoLeft'>
                                    <li title={obj.nickName}>{obj.nickName}
                                    </li>
                                    <li>
                                        {tool.formatDate(obj.creatTime)}
                                    </li>
                                    <li>
                                        来自:<a style={{color:"#666666",textDecoration:"none", cursor:'default'}} id=''>{obj.tab}</a>  
                                    </li>
                                </ul>
                                <ul className='sectionInfoRight'>
                                    <li>
                                        回复:<span>({obj.replyCount})</span>
                                    </li>
                                    {/* <li>赞:<span>({obj.likeCount})</span>
                                    </li> */}
                                    <li>浏览量:<span>({obj.visitCount})</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                );
            });
        return <div>{result}</div>
    }
}

export default GeneralList;
