const gulp = require('gulp');

const { deleteFolderAsync } = require('@ngx-devtools/common');
const { build } = require('@ngx-devtools/build');

gulp.task('build', () => deleteFolderAsync('dist').then(() => build()));
