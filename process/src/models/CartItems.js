// models/CartItems.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Carts = require('./Carts');
const Products = require('./Products');
const ProductConfigurations = require('./ProductConfigurations');
const ProductColors = require('./ProductColors');
const ProductAccessories = require('./ProductAccessories');

const CartItems = sequelize.define('CartItems', {
    cart_item_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Carts,
            key: 'cart_id',
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
}, {
    tableName: 'CartItems',
    timestamps: false,
});

Carts.hasMany(CartItems, { foreignKey: 'cart_id' });
CartItems.belongsTo(Carts, { foreignKey: 'cart_id' });
Products.hasMany(CartItems, { foreignKey: 'product_id' });
CartItems.belongsTo(Products, { foreignKey: 'product_id' });
ProductConfigurations.hasMany(CartItems, { foreignKey: 'configuration_id' });
CartItems.belongsTo(ProductConfigurations, { foreignKey: 'configuration_id' });
ProductColors.hasMany(CartItems, { foreignKey: 'color_id' });
CartItems.belongsTo(ProductColors, { foreignKey: 'color_id' });
ProductAccessories.hasMany(CartItems, { foreignKey: 'accessory_id' });
CartItems.belongsTo(ProductAccessories, { foreignKey: 'accessory_id' });

module.exports = CartItems;
// export default CartItems;