var express = require('express');
var router = express.Router();
var dbConn  = require('../lib/db');
const eMsg = 'Database connection error, please contact the developer.';
const user = 'Administrator';

router.get('/', function(req, res, next) {
    dbConn.query('SELECT * FROM supply ORDER BY supply_id',function(err,rows)     {
        if(err) {
            req.flash('error', eMsg);
            // render to views/books/index.ejs
            res.render('supply',{title:'BITS | Supply',data:''});
        } else {
            //id = rows[rows.length-1].supply_id
            //console.log(rows);

            res.render('supply',{
                title:'BITS | Supply',
                user: user,
                data: rows
            });
        }
    });
});

router.get('/add', function(req, res, next) {
    dbConn.query('SELECT * FROM category', function(err,rows) {
        if (err) {
            console.log('Category List Error.');
        } else {
            var arr_category = {};
            for(var i=0; i < rows.length; i++) {
                arr_category[i] = rows[i].category ;
            }
            // render to add.ejs
            res.render('supply/add', {
                title: 'BITS | Supply',
                user: user,
                category: rows,
                article: '',
                description: '',
                measure: '',
                value: '',
                stock: '',
                balancecard: '',
                onhandcount: '',
                remarks: ''
            });
        }
    });
});

router.post('/add', function(req, res, next) {   
    let cat = req.body.category;
    let art = req.body.article;
    let des = req.body.description;
    let mea = req.body.measure;
    let val = req.body.value;
    let sto = req.body.stock;
    let bal = req.body.balancecard;
    let onh = req.body.onhandcount;
    let rem = req.body.remarks;
    let errors = false;

    if(cat.length === 0 || art.length === 0 || des.length === 0 || mea.length === 0 || val.length === 0 || sto.length === 0 || bal.length === 0 || onh.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Please enter the required fields.");
        // render to add.ejs with flash message
        res.render('supply/add', {
            title: 'BITS | Supply',
            user: user,
            category: cat,
            article: art,
            description: des,
            measure: mea,
            value: val,
            stock: sto,
            balancecard: bal,
            onhandcount: onh,
            remarks: rem
        })
    }

    // if no error
    if(!errors) {
        var form_data = {
            category: cat,
            article: art,
            description: des,
            unit_measure: mea,
            unit_value: val,
            stock: sto,
            bpc: bal,
            ohpc: onh,
            remarks: rem
        }
        
        // insert query
        dbConn.query('INSERT INTO supply SET ?', form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('supply/add', {
                    title: 'BITS | Supply',
                    user: user,
                    category: form_data.category,
                    article: form_data.article,
                    description: form_data.description,
                    measure: form_data.measure,
                    value: form_data.value,
                    stock: form_data.stock,
                    balancecard: form_data.balancecard,
                    onhandcount: form_data.onhandcount,
                    remarks: form_data.remarks
                })
            } else {                
                req.flash('success', 'Item successfully added');
                res.redirect('/supply');
            }
        })
    }
})

// display edit book page
router.get('/edit/(:id)', function(req, res, next) {

    let id = req.params.id;
   
    dbConn.query('SELECT * FROM supply WHERE supply_id = ' + id, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Item not found with id = ' + id)
            res.redirect('/supply')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('supply/edit', {
                title: 'Edit Item', 
                user: user,
                id: rows[0].supply_id, 
                category: rows[0].category, 
                article: rows[0].article, 
                description: rows[0].description, 
                measure: rows[0].unit_measure, 
                value: rows[0].unit_value, 
                stock: rows[0].stock, 
                balancecard: rows[0].bpc, 
                onhandcount: rows[0].ohpc, 
                remarks: rows[0].remarks
            })
        }
    })
})

// update book data
router.post('/update/:id', function(req, res, next) {

    let id = req.params.id;
    let cat = req.body.category;
    let art = req.body.article;
    let des = req.body.description;
    let mea = req.body.measure;
    let val = req.body.value;
    let sto = req.body.stock;
    let bal = req.body.balancecard;
    let onh = req.body.onhandcount;
    let rem = req.body.remarks;
    let errors = false;

    if(cat.length === 0 || art.length === 0 || des.length === 0 || mea.length === 0 || val.length === 0 || sto.length === 0 || bal.length === 0 || onh.length === 0) {
        errors = true;
        // set flash message
        req.flash('error', "Please enter the required fields.");
        // render to add.ejs with flash message
        res.render('supply/edit', {
            user: user,
            id: req.params.id,
            category: cat,
            article: art,
            description: des,
            measure: mea,
            value: val,
            stock: sto,
            balancecard: bal,
            onhandcount: onh,
            remarks: rem
        })
    }
    
    // if no error
    if( !errors ) {   
        var form_data = {
            category: cat,
            article: art,
            description: des,
            unit_measure: mea,
            unit_value: val,
            stock: sto,
            bpc: bal,
            ohpc: onh,
            remarks: rem
        }
        // update query
        dbConn.query('UPDATE supply SET ? WHERE supply_id = ' + id, form_data, function(err, result) {
            //if(err) throw err
            if (err) {
                console.log(err);
                // set flash message
                req.flash('error', err);
                // render to edit.ejs
                res.render('supply/edit', {
                    user: user,
                    id: req.params.id,
                    category: form_data.category,
                    article: form_data.article,
                    description: form_data.description,
                    measure: form_data.measure,
                    value: form_data.value,
                    stock: form_data.stock,
                    balancecard: form_data.bpc,
                    onhandcount: form_data.ohpc,
                    remarks: form_data.remarks
                })
            } else {
                req.flash('success', 'Item successfully updated');
                res.redirect('/supply');
            }
        })
    }
})

// delete book
router.get('/delete/(:id)', function(req, res, next) {

    let id = req.params.id;
     
    dbConn.query('DELETE FROM supply WHERE supply_id = ' + id, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to books page
            res.redirect('/supply')
        } else {
            // set flash message
            req.flash('success', 'Item successfully deleted!')
            // redirect to books page
            res.redirect('/supply')
        }
    })
})

module.exports = router;