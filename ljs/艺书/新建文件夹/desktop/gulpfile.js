"use strict";

const os = require('os');
const fs = require('fs');
const path = require('path');
const platform = os.platform(); // 'darwin'  'win32'
const bits = os.arch();  // 'x64'  'x86' 'x32'
const {exec} = require('child_process');
var specific_modules = null;
var specific = platform + bits;

if(specific == 'win32x64'){
  specific_modules = './dev/win-x64';
}else if(specific == 'win32x32' || specific == 'win32x86'){
  specific_modules = './dev/win-x32';
}else if(specific == 'darwinx64'){
  specific_modules = './dev/mac64';
}else if(specific == 'darwinx32' || specific == 'darwinx86'){
  specific_modules = './dev/mac32';
}else{
  console.error(`平台信息: ${specific} 错误`);
  return;
}

console.log(`平台信息: ${specific_modules}`);

var config = `{
  "name": "Ebookchain",
  "version": "1.0.0",
  "main": "main.js"
}`;

// Load plugins
var gulp = require('gulp'),
    uglify = require('uglify-js-harmony'),
    minifier = require('gulp-uglify/minifier'),
    del = require('del'),
    babel = require('gulp-babel'),
    cssminify = require('gulp-minify-css'),
    htmlmin = require('gulp-htmlmin'),
    img64 = require('gulp-imgbase64'),
    pump = require('pump');

gulp.task('mincss', function() {
    return gulp.src(['./public/**/*.css'])
        .pipe(cssminify())
        .on("error", function(error) {
            console.error(error.toString());
            this.emit("end");
        })
        .pipe(gulp.dest('./__publish/public'));
});

gulp.task('minhtml', function() {
    return gulp.src(['./**/*.html', 
    '!./__publish/**', '!./.git/**', 
    '!./tests/**'
    ,'!./node_modules/**'
    ])
        .pipe(img64())
        .pipe(htmlmin({collapseWhitespace: true}))
        .on("error", function(error) {
            console.error(error.toString());
            this.emit("end");
        })
        .pipe(gulp.dest('./__publish'));
});

gulp.task('minjs', function(cb){
  var options = {
    
  };
  pump([
        gulp.src(['./public/**/*.js'
          , '!./public/webpack.config.js'
          , '!./public/tinymce/**/*'
          , '!./public/libs/**/*'
          , '!./public/langs/**/*'
          , '!./public/js/build/**/*'
        ]),
        minifier(options, uglify),
        gulp.dest('./__publish/public')
    ],
    cb
  );
});

gulp.task('minjs2', function(cb){
  var options = {
  };
  pump([
        gulp.src(['./node_modules/*.js']),
        minifier(options, uglify),
        gulp.dest('./__publish/node_modules')
    ],
    cb
  );
});

gulp.task('min-main', function(cb){
  var options = {
  };
  pump([
        gulp.src(['./main.js']),
        babel({
          "presets": [
            "stage-3"
          ],
          "plugins": []
        }),
        minifier(options, uglify),
        gulp.dest('./__publish')
    ],
    cb
  );
});

gulp.task('s', ['minhtml','mincss', 'minjs', 'minjs2', 'min-main'], function(){
  del.sync([
      './__publish/__publish'
    , './__publish/public/css/style'
    , './__publish/public/css/ebook'
    , './__publish/public/jsx'
    , './__publish/public/js/libs'
    , './__publish/public/manifest.json'
    , './__publish/public/webpack.config.js'
    , './__publish/tests'
    , './__publish/docs'
    , './__publish/data'
    , './__publish/README.md'
    , './__publish/dev'
    , './__publish/.git'
    , './__publish/node_modules/xdesktop-common'
    , './__publish/node_modules/xdesktop-main'
    , './__publish/node_modules/xdesktop-render'
  ]);
  fs.writeFileSync(path.resolve(__dirname, '__publish', 'package.json'), config, 'utf8');
  /*
  将 xrender 和 xmain 拷贝到根目录
  */
  gulp.start('copy-x');
});

gulp.task('copy', function(){
  return gulp.src([
    './**/*'
    , '!./__publish'
    , '!./__publish/**'
    , '!./.git/**'
    , '!./docs/**'
    , '!./dev/**'
    , '!./tests/**'
    , '!./persist/**'
    , '!./.gitignore'
    , '!./gulpfile.js'
    , '!./node_modules/*.js'
    , '!./logs.log'
  ]).pipe(gulp.dest('./__publish'));
});

// 暂时不用这个模块了
// gulp.task('copy-bignum', function(){
//   return gulp.src([
//     `${specific_modules}/bignum/**`
//   ]).pipe(gulp.dest('./__publish/node_modules/bignum'));
// });

// 为了运行 webpack 临时拷贝，之后会删除
gulp.task('copy-x-render', function(){
  return gulp.src([
    `./node_modules/xdesktop-render/**`
  ]).pipe(gulp.dest('./xdesktop-render'));
});

// 为了运行 webpack 临时拷贝，之后会删除
gulp.task('copy-x-main', function(){
  return gulp.src([
    `./node_modules/xdesktop-main/**`
  ]).pipe(gulp.dest('./xdesktop-main'));
});

// 将 html 文件需要的这个 css 拷贝到指定目录
gulp.task('copy-css-main', function(){
  return gulp.src([
    `./__publish/public/css/main.css`
  ]).pipe(gulp.dest('./__publish/public/css/ebook'));
});

// 拷贝完压缩，之后删除
gulp.task('copy-x', ['copy-x-render', 'copy-x-main', 'copy-css-main'], function(){
  
  exec(`webpack --config ./xdesktop-main/webpack.config.js`, function(err, stdout, stderr){
    if(err) {
      console.error(err);
    }else {
      console.log(stderr);
      console.log(stdout);
    }
    // del
    del.sync([
      './xdesktop-main'
    ]);
  });

  exec(`webpack --config ./xdesktop-render/webpack.config.js`, function(err, stdout, stderr){
    if(err) {
      console.error(err);
    }else {
      console.log(stderr);
      console.log(stdout);
    }
    // del
    del.sync([
      './xdesktop-render'
    ]);
  });

  exec(`webpack --config ./node_modules/xdesktop-common/webpack.config.js`, function(err, stdout, stderr){
    if(err) {
      console.error(err);
    }else {
      console.log(stderr);
      console.log(stdout);
    }
  });
});

gulp.task('copy-leveldown', function(){
  return gulp.src([
    `${specific_modules}/leveldown/**`
  ]).pipe(gulp.dest('./__publish/node_modules/leveldown'));
});

gulp.task('copy-specific', ['copy-leveldown'], function(){
  console.log('开始压缩文件...');
  gulp.start('s');
});

// 拷贝非 node_modules 里面的所有文件
gulp.task('copy-else', function(){
  return gulp.src([
    './**/*'
    , '!./node_modules/**'
    , '!./__publish'
    , '!./__publish/**'
    , '!./.git/**'
    , '!./docs/**'
    , '!./dev/**'
    , '!./tests/**'
    , '!./persist/**'
    , '!./.gitignore'
    , '!./gulpfile.js'
    , '!./node_modules/*.js'
    , '!./logs.log'
    , '!./preview.png'
  ]).pipe(gulp.dest('./__publish'));
});

gulp.task('copy-blockchain', function(){
  return gulp.src([
     './node_modules/blockchain/**'
  ]).pipe(gulp.dest('./__publish/node_modules/blockchain'));
});

gulp.task('copy-jsdk', function(){
  return gulp.src([
    './node_modules/js-sdk/**'
  ]).pipe(gulp.dest('./__publish/node_modules/js-sdk'));
});

gulp.task('del', function(){
  console.log('正在删除过去的文件...');
  del.sync([
      './__publish/node_modules/**',
      './__publish/public/**'
    ],{
    force: true
  });
});

gulp.task('copyall', ['copy'], function(){
  gulp.start('copy-specific');
});

// 增量打包
gulp.task('default', ['copy-else', 'copy-blockchain', 'copy-jsdk'], function(){
  console.log('开始压缩文件...');
  gulp.start('s');
});

// 全量打包
gulp.task('rebuild', ['del'], function(){
  console.log('开始复制文件...');
  gulp.start('copyall');
});
