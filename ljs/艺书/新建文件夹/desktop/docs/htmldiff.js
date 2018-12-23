/**
 * 文本差异化比对工具，用于比对两段文本之间所存在的差异；
 * 对HTML文本的比对中，会完全忽略标签内的差异，将<...>
 * 中的内容当做一个整体的单词；
 * 注1：现有版本还未对执行效率进行优化；
 * 注2：原始算法来自于网络:http://www.rohland.co.za/index.php/2009/10/31/csharp-html-diff-algorithm/
 * 注3：效率真低啊..........╮(╯▽╰)╭
 * @author zhoujq | zhoujq@rd.netease.com
 */  
(function() {
    var root = self;
    /**
     * 针对高级浏览器开启webWorker支持
     */
    onmessage = function (evt) {
        var data = evt.data,
            cmd = evt.data.cmd;

        switch(cmd) {
            case 'start':
                // console.info('start diff caculation');
                if(data.oldVersion && data.newVersion) {
                    var diff = root.getHTMLDiff(data.oldVersion, data.newVersion);
                    postMessage(diff);
                }
                break;
            case 'stop':
                // console.info('stop diff Worker');
                root.close();
                break;
        }
    };

    /**
     * 匹配描述块，一个用来表示相同内容块在新旧文档内位置的描述对象
     * @param {Number} startInOld [相同部分在旧文档中的起始位置]
     * @param {Number} startInNew [相同部分在新文档中的起始位置]
     * @param {Number} size       [相同部分的连续词元个数]
     */
    var Match = function(startInOld, startInNew, size) {
            this.size = size;
            this.startInOld = startInOld;
            this.startInNew = startInNew;
            this.endInOld = this.startInOld + this.size;
            this.endInNew = this.startInNew + this.size;
        };

    /**
     * 操作单元，一个操作单元描述了在具体位置所要
     * 执行的具体操作(如：insert、delete、equal与replace)
     * @param {Function} action
     * @param {Number}   startInOld [相同部分在旧文档中的起始位置]
     * @param {Number}   endInOld   [相同部分在旧文档中的结束位置]
     * @param {Number}   startInNew [相同部分在新文档中的起始位置]
     * @param {Number}   endInNew   [相同部分在新文档中的结束位置]
     */
    var Operation = function(action, startInOld, endInOld, startInNew, endInNew) {
            this.action = action;
            this.endInOld = endInOld;
            this.endInNew = endInNew;
            this.startInOld = startInOld;
            this.startInNew = startInNew;
        };

    /**
     * 将HTML解析成单词列表
     * 例：<a> Hello World </a>  ---> ["<a>"," ", "Hello", " ", "World", " ", "</a>"]
     * @param  {String}         html
     * @return {Array<String>}
     */
    var convertHtml2Words = function(html) {
            html = html.replace(/\s+/g,' ').replace(/\s+>/g,'>').replace(/\s+\/>/g,'/>').replace(/>\s+</g,'><');
            html = html.replace(/<td[^>]*>/g,'<td>').replace(/<table[^>]*>/g,'<table border="1" cellpadding="2" cellspacing="0">');
            return html.match(/<td[^>]*>(.*?)<\/td>|<[^>]+>|(&nbsp;)|[^<|>|\w]|\w+\b|\s+/mg);
        };

    var extractImgWords = function(words) {
            var Imgs = {};
            for(var i = 0,len = words.length; i<len; i++) {
                if(words[i].indexOf("<img") != -1) {
                    Imgs[words[i]] = i;
                }
            }
            return Imgs;
        };

    var extractSrcWords = function(img) {
            var imgAttrs = img.split(" "),
                src;
            for(var i = 0,len = imgAttrs.length; i<len; i++) {
                if(imgAttrs[i].indexOf('src') == 0) {
                    src = imgAttrs[i].split("://")[1];
                    if(!src) {
                        src = imgAttrs[i].split("=")[1]; 
                    }
                    break;
                }
            }
            return src;
        };
    var compareImgSrc = function(oldImg,newImg) {
            var oldSrc = extractSrcWords(oldImg),
                newSrc = extractSrcWords(newImg);
            if(oldSrc === newSrc) {
                return true;
            }
            else {
                return false;
            }
        };

    var processOldImgWords = function(oldWords,newWords) {
            var oldImgs = extractImgWords(oldWords),
                newImgs = extractImgWords(newWords),
                oldKey,
                newKey;
            for(oldKey in oldImgs) {
                for(newKey in newImgs) {
                    if(compareImgSrc(oldKey,newKey)) {
                        oldWords[oldImgs[oldKey]] = newWords[newImgs[newKey]];
                    }
                }
            }
            return oldWords;
        };

    /**
     * 差异对比构建类
     * @param {String} oldVersion 老文档
     * @param {String} newVersion 新文档
     */
    var DiffBuilder = function(oldVersion, newVersion) {
            this.oldVersion = oldVersion;
            this.newVersion = newVersion;
            this.tables = null;
            this.operation = null;
            this.wordIndices = {};
            this.oldWords = [];
            this.newWords = [];
            this.content = [];
            this.tableContent = [];
        };

    DiffBuilder.prototype = {

        build: function() {
            this.splitInputs2Words();
            this.processImgTag();
            this.indexNewWords();
            this.operations = this.getOperations();
            this.performOperation();
            return this.content.join('');
        },

        performOperation: function() {
            var opt;
            for (var i = 0, len = this.operations.length; i < len; i++) {
                opt = this.operations[i];
                this.operation = opt;
                opt.action.call(this, opt);
            }
        },

        /**
         * 将传入的文本切割成词元
         */
        splitInputs2Words: function() {
            this.oldWords = convertHtml2Words(this.oldVersion);
            this.newWords = convertHtml2Words(this.newVersion);
        },

        processImgTag: function() {
            this.oldWords = processOldImgWords(this.oldWords,this.newWords);
        },

        /**
         * 构建一个newWords队列对应的索引表
         * 例如：
         * this.newWords = ["<a>", " ", "Hello", " ", "World", " ", "</a>"];
         *
         * 构建成--->
         *
         * this.wordIndices = {
         *     "<a>"   : [0],
         *     " "     : [1, 3, 5]
         *     "Hello" : [2],
         *     "World" : [4],
         *     "</a>"  : [6]
         * };
         */
        indexNewWords: function() {
            var newWords = this.newWords,
                wordIndices = this.wordIndices,
                key,
                len = newWords.length,
                toString = Object.prototype.toString;
            for (var i = 0; i < len; i++) {
                key = newWords[i];
                if (toString.call(wordIndices[key]) !== '[object Array]') {
                    wordIndices[key] = [];
                }
                wordIndices[key].push(i);
            }
        },
        /**
         * 将文档抽象为操作描述队列
         * 例如:[euqal, insert, equal]，一篇文档可以被抽象为由多个
         * “操作命令与位置信息”组成的操作队列；
         * @return {Array<Operation>}
         */
        getOperations: function() {
            var optInOld = 0,
                optInNew = 0,
                operations = [],
                match,
                action,
                matchStartsInOld,
                matchStartsInNew,
                matchs = this.matchingBlocks();

            matchs.push(new Match(this.oldWords.length, this.newWords.length, 0));
            for (var i = 0, len = matchs.length; i < len; i++) {
                action = null;
                match = matchs[i];
                matchStartsInOld = (optInOld === match.startInOld);
                matchStartsInNew = (optInNew === match.startInNew);
                if (!matchStartsInOld && !matchStartsInNew) {
                    action = this.replace;
                } else if (matchStartsInOld && !matchStartsInNew) {
                    action = this.insert;
                } else if (!matchStartsInOld && matchStartsInNew) {
                    action = this.del;
                }
                if (action) {
                    operations.push(new Operation(action, optInOld, match.startInOld, optInNew, match.startInNew));
                }
                if (match.size) {
                    operations.push(new Operation(this.equal, match.startInOld, match.endInOld, match.startInNew, match.endInNew));
                }
                optInOld = match.endInOld;
                optInNew = match.endInNew;
            }
            return operations;
        },

        /**
         * 获取一个用于描述新旧文档内全部相同内容的匹配描述列表
         * @return {Array<Match>} 文档匹配描述列表
         */
        matchingBlocks: function() {
            var matchingBlocks = [];
            this.findMatchingBlocks(0, this.oldWords.length, 0, this.newWords.length, matchingBlocks);
            return matchingBlocks;
        },

        /**
         * 递归查找匹配项
         * @param  {Number} startInOld
         * @param  {Number} endInOld
         * @param  {Number} startInNew
         * @param  {Number} endInNew
         * @param  {Array<Match>} matchingBlocks
         */
        findMatchingBlocks: function(startInOld, endInOld, startInNew, endInNew, matchingBlocks) {
            var match = this.findMatch(startInOld, endInOld, startInNew, endInNew);
            if (!match) {
                return;
            }
            if (startInOld < match.startInOld && startInNew < match.startInNew) {
                this.findMatchingBlocks(startInOld, match.startInOld, startInNew, match.startInNew, matchingBlocks);
            }
            matchingBlocks.push(match);
            if (match.endInOld < endInOld && match.endInNew < endInNew) {
                this.findMatchingBlocks(match.endInOld, endInOld, match.endInNew, endInNew, matchingBlocks);
            }
        },

        /**
         * 从指定位置开始查询第一块匹配的文本块
         * @param  {Number} startInOld
         * @param  {Number} endInOld
         * @param  {Number} startInNew
         * @param  {Number} endInNew
         */
        findMatch: function(startInOld, endInOld, startInNew, endInNew) {
            var bestMatchInOld = startInOld,
                bestMatchInNew = startInNew,
                bestMatchSize = 0,
                matchLengthAt = {},
                newMatchLengthAt,
                newMatchLength,
                wordIndexList,
                matchIndex,
                len;

            for (var idxOld = startInOld; idxOld < endInOld; idxOld++) {
                newMatchLengthAt = {};
                wordIndexList = this.wordIndices[this.oldWords[idxOld]];
                len = wordIndexList ? wordIndexList.length : 0;
                for (var i = 0; i < len; i++) {
                    matchIndex = wordIndexList[i];
                    if (matchIndex < startInNew) {
                        continue;
                    }
                    if (matchIndex >= endInNew) {
                        break;
                    }
                    newMatchLength = (matchLengthAt[matchIndex - 1] || 0) + 1;
                    newMatchLengthAt[matchIndex] = newMatchLength;
                    if (newMatchLength > bestMatchSize) {
                        bestMatchInOld = idxOld - newMatchLength + 1;
                        bestMatchInNew = matchIndex - newMatchLength + 1;
                        bestMatchSize = newMatchLength;
                    }
                }
                matchLengthAt = newMatchLengthAt;
            }
            return bestMatchSize ? new Match(bestMatchInOld, bestMatchInNew, bestMatchSize) : null;
        },

        insert: function(opt, tagCls) {
            this.insertTag('ins', tagCls || 'diffins', this.newWords.slice(opt.startInNew, opt.endInNew));
        },

        del: function(opt, tagCls) {
            this.insertTag('del', tagCls || 'diffdel', this.oldWords.slice(opt.startInOld, opt.endInOld));
        },

        equal: function(opt) {
            this.content = this.content.concat(this.newWords.slice(opt.startInNew, opt.endInNew));
        },

        replace: function(opt) {
            this.del(opt, 'diffmod');
            this.insert(opt, 'diffmod');
        },
        /**
         * 添加标签
         * @param  {String} tagName
         * @param  {String} cssCls
         * @param  {String} words
         */
        insertTag: function(tagName, cssCls, words) {
            var nonTags,
                that = this;
            while (words.length) {
                //获取words内“连续”的非标签字符
                nonTags = this.extractConsecutiveWords(words, true);
                if (nonTags.length) {
                    var filterBlankNonTags = [],
                        blankFlag = true,
                        tmpTableContent,
                        matchResult;
                    for(var i = 0,len = nonTags.length; i<len ;i++) {
                        if(nonTags[i].indexOf('<td') != -1) {
                            if(cssCls == "diffins" || cssCls == "diffdel") {
                                matchResult = nonTags[i].match(/<td>(.+)<\/td>/);
                                nonTags[i] = nonTags[i].replace(matchResult ? matchResult[1] : ' ', this.warpText(matchResult ? matchResult[1] : ' ', tagName, cssCls));
                            }
                            /**
                             * 匹配出来是替换操作时，作提取td内容放到下一个格子中，防止出现两个格子
                             * 例如：<td>5</td>替换为<td>6</td>;
                             * 操作步骤如下：
                             * 1.提取出5,包裹为<del>5</del>,push到tableContent暂存;
                             * 2.<td>5</td>置为空;
                             * 3.插入<td><del>5</del><ins>6</ins></td>
                             */
                            else if(cssCls == "diffmod") {
                                if(tagName == "del") {
                                    //提取删除的td中的内容，并用<del></del>包裹起来,暂存在tableContent里面
                                    matchResult = nonTags[i].match(/<td>(.+)<\/td>/);
                                    tmpTableContent = this.warpText(matchResult ? matchResult[1] : ' ', tagName, cssCls);
                                    this.tableContent.push(tmpTableContent);
                                    nonTags[i] = '';
                                }
                                else if(tagName == "ins") {
                                    //td中的内容：<del>被替换的内容</del> +<ins>新的内容</ins>
                                    tmpTableContent = this.tableContent.shift();
                                    if(!tmpTableContent) {
                                        tmpTableContent = '';
                                    }
                                    matchResult = nonTags[i].match(/<td>(.+)<\/td>/);
                                    nonTags[i] = nonTags[i].replace(matchResult ? matchResult[1] : ' ',
                                        tmpTableContent + this.warpText(matchResult ? matchResult[1] : ' ', tagName, cssCls));
                                }
                            }
                            
                            this.content = this.content.concat(nonTags[i]);
                            blankFlag = false;
                        }
                        else if(blankFlag &&(nonTags[i] == "&nbsp;" || nonTags[i] == " ")) {
                            if(tagName == "ins") {
                                this.content = this.content.concat(nonTags[i]);
                            }  
                        }
                        else {
                            this.content.push(
                            this.warpText(nonTags[i], tagName, cssCls));
                            blankFlag = false;
                        }
                    }
                }
                if (words.length) {
                    //获取words内“连续”的标签字符
                    var consecutiveTagChars = this.extractConsecutiveWords(words,false);
                    for(var i = 0 ,len = consecutiveTagChars.length; i<len ; i++)
                    {
                        if(consecutiveTagChars[i].indexOf('<img') != -1) {
                            this.content.push(this.warpImg(consecutiveTagChars[i],tagName));
                        }
                        else {
                            this.content = this.content.concat(consecutiveTagChars[i]);
                        }
                    }
                }
            }
        },

        /**
         * 获取words内连续的“文本”或“标签”
         * @param  {Array<String>} words
         * @param  {Boolean} isTag
         * @return {Array<String>}
         */
        extractConsecutiveWords: function(words, isTag) {
            var idxOfFirstTag = null;
            for (var i = 0, len = words.length; i < len; i++) {
                //注：是取判定条件的前一位
                if (this.isTag(words[i]) == isTag) {
                    idxOfFirstTag = i;
                    break;
                }
            }
            return words.splice(0, idxOfFirstTag !== null ? idxOfFirstTag : words.length);
        },

        warpText: function(text, tagName, cssCls) {
            return '<' + tagName + ' class="' + cssCls + '">' + text + '</' + tagName + '>';
        },

        warpImg: function(img,tagName) {
            var borderColor;
            if(tagName == 'ins') {
                borderColor = '#e8ffb3';
            }
            else if(tagName == 'del') {
                borderColor = '#ffdbc8';
            }
            if(img.indexOf(' style') != -1) {
                var sIndex = img.indexOf(' style'),
                    eIndex = img.lastIndexOf('>'),
                    styleStartQuoteIndex =img.indexOf('"',sIndex),
                    styleEndQuoteIndex;

                if(styleStartQuoteIndex != -1) {
                    styleEndQuoteIndex = img.indexOf('"',styleStartQuoteIndex+1);
                }
                else if(img.indexOf("=",sIndex) != -1) {
                    styleEndQuoteIndex = img.indexOf("=",sIndex) + 1;
                }

                var sStr = img.slice(0,sIndex),
                    styleStr = img.slice(sIndex,styleEndQuoteIndex) + 'border:'+ borderColor + ' solid 2px;',
                    eStr = img.slice(styleEndQuoteIndex);

                return sStr + styleStr + eStr;
            }
            else {
                if(img.indexOf('/>') != -1) {
                    img = img.slice(0,-2);
                }
                else {
                    img = img.slice(0,-1);
                } 
                return img + ' style = '+ '"' + 'border:'+ borderColor + ' solid 2px'+'"' + '/>';
            }
        },

        isOpeningTag: function(item) {
            return /^\s*<[^>]+>\s*$/ig.test(item);
        },

        isClosingTag: function(item) {
            return /^\s*<\/[^>]+>\s*$/ig.test(item);
        },

        isTag: function(item) {
            return this.isOpeningTag(item) ? 1 : this.isClosingTag(item) ? 2 : 0;
        }
    };
    root.getHTMLDiff = function(oldVersion, newVersion) {
        return new DiffBuilder(oldVersion, newVersion).build();
    };
})();
