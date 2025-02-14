// models/Users.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database.js');

const Users = sequelize.define('Users', {
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    role: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0, // 0: khách hàng; 1: admin;...
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0, // trạng thái tài khoản (active, suspended, …)
    },
    is_verified: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
    verification_token: {
        type: DataTypes.STRING,
    },
    first_name: {
        type: DataTypes.STRING,
    },
    last_name: {
        type: DataTypes.STRING,
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    avatar: {
        type: DataTypes.STRING,
        defaultValue: '/assets/img/avatars/1.png',
    },
    birthday: {
        type: DataTypes.DATE,
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
    tableName: 'Users',
    timestamps: false,
});

module.exports = Users;
// export default Users;
