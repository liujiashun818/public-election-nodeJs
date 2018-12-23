
// let ip = 'api.ebookchain.org';//真实数据库
// let port = '80';
let ip = '39.108.123.198';//测试数据库
let port = '7070';

// let ip = '192.168.24.79';//开发数据库
// let port = '7070';

// let ip = '192.168.27.166';//chenhao localst
// let port = '7070';

// let ip = '192.168.24.79';//开发数据库
// let port = '7070';

if (window.location.hostname.toLowerCase() == "www.ebookchain.org") {
    ip = 'api.ebookchain.org';//真实数据库
    port = '80';
}

/**
 * API接口配置
 */
export default {
    ip: ip,
    port: port,
}