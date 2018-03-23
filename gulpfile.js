const gulp = require('gulp');

const { deleteFolderAsync, streamToPromise, copyFiles } = require('@ngx-devtools/common');
const { build, buildRxjs } = require('@ngx-devtools/build');

const buildAsync = () => deleteFolderAsync('dist').then(() => build());
const copyToDist = () => copyFiles([ 'src/*.html', 'src/*.js' ], 'dist');

gulp.task('build', () => buildAsync());

gulp.task('default', () => {  
  return deleteFolderAsync('dist')
    .then(() => Promise.all([ copyToDist(), build() ])); 
});

gulp.task('build:rxjs', done => buildRxjs(done));