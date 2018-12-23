import React from 'react';

var ebookchain = nodeRequire('js-sdk');

module.exports.ShareList = React.createClass({
    getInitialState: function(){
     return {
        shareListData:[],
      }
    },
    componentDidMount(){
    	this.getShares();
    },
	getShares(){
		let { assetId }= this.props;
		console.log(assetId);
		let self = this;
		ebookchain.request.shares(assetId, 0, 100).then(data=>{
			if (data && data.success) {
			    console.log(data);
			    self.setState({shareListData: data.shares});
			}
		})
	},
	render(){
		let { shareListData } = this.state;
		const shareList = shareListData.map((item) => {
				return (
					<div className="sharePannel" style={{minWidth:"300px"}}>
						<div className="pannelLeft"><span>版</span><span style={{marginLeft:"50px"}}>券</span></div>
						<div className="pannelRight">
							<div style={{margin:"10px 0"}}>
								<span>券主: </span><span>{item.address}</span>
							</div>
							<div style={{fontSize:"20px",margin:"15px 0"}}>
								<div style={{display:"inline-block",marginRight:"30px"}}>
									<span>总量: </span><span>{item.num + item.sellNum}</span><span> EBS</span>
								</div>
								<div style={{display:"inline-block",color:"#FF9800"}}>
									<span>出售中: </span><span>{item.sellNum}</span><span> EBS</span>
								</div>			
							</div>
						</div>						
					</div>
				);
			});
		return(
        	<div style={{minHeight:'240px'}}>
				{ shareList }
        	</div>
		);
	}
});