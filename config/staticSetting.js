module.exports = {

	session_secret: 'sessionHotel', 
	auth_cookie_name: 'sessionHotel',
	cache_maxAge: Math.floor(Date.now() / 1000) + 24 * 60 * 60, //1 hours

	// 密码盐
	encrypt_key: 'hotel',
	salt_md5_key: "hotel", // MD5的盐，用于加密密码

};



