var pool = require('../_helpers/db');

module.exports = {
    getBooks: callBack => {
        pool.query(
            `SELECT * FROM robinbook.Libros;`,
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
            `SELECT * FROM robinbook.Libros WHERE libro_id = ?;`,
            [libro_id],
            (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
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
                pool.query(
                    'UPDATE robinbook.Users SET ranking = ranking + 20 WHERE user_id = ?;',
                    [
                    data.user_id
                    ], (error, results, fields) =>{
                    if(error){
                        callback(error);
                    }
                    return callback(null,results);
                    }
                );
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
    },
    createComent: (data,callback) => {
        pool.query(
            'INSERT INTO robinbook.ComentLibro (id_Libro, id_User, Coment) VALUES (?,?,?);',
            [
            data.id_Libro,
            data.id_User,
            data.Coment
            ], (error, results, fields) =>{
            if(error){
                callback(error);
            }
                pool.query(
                    'UPDATE robinbook.Users SET ranking = ranking + 10 WHERE user_id = ?;',
                    [
                    data.user_id
                    ], (error, results, fields) =>{
                    if(error){
                        callback(error);
                    }
                    return callback(null,results);
                    }
                );
            }
        );
    },
    getComent: (libro_id, callBack) => {
        pool.query(
            `SELECT Users.Nombre, Users.Apellido, Users.Foto, ComentLibro.Coment FROM robinbook.Users JOIN ComentLibro ON (ComentLibro.id_User = Users.user_id) JOIN Libros ON (Libros.libro_id = ComentLibro.id_Libro) WHERE id_Libro = ?;`,
            [libro_id],
            (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
            }
        );
    },
    getBookFav: (user_id, callBack) => {
        pool.query(
            'SELECT * FROM robinbook.Libros JOIN LibrosFav ON (LibrosFav.id_Libro = Libros.libro_id) WHERE LibrosFav.id_User = ?;',
            [user_id],
            (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
            }
        );
    },
    insertBookFav: (data, callBack) => {
        pool.query(
            'INSERT INTO robinbook.LibrosFav (id_User, id_Libro) VALUES (?,?);',
            [
            data.id_User,
            data.id_Libro
            ],
            (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
            }
        );
    }
};