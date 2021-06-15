var pool = require('../_helpers/db');

module.exports = {
    createPlace: (data,callback) => {
        pool.query('INSERT INTO robinbook.Lugares (Nombre, Descripcion, Foto, tieneLibro) VALUES (?,?,?,?);',[data], (error, results, fields) =>{
            if(error){
                callback(error);
            }
            return callback(null,results);
        }
        )
    },
    getPlaceById: (libro_id, callBack) => {
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
    deleteUser: (data, callBack) => {
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