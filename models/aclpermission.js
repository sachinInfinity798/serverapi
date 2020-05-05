'state strict';
module.exports = function(sequelize, DataTypes) {
  var aclpermission = sequelize.define('aclpermission', {
    aclResourceId	: DataTypes.STRING,
    userId:DataTypes.INTEGER,
  }, {timestamps: false});
 
  return aclpermission;
};
