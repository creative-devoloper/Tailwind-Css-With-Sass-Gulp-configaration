const { parallel, series, dest, src, watch } = require('gulp');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const cleanCSS = require('gulp-clean-css');
const sass = require('gulp-sass')(require('sass'));
const rename = require("gulp-rename"); 


function css() {
  return src('./src/**/*.scss')
    .pipe( sourcemaps.init() )
    .pipe( sass().on('error', sass.logError) )
    .pipe( postcss() )
    .pipe( cleanCSS() )
    .pipe( rename({ extname: '.min.css' }) )
    .pipe( sourcemaps.write('.') )
    .pipe( dest('./dist') );    
}

function sees() {
  return watch(['./src/**/*.scss', './*.html'], parallel( css ) );
}

exports.default = parallel( css );

exports.watch = series( css, sees );    