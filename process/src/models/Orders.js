// models/Orders.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Users = require('./Users');
const Discounts = require('./Discounts');
const Addresses = require('./Addresses');

const Orders = sequelize.define('Orders', {
    order_id: {
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
    discount_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Discounts,
            key: 'discount_id',
        },
    },
    address_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Addresses,
            key: 'address_id',
        },
    },
    order_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    total_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    status: {
        type: DataTypes.TINYINT,
        defaultValue: 0, // 0: đang xử lý, 1: hoàn thành, 2: hủy,...
    },
}, {
    tableName: 'Orders',
    timestamps: false,
});

Users.hasMany(Orders, { foreignKey: 'user_id' });
Orders.belongsTo(Users, { foreignKey: 'user_id' });
Discounts.hasMany(Orders, { foreignKey: 'discount_id' });
Orders.belongsTo(Discounts, { foreignKey: 'discount_id' });
Addresses.hasMany(Orders, { foreignKey: 'address_id' });
Orders.belongsTo(Addresses, { foreignKey: 'address_id' });

module.exports = Orders;
