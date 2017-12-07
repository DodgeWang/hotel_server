const Sequelize = require('sequelize');
let sequelize = require('../utils/db');

//入住登记表
module.exports=sequelize.define('room_check_in',{
	checkInId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'check_in_id',
		comment: '入住登记id'
	},
	roomId: {
		type: Sequelize.INTEGER,
		field: 'room_id',
		comment: '房间id'
	},
	guestName: {
		type: Sequelize.STRING(50),
		field: 'guest_name',
		comment: '客人名称'
	},
	guestPhone: {
		type: Sequelize.STRING(50),
		field: 'guest_phone',
		comment: '客人联系电话'
	},
	checkInTime: {
		type: Sequelize.STRING(50),
		field: 'check_in_time',
		comment: '入住时间，时间戳'
	},
	checkOutTime: {
		type: Sequelize.STRING(50),
		field: 'check_out_time',
		comment: '退房时间，时间戳'
	}
}, {
	freezeTableName: true,
	timestamps: true
})
