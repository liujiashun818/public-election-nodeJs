import React from 'react';
import { FetchGet, FetchPost } from '../../service/service';
import address from '../../library/interfaceAddress';
import tool from '../../library/tool';
import RodalPopup from '../public/RodalPopup'
export default class MyCenterEditor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            rodal:{
                rodalStatus:false
            },
            avatar: "",
            email: "",
            status:"none",
            imgName: "",
            suffix:"",
            topinfo: `/api/user/topinfo/notoken?userId=${this.props.match.params.id}`
        }
        this.get = this.get.bind(this);
        this.check = this.check.bind(this);
        this.setImage = this.setImage.bind(this);
        this.convertBase64UrlToBlob = this.convertBase64UrlToBlob.bind(this);
        this.hide = this.hide.bind(this);
    }

    componentDidMount() {
        this.get()
    }

    get() {
        FetchGet(this.state.topinfo).then((res) => {
            if(res.data.idNum)
            {
                this.setState({status:"block"})
            }
            this.setState({ avatar: res.data.avatar })
            this.refs.numId.value = res.data.idNum
            this.refs.Email.value = res.data.email
            this.refs.userName.value  = res.data.nickName
            this.refs.signature.value = res.data.signature
        }
        )
    }

    handleOnChangeImg() {
    
        this.setState({rodal:{
                rodalStatus:true,
                image: this.refs.setImageRef.files[0],
            },
        });
        if(this.refs.setImageRef.files){
            this.setState({
                imgName:this.refs.setImageRef.files[0].name,
                suffix: this.refs.setImageRef.files[0].type
            })
            this.refs.setImageRef.value = ""
        }

    }

    hide(e){
        this.setState({
            rodal:{
                rodalStatus:e
            }
        })
    }

    setImage(e) {
        const data = new FormData()
        data.append('file',this.convertBase64UrlToBlob(e),this.state.imgName)
        fetch(`${address.getAllList.host}/api/upload`, {
            method: 'POST',
            body: data
        }).then((response) => {
            return response.json()
        }).then(res => {
            alert("成功修改头像")
            this.setState({ avatar: res.url })
            this.getImage(res.url)
            this.hide(false)
        })
    }

    convertBase64UrlToBlob(urlData) {
        
        var bytes = window.atob(urlData.split(',')[1]);
        var ab = new ArrayBuffer(bytes.length);
        var ia = new Uint8Array(ab);
        for (var i = 0; i < bytes.length; i++) {
            ia[i] = bytes.charCodeAt(i);
        }
        
        return new Blob([ab], { type: this.state.suffix })
    }

    getImage(e) {
        let data = { avatar: e }
        FetchPost('/api/user/avatar', data, window.sessionStorage.token)
    }

    handleCommitClick() {
        let checked = this.check();
        let data = {}
        if (checked == NULL) 
        {
            alert("内容不能为空")
            return;
        } 
        else if (checked == NAME) 
        {
            alert("用户名长度超过限制")
            return;
        } 
        else 
        {
            data = checked
        }
        FetchPost('/api/user/changeinfo', data, window.sessionStorage.token).then(res => {
            if (res.success) 
            {
                alert("完成修改");
                window.location.reload();
            } 
            else 
            {
                alert("修改失败");
                window.location.reload();
            }
        })
    }


    check() {
        let data = {
            email: this.refs.Email.value,
            idNum: this.refs.numId.value,
            nickName: this.refs.userName.value,
            signature: this.refs.signature.value
        }
        if (data.nickName === '' || data.signature === '') 
        {
            return NULL;
        } 
        else if (data.nickName.length > 12) 
        {
            return NAME;
        } 
        else 
        {
            return data;
        }
    }

    render() {
        return (
            <div style={style[0]}>
                <div style={{ marginTop: "30px" }}>
                    <div style={style[10]}>
                        <div><img alt="" src={this.state.avatar} style={style[1]} /></div>
                        <span style={{ marginTop: "20px" }}><a onClick={() => { this.refs.setImageRef.click() }} style={{ color: "#249cff" }}>更换头像</a></span>
                        <div style={{ width: "208px" }}><input ref="setImageRef" type="file" style={{ visibility: "hidden" }} onChange={this.handleOnChangeImg.bind(this)}/>
                        </div>
                    </div>
                    <div style={style[2]}>
                        <div style={style[5]}>
                            <span style={style[3]}>用户名：</span><input style={style[4]} ref="userName" type="text" />
                        </div>
                        <div style={style[5]}>
                            <span style={style[3]}>个性签名：</span><input style={style[4]} ref="signature" type="text" />
                        </div>
                        <div style={style[5]}>
                            <span style={style[3]}>邮箱：</span><input style={{ ...style[4], border: "none", color: "#333333", outline: "none", textIndent: "2px" }} ref="Email" type="text" />
                        </div>
                        <div style={{...style[5],display:this.state.status}}>
                            <span style={style[3]}>身份证号：</span><input style={{...style[4], border: "none", color: "#333333", outline: "none", textIndent: "2px"}} ref="numId" type="text"/>
                        </div>
                    </div>
                </div>
                <div style={style[8]}>
                    <span><input type="button" style={style[7]} value="取消" onClick={() => { window.history.go(-1) }} /></span>
                    <span style={style[9]}></span>
                    <span><input type="button" style={style[6]} value="确认" onClick={this.handleCommitClick.bind(this)} /></span>
                </div>
                <div><RodalPopup rodal={this.state.rodal} setImage={this.setImage} hide={this.hide}/></div>
            </div>

        )
    }
}

const NULL = 'NULL'
const NAME = 'NAME'

const style = [
    {
        display: "flex",
        justifyContent: "center",
        height: "424px"
    },
    {
        width: "60px",
        height: "60px",
        borderRadius: "30px"
    },
    {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end"
    },
    {
        fontSize: "18px",
        color: "#333333"
    },
    {
        height: "34px",
        width: "290px",
        borderRadius: "5px",
        border: "1px solid #dad4d4",
        marginLeft: "20px",
        fontSize: "14px",
        textIndent: "15px",
        color: "#999999"
    },
    {
        marginBottom: "15px"
    },
    {
        backgroundColor: "#249CFF",
        width: "80px",
        height: "30px",
        border: "none",
        borderRadius: "7px",
        fontSize: "16px",
        color: "white"
    },
    {
        width: "80px",
        height: "30px",
        border: "none",
        borderRadius: "7px",
        fontSize: "16px",
        color: "#333333"
    },
    {
        display: "flex",
        alignItems: "flex-end"
    },
    {
        width: "20px"
    },
    {
        marginBottom: "30px",
        display: "flex",
        justifyContent: "space-between",
        marginLeft: "25px"
    },
    {
        display: "flex",
        alignItems: "center",
        marginTop: "145px"
    }
]