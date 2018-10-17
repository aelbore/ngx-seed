const { RouterFactory, HTTP_METHOD } = require('@ngx-devtools/server');

module.exports = RouterFactory.create({
  path: '/config',
  method: HTTP_METHOD.GET,
  handler (req, res, next) {
    return res.status(200).json(require('../config.json'));
  }
});