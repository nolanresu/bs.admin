var express = require('express');
var router = express.Router();
const email = 'psa.sorsogon@gmail.com';

router.get('/', function(req, res) {
    res.render('login', {title:"BITS | Login"});
});

router.post('/', function(res, req, next) {
	req.flash('success', "Please check " + email);
})

module.exports = router;