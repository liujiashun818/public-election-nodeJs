/**
 * Created by Administrator on 2017/7/20.
 */
import config from '../service/apiConfig';
let ip = config.ip;
let port = config.port;
let host  =`http://${ip}:${port}`
//本地:192.168.27.166
//线上:39.108.123.198
//真实环境 120.27.15.4:80

const get_topicData = host+"/api/club/topic/hot";
const get_topicPublicData = host+"/api/club/topic/public";
const get_waitData = host+"/api/club/topic/wait";
const get_itemsPerPageData = host+"/api/club/topic/list?itemsPerPage=9&offset=";
const get_itemsPerPageDataFen = host+"/api/club/topic/list/tab?itemsPerPage=9";
const get_authorinfo = host+"/api/club/authorinfo";
const post_topicAdd = host+"/api/club/topic/add";
const post_topicReply = host+"/api/club/topic/reply";
const post_topicReplyLike = host+"/api/club/topic/reply/like";
const get_topicContentId = host+"/api/club/topic/content?id=";
const get_topic_ContentId = host+"/api/club/topic/content";
const get_topicReplystId = host+"/api/club/topic/replys?id=";
const get_topicReplysOthers = host+"/api/club/topic/others";
const get_Left = host+"/api/club/topic/list/left";
const delete_topicDelete = host+"/api/club/topic/delete";
const edit_topicEdit = host+"/api/club/topic/edit";


//http://192.168.27.166:7070/api/club/topic/reply

//http://192.168.27.166:7070/api/club/authorinfo

/*params:{
    id:12,
}
function getParams() {
    for()
}*/
//netService.getAllListCom
const netService = {
    getAllListCom:{
        get_topicData,
        get_topicPublicData,
        get_waitData,
        get_itemsPerPageData,
        get_authorinfo,
        post_topicAdd,
        post_topicReply,
        post_topicReplyLike,
        get_topicContentId,
        get_topicReplystId,
        get_topicReplysOthers,
        get_itemsPerPageDataFen,
        get_Left,
        delete_topicDelete,
        get_topic_ContentId,
        edit_topicEdit
    }

}

export default netService;