require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const mysql = require('mysql2');
const errorHandler = require('_middleware/error-handler');

app.use(express.json());
app.use(cors());

// api routes
// app.use('/users', require('./users/user.controller'));

// global error handler
// app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 4000;
app.listen(port, () => console.log('Server listening on port ' + port));


/************ Héctor ******************/

let connection = mysql.createConnection({
    host: 'robinbook.cvzz91ztbary.eu-west-3.rds.amazonaws.com',
    user: 'admin',
    password: 'RobinBookDB',
    database: 'robinbook'
});

connection.connect((error) => {
    if(error) log.error(error);
    else console.log('connection created');
});

app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
    let respuesta = { error: true, codigo: 200, mensaje: 'Punto de partida' };
    res.send(respuesta)
});

app.get('/book', (req, res) => {
    const id = req.body.libro_id;
    if(id) {
        let sql = `SELECT * FROM robinbook.Libros WHERE libro_id = ${id};`;
        connection.query(sql, id, (err,result) => {
            if(err) throw res.send(err);
            else res.send(result);
        });
    } else {
        let sql = 'SELECT * FROM robinbook.Libros;';
        connection.query(sql, (err, result) => {
            if(err) throw res.send(err);
            res.send(result);
        });
    }
});

// app.post('/discos', (req, res) => {
//     let params = [req.body.titulo, req.body.interprete, req.body.anyoPublicacion];
//     let sql = 'INSERT INTO angular.discos (titulo, interprete, anyoPublicacion) VALUES (?,?,?);';
//     connection.query(sql, params, (err, result) => {
//         if(err) throw res.send(err);
//         res.send(result);
//     });
// });

// app.put('/discos', (req, res) => {
//     let params = [req.body.titulo, req.body.interprete, req.body.anyoPublicacion, req.body.id];
//     let sql = 'UPDATE angular.discos AS d SET d.titulo=COALESCE(?, titulo), d.interprete=COALESCE(?, interprete), d.anyoPublicacion=COALESCE(?, anyoPublicacion) WHERE (id = ?);';
//     connection.query(sql, params, (err, result) => {
//         if (err) throw res.send(err);
//         res.send(result);
//     });
// });

// app.delete('/discos', (req, res) => {
//     let params = [req.body.id];
//     let sql = "DELETE FROM angular.discos WHERE (id = ?);";
//     connection.query(sql, params, (err, result) => {
//         if (err) throw res.send(err);
//         res.send(result);
//     })
// });


app.use((req, res) => {
    respuesta = { error:true, codigo: 200, mensaje: 'URL not found'};
    res.status(404).send(respuesta);
});



// app.listen(port, () => {
//     console.log('App listening on port 300');
    
// });
