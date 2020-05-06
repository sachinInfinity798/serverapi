
'use strict';
module.exports = function (sequelize, DataTypes) {
    var client = sequelize.define('client', {
        name: DataTypes.STRING,
        quantity: DataTypes.STRING,
        Commodity: DataTypes.STRING,
        accountManager: DataTypes.STRING,
        fileNo: DataTypes.STRING,
        filestatus: DataTypes.ENUM('Confirmed', 'Pending'),
        isDeleted: DataTypes.ENUM('0', '1'),
    }, { timestamps: false });
    client.associate = function (models) {

    };
    return client;
}
