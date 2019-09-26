var express = require('express');
var apiCtrl = require('./api/apiController');

var router = express.Router();

router.route('/').get(apiCtrl.getStats);

module.exports = router;