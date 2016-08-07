/*
  Based on Catherine Meyers @ https://github.com/ccmeyers/shopify-timber-gulp-setup
*/

/*============================================================================
  Packages
==============================================================================*/
// General
var gulp         = require('gulp');
var watch        = require('gulp-watch');
var notify       = require("gulp-notify");
// Sass
var scsslint     = require('gulp-scss-lint');
var concat       = require('gulp-concat');
var postcss      = require('gulp-postcss');
var syntax       = require('postcss-scss'); //add scss parsing support to postcss
var autoprefixer = require('autoprefixer');
var shopifyVar   = require('postcss-shopify-settings-variables')
// JS
var webpack      = require('webpack-stream');
// SVG
var svgstore     = require('gulp-svgstore');
var svgmin       = require('gulp-svgmin');
// Shopify Specific
var gulpShopify  = require('gulp-shopify-upload');
var config       = require('./config.json'); // Grabs your API credentials

var basePath = './source/';
var themePath = './shop/';

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: "Compile Error",
    message: "<%= error %>"
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
}

/*============================================================================
  Scss Compilation
==============================================================================*/
gulp.task('styles', function() {
  var sassSources = [
    basePath +'scss/*/*/*.scss',
    basePath +'scss/*/*.scss',
    basePath +'scss/*.scss',
  '!'+basePath +'scss/theme.scss'];

  gulp.src(sassSources)
    .on('error', handleErrors)
    .pipe(concat('timber.scss.liquid'))
    .pipe( postcss([ autoprefixer, shopifyVar ], { syntax: syntax }) )
    .pipe(gulp.dest(themePath + 'assets/'));
});

gulp.task('scss-lint', function() {
    gulp.src([basePath + 'scss/**/*.scss', basePath + '!scss/vendor/**/*.scss'])
        .pipe(cache('scss-lint'))
        .pipe(scsslint({
            'config': 'scss-lint.yml'
        }));
});


/*============================================================================
  JS Compilation
==============================================================================*/
gulp.task('scripts', function() {
  return gulp.src(basePath + 'js/bundles/global/global.js')
      .pipe(webpack(require('./webpack.config.js')))
      .pipe(gulp.dest(themePath + 'assets/'));
});

/*============================================================================
  SVG Compilation
==============================================================================*/
gulp.task('svg', function() {
    return gulp.src(basePath + 'svg/**/*.svg')
    .pipe(svgstore({
        fileName: 'symbols.svg',
        transformSvg: function (svg, cb) {
            svg.find('[fill]').removeAttr('fill');
            cb(null);
        }
    }))
    .pipe(gulp.dest(themePath + 'assets/'));
});


/*============================================================================
  Asset Watch
==============================================================================*/
gulp.task('watch', function () {
  gulp.watch(basePath + 'scss/**/*.scss', ['styles']);
  gulp.watch(basePath + 'js/**/*.js', ['scripts']);
  gulp.watch(basePath + 'svg/*.svg}', ['svg']);
});


/*============================================================================
  Shopify Theme Sync
==============================================================================*/
var shopifyOptions = {
  "basePath": themePath
};

gulp.task('shopifywatch', function() {
  return watch('./shop/+(assets|layout|config|snippets|templates|locales)/**')
  .pipe(gulpShopify(config.shopify_api_key, config.shopify_api_password, config.shopify_url, null, shopifyOptions));
});

gulp.task('deploy', ['styles', 'scripts', 'svg'], function() {
  return gulp.src('./shop/+(assets|layout|config|snippets|templates|locales)/**')
    .pipe(gulpShopify(config.shopify_api_key, config.shopify_api_password, config.shopify_url,  null, shopifyOptions));
});


/*============================================================================
  Default Gulp task, runs on `gulp`
==============================================================================*/
gulp.task('default', ['shopifywatch', 'watch']);
