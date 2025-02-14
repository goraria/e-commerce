// models/Payments.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Orders = require('./Orders');

const Payments = sequelize.define('Payments', {
    payment_id: {
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
    payment_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    payment_method: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    payment_status: {
        type: DataTypes.STRING,
    },
}, {
    tableName: 'Payments',
    timestamps: false,
});

Orders.hasMany(Payments, { foreignKey: 'order_id' });
Payments.belongsTo(Orders, { foreignKey: 'order_id' });

module.exports = Payments;
// export default Payments;