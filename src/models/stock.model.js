const {Model, DataTypes} = require('sequelize');
const sequelize = require("../config/sequelize.config");
class Stock extends Model {}

Stock.init({
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    serial: DataTypes.STRING,
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    sysOperative: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    dateAssignment: DataTypes.DATE,
},{
    sequelize,
    tableName: 'endowments',
    timestamps: false
});

module.exports = Stock;