import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Footer from "../public/Footer";
import $ from 'jquery';
import tool from '../../library/tool'

const Characteristic = {
    fontFamily: 'Regular',
    fontSize: '14px',
    lineHeight: '20px',
    color: "#666"
}
const Small = {
    width: '6px',
    height: '6px',
    borderRadius: '6',
    backgroundColor: '#044a84',
    display: 'inline-block',
    marginRight: '15px',
}
class DownloadSon1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tada: '',
        }
    }



    render() {
        let tada2 = this.props.tada;
        if (!tada2) {
            return (<div></div>);
        }
        tada2.shift();
        tada2.pop();
        return (
            <div>
                {tada2.map((tada) => {
                    tada = tada.replace('&nbsp;','');
                    return (
                        <span>
                            <p style={Characteristic}>
                                <div style={Small}>
                                </div>
                                {tada}
                            </p>
                        </span>
                    )
                })}
            </div>
        );
    }
}

export default DownloadSon1;

