const gulp = require('gulp');

const { deleteFolderAsync, streamToPromise, copyFiles } = require('@ngx-devtools/common');
const { build, buildRxjs } = require('@ngx-devtools/build');
const { bundle } = require('@ngx-devtools/bundle');

const { serverStart } = require('@ngx-devtools/server');

const buildAsync = () => deleteFolderAsync('dist').then(() => build());
const copyToDist = () => copyFiles([ 'src/*.html', 'src/*.js' ], 'dist');

gulp.task('build', () => buildAsync());

gulp.task('default', () => {  
  return deleteFolderAsync('dist')
    .then(() => Promise.all([ copyToDist(), build() ]))
    .then(() => serverStart()); 
});

gulp.task('build:rxjs', done => buildRxjs(done));

gulp.task('bundle', done => build());