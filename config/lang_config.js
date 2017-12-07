var envConfig = require('./env_config');
module.exports = (req) => {
	let langType = req.session.LANG || envConfig.LANG;
	let lang = null;
    switch (langType)
    {
	    case 1:
	    lang = require('./lang/en-US');
	    break;

	    case 2:
	    lang = require('./lang/zh-CN');
	    break;

	    default:
        lang = require('./lang/en-US');
    }

    return lang;
}