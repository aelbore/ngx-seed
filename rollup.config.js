module.exports = {
  external: [
    "@angular/core",
    "@angular/common",
    "rxjs",
    "rxjs/operators"
  ],
  output: {
    globals: {
      "@angular/core": "ng.core",
      "@angular/common": "ng.common",
      "rxjs": "rxjs",
      "rxjs/operators": "rxjs.operators"
    }
  }
}