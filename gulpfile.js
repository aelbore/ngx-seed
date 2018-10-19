const { TaskConfig  } = require('@ngx-devtools/task');
const { copyFileAsync, readFileAsync, writeFileAsync } = require('@ngx-devtools/common');
const { buildDevLibs, buildDevApp } = require('@ngx-devtools/build');

const { join, basename } = require('path');

class GulpFileTask extends TaskConfig {
  
  constructor() {
    super();
  }

  cleanAll() {
    return Promise.all([ this.cleanDist(), this.cleanTmp() ]);
  }
  
  copyLibs() {
    const libs = [
      "node_modules/.tmp/Rx.min.js",
      "node_modules/.tmp/angular.min.js",
      "node_modules/.tmp/shims.min.js",
      "node_modules/.tmp/systemjs-script.min.js"
    ]
    return Promise.all(libs.map(lib => {
      return copyFileAsync(lib, join('dist', basename(lib)))
    }))
  }

  injectHtmlFile() {
    const filePath = join('dist', 'index.html');
    return readFileAsync(filePath, 'utf8')
      .then(content => {
        content = content.replace('<!-- shims  -->', '<script src="shims.min.js"></script>')
        return writeFileAsync(filePath, content);
      })
  }

  bundle() {
    return this.cleanAll()
      .then(() => Promise.all([ this.build(), buildDevLibs('src/libs'), buildDevApp() ]))
      .then(() => Promise.all([ this.copyLibs(), this.injectHtmlFile() ]))
  }

}

GulpFileTask.registerTasks();
