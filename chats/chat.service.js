var pool = require('../_helpers/db');

module.exports = {
    getChats: callBack => {
        pool.query(
            `SELECT * FROM robinbook.chatRooms;`,
            [],
            (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
            }
        );
    },
    createChat: (data,callback) => {
        pool.query(
            'INSERT INTO robinbook.chatRooms (user_id_origen, user_id_destino) VALUES (?,?);',
            [
            data.user_id_origen,
            data.user_id_destino
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
    getchatsById: (user_id, callBack) => {
        pool.query(
            `SELECT * FROM robinbook.chatRooms WHERE user_id_origen = ? OR user_id_destino = ?;`,
            [user_id, user_id],
            (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
            }
        );
    },
    createMensaje: (data,callback) => {
        pool.query(
            'INSERT INTO robinbook.chatMensajes (id_mensajesRoom, mensaje, user_id) VALUES (?,?,?);',
            [
            data.id_mensajesRoom,
            data.mensaje,
            data.user_id
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
    getMensajes: (id_chatRoom, callBack) => {
        pool.query(
            `SELECT chatRooms.id_chatRoom, chatRooms.user_id_origen, chatRooms.user_id_destino, chatMensajes.mensaje, chatMensajes.user_id FROM robinbook.chatRooms JOIN chatMensajes ON (chatRooms.id_chatRoom = chatMensajes.id_mensajesRoom) WHERE id_chatRoom = ?;`,
            [id_chatRoom],
            (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
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
    likeComent: (data, callBack) => {
        pool.query(
            'UPDATE robinbook.ComentLibro SET LikeComent = LikeComent + 1 WHERE id_Libro = ? AND id_ComentLibro = ?;',
            [
            data.id_Libro,
            data.id_ComentLibro
            ],
            (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
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
    },
    deleteBookFav: (data, callBack) => {
        pool.query(
                'DELETE FROM robinbook.LibrosFav WHERE id_User=? AND id_Libro=?;',
                [
                data.id_User,
                data.id_Libro
                ],
                (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                console.log(results[0]);
                return callBack(null, results);
                }
            );
        },
    puntuarLibro: (data,callback) => {
        pool.query(
            'UPDATE robinbook.Libros SET VecesPuntuado = VecesPuntuado + 1 WHERE libro_id = ?;',
            [data.libro_id], (error, results, fields) =>{
                if(error){
                    callback(error);
                }
                pool.query(
                    'UPDATE robinbook.Libros SET PuntosTotales = PuntosTotales + ? WHERE libro_id = ?;',
                    [
                    data.numEstrellas,
                    data.libro_id
                    ], (error, results, fields) =>{
                        if(error){
                            callback(error);
                        }
                            pool.query(
                                'INSERT INTO robinbook.ValorarLibro (id_Libro, id_User) VALUES (?,?);',
                                [
                                data.id_Libro,
                                data.id_User
                                ], (error, results, fields) =>{
                                    if(error){
                                        callback(error);
                                    }
                                pool.query(
                                    'UPDATE robinbook.Users SET ranking = ranking + 5 WHERE user_id = ?;',
                                    [data.user_id], (error, results, fields) =>{
                                        if(error){
                                            callback(error);
                                        }
                                        return callback(null,results);
                                    }
                                );
                            }
                        );
                    }
                );
            }
        );
    },
    getValorarLibro: (user_id, callBack) => {
        pool.query(
            'SELECT * FROM robinbook.ValorarLibro WHERE id_User = ?;',
            [id_User],
            (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
            }
        );
    }
};