var express = require('express'),
    router = express.Router(),
    config = require('../config/config');

router.get('/', function(req, res){

  res.json(config.info);

	});

module.exports = router;
