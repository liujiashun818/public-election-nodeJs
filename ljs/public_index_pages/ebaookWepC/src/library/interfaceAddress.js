/**
 * Created by Administrator on 2017/7/20. 
 */

import config from '../service/apiConfig';
let ip = config.ip;
let port = config.port;
let host  =`http://${ip}:${port}`
//本地:192.168.27.166
//线上:39.108.123.198 39.108.129.246
//真实环境 120.27.15.4:80

// 随机节点连接
const peers = [{name: "MA", address: "47.94.93.132"},
{name: "MB", address: "47.94.93.132"},
{name: "MC", address: "47.94.144.216"},
{name: "MD", address: "47.94.146.43"},
{name: "ME", address: "106.14.185.189"},
{name: "MF", address: "106.15.227.133"},
{name: "MG", address: "101.132.34.62"},
{name: "MH", address: "120.77.211.219"},
{name: "MI", address: "119.23.67.225"},
{name: "MJ", address: "47.91.156.21"},
{name: "MK", address: "47.74.145.177"}]

let peerIndex = Math.floor(Math.random()*10)
let address = ""
address = peers[peerIndex].address;



const BOGGER_ALL_LIST = host+"/api/article/list/all";
const BOGGER_HOT = host+"/api/article/top/hot";
const BOGGER_NEW = host+"/api/article/top/new";
const BOGGER_TAG = host+"/api/article/tagswithcount";
const BOGGER_PAGE = host+"/api/article/blog/list";
const BOGGER_COPYRIGHT = `http://${address}:8000/api/article`;
const MYCENTER_TOPIC = host+"/api/user/tpiclist/notoken";
const MYCENTER_RPLYC = host+"/api/user/rplyclist/notoken";
const MYCENTER_TOPINFO = host+"/api/user/topinfo/notoken";
const MYCENTER_CHANGEINFO = host+"/api/user/changeinfo";
const COMMENT_REPORT = host+"/api/comment/reportall";
const IPRESOURCE_PAGE = host+'/api/article/getIPResource';
const CLIENT_VERSION_LOG = host+"/api/desktop/getVersion";
//本地:192.168.27.166
//线上:39.108.123.198


/*params:{
    id:12,
}
function getParams() {
    for()
}*/

const netService = {
    getAllList: {
        BOGGER_ALL_LIST,
        BOGGER_HOT,
        BOGGER_NEW,
        BOGGER_TAG,
        BOGGER_PAGE,
        BOGGER_COPYRIGHT,
        MYCENTER_TOPIC,
        MYCENTER_RPLYC,
        MYCENTER_TOPINFO,
        MYCENTER_CHANGEINFO,
        COMMENT_REPORT,
        host,
        IPRESOURCE_PAGE,
        CLIENT_VERSION_LOG
    }

}

export default netService;