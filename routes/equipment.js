var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

router.get('/', function(req, res, next) {
      res.render('equipment',{title:'BITS | Equipment'});
});

module.exports = router;