const { copyFiles, readFileAsync, writeFileAsync, getFiles, mkdirp } = require('@ngx-devtools/common');

const path = require('path');

const others = (folder) => {
  return [
    path.join(path.resolve('.tmp'), folder, 'packge.json')
  ]
};

const copyFolders = (folder, dest) => {
  const files = getFiles([ `.tmp/${folder}/esm2015/**/*.d.ts`, `.tmp/${folder}/esm2015/*.json` ]);
  const paths = files.map(file => {
    const values = [];
    file.forEach(value => values.push(value));
    return values.join(',');
  })
  .join(',')
  .split(',');
  return Promise.all(paths.map(pathFile => {
    const destPath = pathFile.replace('.tmp', dest).replace('esm2015', '');
    mkdirp(path.dirname(destPath));
    return readFileAsync(pathFile)
      .then(content => writeFileAsync(destPath, content));
  }));
};

const folders = [ 'main', 'about', 'home' ];

Promise.all(folders.map(folder => copyFolders(folder, 'dist')))





