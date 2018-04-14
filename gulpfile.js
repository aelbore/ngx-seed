const gulp = require('gulp');

const { deleteFolderAsync, copyFiles, watcher } = require('@ngx-devtools/common');
const { build, onClientFileChanged, vendorBundle } = require('@ngx-devtools/build');
const { bundle } = require('@ngx-devtools/bundle');

const { serverStart, onServerFileChanged } = require('@ngx-devtools/server');

const buildAsync = async () => await deleteFolderAsync('dist').then(() => build());
const copyToDist = async () => await copyFiles([ 'src/*.html', 'src/*.js' ], 'dist');

gulp.task('build', () => buildAsync());

gulp.task('default', (done) => {  
  return deleteFolderAsync('dist')
    .then(() => Promise.all([ copyToDist(), build() ]))
    .then(() => Promise.all([ serverStart(), watcher({ onServerFileChanged, onClientFileChanged }) ]))
});

gulp.task('vendor.bundle', done => vendorBundle()); 