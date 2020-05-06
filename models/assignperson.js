'use strict';
module.exports = function (sequelize, DataTypes) {
    var assigncontactlist = sequelize.define('assigncontactlist', {
        jobId: DataTypes.INTEGER,
        personId: DataTypes.INTEGER,
    }, { timestamps: false });
    assigncontactlist.associate = function (models) {
        assigncontactlist.belongsTo(models.personlist, { foreignKey: 'personId' });
    };
    return assigncontactlist;
}