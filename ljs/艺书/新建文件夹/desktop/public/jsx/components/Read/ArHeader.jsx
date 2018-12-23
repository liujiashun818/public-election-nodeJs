"use strict";

import React from 'react';

module.exports.ArHeader = React.createClass({
		render: function () {
		    return (
		    	<div style={{width:"100%",textAlign:"center",height:"60px",lineHeight:"60px"}}>
		    		{this.props.children}
		    	</div>
		    );
		}
	});