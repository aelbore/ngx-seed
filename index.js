const util = require('util');
const path = require('path');

const { inlineSources } = require('@ngx-devtools/build');
const { readFileAsync, writeFileAsync, mkdirp } = require('@ngx-devtools/common');
const { rollup } = require('rollup');

const typescript = require('rollup-plugin-typescript2');


const getPkgName = content => {
  if (util.isString(content)) content = JSON.parse(content);
  const names = content.name.split('/');
  return ((names.length < 2) ? content.name : names[1]);
};

const readPackageFile = src => {
  const source = src.split(path.sep).join('/').replace('/**/*.ts', '');
  const filePath = path.join(source, 'package.json');
  return readFileAsync(filePath, 'utf8')
    .then(content => {
      const pkg = JSON.parse(content);
      return Promise.resolve(getPkgName(pkg));
    });
};

const build = (src, dest) => {
  return readPackageFile(src)
    .then(pkgName => {
      const destSrc = path.resolve(dest);
      const folderTempBaseDir = path.join(destSrc.replace(path.basename(destSrc), '.tmp'), pkgName);
      return inlineSources(src, pkgName)
        .then(() => Promise.resolve(folderTempBaseDir));
    });
};

const rollupConfig = {
  input: {
    input: '.tmp/index.ts',
    treeshake: true,
    plugins: [
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
    file: 'dist/elements.umd.js',
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

const elements = [
  'src/libs/navbar/**/*.ts',
  'src/libs/toolbar/**/*.ts'
];

Promise.all(elements.map(element => build(element, 'dist')))
  .then(() => {
    return rollup(rollupConfig.input)
      .then(async bundle => {
        const file = rollupConfig.output.file;
        const { code, map  } = await bundle.generate(rollupConfig.output);
        mkdirp(path.dirname(file));
        return Promise.all([
          writeFileAsync(file, code + `\n//# sourceMappingURL=${path.basename(file)}.map`),
          writeFileAsync(file + '.map', map.toString())
        ]);
      })
  });