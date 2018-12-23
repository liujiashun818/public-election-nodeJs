// import React from 'react';
// import ReactDOM from 'react-dom';
import tool from '../library/tool'
import config from './apiConfig';

let ip = config.ip;
let port =config.port;
let baseUrl = `http://${ip}:${port}`;
// Post 请求
export function FetchPost(api, data, token) {

  // console.log('fetch post----->')
  let url = baseUrl + api;
  // console.log(url);
  let op = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    },
    method: 'POST',
    body: JSON.stringify(data)
  };

  const defer = new Promise((resolve, reject) => {
    fetch(url, op)
      .then(response => {
        return response.json()
      })
      .then(data => {
        resolve(data)
      })
      .catch(error => {
        //捕获异常
        reject(error)
      })
  })
  return defer
};

// 权限获取
export function FetchAuth(api, token) {

  // console.log('fetch Auth----->')
  let url = baseUrl + api;
  // console.log(url);
  let auth = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': token
    },
    method: 'GET',
  };

  const defer = new Promise((resolve, reject) => {
    fetch(url, auth)
      .then(response => {
        return response.json()
      })
      .then(data => {
        resolve(data)
      })
      .catch(error => {
        //捕获异常
        reject(error)
      })
  })
  return defer
};

// 无权限获取
export function FetchGet(api) {

  // console.log('fetch Get----->');
  let url = baseUrl + api;
  // console.log(url);
  let op = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'GET',
  };

  const defer = new Promise((resolve, reject) => {
    fetch(url, op)
      .then(response => {
        return response.json()
      })
      .then(data => {
        resolve(data)
      })
      .catch(error => {
        //捕获异常
        reject(error)
      })
  })
  return defer
};

export function FetchStandard(url, methodType, param) {
  let myInit = {};
  let _url = {};
    myInit = {
      method:methodType,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': tool.token
      }
    }
  
  let len = objLength(param);
  _url = url;

  if (methodType === 'GET' && len >= 1) {
    _url = requestVerify(param, url);
  } else if (methodType === 'POST') {
    myInit.body = JSON.stringify(param);
  }

  const result = fetch(_url, myInit).then(function (response) {
    // console.log(_url+" "+myInit);
    // if (response.status >= 400) {
    //   throw new Error("Bad response from server..........");
    // }
    return response.json();
  });

  return result;
}


var requestVerify = (obj, url) => {
  let _url = url + '?';
  for (let p in obj) {
    _url += p + "=" + obj[p] + "&";
  }
  return _url.substring(0, _url.length - 1);
}

var objLength = (o) => {
  var t = typeof o;
  if (t === 'string') {
    return o.length;
  } else if (t === 'object') {
    var n = 0;
    for (var i in o) {
      n++;
    }
    return n;
  }
  return false;
}
