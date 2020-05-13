
'use strict';
module.exports = function (sequelize, DataTypes) {
    var jobfile = sequelize.define('jobfile', {
        clientId: DataTypes.INTEGER,
        quantity: DataTypes.STRING,
        Commodity: DataTypes.STRING,
        fileNo: DataTypes.STRING,
        filestatus: DataTypes.ENUM('Confirmed', 'Pending'),
        isDeleted: DataTypes.ENUM('0', '1'),
    }, { timestamps: false });
    jobfile.associate = function (models) {
        jobfile.belongsTo(models.client, { foreignKey: 'clientId' });
        jobfile.hasMany(models.assignmanagetofile, { foreignKey: 'fileId' });
    };
    return jobfile;
}
