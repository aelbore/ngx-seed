
const fs = require('fs');
const path = require('path');

const glob = (dir, regExcludes, done) => {
  var results = [];

  fs.readdir(dir, function (err, list) {
    if (err) return done(err);

    var pending = list.length;
    if (!pending) return done(null, results);

    list.forEach(function (file) {
      file = path.join(dir, file);

      var excluded = false;
      var len = regExcludes.length;
      var i = 0;

      for (; i < len; i++) {
        if (file.match(regExcludes[i])) {
          excluded = true;
        }
      }

      if(excluded === false) {
        results.push(file);

        fs.stat(file, function (err, stat) {
          if (stat && stat.isDirectory()) {

            glob(file, regExcludes, function (err, res) {
              results = results.concat(res);

              if (!--pending) { done(null, results); }

            });
          } else {
            if (!--pending) { done(null, results); }
          }
        });
      } else {
        if (!--pending) { done(null, results); }
      }
    });
  });
};

module.exports = glob;