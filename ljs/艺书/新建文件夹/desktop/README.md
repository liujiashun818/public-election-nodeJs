# Ebook Desktop

### 开发说明

#### 运行工程

1.在相同目录——例如 `C:\` 下将 desktop、blockchain、ebookchain-js 代码拉取下来
 `C:\desktop`
 `C:\blockchain`
 `C:\ebookchain-js`

2.新建一个 `node_modules` 目录，将它与第一步三个工程目录为兄弟目录。
3.分别在 `blockchain` 和 `ebookchain-js` 中建立一个软连接，命名为 `node_modules`，指向第二步的 `node_modules` 目录。例如 Windows 上使用 `mklink /D link_name target_name` 建立软连接。
4.分别进入 `blockchain` 和 `ebookchain-js` 目录，运行 `npm install --registry=https://registry.npm.taobao.org`。模块全部安装到第二步建立的目录中。
5.返回上级目录，即第一步中的目录。运行
```
npm install webpack@2.2.1 gulp babel-core babel-polyfill babel-loader babel-preset-es2015 babel-preset-react css-loader style-loader url-loader babel-preset-stage-3 babel-plugin-transform-runtime --registry=https://registry.npm.taobao.org

npm install react@15.4.2 react-dom@15.4.2 react-router@3.0.2 redux@3.6.0 react-redux@5.0.2 redux-promise-middleware@4.2.0 redux-thunk@2.2.0 --registry=https://registry.npm.taobao.org

npm install material-ui@0.17.0 react-tap-event-plugin react-paginate@4.4.2 react-codemirror@0.3.0 react-markdown@2.5.0 classnames@2.2.5 --registry=https://registry.npm.taobao.org

```
以上模块并非客户端运行时需要，请不要安装到客户端的node_modules里面。
6.全局安装 `gulp`、`webpack` 。运行
```
npm install webpack@2.2.1 gulp -g --registry=https://registry.npm.taobao.org
```
在命令行下运行 ` webpack --version` 显示
```
2.2.1
```
代表 `webpack` 安装成功。运行 `gulp -v` 显示版本号，表示 `gulp` 安装成功。

7.安装 js-sdk 与 blockchain 两个模块

请参考这两个工程的 readme.md
*[注意]* 请不要把 webpack、stage-3  等包安装到本工程的 `node_modules` 目录里，建议在上级目录安装一个`node_modules` 然后所有工程的 node_modules 指向这个文件夹，避免重复安装模块。

8.全局安装electron，运行 npm install electron@1.6.2 -g
在命令行运行 `electron -v`，显示
```
v1.6.2
```
代表安装成功

9.编译源码——进入 desktop ，先进入dev 目录，运行 `gulp`；再进入 public 目录运行 `webpack`

10.启动项目
进入 desktop 目录，运行 electron main.js


#### 关于C++ 模块编译
如果你不是Win64 系统，需要亲自编译几个 C++ 模块，相关文档：
```
https://github.com/electron/electron/blob/master/docs-translations/zh-CN/tutorial/using-native-node-modules.md
```

客户端需要两个 C++ 模块，Windows 区分 32 位 64 位。mac 版应该就是 64 位。`win-x64` 版本已经编译好。如果你编译好了 win-x32 或者 mac 版本的，请放入 dev 目录，参考 dev/win-x64 文件夹。需要编译的模块是 `leveldown`。打包程序会选择合适的平台和位数的模块。
**注意**： 放入dev的 C++ 模块代表已经编译好，上传前请将编译过程生成的符号文件去掉，只保留代码和 *.node 文件。


#### ed25519(已废弃) & LevelDOWN 编译(win-x64 已编译好，略过)

1. 密钥签名我们使用 ed25519 ，因为 electron 使用的 V8 与 node 不同，因此需要单独为特定版本的 electron 编译此模块，首先全局安装好了 electron。

2. 进入到 ed25519 目录，运行 node-gyp rebuild --target=1.6.2 --openssl-root="C:/OpenSSL-Win64" --arch=x64 --dist-url=https://atom.io/download/electron

--target=1.6.2 为 electron 版本号，具体版本号应该与第一步骤一致

注意：windows 64位可以不用亲自编译，master 分支默认安装的是这个版本。 32位和mac上的未编译。

#### bignum编译(win-x64 已编译好，略过)
还需要全局安装：
`npm install node-pre-gyp -g`

node-pre-gyp rebuild --target=1.6.2 --openssl-root="C:/OpenSSL-Win64" --target_arch=x64 --dist-url=https://atom.io/download/electron

#### leveldown 编译32位
node-gyp rebuild --target=1.6.2 --arch=ia32 --dist-url=https://atom.io/download/electron

#### Less编译
```
$> cd PATH-TO-Ebook-DESKTOP-APP/dev
$> npm install
$> gulp dev
```

#### 使用`gulp`生成发布版

第一次打包，需要运行 `gulp rebuild` 等待命令执行完成，在 `__publish` 目录下生成发布版。
以后，如果没有安装新的第三方模块，运行 `gulp` 在 `__publish` 目录下生成发布版。生成好 `__publish` 之后，将里面的内容拷贝到 electron 的 app 文件夹里面即可。

使用 asar 打包：
具体参考：
https://github.com/electron/electron/blob/master/docs-translations/zh-CN/tutorial/application-packaging.md

### 服务端接口文档

参考服务端项目的`readme.md`