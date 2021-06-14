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

/********************************** BOOK *******************************/

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

app.post('/book', (req, res) => {
    let params = [req.body.Titulo, req.body.Autor, req.body.Descripcion, req.body.Foto];
    let sql = 'INSERT INTO robinbook.Libros (Titulo, Autor, Descripcion, Foto) VALUES (?,?,?,?);';
    connection.query(sql, params, (err, result) => {
        if(err) throw res.send(err);
        res.send(result);
    });
});

app.put('/book', (req, res) => {
    let params = [req.body.Titulo, req.body.Autor, req.body.Descripcion, req.body.Foto, req.body.libro_id];
    let sql = 'UPDATE robinbook.Libros AS book SET book.Titulo=COALESCE(?, Titulo), book.Autor=COALESCE(?, Autor), book.Descripcion=COALESCE(?, Descripcion), book.Foto=COALESCE(?, Foto) WHERE (libro_id = ?);';
    connection.query(sql, params, (err, result) => {
        if (err) throw res.send(err);
        res.send(result);
    });
});

app.delete('/book', (req, res) => {
    let params = [req.body.libro_id];
    let sql = "DELETE FROM robinbook.Libros WHERE (libro_id = ?);";
    connection.query(sql, params, (err, result) => {
        if (err) throw res.send(err);
        res.send(result);
    })
});

/********************************** PLACE *******************************/

app.get('/place', (req, res) => {
    const id = req.body.Lugar_id;
    if(id) {
        let sql = `SELECT * FROM robinbook.Lugares WHERE Lugar_id = ${id};`;
        connection.query(sql, id, (err,result) => {
            if(err) throw res.send(err);
            else res.send(result);
        });
    } else {
        let sql = 'SELECT * FROM robinbook.Lugares;';
        connection.query(sql, (err, result) => {
            if(err) throw res.send(err);
            res.send(result);
        });
    }
});

app.post('/place', (req, res) => {
    let params = [req.body.Nombre, req.body.Descripcion, req.body.Foto, req.body.tieneLibro];
    let sql = 'INSERT INTO robinbook.Lugares (Nombre, Descripcion, Foto, tieneLibro) VALUES (?,?,?,?);';
    connection.query(sql, params, (err, result) => {
        if(err) throw res.send(err);
        res.send(result);
    });
});

app.put('/place', (req, res) => {
    let params = [req.body.Nombre, req.body.Descripcion, req.body.Foto, req.body.tieneLibro, req.body.Lugar_id];
    let sql = 'UPDATE robinbook.Lugares AS place SET place.Nombre=COALESCE(?, Nombre), place.Descripcion=COALESCE(?, Descripcion), place.Foto=COALESCE(?, Foto),place.tieneLibro=COALESCE(?, tieneLibro) WHERE (Lugar_id = ?);';
    connection.query(sql, params, (err, result) => {
        if (err) throw res.send(err);
        res.send(result);
    });
});

app.delete('/place', (req, res) => {
    let params = [req.body.Lugar_id];
    let sql = "DELETE FROM robinbook.Lugares WHERE (Lugar_id = ?);";
    connection.query(sql, params, (err, result) => {
        if (err) throw res.send(err);
        res.send(result);
    })
});

app.use((req, res) => {
    respuesta = { error:true, codigo: 200, mensaje: 'URL not found'};
    res.status(404).send(respuesta);
});

// app.listen(port, () => {
//     console.log('App listening on port 300');
    
// });
