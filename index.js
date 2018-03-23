const fs = require('fs');
const path = require('path');

const walk = dir => {
  let results = [];

  const rootDir = path.resolve(dir);
  const files = fs.readdirSync(rootDir);
  files.forEach(list => {
    list = path.join(rootDir, list)
    const stat = fs.statSync(list);
    if (stat.isDirectory()) {
      results = results.concat(walk(list));
    } 
    if (stat.isFile()) {
      results.push(list);
    }
  });
  return results;
};

const results = walk(path.resolve('src'));
console.log(results.length);

require('./glob').globAsync('src').then(files => { 
  files = files.filter(file => fs.statSync(file).isFile());
  console.log(files.length);
});