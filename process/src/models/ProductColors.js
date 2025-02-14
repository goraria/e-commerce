// models/ProductColors.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Products = require('./Products');

const ProductColors = sequelize.define('ProductColors', {
    color_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Products,
            key: 'product_id',
        },
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'ProductColors',
    timestamps: false,
});

Products.hasMany(ProductColors, { foreignKey: 'product_id' });
ProductColors.belongsTo(Products, { foreignKey: 'product_id' });

module.exports = ProductColors;
