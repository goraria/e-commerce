// models/Discounts.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Discounts = sequelize.define('Discounts', {
    discount_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    discount_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    percentage_discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    value_discount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    start_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    end_date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
    },
    status: {
        type: DataTypes.TINYINT,
        allowNull: false,
        defaultValue: 0,
    },
}, {
    tableName: 'Discounts',
    timestamps: false,
});

module.exports = Discounts;
// export default Discounts;