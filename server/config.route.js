const { RouterFactory, ROUTE_METHOD } = require('@ngx-devtools/server/builder');

module.exports = RouterFactory.create({
  path: '/config',
  method: ROUTE_METHOD.GET,
  handler (req, res, next) {
    return res.status(200).json(require('../config.json'));
  }
});