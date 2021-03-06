'use strict';

global.$ = {
  gulp: require('gulp'),
  path: {
    tasks: require('./gulp/configs/tasks.js')
  },
  config: require('./gulp/configs/config'),
  gp: require('gulp-load-plugins')(),
  del: require('del'),
  browserSync: require('browser-sync').create(),
  buffer: require('vinyl-buffer'),
  merge: require('merge-stream')
};

$.path.tasks.forEach(function(taskPath) {
  require(taskPath)();
});

$.gulp.task('build',
  $.gulp.series(
    'clean',
    'images:sprite',
    'svg:sprite',

    $.gulp.parallel(
      // 'html',
      'pug',
      'css:vendor',
      'sass',
      'js:vendor',
      // 'js:app-lint',
      'js:app-minify',
      'fonts',
      'images'
    )
  )
);

$.gulp.task('default',
  $.gulp.series(
    'build',

    $.gulp.parallel(
      'watch',
      'serve'
    )
  )
);