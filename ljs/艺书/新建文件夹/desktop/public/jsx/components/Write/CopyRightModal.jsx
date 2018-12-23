"use strict";

import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import { CopyRightContent } from './CopyRightContent.jsx';


// ------------------Copyright registration Modal  ------------------------------ //
  //Dialog root style
  const DiacontentStyle = {
    width:'90%',
    maxWidth:'none',
  }
  const bodyStyle = {
    maxWidth: 'none',
    marginRight: '250px',
    padding: 0,
  }
  module.exports.CopyRightModal = React.createClass({

      getInitialState: function(){
       return {
          open: false,
       };
      },
      handleRequestClose: function() {
        this.setState({
          open: false,
        });
      },

      handleTouchTap: function() {
        if(global.currentUser.wallets[0].seed){
          this.setState({
            open: true,
          });         
        }else{
          alert("请先在钱包的个人账户页面中创建或导入一个钱包地址!");
        }
      },
      render: function () {
          var standardActions = (
            <FlatButton
              label="关闭"
              primary={true}
              onTouchTap={this.handleRequestClose}
            />
          );
          return (
              <span id="copyrightBtn" onTouchTap={this.handleTouchTap}
                  data-toggle="dropdown" title="版权注册">
                  <i className="material-icons md-20">copyright</i>
                  <Dialog
                  open={this.state.open}
                  autoScrollBodyContent={true}
                  contentStyle={DiacontentStyle}
                  bodyStyle={bodyStyle}            
                  titleStyle={{borderBottom: '1px solid #ccc', textAlign: 'center', padding: '5px 0'}}
                  actions={standardActions}
                  onRequestClose={this.handleRequestClose}
                  >
                    <CopyRightContent />
                  </Dialog>
              </span>
          );
      }
  });