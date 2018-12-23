"use strict";
import React from 'react';

module.exports.PageHeader = React.createClass({
		render: function () {
		    return (
		    	<div  style={{marginBottom:"70px"}}  className="pageHeader">
		    		<span>{this.props.pageName}</span>
		    		<span>{this.props.children}</span>
		    	</div>
		    );
		}
	});