const Sequelize = require('sequelize');
let sequelize = require('../utils/db');

//房间物品表
module.exports=sequelize.define('room_article_relation',{
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'id',
		comment: 'id'
	},
	roomId: {
		type: Sequelize.INTEGER,
		field: 'room_id',
		comment: '房间id'
	},
	articleId: {
		type: Sequelize.INTEGER,
		field: 'article_id',
		comment: '物品id'
	}
}, {
	freezeTableName: true,
	timestamps: true
})
