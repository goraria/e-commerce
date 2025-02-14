// models/Addresses.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Users = require('./Users');

const Addresses = sequelize.define('Addresses', {
    address_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: 'user_id',
        },
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    tower: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    street: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    district: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    postal_code: {
        type: DataTypes.STRING,
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'Addresses',
    timestamps: false,
});

Users.hasMany(Addresses, { foreignKey: 'user_id' });
Addresses.belongsTo(Users, { foreignKey: 'user_id' });

module.exports = Addresses;
// export default Addresses;