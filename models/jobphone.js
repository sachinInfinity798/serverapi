'use strict';
module.exports = function (sequelize, DataTypes) {
    var jobphone = sequelize.define('jobphone', {
        jobId: DataTypes.INTEGER,
        phoneType: DataTypes.STRING,
        phone: DataTypes.STRING,
    }, { timestamps: false });
    jobphone.associate = function (models) {

    };
    return jobphone;
}