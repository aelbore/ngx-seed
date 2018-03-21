const gulp = require('gulp');

const { deleteFolderAsync, streamToPromise, copyFiles } = require('@ngx-devtools/common');
const { build } = require('@ngx-devtools/build');

const buildAsync = () => deleteFolderAsync('dist').then(() => build());
const copyToDist = () => copyFiles([ 'src/index.html', 'src/systemjs.config.js' ], 'dist');

gulp.task('build', () => buildAsync());

gulp.task('default', () => {  
  return deleteFolderAsync('dist')
    .then(() => Promise.all([ copyToDist(), build() ])); 
});