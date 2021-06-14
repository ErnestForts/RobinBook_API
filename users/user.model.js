const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        Nombre: { type: DataTypes.STRING, allowNull: false },
        Apellido: { type: DataTypes.STRING, allowNull: false },
        Email: { type: DataTypes.STRING, allowNull: false },
        Password: { type: DataTypes.STRING, allowNull: false },
        Telefono: { type: DataTypes.STRING, allowNull: true },
        Foto: { type: DataTypes.STRING, allowNull: true },
        Frase: { type: DataTypes.STRING, allowNull: true },
        Token: { type: DataTypes.STRING, allowNull: true }
    };

    const options = {
        defaultScope: {
            // exclude hash by default
            attributes: { exclude: ['Password'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };

    return sequelize.define('User', attributes, options);
}