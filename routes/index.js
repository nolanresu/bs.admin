var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('index', {title:"BITS | Basic Inventory Tracking System"});
});

module.exports = router;