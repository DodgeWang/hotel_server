const Sequelize = require('sequelize');
let sequelize = require('../utils/db');

//事件分享表
module.exports=sequelize.define('event_share',{
	eventShareId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'event_share_id',
		comment: '事件分享id'
	},
	eventId: {
		type: Sequelize.INTEGER,
		field: 'event_id',
		comment: '事件id'
	},
	sharerUserId: {
		type: Sequelize.INTEGER,
		field: 'sharer_user_id',
		comment: '分享者用户id'
	},
	sharedUserId: {
		type: Sequelize.INTEGER,
		field: 'shared_user_id',
		comment: '被分享者用户id'
	},
	isShareAll: {
		type: Sequelize.INTEGER,
		field: 'is_share_all',
		comment: '是否分享所有人，1是，0否'
	}
}, {
	freezeTableName: true,
	timestamps: true
})
