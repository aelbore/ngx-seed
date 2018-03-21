(function(global){
  System.config({
    "paths": {
      'npm:': 'node_modules/'
    },
    "map": {
      "app":                        "app",
      "dist":                       "dist",
      "@angular":                   "npm:@angular"
    },
    "packages": {
      "app":                                { "main": "main.js",  "defaultExtension": "js" },
      "dist":                               { "main": "index.js", "defaultExtension": "js" },
      "@angular/animations":                { "main": "bundles/animations.umd.js", "defaultExtension": "js" },
      "@angular/common":                    { "main": "bundles/common.umd.js", "defaultExtension": "js" },
      "@angular/compiler":                  { "main": "bundles/compiler.umd.js", "defaultExtension": "js" },
      "@angular/core":                      { "main": "bundles/core.umd.js", "defaultExtension": "js" },
      "@angular/forms":                     { "main": "bundles/forms.umd.js", "defaultExtension": "js" },
      "@angular/http":                      { "main": "bundles/http.umd.js", "defaultExtension": "js" },
      "@angular/platform-browser":          { "main": "bundles/platform-browser.umd.js", "defaultExtension": "js" },
      "@angular/platform-browser-dynamic":  { "main": "bundles/platform-browser-dynamic.umd.js", "defaultExtension": "js" },
      "@angular/router":                    { "main": "bundles/router.umd.js", "defaultExtension": "js" }   
    }   
  })
})(this);