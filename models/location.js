
'use strict';
module.exports = function (sequelize, DataTypes) {
    var location = sequelize.define('location', {
        name: DataTypes.STRING,
        isDeleted: DataTypes.ENUM('0', '1'),
    }, { timestamps: false });
    location.associate = function (models) {

    };
    return location;
}
