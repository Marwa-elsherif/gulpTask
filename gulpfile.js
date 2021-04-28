const gulp = require("gulp");
const { src, dest, watch, parallel, series } = require("gulp")

////images minification
const imagemin = require('gulp-imagemin');
function imgMinify() {
    return src('src/pics/*')
        .pipe(imagemin())
        .pipe(gulp.dest('dist/images'));
}

exports.img = imgMinify

//html minification

const htmlmin = require('gulp-htmlmin');
function copyHtml() {
    return src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest('dist'))
}

exports.html = copyHtml


//js minification
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const babel = require("gulp-babel")
function jsMinify() {
    return src('src/js/**/*.js',{sourcemaps:true}) 
    
        
        .pipe(concat('all.min.js'))
        .pipe(
            babel()
          )
        
        .pipe(terser())
   
        .pipe(dest('dist/assets/js',{sourcemaps:'.'}))
}
exports.js = jsMinify


//css minification

var cleanCss = require('gulp-clean-css');
function cssMinify() {
    return src("src/css/**/*.css")
        .pipe(concat('style.min.css'))
        .pipe(cleanCss())
        .pipe(dest('dist/assets/css'))
}
exports.css = cssMinify

//sass minification
var sass = require('gulp-sass');
function sassMinify() {
    return src(["src/sass/**/*.scss", "src/css/**/*.css"],{sourcemaps:true})
        .pipe(sass()) 
        .pipe(concat('style.sass.min.css'))
        .pipe(cleanCss())
        .pipe(dest('dist/assets/css',{sourcemaps:'.'}))
}
exports.scss=sassMinify

//creating browser
var browserSync = require('browser-sync');
function serve (cb){
  browserSync({
    server: {
      baseDir: 'dist/'
    }
  });
  cb()
}
function reloadSync(cb){
 browserSync.reload()
  cb()
}

//watch task
function watchTask() {
    watch('src/*.html',series(copyHtml, reloadSync))
    watch(['src/js/**/*.js', "src/css/**/*.css","src/sass/**/*.scss"], { interval: 1000 },parallel(jsMinify,sassMinify,reloadSync));
}
exports.default = series(parallel(imgMinify, jsMinify , cssMinify , sassMinify, copyHtml), serve,watchTask)




