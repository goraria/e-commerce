// models/OrderDetail.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Orders = require('./Orders');
const Products = require('./Products');
const ProductConfigurations = require('./ProductConfigurations');
const ProductColors = require('./ProductColors');
const ProductAccessories = require('./ProductAccessories');

const OrderDetails = sequelize.define('OrderDetails', {
    order_detail_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    order_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Orders,
            key: 'order_id',
        },
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Products,
            key: 'product_id',
        },
    },
    configuration_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: ProductConfigurations,
            key: 'configuration_id',
        },
    },
    color_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: ProductColors,
            key: 'color_id',
        },
    },
    accessory_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: ProductAccessories,
            key: 'accessory_id',
        },
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    unit_price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
}, {
    tableName: 'OrderDetails',
    timestamps: false,
});

Orders.hasMany(OrderDetails, { foreignKey: 'order_id' });
OrderDetails.belongsTo(Orders, { foreignKey: 'order_id' });
Products.hasMany(OrderDetails, { foreignKey: 'product_id' });
OrderDetails.belongsTo(Products, { foreignKey: 'product_id' });
ProductConfigurations.hasMany(OrderDetails, { foreignKey: 'configuration_id' });
OrderDetails.belongsTo(ProductConfigurations, { foreignKey: 'configuration_id' });
ProductColors.hasMany(OrderDetails, { foreignKey: 'color_id' });
OrderDetails.belongsTo(ProductColors, { foreignKey: 'color_id' });
ProductAccessories.hasMany(OrderDetails, { foreignKey: 'accessory_id' });
OrderDetails.belongsTo(ProductAccessories, { foreignKey: 'accessory_id' });

module.exports = OrderDetails;
// export default OrderDetails;