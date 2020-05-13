
'use strict';
module.exports = function (sequelize, DataTypes) {
    var accountmanager = sequelize.define('accountmanager', {
        managername: DataTypes.STRING,
        isDeleted: DataTypes.ENUM('0', '1'),
    }, { timestamps: false });
    accountmanager.associate = function (models) {

    };
    return accountmanager;
}
