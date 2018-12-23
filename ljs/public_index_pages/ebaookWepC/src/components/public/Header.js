import React from 'react';
import { Link } from 'react-router-dom';
import imgLogoBlue114 from '../../images/logo_blue_114.png'
import './header.css';
import 'material-ui/DropDownMenu';
import DropDownMenus from "./DropDownMenus.js";
import ChainBrowser from "./ChainBrowser";
import FlatButton from 'material-ui/FlatButton';
import $ from 'jquery';

class Header extends React.Component {
    openDownMask = (e) => {
        document.getElementById('li_download').className = 'active';
        document.getElementsByClassName('downMask')[0].style.display = 'inline';
    }
    closeDownMask = (e) => {
        document.getElementById('li_download').className = '';
        document.getElementsByClassName('downMask')[0].style.display = 'none';
    }
    openChainMask = (e) => {
        document.getElementById('li_chainBrowser').className = 'active';
        document.getElementsByClassName('chainMask')[0].style.display = 'inline';
    }
    closeChainMask = (e) => {
        document.getElementById('li_chainBrowser').className = '';
        document.getElementsByClassName('chainMask')[0].style.display = 'none';
    }
    openUserMask = (e) => {
        document.getElementById('li_user').className = 'active';
        document.getElementsByClassName('userMask')[0].style.display = 'inline';
    }
    closeUserMask = (e) => {
        document.getElementById('li_user').className = '';
        document.getElementsByClassName('userMask')[0].style.display = 'none';
    }
    render() {
        const { curUser } = this.props;
        const id = curUser ? curUser.id : 0;
        const nickname = curUser ? curUser.nickName : '';
        // const l_register = <li><Link to="/register">登录 | 注册</Link></li>;
        const l_login = <li><Link to="/login">登录</Link><span className='n1'>|</span><Link to="/register">注册</Link></li>;
        const l_myCenter = <li id='li_user'><a href="javascript:void(0);" onClick={this.openUserMask}>{nickname}</a></li>;

        return (
            <div id='header'>
                <span className="nav-main"><a href='/'>EBOOKCHAIN</a></span>
                <span className='nav-menu'>
                    <ul>
                        <li>
                            <Link to="/" >首页</Link>
                        </li>
                        {/* <li className='inactive'>
                            <a href="javascript:void(0);">亿书</a>
                        </li> */}
                        <li id='li_download' onClick={this.openDownMask}>
                            <a>亿书</a>
                        </li>
                        <li>
                            {/* <a href="javascript:void(0);">博客</a> */}
                            <Link to="/blogger">新闻</Link>
                        </li>
                        <li >
                            {/* <a href="javascript:void(0);">微社区</a> */}
                            <Link to="/community">社区</Link>
                        </li>
                        <li >
                            {/* <a href="javascript:void(0);">微社区</a> */}
                            <Link to="/ipresource">IP资源</Link>
                        </li>
                        <li id='li_chainBrowser'>
                            {/* <a onClick={() => { window.location.href = "http://testnet.ebookchain.net/" }}>测试链浏览器</a> */}
                            <a onClick={this.openChainMask}>区块链浏览器</a>
                            {/* <ChainBrowser /> */}
                        </li>
                        {
                            (id ? l_myCenter : l_login)
                        }
                    </ul>
                </span>
                <span className='downMask' onClick={this.closeDownMask} style={{ display: 'none' }}>
                    <span className='download1'>
                        <span className='download2'>
                            <span className='download'>
                                <ul>
                                    <li>
                                        <a target='_blank' href="/download">客户端</a>
                                    </li>
                                    <li>
                                        <a target='_blank' href="/ebookchain.pdf">白皮书</a>
                                    </li>
                                    <li>
                                        <a target='_blank' href="/greenpaper-pre.pdf">绿皮书</a>
                                    </li>
                                </ul>
                            </span>
                        </span>
                    </span>
                </span>
                <span className='userMask' onClick={this.closeUserMask} style={{ display: 'none' }}>
                    <span className='user1'>
                        <span className='user2'>
                            <span className='user'>
                                <ul>
                                    <li>
                                        <a href={"/MyCenter/" + id}>个人中心</a>
                                    </li>
                                    <li>
                                        <a href="javascript:void(0);" onClick={this.props.logout}>退出</a>
                                    </li>
                                </ul>
                            </span>
                        </span>
                    </span>
                </span>
                <span className='chainMask' onClick={this.closeChainMask} style={{ display: 'none' }}>
                    <span className='chain1'>
                        <span className='chain2'>
                            <span className='chain'>
                                <ul>
                                    <li>
                                        <a target='_blank' href="http://mainnet.ebookchain.org/">主网浏览器</a>
                                    </li>
                                    <li>
                                        <a target='_blank' href="http://testnet.ebookchain.net/">测试网浏览器</a>
                                    </li>
                                </ul>
                            </span>
                        </span>
                    </span>
                </span>
            </div>
            // <div id="header" className="sticky clearfix header-md">
            //     <header id="topNav">
            //         <div dir="header_container_Id" className="container">
            //             <a id="header_Line_Id" style={{ textDecoration: "none" }} title="EbookChain" className="logo pull-left" href="/">
            //                 <span className="nav-main">EBOOKCHAIN</span>
            //             </a>
            //             <div id="header_navbar" className="navbar-collapse pull-right nav-main-collapse collapse submenu-dark">
            //                 <nav id="header_nav">
            //                     <ul id="topMain" className="nav nav-pills">
            //                         <li className={"text-center " + testactive("")}>
            //                             <Link to="/" >首页</Link>
            //                             <span className="aline"></span>
            //                         </li>
            //                         <li className={"text-center " + testactive("blogger")}>
            //                             <Link to="/blogger">博客</Link>
            //                             <span className="aline"></span>
            //                         </li>
            //                         <li className={"text-center " + testactive("community")}>
            //                             <Link to="/community">微社区</Link>
            //                             <span className="aline"></span>
            //                         </li>
            //                         <li className=" ">
            //                             <DropDownMenus />
            //                             <span className="aline"></span>
            //                         </li>
            //                         <li className=" ">
            //                             <ChainBrowser />
            //                             <span className="aline"></span>
            //                         </li>

            //                         {this.props.curUser && this.props.curUser.id ?
            //                             <li>
            //                                 <Link to={"/myCenter/"+window.sessionStorage.id}>
            //                                     <span >
            //                                         <img alt="avatar" width="50px" height="50px"
            //                                             style={{ marginRight: "10px", borderRadius: "25px" }}
            //                                             src={this.props.curUser.avatar} />
            //                                     </span>
            //                                     <span >{this.props.curUser.nickName}</span>
            //                                 </Link>
            //                                 {/* </a>     */}
            //                             </li>
            //                             : <li className={testactive("login")}>
            //                                 <Link to="/login">登录</Link>
            //                                 <span className="aline"></span>
            //                             </li>
            //                         }
            //                         {this.props.curUser && this.props.curUser.id &&
            //                             <li style={{marginTop:"15px"}}>
            //                                 <FlatButton label="退出" onClick={this.props.logout}
            //                                     icon={<i className="material-icons md-28"
            //                                         style={{ verticalAlign: "middle", marginRight: "5px" }}>keyboard_tab</i>} />
            //                             </li>}
            //                     </ul>
            //                 </nav>
            //             </div>
            //         </div>
            //     </header>
            // </div>
        );
    }
}
export default Header;