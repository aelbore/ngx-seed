const gulp = require('gulp');

const { deleteFolderAsync, copyFiles, watcher, getFiles } = require('@ngx-devtools/common');
const { build, onClientFileChanged, vendorBundle, buildAsync, buildProd } = require('@ngx-devtools/build');

const { serverStart, onServerFileChanged } = require('@ngx-devtools/server');

const copyToDist = async () => await copyFiles([ 'src/*.html', 'src/*.js' ], 'dist');

gulp.task('build', () => buildAsync());

gulp.task('bundle', (done) => deleteFolderAsync('dist') .then(() => build()));

gulp.task('default', (done) => {  
  return Promise.all([ copyToDist(), buildAsync() ])
    .then(() => Promise.all([ serverStart(), watcher({ onServerFileChanged, onClientFileChanged }) ]))
});

gulp.task('vendor.bundle', done => vendorBundle()); 