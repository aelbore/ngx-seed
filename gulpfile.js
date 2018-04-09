const gulp = require('gulp');

const { deleteFolderAsync, streamToPromise, copyFiles, watcher, concatAsync } = require('@ngx-devtools/common');
const { build, buildRxjs, onClientFileChanged } = require('@ngx-devtools/build');
const { bundle } = require('@ngx-devtools/bundle');

const { serverStart, onServerFileChanged } = require('@ngx-devtools/server');

const buildAsync = async () => await deleteFolderAsync('dist').then(() => build());
const copyToDist = async () => await copyFiles([ 'src/*.html', 'src/*.js' ], 'dist');

gulp.task('build', () => buildAsync());

gulp.task('default', () => {  
  return deleteFolderAsync('dist')
    .then(() => Promise.all([ copyToDist(), build() ]))
    .then(() => Promise.all([ serverStart(), watcher({ onServerFileChanged, onClientFileChanged }) ]))
});

gulp.task('vendor.bundle', done => { 
  const dest = 'node_modules/.tmp';
  const concatParams = [[ 
    'node_modules/core-js/client/shim.min.js', 
    'node_modules/systemjs/dist/system.js',
    'node_modules/zone.js/dist/zone.min.js' 
  ], dest, 'vendor.min.js' ];
  const angularParams = [[
    'node_modules/@angular/core/bundles/core.umd.min.js',
    'node_modules/@angular/common/bundles/common.umd.min.js',
    'node_modules/@angular/compiler/bundles/compiler.umd.min.js',
    'node_modules/@angular/platform-browser/bundles/platform-browser.umd.min.js',
    'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js',
    'node_modules/@angular/router/bundles/router.umd.min.js'
  ], dest, 'ng.bundle.min.js' ];
  return deleteFolderAsync('node_modules/.tmp')
    .then(() => Promise.all([ buildRxjs(done), concatAsync(...concatParams), concatAsync(...angularParams) ]) );
}); 