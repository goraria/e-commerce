// models/ProductDescriptions.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Products = require('./Products');

const ProductDescriptions = sequelize.define('ProductDescriptions', {
    description_id: {
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
    title_description: {
        type: DataTypes.STRING,
    },
    sub_description: {
        type: DataTypes.STRING(2047),
    },
    img_description: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'ProductDescriptions',
    timestamps: false,
});

Products.hasOne(ProductDescriptions, { foreignKey: 'product_id' });
ProductDescriptions.belongsTo(Products, { foreignKey: 'product_id' });

module.exports = ProductDescriptions;
// export default ProductDescriptions;