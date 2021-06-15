var pool = require('../_helpers/db');

module.exports = {
    getBooks: callBack => {
        pool.query(
            `SELECT * FROM robinbook.Lugares;`,
            [],
            (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
            }
        );
    },
    getBookById: (libro_id, callBack) => {
        pool.query(
            `SELECT * FROM robinbook.Libros WHERE Lugar_id = ?;`,
            [libro_id],
            (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
            }
        );
    },
    createBook: (data,callback) => {
        pool.query(
            'INSERT INTO robinbook.Libros (Titulo, Autor, Descripcion, Foto) VALUES (?,?,?,?);',
            [
            data.Titulo,
            data.Autor,
            data.Descripcion,
            data.Foto
            ], (error, results, fields) =>{
            if(error){
                callback(error);
            }
            return callback(null,results);
            }
        );
    },
    updateBook: (data, callBack) => {
    pool.query(
            'UPDATE robinbook.Libros AS book SET book.Titulo=COALESCE(?, Titulo), book.Autor=COALESCE(?, Autor), book.Descripcion=COALESCE(?, Descripcion), book.Foto=COALESCE(?, Foto) WHERE (libro_id = ?);',
            [
            data.Titulo,
            data.Autor,
            data.Descripcion,
            data.Foto,
            data.libro_id
            ],
            (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
            }
        );
    },
    deleteBook: (data, callBack) => {
    pool.query(
            "DELETE FROM robinbook.Libros WHERE (libro_id = ?);",
            [data.libro_id],
            (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            console.log(results[0]);
            return callBack(null, results);
            }
        );
    }
};