const fs = require('fs');
const path = require('path');
const sass = require('node-sass');
const mkdirp = require('mkdirp');

const promisify = require('util').promisify;

const readFileAsync = promisify(fs.readFile);
const writeFileAsync  = promisify(fs.readFile);

const { walkSync } = require('@ngx-devtools/common');

const getDir = (src) => {
  const sourceFiles = (Array.isArray(src)) ? src : [ src ];
  return sourceFiles.map(file => {
    return { 
      dir: path.dirname(file).replace('/**', ''),
      isRecursive: file.includes('**'),
      includes: [ path.extname(file) ]
    };
  })
};

const getSource = (file) => {
  return file.replace(path.resolve() + '/', '').split('/')[0];
};

const buildSass = (content, sourceFile) => {
  try {
    return styleFile.endsWith('.scss') ? 
      sass.renderSync({ data: content, file: sourceFile })
        .css.toString() : content;
  } catch (e) {
    console.error('\x1b[41m');
    console.error('at ' + sourceFile + ':' + e.line + ":" + e.column);
    console.error(e.formatted);
    console.error('\x1b[0m');
    return "";
  }
}

const inlineTemplate = (content, urlResolver) => {
  return content.replace(/templateUrl:\s*'([^']+?\.html)'/g, function (m, templateUrl) {
    const templateFile = urlResolver(templateUrl);
    const templateContent = fs.readFileSync(templateFile, 'utf-8');
    const shortenedTemplate = templateContent
      .replace(/([\n\r]\s*)+/gm, ' ')
      .replace(/"/g, '\\"');
    return `template: "${shortenedTemplate}"`;
  });
};

const inlineStyle = (content, urlResolver) => {
  return content.replace(/styleUrls\s*:\s*(\[[\s\S]*?\])/gm, function (m, styleUrls) {
    const urls = eval(styleUrls);
    return 'styles: ['
      + urls.map(styleUrl => {
        const styleFile = urlResolver(styleUrl);
        const originContent = fs.readFileSync(styleFile, 'utf-8');
        const styleContent = buildSass(originContent, styleFile);
        const shortenedStyle = styleContent
          .replace(/([\n\r]\s*)+/gm, ' ')
          .replace(/"/g, '\\"');
        return `"${shortenedStyle}"`;
      })
      .join(',\n')
      + ']';
  });
};

const inlineResourcesFromString = (content, urlResolver) => {
  return [ inlineTemplate, inlineStyle].reduce((content, fn) => fn(content, urlResolver), content);
};

const copyFileAsync = (file, dest) => {
  const destPath = file.replace(getSource(file), dest);
  const dirBaseName = path.dirname(destPath);
  mkdirp.sync(dirBaseName);
  return readFileAsync(file, 'utf8')
    .then(content => inlineResourcesFromString(content, url => path.join(path.dirname(destPath), url)))
    .then(content => writeFileAsync(destPath, content));
};

const copyFilesAsync = (files, dest) => {
  return Promise.all(files.map(file => copyFileAsync(file, dest)));
};

const inlineSources = (src, dest) => {
  const files = getDir(src).map(directory => walkSync({ 
    dir: directory.dir, 
    isRecursive: directory.isRecursive, 
    includes: directory.includes 
  }));
  return Promise.all(files.map(file => copyFilesAsync(file, dest)));
};

inlineSources('src/**/*.ts', 'dist').catch(error => console.log(error));