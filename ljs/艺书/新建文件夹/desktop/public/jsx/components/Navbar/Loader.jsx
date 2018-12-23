"use strict";

import React from 'react';

module.exports.Loader = React.createClass({
  render(){
    return (
    	<div id="pistonLoader" >
			<div id="robot">
			    <div className="piston">
			        <div className="rotator"></div>
			        <div className="block">
			            E
			            <div className="arm"></div>
			        </div>
			    </div>
			    <div className="piston">
			        <div className="rotator"></div>
			        <div className="block">
			            B
			            <div className="arm"></div>
			        </div>
			    </div>
			    <div className="piston">
			        <div className="rotator"></div>
			        <div className="block">
			            O
			            <div className="arm"></div>
			        </div>
			    </div>
			    <div className="piston">
			        <div className="rotator"></div>
			        <div className="block">
			            O
			            <div className="arm"></div>
			        </div>
			    </div>
			    <div className="piston">
			        <div className="rotator"></div>
			        <div className="block">
			            K
			            <div className="arm"></div>
			        </div>
			    </div>
			</div>
		</div>
    )}
});