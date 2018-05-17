const gulp = require('gulp');

const { deleteFolderAsync, copyFile, getFiles, mkdirp, watcher } = require('@ngx-devtools/common');
const { build, onClientFileChanged, vendorBundle, buildRxjs } = require('@ngx-devtools/build');

const { serverStart, onServerFileChanged } = require('@ngx-devtools/server');

const copyFiles = () => {  
  const files = getFiles([ 'src/*.html', 'src/*.js' ])
    .map(file => file.join(',')).join(',').split(',');
  mkdirp('dist');
  return Promise.all(files.map(file => copyFile(file, file.replace('src', 'dist'))));
};

gulp.task('build', done => build());

gulp.task('default', done => {  
  return Promise.all([ copyFiles(), build() ])
    .then(() => Promise.all([ serverStart(), watcher({ onClientFileChanged: onClientFileChanged }) ]))
});

gulp.task('vendor.bundle', done => vendorBundle()); 