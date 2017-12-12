const Sequelize = require('sequelize');
const envConfig = require('../config/env_config');

exports.sequelize = () => {
	return new Sequelize(envConfig.database.database, envConfig.database.username, envConfig.database.password, {
         host: envConfig.database.host,
         dialect: 'mysql',
         pool: {
             max: 5,
             min: 0,
             idle: 30000
         }
       });
} 