const gulp         = require('gulp'),

      autoprefixer = require('gulp-autoprefixer');
      concat       = require('gulp-concat');
      connect      = require('gulp-connect'),
      del          = require('del'),
      glob         = require('gulp-sass-glob'),
      merge        = require('merge-stream'),
      partials     = require('gulp-html-partial');
      permalinks   = require('gulp-permalinks');
      sass         = require('gulp-sass');

var paths = {
  html: {
    src: ['./src/**/*.html', '!src/partials/*'],
    index: './src/index.html',
    pages: ['./src/**/*.html', '!src/index.html', '!src/partials/*'],
    partials: './src/partials/',
    // excludePartials: '!src/partials/*',
    dest: './dist'
  },
  images: {
    src: './src/images/**/*',
    dest: './dist/images'
  },
  stylesheets: {
    src: './src/stylesheets/**/*.scss',
    dest: './dist/stylesheets'
  },
  javascripts: {
    src: './src/javascripts/scripts.js',
    dest: './dist/javascripts'
  }
};

function serve(done) {
  connect.server({
    root: './dist',
    livereload: true
  });
  done();
};

function clean() {
  return del(['./dist']);
}

function watch(done) {
  gulp.watch(paths.html.src, html);
  gulp.watch(paths.images.src, images);
  gulp.watch(paths.stylesheets.src, stylesheets);
  gulp.watch(paths.javascripts.src, javascripts);
  done();
};

function html() {
  var src = gulp
    .src(paths.html.src)
    .pipe(partials({
      basePath: paths.html.partials
    }))
  ;

  var index = gulp
    .src(paths.html.index)
    .pipe(gulp.dest(paths.html.dest))
  ;

  var pages = gulp
    .src(paths.html.pages)
    .pipe(permalinks(':stem/index.html'))
    .pipe(gulp.dest(paths.html.dest))
  ;

  var mergedStream = merge(src, index, pages)
    .pipe(connect.reload())
  ;

  return mergedStream;
};

function images() {
  return gulp
    .src(paths.images.src)
    .pipe(gulp.dest(paths.images.dest))
    .pipe(connect.reload())
};

function stylesheets() {
  return gulp
    .src(paths.stylesheets.src)
    .pipe(glob())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(concat('styles.css'))
    .pipe(gulp.dest(paths.stylesheets.dest))
    .pipe(connect.reload())
};

function javascripts() {
  return gulp
    .src(paths.javascripts.src)
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(paths.javascripts.dest))
    .pipe(connect.reload())
};

const build = gulp.series(clean, gulp.parallel(html, images, stylesheets, javascripts));

exports.build = build;
exports.clean = clean;
exports.serve = serve

exports.default = gulp.series(build, serve, watch);
