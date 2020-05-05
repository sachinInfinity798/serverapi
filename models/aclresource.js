'state strict';
module.exports = function (sequelize, DataTypes) {
  var aclresource = sequelize.define('aclresource', {
    module_name: DataTypes.STRING,
    status: DataTypes.ENUM('Active', 'Inactive'),
  }, { timestamps: false });
  return aclresource;
};