const router = require('express').Router();
const handler = (req, res, next) => res.status(200).json(require('../config.json'));

module.exports = router.get('/config', handler);