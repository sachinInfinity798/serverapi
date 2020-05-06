
'use strict';
module.exports = function (sequelize, DataTypes) {
    var accountManager = sequelize.define('accountManager', {
        name: DataTypes.STRING,
        isDeleted: DataTypes.ENUM('0', '1'),
    }, { timestamps: false });
    accountManager.associate = function (models) {

    };
    return accountManager;
}
