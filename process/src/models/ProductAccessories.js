// models/ProductAccessories.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Products = require('./Products');

const ProductAccessories = sequelize.define('ProductAccessories', {
    accessory_id: {
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
    nums_key: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    switch_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    connection: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'ProductAccessories',
    timestamps: false,
});

Products.hasMany(ProductAccessories, { foreignKey: 'product_id' });
ProductAccessories.belongsTo(Products, { foreignKey: 'product_id' });

module.exports = ProductAccessories;
// export default ProductAccessories;