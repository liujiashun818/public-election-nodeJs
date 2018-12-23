import React from 'react';
import MyCenterHeaders from "./MyCenterHeaders";
import MyCenterLists from "./MyCenterLists";
import Footer from '../public/Footer';
import "./myCenter.css"
const myCentersContainer = {
    display: "flex",
    display:"-webkit-flex",
    flexDirection: "row",
    justifyContent: "space-between",
    minHeight: "100vh"
}
const left = {
    display: "flex",
}
const right = {
    display: "flex",
}
const center = {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    alignItems: "center"
}
class MyCenters extends React.Component {
    render() {
        const {logout} = this.props;
        return (
            <div>
            <div id="MyCenterHomeId" style={{margin:"27px"}}>
                <div style={myCentersContainer}>
                    <div style={{
                        left
                    }}></div>
                    <div style={{
                        center
                    }}>
                            <MyCenterHeaders logout={logout} userId={this.props.match.params.id}/>
                            <MyCenterLists userId={this.props.match.params.id}/>
                    </div>
                    <div style={{
                        right
                    }}></div>
                </div>
            </div>
           </div>
        );
    }
}
export default MyCenters;