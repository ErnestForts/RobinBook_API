var pool = require('../_helpers/db');

module.exports = {
    getPlaces: callBack => {
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
    getPlaceById: (lugar_id, callBack) => {
        pool.query(
            `SELECT * FROM robinbook.Lugares WHERE Lugar_id = ?;`,
            [lugar_id],
            (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
            }
        );
    },
    createPlace: (data,callback) => {
        pool.query(
            'INSERT INTO robinbook.Lugares (Nombre, Descripcion, Foto, tieneLibro, latitud, longitud) VALUES (?,?,?,?,?,?);',
            [
            data.Nombre,
            data.Descripcion,
            data.Foto,
            data.tieneLibro,
            data.latitud,
            data.longitud
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
    updatePlace: (data, callBack) => {
        pool.query(
            `UPDATE robinbook.Lugares AS place SET place.Nombre=COALESCE(?, Nombre), place.Descripcion=COALESCE(?, Descripcion), place.Foto=COALESCE(?, Foto),place.tieneLibro=COALESCE(?, tieneLibro) WHERE (Lugar_id = ?);`,
            [
            data.Nombre,
            data.Descripcion,
            data.Foto,
            data.tieneLibro,
            data.Lugar_id
            ],
            (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
            }
        );
    },
    deletePlace: (data, callBack) => {
        pool.query(
            `DELETE FROM robinbook.Lugares WHERE (Lugar_id = ?);`,
            [data.Lugar_id],
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
            'INSERT INTO robinbook.ComentLugar (id_Lugar, id_User, Coment) VALUES (?,?,?);',
            [
            data.id_Lugar,
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
            `SELECT Users.Nombre, Users.Apellido, Users.Foto, ComentLugar.Coment, ComentLugar.id_ComentLugar, ComentLugar.LikeComent  FROM robinbook.Users JOIN ComentLugar ON (ComentLugar.id_User = Users.user_id) JOIN Lugares ON (Lugares.Lugar_id = ComentLugar.id_Lugar) WHERE id_Lugar = ?;`,
            [libro_id],
            (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
            }
        );
    },
    likeComent: (data, callBack) => {
        pool.query(
            'UPDATE robinbook.ComentLugar SET LikeComent = LikeComent + 1 WHERE id_Lugar = ? AND id_ComentLugar = ?;',
            [
            data.id_Lugar,
            data.id_ComentLugar
            ],
            (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
            }
        );
    },
    getPlaceFav: (user_id, callBack) => {
        pool.query(
            'SELECT * FROM robinbook.Lugares JOIN LugaresFav ON (LugaresFav.id_Lugar = Lugares.lugar_id) WHERE LugaresFav.id_User = ?;',
            [user_id],
            (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
            }
        );
    },
    insertPlaceFav: (data, callBack) => {
        pool.query(
            'INSERT INTO robinbook.LugaresFav (id_User, id_Lugar) VALUES (?,?);',
            [
            data.id_User,
            data.id_Lugar
            ],
            (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results[0]);
            }
        );
    },
    deletePlaceFav: (data, callBack) => {
        pool.query(
                'DELETE FROM robinbook.LugaresFav WHERE id_User=? AND id_Lugar=?;',
                [
                data.id_User,
                data.id_Lugar
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
    puntuarLugar: (data,callback) => {
        pool.query(
            'UPDATE robinbook.Lugares SET VecesPuntuado = VecesPuntuado + 1 WHERE Lugar_id = ?;',
            [data.lugar_id], (error, results, fields) =>{
            if(error){
                callback(error);
            }
                pool.query(
                    'UPDATE robinbook.Lugares SET PuntosTotales = PuntosTotales + ? WHERE Lugar_id = ?;',
                    [
                    data.numEstrellas,
                    data.lugar_id
                    ], (error, results, fields) =>{
                        if(error){
                            callback(error);
                        }
                        pool.query(
                            'INSERT INTO robinbook.ValorarLugar (id_Lugar, id_User) VALUES (?,?);',
                            [
                            data.id_Lugar,
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
    getValorarLugar: (user_id, callBack) => {
        pool.query(
            'SELECT * FROM robinbook.ValorarLugar WHERE id_User = ?;',
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