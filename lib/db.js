var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'aPEAk9CAIl',
    password: 'SRtQ8HADIb',
    database: 'aPEAk9CAIl'
});
connection.connect(function(error) {
    if (!!error) {
        console.log(error.message);
    } else {
        var status = false;
        setInterval(function() {
            connection.query('SELECT 1', function(err, rows) {
                if(err) {
                    console.log('DB Connection lost: ' + err.message);
                } else {
                    if (!status) console.log('Database connection established');
                    status = true;
                }
            });
        }, 9900);
    }
});

module.exports = connection;