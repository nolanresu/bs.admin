var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');

router.get('/', function(req, res, next) {
      
    dbConn.query('SELECT * FROM inventory ORDER BY supply_id',function(err,rows)     {
 
        if(err) {
            req.flash('error', err);
            // render to views/books/index.ejs
            res.render('inventory',{data:''});   
        } else {
            // render to views/books/index.ejs
            res.render('inventory',{data:rows});
        }
    });
});

module.exports = router;