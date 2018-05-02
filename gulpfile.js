const gulp = require('gulp');
const path = require('path');

const { deleteFolderAsync, copyFiles, watcher, getFiles } = require('@ngx-devtools/common');
const { build, onClientFileChanged, vendorBundle, buildAsync, rollup } = require('@ngx-devtools/build');

const { serverStart, onServerFileChanged } = require('@ngx-devtools/server');

gulp.task('build', () => buildAsync());

gulp.task('bundle', (done) => {
  return deleteFolderAsync('dist') .then(() => build());
});

gulp.task('default', (done) => {  
  return Promise.all([ copyFiles([ 'src/*.html', 'src/*.js' ], 'dist'), buildAsync() ])
    .then(() => Promise.all([ serverStart(), watcher({ onServerFileChanged, onClientFileChanged }) ]))
});

gulp.task('vendor.bundle', done => vendorBundle()); 

gulp.task('rollup', (done) => rollup(path.resolve('.tmp/main'), 'dist'));