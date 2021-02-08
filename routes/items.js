var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

router.get('/', function(req, res, next) {
      
    dbConn.query('SELECT * FROM account ORDER BY account_id',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.render('items',{data:''});   
        } else {
            // render to views/books/index.ejs
            res.render('items',{data:rows});
        }
    });
});

module.exports = router;