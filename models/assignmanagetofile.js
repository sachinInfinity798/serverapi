'use strict';
module.exports = function (sequelize, DataTypes) {
    var assignmanagetofile = sequelize.define('assignmanagetofile', {
        fileId: DataTypes.INTEGER,
        managerId: DataTypes.INTEGER,
    }, { timestamps: false });
    assignmanagetofile.associate = function (models) {
        assignmanagetofile.belongsTo(models.accountmanager, { foreignKey: 'managerId' });
    };
    return assignmanagetofile;
}