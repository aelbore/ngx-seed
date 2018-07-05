const util = require('util');
const path = require('path');
const fs = require('fs');

const { inlineSources, readPackageFile } = require('@ngx-devtools/build');
const { readFileAsync, writeFileAsync, mkdirp, readdirAsync } = require('@ngx-devtools/common');
const { rollup } = require('rollup');

const typescript = require('rollup-plugin-typescript2');
const multiEntry = require('rollup-plugin-multi-entry');

const getSrcDirectories = () => {   
  const getSource = (directory) => {
    return (util.isString(directory)) 
      ? { src: directory.replace('/**/*.ts', ''), dest: 'dist' }
      : { src: directory.src.replace('/**/*.ts', ''), dest: directory.dest }
  };
  const readdir = (srcDir) => {
    return readdirAsync(srcDir)
      .then(files => {
        const filePath = (file) => path.join(path.resolve(), srcDir, file);
        const directories = files.filter(file => fs.statSync(filePath(file)).isDirectory());
        return directories.map(directory => getSource(path.join(srcDir, directory, 'package.json')));
      });
  };
  return readdir('src/elements');
};

const rollupConfig = {
  input: {
    treeshake: true,
    plugins: [
      multiEntry(),
      typescript({ 
        useTsconfigDeclarationDir: true,
        check: false,
        cacheRoot: path.resolve('node_modules/.tmp/.rts2_cache')
      })
    ],
    onwarn (warning) {
      if (warning.code === 'THIS_IS_UNDEFINED') { return; }
      console.log("Rollup warning: ", warning.message);
    },
    external: [
      "@angular/core", 
      "@angular/http", 
      "@angular/forms", 
      "@angular/common", 
      '@angular/common/http',
      "@angular/router", 
      '@angular/animations',
      "@angular/platform-browser/animations",
      "@angular/platform-browser",
      "@angular/platform-browser-dynamic",
      "@angular/elements",
      "Rx",
      "rxjs",
      "rxjs/ajax",
      "rxjs/operators",
      "rxjs/testing",
      "rxjs/webSocket",
      "rxjs/internal-compatibility",
      "rxjs-compat"
    ]
  },
  output: {
    sourcemap: true,
    name: 'elements',
    format: 'umd',
    file: 'dist/elements/bundles/elements.umd.js',
    exports: 'named',
    globals: {
      "@angular/core": "ng.core",
      "@angular/common": "ng.common",
      "@angular/forms": "ng.forms",
      "@angular/router": "ng.router",
      "@angular/http": "ng.http",  
      '@angular/animations': 'ng.animations',
      '@angular/common/http': 'ng.common.http',
      "@angular/platform-browser/animations": "ng.platformBrowser.animations",
      "@angular/platform-browser": "ng.platformBrowser",
      "@angular/platform-browser-dynamic": "ng.platformBrowserDynamic",
      "@angular/elements": "ng.elements",
      "Rx": "Rx",
      "rxjs": "rxjs",
      "rxjs/ajax": "rxjs.ajax",
      "rxjs/operators": "rxjs.operators",
      "rxjs/testing": "rxjs.testing",
      "rxjs/webSocket": "rxjs.webSocket",
      "rxjs/internal-compatibility": "rxjs.internal.compatibility",
      "rxjs-compat": "rxjs.compat"
    }
  }
}

getSrcDirectories()
  .then(pkgFiles => {
    return Promise.all(pkgFiles.map(pkgFile => {
      return readPackageFile(pkgFile.src)
        .then(pkgName => inlineSources(pkgFile.src, pkgName))
        .then(tmpSrc => path.join(tmpSrc, 'src', 'index.ts'))
    }))
  }).then(inputs => {
    return rollup({ ...rollupConfig.input, ...{ input: inputs } })
      .then(bundle => bundle.generate(rollupConfig.output))
      .then(({ code, map }) => {
        const file = rollupConfig.output.file;
        mkdirp(path.dirname(file));
        return Promise.all([
          writeFileAsync(file, code + `\n//# sourceMappingURL=${path.basename(file)}.map`),
          writeFileAsync(file + '.map', map.toString())
        ]);
      });
  }).catch(error => console.log(error));
  




