// models/Reviews.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Users = require('./Users');
const Products = require('./Products');

const Reviews = sequelize.define('Reviews', {
    review_id: {
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
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Products,
            key: 'product_id',
        },
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    comment: {
        type: DataTypes.STRING(1023),
    },
    review_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: 'Reviews',
    timestamps: false,
});

Users.hasMany(Reviews, { foreignKey: 'user_id' });
Reviews.belongsTo(Users, { foreignKey: 'user_id' });
Products.hasMany(Reviews, { foreignKey: 'product_id' });
Reviews.belongsTo(Products, { foreignKey: 'product_id' });

module.exports = Review;
// export default Reviews;