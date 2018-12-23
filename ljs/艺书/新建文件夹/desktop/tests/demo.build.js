/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = react_need_all;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(120);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(122);

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = (__webpack_require__(0))(5);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(3);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(1);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRouter = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 直接调用 render 函数 ------------------------------
_reactDom2.default.render(_react2.default.createElement(
  'h1',
  null,
  'Hello, world!'
), $('#root0')[0]);

// 创建组件 -----------------------------------------
var data = 'John';
var HelloMessage = _react2.default.createClass({
  displayName: 'HelloMessage',

  render: function render() {
    return _react2.default.createElement(
      'h1',
      { style: { color: '#f00' } },
      'Hello ',
      this.props.name
    );
  },
  // 可选，用于验证参数
  propTypes: {
    name: _react2.default.PropTypes.string.isRequired
  },
  // 可选，设置默认值
  getDefaultProps: function getDefaultProps() {
    return {
      name: 'John'
    };
  }
});

setTimeout(function () {
  _reactDom2.default.render(_react2.default.createElement(HelloMessage, { name: data }), $("#root1")[0]);
}, 100);

// 子组件 ------------------------------------------
var NotesList = _react2.default.createClass({
  displayName: 'NotesList',

  render: function render() {
    return _react2.default.createElement(
      'ol',
      null,
      _react2.default.Children.map(this.props.children, function (child) {
        return _react2.default.createElement(
          'li',
          null,
          child
        );
      })
    );
  }
});

setTimeout(function () {
  _reactDom2.default.render(_react2.default.createElement(
    NotesList,
    null,
    _react2.default.createElement(
      'span',
      null,
      'hello'
    ),
    _react2.default.createElement(
      'span',
      null,
      'world'
    )
  ), $('#root2')[0]);
}, 100);

// 获取真实的DOM节点 -----------------------------------

var MyComponent = _react2.default.createClass({
  displayName: 'MyComponent',

  handleClick: function handleClick() {
    var val = $(this.refs.myTextInput).val();
    $(this.refs.myTextInput).val(val + ' Clicked');
  },
  render: function render() {
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('input', { type: 'text', ref: 'myTextInput' }),
      _react2.default.createElement('input', { type: 'button', value: 'Focus the text input', onClick: this.handleClick })
    );
  }
});

setTimeout(function () {
  _reactDom2.default.render(_react2.default.createElement(MyComponent, null), $('#root3')[0]);
}, 100);

// this.state 与组件状态机------------------------------
/*
getInitialState 方法用于定义初始状态，也就是
一个对象，这个对象可以通过 this.state 属性读取。

this.props 表示那些一旦定义，就不再改变的特性，
而 this.state 是会随着用户互动而产生变化的特性。

this.setState 方法就修改状态值，每次修改以后，
自动调用 this.render 方法，再次渲染组件
*/
var LikeButton = _react2.default.createClass({
  displayName: 'LikeButton',

  getInitialState: function getInitialState() {
    return { liked: false };
  },
  handleClick: function handleClick(event) {
    this.setState({ liked: !this.state.liked });
  },
  render: function render() {
    var text = this.state.liked ? 'like' : 'haven\'t liked';
    return _react2.default.createElement(
      'p',
      { onClick: this.handleClick },
      'You ',
      text,
      ' this. Click to toggle.'
    );
  }
});

setTimeout(function () {
  _reactDom2.default.render(_react2.default.createElement(LikeButton, null), $('#root4')[0]);
}, 100);

// 与用户输入互动——表单数据读取--------------------------------
/*
文本输入框的值，不能用 this.props.value 
读取，而要定义一个 onChange 事件的回调函数，
通过 event.target.value 读取用户输入的值。
*/
var Input = _react2.default.createClass({
  displayName: 'Input',

  getInitialState: function getInitialState() {
    return { value: 'Hello!' };
  },
  handleChange: function handleChange(event) {
    this.setState({ value: $(event.target).val() });
  },
  render: function render() {
    var value = this.state.value;
    return _react2.default.createElement(
      'div',
      null,
      _react2.default.createElement('input', { type: 'text', value: value, onChange: this.handleChange }),
      _react2.default.createElement(
        'p',
        null,
        value
      )
    );
  }
});

_reactDom2.default.render(_react2.default.createElement(Input, null), $('#root5')[0]);

// 五个钩子函数 ----------------------------------------------
/*
◾componentWillMount()
◾componentDidMount()
◾componentWillUpdate(object nextProps, object nextState)
◾componentDidUpdate(object prevProps, object prevState)
◾componentWillUnmount()
*/
var Hello = _react2.default.createClass({
  displayName: 'Hello',

  getInitialState: function getInitialState() {
    return {
      opacity: 1.0
    };
  },

  componentDidMount: function componentDidMount() {
    this.timer = setInterval(function () {
      var opacity = this.state.opacity;
      opacity -= .05;
      if (opacity < 0.1) {
        opacity = 1.0;
      }
      this.setState({
        opacity: opacity
      });
    }.bind(this), 100);
  },

  render: function render() {
    return _react2.default.createElement(
      'div',
      { style: { opacity: this.state.opacity } },
      'Hello ',
      this.props.name
    );
  }
});

_reactDom2.default.render(_react2.default.createElement(Hello, { name: 'world' }), $('#root6')[0]);

// 使用 Promise 更改状态---------------------------

var RepoList = _react2.default.createClass({
  displayName: 'RepoList',

  getInitialState: function getInitialState() {
    return { loading: true, error: null, data: null };
  },

  componentDidMount: function componentDidMount() {
    var _this = this;

    this.props.promise.then(function (value) {
      return _this.setState({ loading: false, data: value });
    }, function (error) {
      return _this.setState({ loading: false, error: error });
    });
  },


  render: function render() {
    if (this.state.loading) {
      return _react2.default.createElement(
        'span',
        null,
        'Loading...'
      );
    } else if (this.state.error !== null) {
      return _react2.default.createElement(
        'span',
        null,
        'Error: ',
        this.state.error.message
      );
    } else {
      var repos = this.state.data.items;
      var repoList = repos.map(function (repo) {
        return _react2.default.createElement(
          'li',
          null,
          _react2.default.createElement(
            'a',
            { href: repo.html_url },
            repo.name
          ),
          ' (',
          repo.stargazers_count,
          ' stars) ',
          _react2.default.createElement('br', null),
          ' ',
          repo.description
        );
      });
      return _react2.default.createElement(
        'main',
        null,
        _react2.default.createElement(
          'h1',
          null,
          'Most Popular JavaScript Projects in Github'
        ),
        _react2.default.createElement(
          'ol',
          null,
          repoList
        )
      );
    }
  }
});

_reactDom2.default.render(_react2.default.createElement(RepoList, {
  promise: new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve({
        items: [{
          name: 'JJ', stargazers_count: 1000, description: 'XXXX.....',
          html_url: 'http:www.baidu.com'
        }, {
          name: 'JJ', stargazers_count: 1000, description: 'XXXX.....',
          html_url: 'http:www.baidu.com'
        }, {
          name: 'JJ', stargazers_count: 1000, description: 'XXXX.....',
          html_url: 'http:www.baidu.com'
        }]
      });
    }, 2000);
  }) }), $('#root7')[0]);

/***/ })
/******/ ]);