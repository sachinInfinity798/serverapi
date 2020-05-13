
'use strict';
module.exports = function (sequelize, DataTypes) {
    var client = sequelize.define('client', {
        name: DataTypes.STRING,
    }, { timestamps: false });
    client.associate = function (models) {
        //client.hasMany(models.assignmanagetoclient, { foreignKey: 'clientId' });
    };
    return client;
}
