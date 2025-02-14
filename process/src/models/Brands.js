// models/Brands.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Brands = sequelize.define('Brands', {
    brand_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    brand_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'Brands',
    timestamps: false,
});

module.exports = Brands;
// export default Brands;