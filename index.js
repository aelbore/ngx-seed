const fs = require('fs');
const path = require('path');

const getFiles = (dir, [],  ignores = []) => {
  const rootDir = path.resolve(dir);
  return new Promise((resolve, reject) => {
    const glob = require('./glob');
    glob(rootDir, [], (error, results) => {
      if (error) reject();
      resolve(results);
    });
  });
};

getFiles(path.resolve('src'))
  .then(files => console.log(files));