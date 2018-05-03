const gulp = require('gulp');

const { deleteFolderAsync, copyFiles, watcher } = require('@ngx-devtools/common');
const { build, onClientFileChanged, vendorBundle, buildAsync } = require('@ngx-devtools/build');

const { serverStart, onServerFileChanged } = require('@ngx-devtools/server');

gulp.task('build', () => buildAsync());

gulp.task('bundle', (done) => {
  return deleteFolderAsync('dist').then(() => build());
});

gulp.task('default', (done) => {  
  return Promise.all([ copyFiles([ 'src/*.html', 'src/*.js' ], 'dist'), buildAsync() ])
    .then(() => Promise.all([ serverStart(), watcher({ onServerFileChanged, onClientFileChanged }) ]))
});

gulp.task('vendor.bundle', done => vendorBundle()); 