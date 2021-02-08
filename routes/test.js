var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
const eMsg = 'Database connection error, please contact the developer.';
const user = 'Administrator';

router.get('/', function(req, res) {
	dbConn.query('SELECT * FROM supply ORDER BY supply_id',function(err,rows)     {
        if(err) {
            req.flash('error', eMsg);
            // render to views/books/index.ejs
            res.render('test',{title:'BITS | Users',data:''});
        } else {
            //id = rows[rows.length-1].supply_id
            //console.log(rows);

            res.render('test',{
                title:'BITS | Users',
                user: user,
                data: JSON.stringify(rows)
            });
        }
    });
});

module.exports = router;