// models/ProductConfigurations.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Products = require('./Products');

const ProductConfigurations = sequelize.define('ProductConfigurations', {
    configuration_id: {
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
    cpu: {
        type: DataTypes.STRING,
    },
    ram: {
        type: DataTypes.INTEGER,
    },
    gpu: {
        type: DataTypes.STRING,
        defaultValue: 'Onboard',
    },
    storage: {
        type: DataTypes.INTEGER,
    },
    screen: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    resolution: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    tableName: 'ProductConfigurations',
    timestamps: false,
});

Products.hasMany(ProductConfigurations, { foreignKey: 'product_id' });
ProductConfigurations.belongsTo(Products, { foreignKey: 'product_id' });

module.exports = ProductConfigurations;
// export default ProductConfigurations;