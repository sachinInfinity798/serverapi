
'use strict';
module.exports = function (sequelize, DataTypes) {
    var personlist = sequelize.define('personlist', {
        name: DataTypes.STRING,
        address: DataTypes.STRING,
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        contactNumber: DataTypes.STRING,
        company: DataTypes.STRING,
        isDeleted: DataTypes.ENUM('0', '1'),
    }, { timestamps: false });
    personlist.associate = function (models) {

    };
    return personlist;
}
