const gulp = require('gulp');

const { deleteFolderAsync, streamToPromise } = require('@ngx-devtools/common');
const { build } = require('@ngx-devtools/build');

const copyFiles = () => {
  return streamToPromise(gulp.src([ 'src/index.html', 'src/systemjs.config.js' ])
      .pipe(gulp.dest('dist'))
  );
};

const buildAsync = () => deleteFolderAsync('dist').then(() => build());

gulp.task('build', () => buildAsync());

gulp.task('default', () => {  
  return deleteFolderAsync('dist')
    .then(() => Promise.all([ copyFiles(), build() ])); 
});