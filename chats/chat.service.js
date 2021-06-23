var pool = require('../_helpers/db');

module.exports = {
    getChats: callBack => {
        pool.query(
            'SELECT * FROM robinbook.chatRooms;',
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
    getchatsById: (user_id, callBack) => {
        pool.query(
            `SELECT  chatRooms.id_chatRoom, chatRooms.user_id_origen, chatRooms.user_id_destino, Users.Nombre, Users.Email, Users.Foto FROM robinbook.chatRooms JOIN Users ON (chatRooms.user_id_destino = Users.user_id OR chatRooms.user_id_origen = Users.user_id AND Users.user_id != ?) WHERE user_id_origen = ? OR user_id_destino = ? AND Users.user_id != ?;`,
            [user_id, user_id, user_id, user_id],
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
            'SELECT chatRooms.id_chatRoom, chatRooms.user_id_origen, chatRooms.user_id_destino, chatMensajes.id_mensaje, chatMensajes.mensaje, chatMensajes.user_id FROM robinbook.chatRooms JOIN chatMensajes ON (chatRooms.id_chatRoom = chatMensajes.id_mensajesRoom) WHERE id_chatRoom = ?;',
            [id_chatRoom],
            (error, results, fields) => {
            if (error) {
                callBack(error);
            }
            return callBack(null, results);
            }
        );
    },
    deleteMensaje: (data, callBack) => {
        pool.query(
            'DELETE FROM robinbook.chatMensajes WHERE (id_mensaje = ?);',
            [data.id_mensaje],
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