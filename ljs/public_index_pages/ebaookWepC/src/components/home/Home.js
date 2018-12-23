import React from 'react';
// import Section1 from "./home-section/Section1";
// import Section2 from "./home-section/Section2";
// import Section3 from "./home-section/Section3";
// import Section4 from "./home-section/Section4";
// import Section5 from "./home-section/Section5";
// import Section6 from "./home-section/Section6";
// import Section7 from "./home-section/Section7";
import Section11 from "./home-section/Section11";
import Section12 from "./home-section/Section12";
import Section13 from "./home-section/Section13";
import Section14 from "./home-section/Section14";
import Section15 from "./home-section/Section15";
// import Footer from "./home-section/Footer";

import './home.css';
class Home extends React.Component {
    render() {
        return (
            <div>
                <Section11 />
                <Section12 />
                <Section13/>
                <Section14/>
                <Section15/>
                {/* <Footer/> */}
                {/* <Section7/> */}
            </div>
        );
    }
}
export default Home;