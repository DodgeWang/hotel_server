//房间详情表
module.exports=sequelize.define('room_info',{
	roomId: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
		allowNull: false,
		field: 'room_id',
		comment: '房间id'
	},
	roomNumber: {
		type: Sequelize.STRING(20),
		field: 'room_number',
		comment: '房间号'
	},
	roomQrCode: {
		type: Sequelize.STRING(200),
		field: 'room_qr_code',
		comment: '二维码'
	},
	roomStatus: {
		type: Sequelize.INTEGER,
		field: 'room_status',
		comment: '房间状态，1已入住，0未入住'
	},
	roomCleanStatus: {
		type: Sequelize.INTEGER,
		field: 'room_clean_status',
		comment: '房间打扫状态，1已打扫，0未打扫'
	},
	roomtypeId: {
		type: Sequelize.INTEGER,
		field: 'roomtype_id',
		comment: '房间类型'
	}
}, {
	freezeTableName: true,
	timestamps: true
})
