import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Footer from "../public/Footer";
import $ from 'jquery';
import tool from '../../library/tool'


class DownloadSon extends React.Component {
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
        let spTada1 = tada2.split('\n');
        spTada1.shift();
        spTada1.pop();
        return (
            <div>
                {spTada1.map((tada) => {
                    tada = tada.replace('&nbsp;','');
                    return (
                        <div>
                            <p>
                                <span style={{ width: "6px", height: "6px", backgroundColor: "#044a84", display: "inline-block", borderRadius: "6px", marginRight: "10px" }}></span>
                                {tada}
                            </p>
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default DownloadSon;