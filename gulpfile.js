'use strict';

const browserSync = require('browser-sync').create();
const gulp = require('gulp');

gulp.task('serve', [], () => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  browserSync.init({
    server: {
      baseDir: 'src',
      https: true,
      online: true
    },
    ghostMode: false,
    open: false
  });

  gulp.watch(['src/js/**/*.js', 'src/index.html'], { interval: 1000 }, browserSync.reload);
  gulp.watch(['src/css/**/*.css'], { interval: 1000 }, () => {
    return gulp.src('src/css/**/*.css').pipe(browserSync.stream());
  });
});
