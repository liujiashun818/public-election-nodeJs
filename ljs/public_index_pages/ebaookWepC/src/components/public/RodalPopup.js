import React from 'react';
import Rodal from 'rodal';

import '../../css/rodal.css'
import CutImage from '../public/CutImage'

export default class RodalPopup extends React.Component {

    constructor(props) {
        super(props);
        this.state = { visible:false};
    }

    componentWillReceiveProps(props) {
        this.setState({visible:props.rodal.rodalStatus})
    }

    hide() {
        this.props.hide(false);
    }

    render() {
        return (
            <div>
                <Rodal visible={this.state.visible} customStyles={style} onClose={this.hide.bind(this)}>
                    <CutImage data={this.props.rodal} setImage={this.props.setImage} hide={this.props.hide}/>
                </Rodal>
            </div>
        )
    }
}

const style = {
    width:"380px",
    height:"490px"
}