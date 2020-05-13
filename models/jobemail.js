'use strict';
module.exports = function (sequelize, DataTypes) {
    var jobemail = sequelize.define('jobemail', {
        jobId: DataTypes.INTEGER,
        emailType: DataTypes.STRING,
        email: DataTypes.STRING,
    }, { timestamps: false });
    jobemail.associate = function (models) {

    };
    return jobemail;
}