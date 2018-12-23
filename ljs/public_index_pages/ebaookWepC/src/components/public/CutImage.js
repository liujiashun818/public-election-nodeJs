import React from 'react';

import AvatarEditor from 'react-avatar-editor'

export default class CutImage extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            scale: 1,
            visible: false, 
            allowZoomOut: false
        };
    }

    setEditorRef = (editor) => this.editor = editor

    onClickSave = () => {
        if (this.editor) {

            const canvas = this.editor.getImage()

            const canvasScaled = this.editor.getImageScaledToCanvas()
        }
    }

    handleScale = e => {
        const scale = parseFloat(e.target.value)
        this.setState({ scale })
    }

    handleAllowZoomOut = ({ target: { checked: allowZoomOut } }) => {
        this.setState({ allowZoomOut })
    }

    setImage(){
        const img = this.editor.getImageScaledToCanvas().toDataURL()
        this.props.setImage(img)
    }

    hide(){
        this.props.hide(false)
    }

    render() {
        return (
            <div>
                <div style={{...style[0],...style[1]}}>
                    <div style={{...style[2],...style[3]}}>编辑头像</div>
                    <div style={{...style[2],...style[4]}}>调整头像尺寸和位置</div>
                </div>
                <div style={{...style[2],marginBottom: "10px"}}>
                <AvatarEditor ref={this.setEditorRef} image={this.props.data.image}
                              width={160} height={160} border={50} scale={1.2} 
                              borderRadius={200} disableDrop={true} 
                              scale={parseFloat(this.state.scale)}/>
                </div> 
                <div style={{...style[2],marginBottom:"20px"}}>             
                     <input name='scale' type='range' style={{width:"290px"}} onChange={this.handleScale} min='1' max='2' step='0.01' defaultValue='1'/>
                </div>     
                <div style={{...style[0],justifyContent:"space-evenly"}}>      
                    <div><input type="button" onClick={this.hide.bind(this)} style={{...style[5],backgroundColor: "white",color: "#249cff"}} value="取消"/></div>
                    <div><input type="button" onClick={this.setImage.bind(this)} style={{...style[5],backgroundColor: "#249cff",color: "white"}} value="确认"/></div>
                </div>
            </div>     
        )
    }
}

const style = [
    {
        display: 'flex'
    },
    {
        flexDirection: "column",
        marginTop: "30px"
    },
    {
        display: "flex",
        justifyContent: "center"
    },
    {
        fontSize: "18px",
        color: "#333",
        marginBottom: "15px"
    },
    {
        fontSize: "14px",
        color: "#999",
        marginBottom: "10px"
    },
    {
        width: "100px",
        height: "30px",
        border: "1px solid #249cff",
        borderRadius: "6px"
    }
]