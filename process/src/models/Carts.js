// models/Carts.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Users = require('./Users');

const Carts = sequelize.define('Carts', {
    cart_id: {
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
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'Carts',
    timestamps: false,
});

Users.hasOne(Carts, { foreignKey: 'user_id' });
Carts.belongsTo(Users, { foreignKey: 'user_id' });

module.exports = Carts;
// export default Carts;