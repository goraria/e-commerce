// models/Categories.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Categories = sequelize.define('Categories', {
    category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    category_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category_description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category_image: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'Categories',
    timestamps: false,
});

module.exports = Categories;
// export default Categories;