var mysql = require('mysql2');
const bcrypt = require('bcrypt');
const express = require('express')
var router = express.Router();
var jwt = require('jsonwebtoken');

const saltRounds = 10;
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
.post('/register', function (req, response) {
    const password = req.body.password;
    const encryptedPassword = bcrypt.hashSync(password, saltRounds)
  
    var users={
        "Nombre":req.body.firstName,
        "Apellido":req.body.lastName,
        "Email":req.body.username,
        "Password":encryptedPassword
     }
    
    connection.query('INSERT INTO robinbook.Users SET ?',users, function (error, results, fields) {
      if (error) {
        response.send({
          "code":400,
          "failed":"error ocurred"
        })
      } else {
        const payload = {
            check:  true
        };
        const token = jwt.sign(payload, config.secret, {
            expiresIn: 1440
        });
        response.json({
            mensaje: 'Autenticación correcta',
            token: token
        });
        }
    });
})
.post('/', function (req, response) {
    var email= req.body.username;
    var password = req.body.password;
    connection.query('SELECT * FROM robinbook.Users WHERE Email = ?', email, function (error, results, fields) {
        if (error) {
            response.send({
                "code":400,
                "failed":"error ocurred"
            })
        }else{
            if(results.length > 0){
                const isValidPass = bcrypt.compareSync(password, results[0].Password);

                if(isValidPass){
                    const payload = {
                        check:  true
                    };
                    const token = jwt.sign(payload, config.secret, {
                        expiresIn: 1440
                    });
                    response.json({
                        mensaje: 'Autenticación correcta',
                        token: token
                    });
                }
                else{
                    response.send({
                        "code":204,
                        "success":"Email and password does not match"
                    })
                }
            }
            else{
                response.send({
                    "code":206,
                    "success":"Email does not exits"
                });
            }
      }
    });
});

module.exports = router;
