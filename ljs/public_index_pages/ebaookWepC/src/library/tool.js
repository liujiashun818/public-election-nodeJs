import moment from 'moment';
const token = () => {
    return window.localStorage.token || window.sessionStorage.token;
}

const isEmpty = (val) => {
    if (val === null || val === undefined) {
        return false;
    }
}

const idNumCheck = (idNum) => {
    if (!isEmpty(idNum)) {
        return /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(idNum);
    } else {
        return false;
    }
}

const formatTime = (val) => {
    return val.replace('T', ' ').substring(0, val.indexOf(":") + 3);
}

const desendMinutes = (val) => {
    moment.locale('zh-cn', {
        months: '一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月'.split('_'),
        monthsShort: '1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月'.split('_'),
        weekdays: '星期日_星期一_星期二_星期三_星期四_星期五_星期六'.split('_'),
        weekdaysShort: '周日_周一_周二_周三_周四_周五_周六'.split('_'),
        weekdaysMin: '日_一_二_三_四_五_六'.split('_'),
        longDateFormat: {
            LT: 'HH:mm',
            LTS: 'HH:mm:ss',
            L: 'YYYY年MMMD日',
            LL: 'YYYY年MMMD日',
            LLL: 'YYYY年MMMD日Ah点mm分',
            LLLL: 'YYYY年MMMD日ddddAh点mm分',
            l: 'YYYY年MMMD日',
            ll: 'YYYY年MMMD日',
            lll: 'YYYY年MMMD日 HH:mm',
            llll: 'YYYY年MMMD日dddd HH:mm'
        },
        meridiemParse: /凌晨|早上|上午|中午|下午|晚上/,
        meridiemHour: function (hour, meridiem) {
            if (hour === 12) {
                hour = 0;
            }
            if (meridiem === '凌晨' || meridiem === '早上' || meridiem === '上午') {
                return hour;
            } else if (meridiem === '下午' || meridiem === '晚上') {
                return hour + 12;
            } else {
                // '中午'
                return hour >= 11
                    ? hour
                    : hour + 12;
            }
        },
        meridiem: function (hour, minute, isLower) {
            var hm = hour * 100 + minute;
            if (hm < 600) {
                return '凌晨';
            } else if (hm < 900) {
                return '早上';
            } else if (hm < 1130) {
                return '上午';
            } else if (hm < 1230) {
                return '中午';
            } else if (hm < 1800) {
                return '下午';
            } else {
                return '晚上';
            }
        },
        calendar: {
            sameDay: '[今天]LT',
            nextDay: '[明天]LT',
            nextWeek: '[下]ddddLT',
            lastDay: '[昨天]LT',
            lastWeek: '[上]ddddLT',
            sameElse: 'L'
        },
        dayOfMonthOrdinalParse: /\d{1,2}(日|月|周)/,
        ordinal: function (number, period) {
            switch (period) {
                case 'd':
                case 'D':
                case 'DDD':
                    return number + '日';
                case 'M':
                    return number + '月';
                case 'w':
                case 'W':
                    return number + '周';
                default:
                    return number;
            }
        },
        relativeTime: {
            future: '%s内',
            past: '%s前',
            s: '几秒',
            m: '1 分钟',
            mm: '%d 分钟',
            h: '1 小时',
            hh: '%d 小时',
            d: '1 天',
            dd: '%d 天',
            M: '1 个月',
            MM: '%d 个月',
            y: '1 年',
            yy: '%d 年'
        },
        week: {
            dow: 1,
            doy: 4
        }
    });
    let timeDifference = moment(val, "YYYY-MM-DDTHH:mm:ss.000Z").fromNow();
    return timeDifference;
}

const formatDate = (val) => {
    return moment(val).format("YYYY-MM-DD HH:mm");
}

const formatUnixTime = (val) => {
    return moment(val).format("YYYY-MM-DDTHH:mm:ss.000Z");
}

const formatUnixTimeMintue = (val) => {
    return moment(val).format("mm");
}

//字符串换行
const insertEnter = (str, n) => {
    var len = str.length;//获取字符的长度  
    var strTemp = '';
    if (len > n) {           //如果字符的长度大于指定的长度  
        strTemp = str.substring(0, n);     //那么截取指定长度的字符串  
        str = str.substring(n, len);       //截取剩余的字符串  
        return strTemp + '<br />' + insertEnter(str, n); 
    } else {
        return str;
    }                   
}

const tool = {
    token: token(),
    idNumCheck: idNumCheck,
    isEmpty: isEmpty,
    formatTime: formatTime,
    desendMinutes: desendMinutes,
    formatDate: formatDate,
    insertEnter:insertEnter,
    formatUnixTime:formatUnixTime,
    formatUnixTimeMintue:formatUnixTimeMintue
}



export default tool;
