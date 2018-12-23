## 简介

本项目基于 [Create React App](https://github.com/facebookincubator/create-react-app) 创建.
更多信息可查看  [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).



## 安装环境

* **注意: node.js版本 >= 6 ，npm版本 >= 3.**

## 克隆版本库：

```bash
$ git clone http://git.ebookchain.net/Front-End/ebookchain.git

```

然后，安装依赖：

```bash
$ cd ebookchain
$ npm install --registry=https://registry.npm.taobao.org

```
## 运行

```bash
$ npm start
```

## 部署

```bash
$ npm run build
//将服务器地址指向 build 文件夹下的 index.html
```
## 测试

```bash
$ npm run test
```  

## 文档结构

```bash
  ebookchain/
    README.md
    node_modules/
    package.json
    public/
      index.html
      favicon.ico
    src/   
      /assets      /*-----------静态文件 statics----------*/
         /images
         /icons
         /fonts
      /library     /*-----------第三方插件 libs----------*/
      /utils       /*-----------自定义方法,函数----------*/
      /service       /*-----------公用函数或方法----------*/
      /components    /*-----------组件----------*/
          /login
            Login.js
            Login.css    /*-----------用 [css-modules](https://github.com/css-modules/css-modules) ----------*/
          /home
          /...
      App.css
      App.js
      App.test.js
      index.css
      index.js
      logo.svg
``` 
## 自定义配置

```bash
$ npm run eject
// 注: 这是一个不可逆过程, 暴露出配置文件后自行配置

```  