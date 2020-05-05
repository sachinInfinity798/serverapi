var fs = require('fs');
var path = require('path');
var Sequelize = require('sequelize');
var basename = path.basename(__filename);
var env = process.env.NODE_ENV || 'development';
var config = require('../config/config.json')[env];
var db = {};
var moment = require('moment-timezone');
//console.log(moment().tz("Asia/Calcutta").format('MM/DD/YYYY'));
//var winston = require('winston');
//var logger = require('../config/winston');


if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfullyyy.');
  })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
} else {

  //config.timezone= 'Asia/Calcutta'
  //var sequelize = new Sequelize(config.database, config.username, config.password, config);


  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    {
      //timezone: moment().tz("Asia/Calcutta").format(),
      dialect: "mysql",
      peratorsAliases: false,
      host: config.host,

      pool: {
        max: 100,
        min: 0,
        idle: 200000,
        // @note https://github.com/sequelize/sequelize/issues/8133#issuecomment-359993057
        acquire: 1000000,

      }
    }
  );


  sequelize.authenticate().then(() => {
    // logger.info("Connection has been established successfully.");
    console.log('Connection has been established successfully.');
  })
    .catch(err => {
      // logger.error("Unable to connect to the database: ", err)
      console.error('Unable to connect to the database:', err);
    });
}

fs.readdirSync(__dirname).filter(file => {
  return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
}).forEach(file => {
  var model = sequelize['import'](path.join(__dirname, file));
  db[model.name] = model;
});

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;


module.exports = db;


