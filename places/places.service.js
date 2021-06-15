var pool = require('../_helpers/db');

module.exports = {
    create: (data,callback) => {
        pool.query('INSERT INTO robinbook.Libros (Titulo, Autor, Descripcion, Foto) VALUES (?,?,?,?);',[data], (error, results, fields) =>{
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
    updateUser: (data, callBack) => {
    pool.query(
        `update robinbook.Users set Nombre=?, Apellido=?, Email=?, Password=?, Telefono=?, Foto=?, Frase=?,Ranking=? where user_id = ?`,
        [
        data.Nombre,
        data.Apellido,
        data.Email,
        data.Password,
        data.Telefono,
        data.Foto,
        data.Frase,
        datad.Ranking

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


// const config = require('config.json');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');
// const db = require('_helpers/db');

// module.exports = {
//     authenticate,
//     getAll,
//     getById,
//     create,
//     update,
//     delete: _delete
// };

// async function authenticate({ username, password }) {
//     const user = await db.User.scope('withHash').findOne({ where: { username } });

//     if (!user || !(await bcrypt.compare(password, user.hash)))
//         throw 'Username or password is incorrect';

//     // authentication successful
//     const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });
//     return { ...omitHash(user.get()), token };
// }

// async function getAll() {
//     return await db.User.findAll();
// }

// async function getById(id) {
//     return await getUser(id);
// }

// async function create(params) {
//     // validate
//     if (await db.User.findOne({ where: { Email: params.username } })) {
//         throw 'Username "' + params.username + '" is already taken';
//     }

//     // hash password
//     if (params.password) {
//         params.hash = await bcrypt.hash(params.password, 10);
//     }

//     // save user
//     await db.User.create(params);
// }

// async function update(id, params) {
//     const user = await getUser(id);

//     // validate
//     const usernameChanged = params.username && user.username !== params.username;
//     if (usernameChanged && await db.User.findOne({ where: { username: params.username } })) {
//         throw 'Username "' + params.username + '" is already taken';
//     }

//     // hash password if it was entered
//     if (params.password) {
//         params.hash = await bcrypt.hash(params.password, 10);
//     }

//     // copy params to user and save
//     Object.assign(user, params);
//     await user.save();

//     return omitHash(user.get());
// }

// async function _delete(id) {
//     const user = await getUser(id);
//     await user.destroy();
// }

// // helper functions

// async function getUser(id) {
//     const user = await db.User.findByPk(id);
//     if (!user) throw 'User not found';
//     return user;
// }

// function omitHash(user) {
//     const { hash, ...userWithoutHash } = user;
//     return userWithoutHash;
// }