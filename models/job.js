
'use strict';
module.exports = function (sequelize, DataTypes) {
    var job = sequelize.define('job', {
        jobType: DataTypes.STRING,
        personsId: DataTypes.STRING,
        name: DataTypes.STRING,
        locationID: DataTypes.INTEGER,
        ETA: DataTypes.DATE,
        ETC: DataTypes.DATE,
        quantity: DataTypes.STRING,
        isDeleted: DataTypes.ENUM('0', '1'),
    }, { timestamps: false });
    job.associate = function (models) {
        job.belongsTo(models.location, { foreignKey: 'locationID' });
    };
    return job;
}
