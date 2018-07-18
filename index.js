const { buildAll, onClientFileChanged } = require('@ngx-devtools/build');
const { clean, watcher, copyFiles } = require('@ngx-devtools/common');
const { serverStart  } = require('@ngx-devtools/server');

const options = {
  src: 'src/libs/about/**/*.ts',
  dest: 'dist'
}

const copyAssets = () => {
  const srcConfigs = [{ src: 'src/*.html', dest: 'dist' }];
  return Promise.all(srcConfigs.map(config => {
    return copyFiles(config.src, config.dest);
  }));
}

Promise.all([ clean('.tmp'), clean(options.dest)  ])
  .then(() => Promise.all([ copyAssets(), buildAll() ]))
  .then(() => Promise.all([ serverStart(), watcher({ onClientFileChanged })  ]))
  .catch(error => console.log(error));
