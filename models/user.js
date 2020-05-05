
'use strict';
module.exports = function (sequelize, DataTypes) {
  var user = sequelize.define('user', {
    userName: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Oops. Looks like you already have an account with this email address.',
        fields: [sequelize.fn('lower', sequelize.col('email'))]
      },
      max: {
        args: 254,
        msg: 'The email you entered is invalid or longer than 254 characters.'
      },
      validate: {
        isEmail: {
          msg: "Email address must be valid."
        },
        len: {
          args: [6, 128],
          msg: "Email address must be between 6 and 128 characters in length"
        },
      },
    },
    locationID: DataTypes.INTEGER,
    password: DataTypes.STRING,
    gender: DataTypes.STRING,
    mobile: DataTypes.STRING,
    dob: DataTypes.DATE,
    Address: DataTypes.STRING,
    status: DataTypes.ENUM('0', '1'),
  }, { timestamps: false });
  user.associate = function (models) {
    user.hasOne(models.aclpermission, { foreignKey: 'userId' });
    user.belongsTo(models.location, { foreignKey: 'locationID' });

  };
  return user;
}
