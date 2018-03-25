'use strict';

const browserSync = require('browser-sync').create();
const gulp = require('gulp');
const gutil = require('gulp-util');

gulp.task('serve', [], () => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  browserSync.init({
    server: {
      baseDir: 'src',
      https: true,
      online: true
    },
    ghostMode: false,
    open: false,
    middleware: [(req, res, next) => {
      gutil.log(req.url);
      if (req.url.indexOf('main.js') > 0) {
        gutil.log(true);
        res.setHeader('Content-Type', 'text/javascript');
        // res.setHeader('Content-Type', 'text/javascript');
      }
      next();
    }]
  });

  gulp.watch(['src/js/**/*.js', 'src/index.html'], { interval: 1000 }, browserSync.reload);
  gulp.watch(['src/css/**/*.css'], { interval: 1000 }, () => {
    return gulp.src('src/css/**/*.css').pipe(browserSync.stream());
  });
});
