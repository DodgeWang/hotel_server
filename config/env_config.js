let config = null;

if(process && process.env && process.env.NODE_ENV) {
	config = require('./env/' + process.env.NODE_ENV + ".js");
}else{
	config = require('./env/development.config.js');
	// config = require('./env/production.config.js');
}

module.exports = config;