var express = require('express');
var apiCtrl = require('./api/apiController');

var router = express.Router();

router.route('/stats').get(apiCtrl.getStats);

module.exports = router;