var pool = require('../_helpers/db');

module.exports = {
    create: (data,callback) => {
        pool.query('INSERT INTO robinbook.Users SET ?',[data], (error, results, fields) =>{
            if(error){
                callback(error);
            }
            return callback(null,results);
        }
        )
    },
    getUserByUserEmail: (email, callBack) => {
        pool.query(
          `select * from robinbook.Users where Email = ?`,
          [email],
          (error, results, fields) => {
            if (error) {
              callBack(error);
            }
            return callBack(null, results[0]);
          }
        );
    },
    getUserByUserId: (id, callBack) => {
    pool.query(
        `select * from robinbook.Users where user_id = ?`,
        [id],
        (error, results, fields) => {
        if (error) {
            callBack(error);
        }
        return callBack(null, results[0]);
        }
    );
    },
    getUsers: callBack => {
    pool.query(
        `select * from robinbook.Users`,
        [],
        (error, results, fields) => {
        if (error) {
            callBack(error);
        }
        return callBack(null, results);
        }
    );
    },
    updateUser: (data,user_id, callBack) => {
    pool.query(
        `update robinbook.Users set Nombre = COALESCE(?, Nombre), Apellido= COALESCE(?, Apellido), Email= COALESCE(?, Email), Password= COALESCE(?, Password), Telefono= COALESCE(?, Telefono), Foto= COALESCE(?, Foto), Frase= COALESCE(?, Frase),Ranking= COALESCE(?, Ranking),resetToken= COALESCE(?, resetToken) where user_id = ?`,
        [
        data.Nombre,
        data.Apellido,
        data.Email,
        data.Password,
        data.Telefono,
        data.Foto,
        data.Frase,
        data.Ranking,
        data.resetToken,
        user_id
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
        `delete from robinbook.Users where user_id = ?`,
        [data.id],
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