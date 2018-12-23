'use strict';

var fs = require('fs')
var path = require('path')
var gulp = require('gulp')
var gutil = require('gulp-util')
var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');
var styleDir = '../public/themes';
var styleDir2 = '../public/css';

var watching = false;

gulp.task('copy', function(){
  return gulp.src([
    styleDir2 + '/ebook/main.css'
  ]).pipe(gulp.dest(styleDir2));
});

// 解析less
gulp.task('less', function() {
    gulp.src(styleDir + '/**/*.less')
        .pipe(less())
        .pipe(cleanCSS({compatibility: 'ie8', processImportFrom: ['!icon/iconfont.css', '!inhope-icon/style.css']}))
        .pipe(gulp.dest(styleDir));

    gulp.src(styleDir2 + '/**/*.less')
        .pipe(less())
        .pipe(cleanCSS({compatibility: 'ie8', processImportFrom: ['!icon/iconfont.css', '!inhope-icon/style.css']}))
        .pipe(gulp.dest(styleDir2));

    gutil.log(gutil.colors.green('less ok'));
});

// 开发服务
gulp.task('dev', ['less'], function() {
  if(!watching) {
    watching = true;
    gulp.watch(styleDir + '/**/*.less', ['dev']);
    gulp.watch(styleDir2 + '/**/*.less', ['dev']);
  }
  //
  gulp.start('copy');
});

gulp.task('default', ['less'], function(){
  gulp.start('copy');
});
