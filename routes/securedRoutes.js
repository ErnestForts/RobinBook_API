const express = require('express');
var mysql = require('mysql2');
var router = express.Router();
var jwt = require('jsonwebtoken');

var connection = mysql.createConnection({
    host     : 'robinbook.cvzz91ztbary.eu-west-3.rds.amazonaws.com',
    user     : 'admin',
    password : 'RobinBookDB',
    database: 'robinbook'
  });

connection.connect(function(err) {
    if (err) throw err;
});
const config = {
	secret : "aA/dj0Z8GmCZnIViFM4pmDpg1mgtit96TnVZWLkvLns="
};

router
.get('/home', function (req, response) {

    var token = req.headers['x-access-token'];
    if (!token) return response.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, config.secret, function(err) {
        if (err) return response.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    connection.query('SELECT * FROM robinbook.Users', function (error, results) {
        if (error) {
            response.send({
            "code":400,
            "failed":"error ocurred"
            })
        } else {
            response.json({
                mensaje: 'Autenticación correcta',
                usuarios: results
            });
            }
        });
  });
});

module.exports = router;

