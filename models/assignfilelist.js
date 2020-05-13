'use strict';
module.exports = function (sequelize, DataTypes) {
    var assignfilelist = sequelize.define('assignfilelist', {
        jobId: DataTypes.INTEGER,
        fileId: DataTypes.INTEGER,
    }, { timestamps: false });
    assignfilelist.associate = function (models) {
        assignfilelist.belongsTo(models.jobfile, { foreignKey: 'fileId' });
    };
    return assignfilelist;
}