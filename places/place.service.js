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
    getPlaceById: (libro_id, callBack) => {
        pool.query(
            `SELECT * FROM robinbook.Lugares WHERE Lugar_id = ?;`,
            [libro_id],
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
            'INSERT INTO robinbook.Lugares (Nombre, Descripcion, Foto, tieneLibro) VALUES (?,?,?,?);',
            'UPDATE robinbook.Users SET ranking = ranking + 20 WHERE user_id = ?;'
            [
            data.Nombre,
            data.Descripcion,
            data.Foto,
            data.tieneLibro
            ], (error, results, fields) =>{
            if(error){
                callback(error);
            }
            return callback(null,results);
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
    }
};