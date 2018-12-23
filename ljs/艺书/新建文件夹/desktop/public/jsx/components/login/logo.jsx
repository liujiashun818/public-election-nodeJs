"use strict";

import React from 'react';
import utils from '../../../js/libs/utils.js';
const urlPath = utils.basePath();

module.exports = React.createClass({
  render(){
    return (
      <img className={"logo"} src={urlPath + 'public/images/logo3.png'}/>
    )
  }
});
