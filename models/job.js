
'use strict';
module.exports = function (sequelize, DataTypes) {
    var job = sequelize.define('job', {
        jobType: DataTypes.STRING,
        name: DataTypes.STRING,
        locationID: DataTypes.INTEGER,
        ETA: DataTypes.DATE,
        ETC: DataTypes.DATE,
        quantity: DataTypes.STRING,
        address: DataTypes.STRING,
        country: DataTypes.STRING,
        state: DataTypes.STRING,
        city: DataTypes.STRING,
        zip: DataTypes.STRING,
        latitude: DataTypes.DECIMAL(11, 8),
        longitude: DataTypes.DECIMAL(11, 8),
        isDeleted: DataTypes.ENUM('0', '1'),
    }, { timestamps: false });
    job.associate = function (models) {
        job.belongsTo(models.location, { foreignKey: 'locationID' });
        job.hasMany(models.assigncontactlist, { foreignKey: 'jobId' });
        job.hasMany(models.assignfilelist, { foreignKey: 'jobId' });
        job.hasMany(models.jobphone, { foreignKey: 'jobId' });
        job.hasMany(models.jobemail, { foreignKey: 'jobId' });
    };
    return job;
}
